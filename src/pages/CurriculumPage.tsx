import { PageIntro } from '../components/PageIntro'

type Stage = {
  level: string
  duration: string
  summary: string
  goals: string
  contents: string
  audience: string
}

type Instrument = {
  id: 'trumpet' | 'horn' | 'trombone' | 'euphonium'
  name: string
  character: string
  stages: Stage[]
}

const curriculumAudience = '초등 저학년~중학생'

const instrumentCurricula: Instrument[] = [
  {
    id: 'trumpet',
    name: '트럼펫',
    character: '선명하고 곧은 소리',
    stages: [
      {
        level: '입문', duration: '1~3개월', summary: '악기와 친해지고 기본 연주 자세를 익히는 단계',
        goals: '악기와 친해지고 기본기 익히기', contents: '마우스피스 버징, 자세와 호흡, 한 옥타브 음역', audience: curriculumAudience,
      },
      {
        level: '초급', duration: '3~6개월', summary: '기초 주법을 다지고 간단한 곡을 연주하는 단계',
        goals: '기초 주법 습득과 간단한 멜로디 연주', contents: '장조 스케일, 싱글 텅잉, 클라크·아르방 기초 에튀드', audience: curriculumAudience,
      },
      {
        level: '중급', duration: '6~12개월', summary: '음역을 넓히고 다양한 주법을 구사하는 단계',
        goals: '음역 확장과 표현력 있는 연주', contents: '장·단조 스케일, 더블 텅잉, 에튀드 심화와 앙상블', audience: curriculumAudience,
      },
      {
        level: '고급', duration: '12개월~', summary: '전문 레퍼토리와 입시·오디션을 준비하는 단계',
        goals: '연주 완성도와 개인 목표 달성', contents: '협주곡, 오케스트라 발췌, 콩쿠르·군악대 입시 준비', audience: curriculumAudience,
      },
    ],
  },
  {
    id: 'horn',
    name: '호른',
    character: '깊고 따뜻한 울림',
    stages: [
      {
        level: '입문', duration: '1~3개월', summary: '좁고 깊은 마우스피스에 적응하고 기본 음을 내는 단계',
        goals: '마우스피스 적응과 안정적인 기본 음 만들기', contents: '버징, 호흡과 지지, 저음역 음정 익히기', audience: curriculumAudience,
      },
      {
        level: '초급', duration: '3~6개월', summary: '자연 배음과 기초 스케일을 익히는 단계',
        goals: '배음 조절과 기초 음악 표현', contents: '자연 배음 연습, 기초 장조 스케일, 간단한 멜로디', audience: curriculumAudience,
      },
      {
        level: '중급', duration: '6~12개월', summary: '조옮김과 핸드 포지션을 익히며 표현력을 키우는 단계',
        goals: '조옮김 읽기와 핸드 포지션 습득', contents: 'F·B♭ 이중 호른 운용, 조옮김, 에튀드와 앙상블', audience: curriculumAudience,
      },
      {
        level: '고급', duration: '12개월~', summary: '오케스트라 발췌와 독주 레퍼토리를 준비하는 단계',
        goals: '고음역 안정성과 전문 레퍼토리 완성', contents: '협주곡, 오케스트라 발췌, 예고·음대 입시 준비', audience: curriculumAudience,
      },
    ],
  },
  {
    id: 'trombone',
    name: '트롬본',
    character: '넓고 힘 있는 음색',
    stages: [
      {
        level: '입문', duration: '1~3개월', summary: '슬라이드 위치와 호흡을 익혀 첫 음을 만드는 단계',
        goals: '기본 자세와 정확한 슬라이드 위치 익히기', contents: '버징, 자세와 호흡, 1~4 포지션과 기초 음정', audience: curriculumAudience,
      },
      {
        level: '초급', duration: '3~6개월', summary: '일곱 포지션과 기초 스케일을 연결하는 단계',
        goals: '슬라이드 이동과 음정 감각 안정화', contents: '전 포지션, 장조 스케일, 기초 텅잉과 멜로디', audience: curriculumAudience,
      },
      {
        level: '중급', duration: '6~12개월', summary: '레가토와 다양한 아티큘레이션을 배우는 단계',
        goals: '부드러운 슬라이드와 분명한 발음 만들기', contents: '레가토 텅잉, 장·단조 스케일, 에튀드와 앙상블', audience: curriculumAudience,
      },
      {
        level: '고급', duration: '12개월~', summary: '독주곡과 오케스트라·군악대 레퍼토리를 준비하는 단계',
        goals: '전 음역의 안정성과 실전 연주력 강화', contents: '협주곡, 오케스트라 발췌, 콩쿠르·군악대 입시 준비', audience: curriculumAudience,
      },
    ],
  },
  {
    id: 'euphonium',
    name: '유포늄',
    character: '부드럽고 풍성한 소리',
    stages: [
      {
        level: '입문', duration: '1~3개월', summary: '편안한 호흡으로 따뜻한 기본 음색을 만드는 단계',
        goals: '바른 자세와 충분한 호흡으로 첫 소리 만들기', contents: '버징, 자세와 호흡, 저·중음역 기초 운지', audience: curriculumAudience,
      },
      {
        level: '초급', duration: '3~6개월', summary: '스케일과 음색을 다듬으며 기초 에튀드를 연주하는 단계',
        goals: '음색 만들기와 기초 조성 연주', contents: '장조 스케일, 기초 에튀드, 음색 조절 연습', audience: curriculumAudience,
      },
      {
        level: '중급', duration: '6~12개월', summary: '음악적 표현력을 키우고 다양한 장르를 경험하는 단계',
        goals: '다양한 장르 연주와 앙상블 참여', contents: '장·단조 스케일, 에튀드 심화, 취주악·앙상블 파트', audience: curriculumAudience,
      },
      {
        level: '고급', duration: '12개월~', summary: '솔로 레퍼토리와 콩쿠르·입시를 준비하는 단계',
        goals: '독주 완성도와 전문 연주 역량 강화', contents: '협주곡, 취주악 전문 레퍼토리, 콩쿠르·군악대 입시 준비', audience: curriculumAudience,
      },
    ],
  },
]

