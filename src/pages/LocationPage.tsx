import { SITE } from '../config/site'

export function LocationPage() {
  return (
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="/static/images/academy/yellow-door-01.jpg" alt="Location" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Location</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">찾아오시는 길</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스 음악학원으로 오시는 길을 안내합니다</p>
        </div>
      </section>

      {/* 네이버지도 링크 */}
      <section style="padding: 0 1rem;">
        <a href="https://map.naver.com/p/entry/place/1094694626" target="_blank" rel="noopener noreferrer" class="map-link">
          <div class="map-link-surface">
            <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #B8941C;"></i>
            <p style="color: #333; font-size: 1rem; font-weight: 600; text-align: center; padding: 0 1rem;">서울특별시 강동구 상일로12길 99 리엔프라자 501호</p>
            <p style="color: #B8941C; font-size: 0.95rem; font-weight: 600; text-decoration: underline;">네이버 지도에서 보기 →</p>
          </div>
        </a>
      </section>

      {/* 학원 정보 섹션 */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 왼쪽: 연락처 정보 */}
            <div>
              <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; margin-bottom: 2rem;">연락처 정보</h2>
              <div style="display: flex; flex-direction: column; gap: 0;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-map-marker-alt" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">주소</p>
                    <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">서울특별시 강동구 상일로12길 99 리엔프라자 501호</p>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-phone-alt" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">전화</p>
                    <a href="tel:010-5819-4687" style="color: #555; font-size: 0.95rem; text-decoration: none;">010-5819-4687</a>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-envelope" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">이메일</p>
                    <a href="mailto:little_brass@naver.com" style="color: #555; font-size: 0.95rem; text-decoration: none;">little_brass@naver.com</a>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-clock" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">운영시간</p>
                    <p style="color: #555; font-size: 0.95rem; line-height: 2;">평일 14:00 - 21:00<br/>토요일 10:00 - 18:00<br/>일요일 휴무</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 액션 버튼 */}
            <div style="display: flex; flex-direction: column; gap: 20px; justify-content: center;">
              <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" class="contact-action contact-action-booking interactive-card">
                <i class="fas fa-ticket-alt" style="font-size: 1.75rem;"></i>
                <div>
                  <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">원데이 클래스 예약하기</p>
                  <p style="font-size: 0.85rem; opacity: 0.7;">네이버에서 간편하게 예약하세요</p>
                </div>
              </a>
              <a href={`tel:${SITE.phone}`} class="contact-action contact-action-phone interactive-card">
                <i class="fas fa-phone-alt" style="font-size: 1.75rem;"></i>
                <div>
                  <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">전화로 상담하기</p>
                  <p style="font-size: 0.85rem; opacity: 0.7;">{SITE.phone}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 교통편 안내 — 3열 카드 */}
      <section style="background: #f9f9f9; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Transportation</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a;">교통편 안내</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-subway" style="color: #B8941C; font-size: 1.5rem;"></i>
              </div>
              <h3 style="font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.5rem;">지하철</h3>
              <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">5호선 상일동역 3번 출구 도보 5분</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-bus" style="color: #B8941C; font-size: 1.5rem;"></i>
              </div>
              <h3 style="font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.5rem;">버스</h3>
              <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">강동구 방면 시내버스 이용</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-parking" style="color: #B8941C; font-size: 1.5rem;"></i>
              </div>
              <h3 style="font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.5rem;">주차</h3>
              <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">건물 내 주차장 이용 가능</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
