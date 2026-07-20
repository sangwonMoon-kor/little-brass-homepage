import { PageIntro } from '../components/PageIntro'

const values = [
  {
    title: '기초에 충실한 교육',
    description: '호흡, 앙부쉬르, 자세와 음색을 먼저 다집니다. 기초가 단단해야 새로운 곡과 무대에서도 자신 있게 연주할 수 있습니다.',
  },
  {
    title: '학생 중심 맞춤 교육',
    description: '같은 악기라도 신체 조건과 성향, 배우는 목적이 다릅니다. 한 사람의 현재 상태와 목표에 맞춰 수업의 속도와 내용을 조정합니다.',
  },
  {
    title: '음악을 즐기는 경험',
    description: '연습의 결과가 실제 음악으로 이어지도록 연주회, 앙상블과 여러 장르의 곡을 수업 안에서 함께 경험합니다.',
  },
]

const differences = [
  ['금관악기 전문', '트럼펫, 호른, 트롬본, 유포늄을 중심으로 호흡과 주법을 깊이 있게 다룹니다.'],
  ['입시·오디션 준비', '기초 훈련과 실전 레퍼토리를 함께 구성해 예고·음대와 군악대 오디션을 준비합니다.'],
  ['온·오프라인 레슨', '강동구 학원 수업과 실시간 온라인 수업 중 상황에 맞는 방식을 선택할 수 있습니다.'],
  ['연주와 마스터클래스', '정기연주회와 초청 수업을 통해 배운 음악을 무대와 새로운 연주자에게 연결합니다.'],
] as const

const directors = [
  {
    name: '김효민 원장',
    role: '공동원장',
    image: '/static/images/academy/instructor-trumpet-portrait-02.webp',
    imageAlt: '리틀브라스 김효민 공동원장',
    width: 1365,
    height: 2048,
  },
  {
    name: '안세은 원장',
    role: '공동원장',
    image: '/static/images/academy/instructor-trumpet-portrait-01.webp',
    imageAlt: '리틀브라스 안세은 공동원장',
    width: 1365,
    height: 2048,
  },
] as const

export function PhilosophyPage() {
  return (
    <div class="philosophy-page">
      <PageIntro
        index="02"
        variant="philosophy"
        title="교육철학"
        description="소리를 서두르지 않고, 한 사람의 호흡과 목표에 맞춰 음악을 오래 이어갈 힘을 만듭니다."
      />

      <section class="editorial-section director-section" aria-labelledby="director-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">공동원장 소개</p>
              <h2 id="director-title" class="section-title">리틀브라스를 함께<br />이끄는 두 원장</h2>
            </div>
            <p>
              두 원장은 한 사람의 호흡과 속도를 존중하며,
              첫 소리부터 무대까지 함께 지도합니다.
            </p>
          </div>
          <div class="director-grid reveal">
            {directors.map((director) => (
              <article class="director-profile">
                <figure>
                  <img
                    src={director.image}
                    alt={director.imageAlt}
                    width={director.width}
                    height={director.height}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <p class="director-role">{director.role}</p>
                <h3>{director.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="name-story" aria-labelledby="name-story-title">
        <div class="editorial-container name-story-inner reveal">
          <p class="section-kicker">이름에 담은 뜻</p>
          <blockquote>
            <h2 id="name-story-title">작은 금관악기 연주자,<br />리틀브라스</h2>
            <p>
              브라스(Brass)는 트럼펫, 트롬본, 호른, 튜바와 유포늄처럼 입술의 진동으로 소리 내는
              금관악기를 뜻합니다. 자라나는 아이들이 이 악기를 더 가까이 만나기를 바라는 마음으로
              이름 앞에 ‘리틀’을 붙였습니다.
            </p>
          </blockquote>
        </div>
      </section>

      <section class="editorial-section" aria-labelledby="values-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">수업의 원칙</p>
              <h2 id="values-title" class="section-title">우리가 지키는 세 가지</h2>
            </div>
            <p>좋은 소리를 오래 이어가려면 기술과 개인의 속도, 음악을 좋아하는 마음이 함께 자라야 합니다.</p>
          </div>
          <ol class="numbered-list reveal">
            {values.map((value, index) => (
              <li>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section class="editorial-section philosophy-differences" aria-labelledby="differences-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">리틀브라스의 방식</p>
              <h2 id="differences-title" class="section-title">전문성과 경험을 함께</h2>
            </div>
            <p>금관악기 전문 지도와 실제 연주 경험을 한 과정 안에서 연결합니다.</p>
          </div>
          <dl class="definition-ledger reveal">
            {differences.map(([term, description], index) => (
              <div>
                <dt><span>{String(index + 1).padStart(2, '0')}</span>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
