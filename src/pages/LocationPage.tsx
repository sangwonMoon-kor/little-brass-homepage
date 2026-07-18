import { PageIntro } from '../components/PageIntro'
import { SITE } from '../config/site'

const mapUrl = 'https://map.naver.com/p/entry/place/1094694626'

const transport = [
  ['지하철', '5호선 상일동역 3번 출구에서 도보 5분'],
  ['버스', '상일동역과 리엔파크 방면 정류장에서 도보 이동'],
  ['주차', '리엔프라자 건물 내 주차장 이용 가능'],
] as const

export function LocationPage() {
  return (
    <div class="location-page">
      <PageIntro
        index="04"
        variant="location"
        title="찾아오시는 길"
        description="5호선 상일동역 3번 출구에서 걸어서 5분입니다."
        actions={(
          <div class="location-hero-actions">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" class="button button-primary">
              네이버 지도에서 보기
            </a>
            <address>{SITE.address}</address>
          </div>
        )}
      />

      <section class="editorial-section visit-section" aria-labelledby="visit-title">
        <div class="editorial-container contact-ledger">
          <div class="contact-address reveal">
            <p class="section-kicker">방문 안내</p>
            <h2 id="visit-title" class="section-title">방문 전<br />확인해 주세요</h2>
            <p>수업 중에는 통화가 어려울 수 있어 예약 또는 문자 상담을 권해드립니다.</p>
            <div class="contact-actions">
              <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" class="text-link">
                원데이 클래스 예약
              </a>
            </div>
          </div>

          <div class="contact-detail-panel reveal">
            <dl class="contact-detail-list">
              <div>
                <dt>전화</dt>
                <dd><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
              </div>
              <div>
                <dt>평일</dt>
                <dd>{SITE.hours.weekday}</dd>
              </div>
              <div>
                <dt>토요일</dt>
                <dd>{SITE.hours.saturday}</dd>
              </div>
              <div>
                <dt>일요일</dt>
                <dd>{SITE.hours.sunday}</dd>
              </div>
            </dl>
            <p class="contact-hours-note">{SITE.hoursNote}</p>
          </div>
        </div>
      </section>

      <section class="editorial-section transport-section" aria-labelledby="transport-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">교통편</p>
              <h2 id="transport-title" class="section-title">학원까지 오는 방법</h2>
            </div>
            <p>처음 방문할 때는 네이버 지도에서 건물 위치와 출입구를 함께 확인해 주세요.</p>
          </div>
          <ol class="transport-list reveal">
            {transport.map(([label, description], index) => (
              <li>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{label}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section class="editorial-section arrival-section" aria-labelledby="arrival-title">
        <div class="editorial-container arrival-guide">
          <figure class="arrival-media reveal">
            <img
              src="/static/images/academy/brand-wall-01.webp"
              alt="리틀브라스 로고와 금관악기 전시가 보이는 학원 정면"
              width="1155"
              height="1362"
              loading="lazy"
              decoding="async"
            />
            <figcaption>리엔프라자 5층 리틀브라스 정면</figcaption>
          </figure>
          <div class="arrival-copy reveal">
            <p class="section-kicker">도착 안내</p>
            <h2 id="arrival-title" class="section-title">5층 501호에서<br />만나요</h2>
            <p>엘리베이터에서 내린 뒤 리틀브라스 로고와 곡선형 악기 전시창을 찾아오시면 됩니다.</p>
            <a href={`tel:${SITE.phone}`} class="text-link">도착 문의 {SITE.phone}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
