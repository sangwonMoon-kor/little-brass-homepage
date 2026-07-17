import { SITE } from '../config/site'
import type { BlogPost } from '../types/blog'

type HomePageProps = {
  posts: BlogPost[]
}

const instruments = [
  {
    name: '트럼펫',
    english: 'TRUMPET',
    note: '선명하고 곧은 소리',
    image: '/static/images/instruments/trumpet.webp',
  },
  {
    name: '호른',
    english: 'HORN',
    note: '깊고 따뜻한 울림',
    image: '/static/images/instruments/horn.webp',
  },
  {
    name: '트롬본',
    english: 'TROMBONE',
    note: '넓고 힘 있는 음색',
    image: '/static/images/instruments/trombone.webp',
  },
  {
    name: '유포늄',
    english: 'EUPHONIUM',
    note: '부드럽고 풍성한 소리',
    image: '/static/images/instruments/euphonium.webp',
  },
]

const educationPoints = [
  {
    title: '기초에서 무대까지',
    description: '호흡·자세·음색을 익히고 연주회와 오디션 준비까지 연결합니다.',
  },
  {
    title: '악기 없이 시작하는 첫 수업',
    description: '수업에 필요한 악기를 제공하고 충분히 경험한 뒤 선택하도록 안내합니다.',
  },
  {
    title: '온·오프라인 개인 레슨',
    description: '강동구 상일동 학원과 온라인에서 일정에 맞는 수업을 진행합니다.',
  },
]

