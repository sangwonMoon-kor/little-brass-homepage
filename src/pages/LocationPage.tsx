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
        title="찾아오시는 길"
        description="상일동역에서 걸어서 5분. 방문 전 예약 또는 전화 상담을 권해드립니다."
        image="/static/images/academy/yellow-door-01.webp"
        imageAlt="리틀브라스 음악학원 노란색 출입문"
        imageWidth={1416}
        imageHeight={2048}
      />

      <section class="editorial-section" aria-labelledby="visit-title">
        <div class="editorial-container contact-ledger">
          <div class="contact-address reveal">
            <p class="section-kicker">방문 안내</p>
            <h2 id="visit-title" class="section-title">서울 강동구<br />상일동</h2>
            <p>{SITE.address}</p>
            <div class="contact-actions">
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" class="button button-primary">
                네이버 지도에서 보기
              </a>
              <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" class="text-link">
                원데이 클래스 예약
              </a>
            </div>
          </div>

          <dl class="contact-detail-list reveal">
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
              <dd>14:00–21:00</dd>
            </div>
            <div>
              <dt>토요일</dt>
              <dd>10:00–18:00</dd>
            </div>
            <div>
              <dt>일요일</dt>
              <dd>휴무</dd>
            </div>
          </dl>
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
    </div>
  )
}
