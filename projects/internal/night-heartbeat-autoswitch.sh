#!/usr/bin/env bash
set -euo pipefail

RUN_LOG="/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/service-monetization/offer-build-kit/night-run-log.md"
STATE_FILE="/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/internal/night-heartbeat-autoswitch.state"

# Active 10m + backup 15m cron ids
CRON_10M_ID="11f66818-6d59-4678-914c-f26013f50116"
CRON_15M_ID="3dde85ae-c203-4151-8a0c-a5fb88fd0e43"

# Windows for decision
WINDOW=12   # recent lines to inspect
LOWER_WINDOW=6

mkdir -p "$(dirname "$STATE_FILE")"

if [[ ! -f "$RUN_LOG" ]]; then
  exit 0
fi

recent=$(grep -E "\| result=" "$RUN_LOG" | tail -n "$WINDOW" || true)
count=$(echo "$recent" | sed '/^$/d' | wc -l | tr -d ' ')
if [[ "$count" -eq 0 ]]; then
  exit 0
fi

blocked=$(echo "$recent" | grep -c "result=BLOCKED" || true)
ratio=$(awk -v b="$blocked" -v c="$count" 'BEGIN{ if(c==0) print 0; else print (b/c)*100 }')

# detect conflict hint
conflict=$(echo "$recent" | grep -ci "conflict\|충돌" || true)

mode="10m"
if openclaw cron list --json | grep -q "$CRON_15M_ID\".*\"enabled\": true"; then
  mode="15m"
fi

switch_to_15=false
switch_to_10=false

# degrade to 15m if blocked ratio high or conflicts present
if awk -v r="$ratio" 'BEGIN{exit !(r>30)}'; then
  switch_to_15=true
fi
if [[ "$conflict" -gt 0 ]]; then
  switch_to_15=true
fi

# recover to 10m if recent lower window has low blocked ratio
recent_small=$(grep -E "\| result=" "$RUN_LOG" | tail -n "$LOWER_WINDOW" || true)
count_s=$(echo "$recent_small" | sed '/^$/d' | wc -l | tr -d ' ')
blocked_s=$(echo "$recent_small" | grep -c "result=BLOCKED" || true)
ratio_s=$(awk -v b="$blocked_s" -v c="$count_s" 'BEGIN{ if(c==0) print 0; else print (b/c)*100 }')
if awk -v r="$ratio_s" 'BEGIN{exit !(r<10)}'; then
  switch_to_10=true
fi

stamp=$(date '+%Y-%m-%d %H:%M:%S')

if [[ "$mode" == "10m" && "$switch_to_15" == "true" ]]; then
  openclaw cron disable "$CRON_10M_ID" >/dev/null
  openclaw cron enable "$CRON_15M_ID" >/dev/null
  echo "$stamp | autoswitch | 10m->15m | blocked_ratio=${ratio}% | blocked=$blocked/$count | conflict=$conflict" | tee -a "$STATE_FILE"
elif [[ "$mode" == "15m" && "$switch_to_10" == "true" ]]; then
  openclaw cron disable "$CRON_15M_ID" >/dev/null
  openclaw cron enable "$CRON_10M_ID" >/dev/null
  echo "$stamp | autoswitch | 15m->10m | blocked_ratio=${ratio_s}% | blocked=$blocked_s/$count_s" | tee -a "$STATE_FILE"
else
  echo "$stamp | autoswitch | keep=$mode | blocked_ratio=${ratio}% | blocked=$blocked/$count | conflict=$conflict" >> "$STATE_FILE"
fi
