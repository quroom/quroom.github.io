#!/usr/bin/env python3
import hashlib
import json
import random
from datetime import datetime
from pathlib import Path

ROOT = Path('/home/ubuntu/.openclaw/workspace/quroom.github.io/projects/bogle-ops/content-loop')
STATE = ROOT / 'state.json'
THREADS_OUT = ROOT / 'generated' / 'threads-humor-loop.md'
CAFE_OUT = ROOT / 'generated' / 'cafe-post-loop.md'

THREADS_BATCH = 20
CAFE_BATCH = 2
MAX_LINE = 20  # 공백 포함

OPENERS = [
    '7년차 지수투자자입니다.',
    '오늘도 원칙투자 중.',
    '보글식 한 줄 갑니다.',
    '차트 대신 규칙 봅니다.',
]

LINES_A = [
    '늦은 버스 쫓다', '무릎이 먼저 갑니다', 'FOMO는 늘 급합니다',
    '급등은 빨라요', '내 계좌는 느려요', '수익보다 실수',
    '차트 확대할수록', '멘탈은 축소돼요', '타이밍 잡으려다',
    '식사 시간을 놓쳐요', '버스는 놓치고요', '지갑도 놓칩니다',
]
LINES_B = [
    '원칙은 안 뛰어요', '천천히 이깁니다', '분산은 지루해도',
    '계좌는 덜 아파요', '저비용은 심심한데', '결과는 안 심심',
    '본업이 1번 투자', '체력도 자산입니다', '식사 먼저 하세요',
    '차트는 안 도망가요', '하락장은 지나가요', '복리는 남습니다',
]
CTAS = [
    '앗차 하신 분?', '공감되면 연결해요', '원칙파 연결해요',
    '식사 먼저 하실 분?', '같이 천천히 가요', '보글 동지 연결'
]

CAFE_TITLES = [
    '늦은 버스 심리, 왜 반복될까',
    '차트 과몰입 끊는 3단계',
    '하락장에 계좌보다 멘탈 지키기',
    'FOMO가 왔을 때 체크리스트',
    '본업 집중이 최고의 투자전략인 이유',
]

CAFE_INTROS = [
    '요즘 시장이 흔들릴수록 마음도 함께 흔들립니다. 특히 남의 수익 인증을 보면 늦은 버스를 잡고 싶어지죠.',
    '지수투자를 오래 하면 기술보다 습관이 성과를 만든다는 걸 체감합니다. 문제는 조급함입니다.',
    '하락장보다 더 무서운 건 하락장에 흔들린 내 선택입니다. 그래서 오늘은 감정 루틴을 정리해봅니다.',
]

CAFE_BODIES = [
    '''첫째, 버스 비유를 기억합니다. 늦은 버스를 뛰어 타려 하면 보통 넘어집니다. 투자도 비슷합니다. 급등 추격은 대개 높은 가격, 높은 감정, 낮은 확신으로 이어집니다.

둘째, 통제 가능한 것에만 집중합니다. 비용, 분산, 적립 주기, 리밸런싱 규칙은 내가 통제할 수 있습니다. 반면 다음 주 수익률은 통제할 수 없습니다.

셋째, 행동 버튼을 줄입니다. 장중 앱 확인 횟수 제한, 매수/매도 전 10분 대기, 주 1회 점검 같은 장치를 두면 실수가 줄어듭니다.''',
    '''우리는 종종 수익률을 높이는 방법만 찾지만, 실수를 줄이는 방법이 더 강력합니다. 특히 지수투자에서는 “덜 망치는 사람”이 오래 남습니다.

저는 아래 3가지를 고정합니다.
1) 자동이체 날짜 고정
2) 목표 자산배분표 고정
3) 리밸런싱 조건 고정

시장은 시끄럽고, 원칙은 조용합니다. 그런데 장기 성과는 보통 조용한 쪽에서 나옵니다.''',
]

CAFE_ENDINGS = [
    '여러분은 FOMO가 올 때 어떤 문장으로 스스로를 멈추시나요? 댓글로 서로의 문장을 나눠보면 좋겠습니다.',
    '최근에 “앗차” 했던 매매가 있다면, 그때의 감정을 어떻게 정리했는지 같이 공유해봐요.',
    '차트 대신 본업에 집중했던 경험이 있다면, 그게 투자 성과에 어떤 영향을 줬는지 들려주세요.',
]


def load_state():
    if not STATE.exists():
        return {'run_count': 0, 'used_hashes': []}
    return json.loads(STATE.read_text())


def save_state(state):
    state['used_hashes'] = state['used_hashes'][-5000:]
    STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2))


def h(s):
    return hashlib.sha1(s.encode()).hexdigest()


def fit20(s):
    return s[:MAX_LINE]


def make_thread_post(rng):
    lines = [
        fit20(rng.choice(OPENERS)),
        fit20(rng.choice(LINES_A)),
        fit20(rng.choice(LINES_B)),
        fit20(rng.choice(CTAS)),
    ]
    return '\n'.join([l for l in lines if l.strip()])


def make_cafe_post(rng):
    title = rng.choice(CAFE_TITLES)
    intro = rng.choice(CAFE_INTROS)
    body = rng.choice(CAFE_BODIES)
    ending = rng.choice(CAFE_ENDINGS)
    return f"## {title}\n\n{intro}\n\n{body}\n\n{ending}\n"


def append_md(path, header, blocks):
    ts = datetime.now().strftime('%Y-%m-%d %H:%M')
    if not path.exists():
        path.write_text(header + '\n')
    with path.open('a') as f:
        f.write(f"\n\n### Run {ts}\n\n")
        f.write('\n\n---\n\n'.join(blocks))
        f.write('\n')


def main():
    state = load_state()
    seed = int(datetime.now().strftime('%Y%m%d%H')) + state['run_count']
    rng = random.Random(seed)

    threads = []
    while len(threads) < THREADS_BATCH:
        p = make_thread_post(rng)
        key = h('T:' + p)
        if key in state['used_hashes']:
            continue
        state['used_hashes'].append(key)
        threads.append(p)

    cafes = []
    while len(cafes) < CAFE_BATCH:
        p = make_cafe_post(rng)
        key = h('C:' + p)
        if key in state['used_hashes']:
            continue
        state['used_hashes'].append(key)
        cafes.append(p)

    append_md(THREADS_OUT, '# Threads Humor Loop Output', threads)
    append_md(CAFE_OUT, '# Cafe Post Loop Output', cafes)

    state['run_count'] += 1
    save_state(state)
    print(f"Generated: threads={len(threads)}, cafe={len(cafes)}, run={state['run_count']}")


if __name__ == '__main__':
    main()
