import { SITE } from '../config/site'
import type { BlogPost } from '../types/blog'

type HomePageProps = {
  posts: BlogPost[]
}

const instruments = [
  { name: '트럼펫', note: '선명하고 곧은 소리' },
  { name: '호른', note: '깊고 따뜻한 울림' },
  { name: '트롬본', note: '넓고 힘 있는 음색' },
  { name: '유포늄', note: '부드럽고 풍성한 소리' },
]

export function HomePage({ posts: blogPosts }: HomePageProps) {
  return (
    <div class="home-page">
      <section class="home-hero" aria-labelledby="home-hero-title">
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
        <div class="hero-scrim" aria-hidden="true"></div>
        <div class="home-hero-inner">
          <div class="home-hero-content">
            <p class="hero-kicker">서울 강동구 · 금관악기 전문</p>
            <h1 id="home-hero-title">금관악기를 처음 만나는 곳,<br />리틀브라스</h1>
            <p class="hero-description">
              첫 소리부터 무대와 오디션까지, 각자의 호흡과 속도에 맞춰 배웁니다.
            </p>
            <div class="hero-actions">
              <a
                href={SITE.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="button button-light"
              >
                원데이 클래스 예약
              </a>
              <a href="/curriculum" class="text-link hero-text-link">커리큘럼 보기</a>
            </div>
            <p class="hero-booking-note">새 창에서 네이버 예약으로 이동합니다</p>
          </div>
        </div>
      </section>

      <section class="editorial-section home-instruments" aria-labelledby="instrument-title">
        <div class="editorial-container instrument-layout">
          <figure class="instrument-feature reveal">
            <img
              src="/static/images/instruments/trumpet.webp"
              alt="리틀브라스에서 배우는 트럼펫"
              width="640"
              height="640"
              loading="lazy"
              decoding="async"
            />
            <figcaption>금관악기의 호흡과 소리를 기초부터 배웁니다.</figcaption>
          </figure>
          <div class="instrument-copy reveal">
            <p class="section-kicker">01 · 배우는 악기</p>
            <h2 id="instrument-title" class="section-title">네 가지 악기,<br />한 사람씩 다른 시작</h2>
            <p class="instrument-intro">
              트럼펫·호른·트롬본·유포늄을 다루는 금관악기 전문 교육입니다.
              여러 악기의 소리와 연주 방식을 직접 경험한 뒤 자신에게 맞는 악기를 선택할 수 있습니다.
            </p>
            <ol class="instrument-index">
              {instruments.map((instrument, index) => (
                <li>
                  <span class="instrument-number">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{instrument.name}</strong>
                  <span>{instrument.note}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section class="editorial-section home-proof" aria-labelledby="proof-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">02 · 수업의 기준</p>
              <h2 id="proof-title" class="section-title">금관악기 전문 교육</h2>
            </div>
            <p>
              입문부터 입시·오디션까지 이어지는 수업, 바로 시작할 수 있는 악기 환경,
              거리와 일정에 맞춘 온·오프라인 레슨을 제공합니다.
            </p>
          </div>

          <div class="proof-list">
            <article class="proof-row reveal">
              <p class="proof-number" aria-hidden="true">01</p>
              <div class="proof-copy">
                <h3>기초에서 무대까지 이어지는 과정</h3>
                <p>
                  호흡, 앙부쉬르, 자세와 음색을 차근차근 익힌 뒤 연주회와 입시·오디션 준비까지
                  개인의 목표에 맞춰 연결합니다.
                </p>
                <a href="/curriculum" class="text-link">과정 자세히 보기</a>
              </div>
              <figure class="proof-media">
                <img
                  src="/static/images/academy/display-03.webp"
                  alt="리틀브라스에 전시된 금관악기"
                  width="1600"
                  height="1869"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </article>

            <article class="proof-row reveal">
              <p class="proof-number" aria-hidden="true">02</p>
              <div class="proof-copy">
                <h3>악기가 없어도 가능한 첫 수업</h3>
                <p>
                  수업 중 필요한 악기를 제공하고, 충분히 경험한 다음 구매나 대여를 결정할 수 있도록
                  안내합니다.
                </p>
              </div>
              <figure class="proof-media proof-media-landscape">
                <img
                  src="/static/images/academy/display-02.webp"
                  alt="수업에 사용할 수 있는 금관악기 진열"
                  width="988"
                  height="1034"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </article>

            <article class="proof-row proof-row-text reveal">
              <p class="proof-number" aria-hidden="true">03</p>
              <div class="proof-copy">
                <h3>학원과 온라인에서 이어지는 레슨</h3>
                <p>
                  강동구 상일동 학원 수업과 실시간 온라인 레슨을 함께 운영합니다.
                  거주 지역과 일정에 맞는 방식을 상담 후 선택할 수 있습니다.
                </p>
              </div>
            </article>
          </div>

          <div class="booking-line reveal" aria-labelledby="booking-line-title">
            <div>
              <p class="section-kicker">처음이라면</p>
              <h2 id="booking-line-title">처음이라도 괜찮습니다.</h2>
              <p>원데이 클래스로 소리부터 만나보세요. 선생님이 처음부터 안내합니다.</p>
            </div>
            <div class="booking-line-actions">
              <a
                class="button button-primary"
                href={SITE.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                네이버에서 원데이 클래스 예약
              </a>
              <a class="text-link" href={`tel:${SITE.phone}`}>전화로 상담하기</a>
            </div>
          </div>
        </div>
      </section>

      <section class="editorial-section home-space" aria-labelledby="space-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">03 · 학원 공간</p>
              <h2 id="space-title" class="section-title">연주에 집중하는 공간</h2>
            </div>
            <p>
              레슨실과 개인 연습실, 수업 전후 머물 수 있는 대기 공간을 갖추고 있습니다.
              사진은 실제 리틀브라스 학원 공간입니다.
            </p>
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
              <figcaption class="space-caption">수업 전후 편안히 머무는 대기 공간</figcaption>
            </figure>
            <div class="space-support-stack">
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
                <figcaption class="space-caption">개인 연습실</figcaption>
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
                <figcaption class="space-caption">금관악기 레슨실</figcaption>
              </figure>
            </div>
          </div>
          <a href="/gallery" class="text-link space-more-link">공간 사진 더 보기</a>
        </div>
      </section>

      <section class="editorial-section home-news" aria-labelledby="news-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">04 · 최근 소식</p>
              <h2 id="news-title" class="section-title">리틀브라스의 기록</h2>
            </div>
            <p>수업 이야기와 연주회 소식은 네이버 블로그에서 이어집니다.</p>
          </div>

          <div class="news-list reveal">
            {blogPosts.length > 0 ? blogPosts.map((post) => (
              <a href={post.link} target="_blank" rel="noopener noreferrer" class="news-row">
                <time>{post.date}</time>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </a>
            )) : (
              <div class="news-empty">
                <p>블로그에서 최신 수업과 연주회 소식을 확인하세요.</p>
              </div>
            )}
          </div>
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
            <p class="section-kicker">상담과 체험</p>
            <h2 id="home-cta-title">어떤 악기로 시작할지 함께 찾아드립니다.</h2>
          </div>
          <a
            href={SITE.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="button button-primary"
          >
            원데이 클래스 예약
          </a>
        </div>
      </section>
    </div>
  )
}