export function HomePage({ posts: blogPosts }: HomePageProps) {
  return (
    <div class="home-page">
      <section class="home-video-stage" aria-label="금관악기 연주 영상">
        <video
          id="hero-video"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          poster="/static/videos/hero-poster.webp"
          aria-hidden="true"
          class="hero-video"
        >
          <source src="/static/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </section>

      <section class="home-hero-intro" aria-labelledby="home-hero-title">
        <div class="editorial-container home-hero-intro-inner reveal">
          <div>
            <p class="section-kicker">LITTLE BRASS · BRASS MUSIC ACADEMY</p>
            <h1 id="home-hero-title">금관악기의 첫 소리부터,<br />오래 남는 음악까지</h1>
          </div>
          <div class="home-hero-details">
            <p>
              처음 악기를 잡는 순간부터 연주회, 입시와 오디션을 준비하는 과정까지
              한 사람의 호흡과 속도에 맞춰 이어갑니다.
            </p>
            <div class="hero-actions">
              <a
                href={SITE.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="button home-booking-button"
              >
                원데이 클래스 예약
              </a>
              <a href="/curriculum" class="text-link">커리큘럼 보기</a>
            </div>
            <p class="hero-booking-note">새 창에서 네이버 예약으로 이동합니다</p>
          </div>
        </div>
      </section>

      <section class="instrument-band" aria-label="리틀브라스에서 배우는 네 가지 금관악기">
        <div class="editorial-container instrument-band-grid">
          <div class="instrument-band-intro">
            <strong>네 가지 금관악기</strong>
            <span>첫 수업에서 직접 보고 들어보세요</span>
          </div>
          {instruments.map((instrument, index) => (
            <div class="instrument-band-item">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{instrument.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section class="editorial-section home-instruments" aria-labelledby="instrument-title">
        <div class="editorial-container">
          <div class="home-section-heading reveal">
            <div>
              <p class="section-kicker">CHOOSE YOUR INSTRUMENT</p>
              <h2 id="instrument-title" class="section-title">직접 보고, 듣고,<br />나에게 맞는 악기를 찾습니다</h2>
            </div>
            <p>
              각 악기의 음색과 연주 방식을 경험한 뒤 선택할 수 있습니다.
              처음부터 한 악기를 정하지 않아도 괜찮습니다.
            </p>
          </div>

          <div class="instrument-cards reveal">
            {instruments.map((instrument) => (
              <figure class="instrument-card">
                <img
                  src={instrument.image}
                  alt={`리틀브라스에서 배우는 ${instrument.name}`}
                  width="1024"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <div>
                    <strong>{instrument.name}</strong>
                    <span>{instrument.note}</span>
                  </div>
                  <small>{instrument.english}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section class="editorial-section home-education" aria-labelledby="education-title">
        <div class="editorial-container home-education-inner">
          <figure class="education-photo reveal">
            <img
              src="/static/images/academy/brand-wall-01.webp"
              alt="리틀브라스 로고와 금관악기가 보이는 학원 진열 공간"
              width="1155"
              height="1362"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div class="education-copy reveal">
            <p class="section-kicker">WHY LITTLE BRASS</p>
            <h2 id="education-title">악기를 배우는 시간에<br />집중할 수 있도록</h2>
            <p class="education-intro">
              처음 악기를 잡는 순간부터 연주회, 입시와 오디션을 준비하는 과정까지
              한 사람의 속도에 맞춰 이어갑니다.
            </p>
            <ol class="education-points">
              {educationPoints.map((point, index) => (
                <li>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section class="editorial-section home-space" aria-labelledby="space-title">
        <div class="editorial-container">
          <div class="home-section-heading reveal">
            <div>
              <p class="section-kicker">OUR SPACE</p>
              <h2 id="space-title" class="section-title">연주와 수업에 집중하는<br />리틀브라스의 공간</h2>
            </div>
            <p>레슨실과 개인 연습실, 수업 전후 편안히 머물 수 있는 대기 공간을 갖추고 있습니다.</p>
          </div>

          <div class="home-space-grid reveal">
            <figure class="space-figure space-lead">
              <div class="space-image">
                <img
                  src="/static/images/academy/lobby-01.webp"
                  alt="리틀브라스 학원 대기 공간"
                  width="1600"
                  height="1067"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption class="space-caption">Lobby · 대기 공간</figcaption>
            </figure>
            <figure class="space-figure space-support">
              <div class="space-image">
                <img
                  src="/static/images/academy/practice-room-01.webp"
                  alt="리틀브라스 개인 연습실"
                  width="1385"
                  height="2048"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption class="space-caption">Practice Room</figcaption>
            </figure>
            <figure class="space-figure space-support">
              <div class="space-image">
                <img
                  src="/static/images/academy/lesson-room-01.webp"
                  alt="리틀브라스 금관악기 레슨실"
                  width="1600"
                  height="1021"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption class="space-caption">Lesson Room</figcaption>
            </figure>
          </div>
          <a href="/gallery" class="text-link space-more-link">공간 사진 더 보기</a>
        </div>
      </section>

      <section class="editorial-section home-news" aria-labelledby="news-title">
        <div class="editorial-container">
          <div class="home-section-heading reveal">
            <div>
              <p class="section-kicker">JOURNAL</p>
              <h2 id="news-title" class="section-title">수업과 무대의 기록</h2>
            </div>
            <p>수업 이야기와 연주회 소식을 네이버 블로그에서 전합니다.</p>
          </div>

          {blogPosts.length > 0 ? (
            <div class="news-card-grid reveal">
              {blogPosts.slice(0, 3).map((post) => (
                <a href={post.link} target="_blank" rel="noopener noreferrer" class="news-card">
                  <time>{post.date}</time>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <span aria-hidden="true">네이버 블로그에서 보기 ↗</span>
                </a>
              ))}
            </div>
          ) : (
            <div class="news-card-grid news-card-grid-empty reveal">
              <div class="news-empty">
                <p>블로그에서 최신 수업과 연주회 소식을 확인하세요.</p>
              </div>
            </div>
          )}
          <a
            href="https://blog.naver.com/little_brass"
            target="_blank"
            rel="noopener noreferrer"
            class="text-link news-more-link"
          >
            네이버 블로그 전체 보기
          </a>
        </div>
      </section>

      <section class="home-cta" aria-labelledby="home-cta-title">
        <div class="editorial-container home-cta-inner reveal">
          <div>
            <p class="section-kicker">START WITH LITTLE BRASS</p>
            <h2 id="home-cta-title">어떤 악기로 시작할지<br />함께 찾아드립니다</h2>
          </div>
          <div class="home-cta-actions">
            <p>악기가 없어도, 음악을 처음 배워도 괜찮습니다. 첫 수업에서 직접 소리를 내보고 나에게 맞는 시작을 찾아보세요.</p>
            <a
              href={SITE.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="button home-cta-button"
            >
              원데이 클래스 예약
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