const lessonOptions = [
  {
    title: '개인 레슨', subtitle: '1:1 맞춤 레슨',
    facts: [['수업 시간', '주 1회 · 40분'], ['수업 형태', '1:1 개인 레슨'], ['수강료', '문의']],
    description: '현재 실력과 목표에 맞춰 진도와 레퍼토리를 구성합니다. 입문부터 전공·입시 준비까지 가능합니다.',
  },
  {
    title: '원데이 클래스', subtitle: '악기 첫 체험',
    facts: [['수업 시간', '30분'], ['수강료', '20,000원'], ['예약', '네이버 예약']],
    description: '트럼펫·호른·트롬본·유포늄 중 하나를 선택해 사전 지식 없이도 첫 소리를 경험합니다.',
  },
  {
    title: '악기 이용', subtitle: '수업 중 악기 제공',
    facts: [['이용료', '수업 중 무료'], ['보유 악기', '4종'], ['안내', '등록 시 상담']],
    description: '악기가 없어도 수업을 시작할 수 있으며, 충분히 경험한 뒤 구매나 대여를 결정할 수 있습니다.',
  },
] as const

function StageList({ stages }: { stages: Stage[] }) {
  return (
    <ol class="stage-list">
      {stages.map((stage, index) => (
        <li class="stage-row">
          <div class="stage-heading">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h3>{stage.level}</h3>
              <p>{stage.duration}</p>
            </div>
          </div>
          <div class="stage-content">
            <p class="stage-summary">{stage.summary}</p>
            <dl class="stage-details">
              <div><dt>학습 목표</dt><dd>{stage.goals}</dd></div>
              <div><dt>주요 내용</dt><dd>{stage.contents}</dd></div>
              <div><dt>추천 대상</dt><dd>{stage.audience}</dd></div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function CurriculumPage() {
  return (
    <div class="curriculum-page">
      <PageIntro
        index="01"
        variant="curriculum"
        title="커리큘럼"
        description="처음 소리를 내는 과정부터 무대와 입시·오디션까지, 현재 수준과 목표에 맞춰 이어갑니다."
      />

      <section class="editorial-section curriculum-practical" aria-labelledby="practical-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">악기별 과정</p>
              <h2 id="practical-title" class="section-title">실기 과정</h2>
            </div>
            <p>악기마다 음색과 연주 방식은 다르지만, 바른 호흡과 자세에서 시작해 네 단계로 깊어집니다.</p>
          </div>

          <div role="tablist" aria-label="악기별 실기 과정" class="curriculum-tabs reveal">
            {instrumentCurricula.map((instrument, index) => (
              <button
                id={`tab-${instrument.id}`}
                role="tab"
                aria-controls={`tab-content-${instrument.id}`}
                aria-selected={index === 0 ? 'true' : 'false'}
                tabindex={index === 0 ? 0 : -1}
                data-tab={instrument.id}
                class={`curriculum-tab ${index === 0 ? 'tab-active' : 'tab-inactive'}`}
              >
                <span class="curriculum-tab-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{instrument.name}</strong>
                <small>{instrument.character}</small>
              </button>
            ))}
          </div>

          {instrumentCurricula.map((instrument, index) => (
            <div
              id={`tab-content-${instrument.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${instrument.id}`}
              tabindex={0}
              hidden={index !== 0}
              class="curriculum-panel"
            >
              <StageList stages={instrument.stages} />
            </div>
          ))}

          <dl class="focus-ledger reveal">
            <div>
              <dt>군악대 오디션 준비</dt>
              <dd>악기별 실기시험곡과 현재 음역을 함께 검토하고, 행진곡·팡파레 스타일의 안정적인 사운드를 준비합니다.</dd>
            </div>
            <div>
              <dt>예고·음대 입시 준비</dt>
              <dd>지원 학교와 시기에 맞춰 기초 훈련과 입시곡 완성도를 함께 관리하며 실전 연주를 준비합니다.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="editorial-section theory-section" aria-labelledby="theory-title">
        <div class="theory-ledger editorial-container">
          <div class="theory-overview reveal">
            <p class="section-kicker">음악을 읽는 힘</p>
            <h2 id="theory-title" class="section-title">뮤토랑 음악이론반</h2>
            <p class="theory-intro">악보를 읽고 듣고 이해하는 힘을 실기와 별도로 또는 함께 배울 수 있습니다.</p>
          </div>
          <div class="theory-information reveal">
            <dl class="theory-facts">
              <div><dt>대상</dt><dd>{curriculumAudience}</dd></div>
              <div><dt>시간</dt><dd>주 1회 · 50분</dd></div>
              <div><dt>방식</dt><dd>2~4인 소그룹 또는 1:1</dd></div>
              <div><dt>수강</dt><dd>정규반 · 단기 특강</dd></div>
            </dl>
            <ul class="theory-topics">
              <li>악보 읽기와 독보력 훈련</li>
              <li>기초 리듬부터 점음표·당김음까지</li>
              <li>음정·음계·화성의 기초</li>
              <li>시창·청음과 중급 조성 분석</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="editorial-section lesson-section" aria-labelledby="lesson-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">등록 전 확인</p>
              <h2 id="lesson-title" class="section-title">수업 안내</h2>
            </div>
            <p>악기와 목표가 정해지지 않았다면 원데이 클래스나 전화 상담부터 시작할 수 있습니다.</p>
          </div>
          <div class="lesson-ledger reveal">
            {lessonOptions.map((lesson, index) => (
              <article>
                <span class="lesson-number">{String(index + 1).padStart(2, '0')}</span>
                <div class="lesson-heading"><h3>{lesson.title}</h3><p>{lesson.subtitle}</p></div>
                <dl>
                  {lesson.facts.map(([term, value]) => <div><dt>{term}</dt><dd>{value}</dd></div>)}
                </dl>
                <p class="lesson-description">{lesson.description}</p>
              </article>
            ))}
          </div>
          <a href="/location" class="button button-primary lesson-contact-button">상담 문의하기</a>
        </div>
      </section>
    </div>
  )
}
