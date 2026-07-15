export function PhilosophyPage() {
  return (
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="/static/images/academy/lobby-01.jpg" alt="Philosophy" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Philosophy</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">교육철학</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스가 추구하는 음악 교육의 가치</p>
        </div>
      </section>

      {/* 원장 소개 — 지그재그 */}
      <section style="background: #FFFFFF; padding: 80px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="zigzag-row">
            <div class="zigzag-image">
              <img src="/static/images/academy/corridor-01.jpg" alt="리틀브라스 학원" />
            </div>
            <div class="zigzag-text">
              <p class="sub-label" style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">About the Director</p>
              <h2 class="main-title" style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 2rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1.25rem;">골드쌤 원장</h2>
              <p class="desc" style="color: #555; font-size: 0.95rem; line-height: 1.9;">안녕하세요. 리틀브라스 음악학원 원장 골드쌤입니다.<br/><br/>금관악기의 아름다운 소리와 가능성을 더 많은 분들에게 전하고 싶어 리틀브라스를 열게 되었습니다. 아이들부터 성인까지, 처음 악기를 잡는 순간부터 무대에 서는 그날까지 함께하겠습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 — 이름의 의미 */}
      <section style="background: #1a1a1a; padding: 80px 0;">
        <div style="max-width: 760px; margin: 0 auto; padding: 0 1.5rem; text-align: center;">
          <p style="font-family: 'Dancing Script', cursive; color: #C9A227; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Our Name</p>
          <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #fff; margin-bottom: 1.75rem;">'리틀브라스'라는 이름</h2>
          <p style="color: rgba(255,255,255,0.85); font-size: 1rem; line-height: 2; margin-bottom: 1.5rem;">'브라스(Brass)'는 금속으로 만들어 나팔로 소리 내는 <strong style="color: #C9A227;">금관악기</strong>를 뜻합니다.<br/>오케스트라의 금관 파트는 트럼펫, 트롬본, 호른, 튜바, 유포늄으로 이루어집니다.</p>
          <p style="color: rgba(255,255,255,0.85); font-size: 1rem; line-height: 2; margin: 0;">자라나는 아이들이 금관악기를 더 가까이 만나기를 바라는 마음으로<br/>이름 앞에 <strong style="color: #C9A227;">'리틀(Little)'</strong>을 붙였습니다.<br/>리틀브라스는 '작은 금관악기 연주자'라는 의미를 담고 있습니다.</p>
        </div>
      </section>

      {/* 교육 철학 3가지 */}
      <section style="background: #f9f9f9; padding: 80px 0;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 1.5rem;">
          <div style="text-align: center; margin-bottom: 3rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Our Values</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">우리의 교육 철학</h2>
          </div>
          <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 2.5rem 0; border-bottom: 1px solid #e5e5e5;">
            <span style="font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 700; color: #B8941C; opacity: 0.15; line-height: 1; min-width: 80px;">01</span>
            <div><h3 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">기초에 충실한 교육</h3><p style="color: #555; font-size: 0.95rem; line-height: 1.8;">화려한 테크닉보다 탄탄한 기본기를 먼저 다집니다. 호흡, 앙부쉬르, 음색 — 기초가 단단해야 음악이 자유로워집니다.</p></div>
          </div>
          <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 2.5rem 0; border-bottom: 1px solid #e5e5e5;">
            <span style="font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 700; color: #B8941C; opacity: 0.15; line-height: 1; min-width: 80px;">02</span>
            <div><h3 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">학생 중심 맞춤 교육</h3><p style="color: #555; font-size: 0.95rem; line-height: 1.8;">같은 악기라도 학생마다 신체 조건, 성향, 목표가 다릅니다. 획일적인 커리큘럼이 아닌 개인별 맞춤 지도를 합니다.</p></div>
          </div>
          <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 2.5rem 0;">
            <span style="font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 700; color: #B8941C; opacity: 0.15; line-height: 1; min-width: 80px;">03</span>
            <div><h3 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">음악을 즐기는 경험</h3><p style="color: #555; font-size: 0.95rem; line-height: 1.8;">연습은 때로 힘들지만, 음악은 결국 즐거워야 합니다. 연주회, 앙상블, 다양한 장르 경험을 통해 음악의 즐거움을 느끼게 합니다.</p></div>
          </div>
        </div>
      </section>

      {/* 차별화 포인트 — 2x2 카드 */}
      <section style="background: #FFFFFF; padding: 80px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 3rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Why Little Brass</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">리틀브라스가 특별한 이유</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-music" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">금관악기 전문</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">피아노 학원이 아닙니다. 트럼펫, 호른, 트롬본, 유포늄 금관악기만 전문으로 교육합니다.</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-medal" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">군악대 입시 100% 합격</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">실전 중심 커리큘럼으로 군악대 입시 준비반을 운영하며, 높은 합격률을 자랑합니다.</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-video" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">온라인 레슨 가능</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">해외·지방 거주 학생도 Zoom을 통한 실시간 온라인 레슨으로 수업받을 수 있습니다.</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-theater-masks" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">연 2회 정기연주회 &amp; 마스터클래스</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">3개월 배운 학생부터 2년차까지 모두가 무대에 서는 정기연주회를 연 2회 개최하고, 유명 연주자를 초청한 마스터클래스·특강도 운영합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
