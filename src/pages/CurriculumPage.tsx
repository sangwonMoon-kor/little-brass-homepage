export function CurriculumPage() {
  return (
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="/static/images/academy/display-04.jpg" alt="Curriculum" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Curriculum</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">커리큘럼</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스의 체계적인 금관악기 교육 과정을 소개합니다</p>
        </div>
      </section>

      {/* 실기 과정 — 탭 UI */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Practical Course</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">실기 과정</h2>
          </div>

          {/* 악기 성향별 추천 */}
          <div style="background: #faf8f2; border: 1px solid #f0ebdd; border-radius: 16px; padding: 28px; margin-bottom: 2.5rem;">
            <h3 style="text-align: center; font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.4rem;">어떤 악기가 나에게 맞을까요?</h3>
            <p style="text-align: center; color: #666; font-size: 0.88rem; line-height: 1.6; margin-bottom: 1.5rem;">악기마다 음색과 성향이 다릅니다. 리틀브라스에서는 <strong style="color: #B8941C;">여러 악기를 직접 체험해 보고</strong> 자신에게 맞는 악기를 선택할 수 있습니다.</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">트럼펫</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">밝고 화려한 음색</p>
              </div>
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">호른</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">깊고 풍부한 음색</p>
              </div>
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">트롬본</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">활동적이고 다이나믹한 음색</p>
              </div>
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">유포늄</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">따뜻하고 부드러운 음색</p>
              </div>
            </div>
          </div>

          {/* 탭 버튼 */}
          <div style="display: flex; justify-content: center; gap: 0; border-bottom: 1px solid #eee; margin-bottom: 3rem;">
            <button data-tab="trumpet" class="tab-active" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">트럼펫</button>
            <button data-tab="horn" class="tab-inactive" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">호른</button>
            <button data-tab="trombone" class="tab-inactive" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">트롬본</button>
            <button data-tab="euphonium" class="tab-inactive" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">유포늄</button>
          </div>

          {/* 트럼펫 */}
          <div id="tab-content-trumpet" style="display: block;">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">악기와 친해지고 기본 연주 자세를 익히는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">악기와 친해지고 기본기 익히기</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 버징, 자세·호흡, 한 옥타브 음역</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 초등 저학년~성인 입문자</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">기초 주법을 다지고 간단한 곡을 연주하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 주법 습득과 간단한 멜로디 연주</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장조 스케일, 싱글 텅잉, 기초 에튀드 (클라크, 아르방)</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음을 안정적으로 낼 수 있는 분, 악보 기초를 배운 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">음역을 넓히고 다양한 주법을 구사하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음역 확장과 표현력 있는 연주 구현</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장·단조 스케일, 더블 텅잉, 에튀드 심화, 앙상블 참여</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 주법을 익힌 분, 앙상블·합주에 참여하고 싶은 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">전문 레퍼토리 연주 및 입시·콩쿨을 준비하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">연주 완성도와 개인 목표(입시/무대) 달성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">협주곡, 오케스트라 발췌, 콩쿨·군악대 입시 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 과정을 마친 분, 입시·전공·무대를 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>
          {/* 호른 */}
          <div id="tab-content-horn" style="display: none;">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">깊고 좁은 마우스피스에 적응하고 기본 음을 내는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 적응과 안정적인 기본 음 생성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 버징, 호흡과 지지, 저음역 음정 익히기</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 음악적 감수성이 풍부한 입문자</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">자연 배음과 기초 스케일을 익히는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">배음 컨트롤과 기초 음악 표현</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">자연 배음 연습, 기초 장조 스케일, 간단한 멜로디</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기본 음을 낼 수 있는 분, 클래식 음악에 관심 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">조옮김과 핸드 포지션을 익히며 표현력을 키우는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">조옮김 읽기와 핸드 포지션 기법 습득</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">F·B♭ 이중 호른 운용, 조옮김, 에튀드 심화, 앙상블</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 스케일을 마친 분, 오케스트라 파트를 경험하고 싶은 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">오케스트라 발췌곡과 솔로 레퍼토리를 완성하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">전문 오케스트라 파트 연주 및 독주 역량 강화</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">오케스트라 발췌 (모차르트, 브람스), 협주곡, 입시·콩쿨 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 수료 후 전문 연주·전공을 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>
          {/* 트롬본 */}
          <div id="tab-content-trombone" style="display: none;">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">슬라이드 7포지션을 익히고 안정적인 음을 내는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">슬라이드 포지션 암기와 기본 음 생성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">슬라이드 1~7 포지션, 호흡법, 기본 음역 (B♭2~B♭3)</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 저음역 악기에 관심 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">기초 주법과 스케일을 익혀 간단한 곡을 연주하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">레가토·스타카토 주법 습득과 조성 이해</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장조 스케일, 레가토·스타카토, 기초 에튀드</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">포지션에 익숙해진 분, 악보를 읽을 수 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">다양한 조성과 표현력을 키우며 앙상블에 참여하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음악적 표현과 앙상블 내 역할 수행</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장·단조 스케일, 에튀드 심화, 앙상블 파트 연습</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 주법을 마친 분, 합주·밴드 활동에 관심 있는 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">협주곡과 오케스트라 레퍼토리를 준비하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">전문 연주 완성도와 입시·무대 목표 달성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">협주곡 (그론달, 마르틴), 오케스트라 발췌, 입시·콩쿨 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 수료 후 전공·군악대·무대를 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>
          {/* 유포늄 */}
          <div id="tab-content-euphonium" style="display: none;">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">풍부한 저음역에 적응하고 기초 자세를 익히는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">큰 마우스피스 적응과 안정적인 기본 음 생성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 버징, 호흡·지지, 기본 음역 (B♭2~B♭3)</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 깊고 따뜻한 음색을 좋아하는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">스케일과 음색을 다듬으며 기초 에튀드를 연주하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음색 만들기와 기초 조성 연주</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장조 스케일, 기초 에튀드, 음색 컨트롤 연습</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기본 음을 안정적으로 내는 분, 악보를 배우고 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">음악적 표현력을 키우고 다양한 장르를 경험하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">다양한 장르 연주와 앙상블 참여</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장·단조 스케일, 에튀드 심화, 취주악·앙상블 파트</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 에튀드를 마친 분, 취주악단·앙상블에 관심 있는 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">솔로 레퍼토리와 콩쿨·입시를 준비하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">독주 완성도와 전문 연주 역량 강화</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">협주곡 (요크), 취주악 전문 레퍼토리, 콩쿨·군악대 입시 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 수료 후 전공·솔리스트·군악대를 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* 군악대·입시 전문 안내 */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5" style="margin-top: 3rem;">
            <div style="background: #1a1a1a; border-radius: 16px; padding: 32px; color: #fff;">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem;"><i class="fas fa-medal" style="color: #C9A227; font-size: 1.25rem;"></i><h3 style="font-weight: 700; font-size: 1.15rem; color: #fff; margin: 0;">군악대 오디션 준비</h3></div>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.88rem; line-height: 1.75; margin: 0;">악기별 군악대 실기시험곡 데이터를 보유하고 있어, 지원자에게 맞는 곡을 추천합니다. 현재 실력과 목표 시기에 따라 <strong style="color: #C9A227;">음역대를 조정한 맞춤 편곡</strong>까지 함께 진행하여, 행진곡·팡파레 스타일의 안정적인 사운드를 완성합니다.</p>
            </div>
            <div style="background: #1a1a1a; border-radius: 16px; padding: 32px; color: #fff;">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem;"><i class="fas fa-graduation-cap" style="color: #C9A227; font-size: 1.25rem;"></i><h3 style="font-weight: 700; font-size: 1.15rem; color: #fff; margin: 0;">예고·음대 입시 준비</h3></div>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.88rem; line-height: 1.75; margin: 0;">음악대학 입시는 <strong style="color: #C9A227;">실기 비중이 70~80% 이상</strong>(일부 학교는 100%)으로, 곡 하나의 완성보다 탄탄한 기본기와 안정적인 연주력이 핵심입니다. 기초 훈련과 입시 레슨을 병행하여 예술고등학교·음악대학 진학을 체계적으로 준비합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 이론 과정 — 지그재그 */}
      <section style="background: #f9f9f9; padding: 60px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="display: flex; gap: 0; min-height: 360px;" class="flex-col md:flex-row">
            <div style="flex: 1; min-height: 280px; border-radius: 12px 0 0 12px; overflow: hidden;" class="theory-image-block">
              <img src="/static/images/academy/piano-room-01.jpg" alt="뮤토랑 음악이론반" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px; background: #fff; border-radius: 0 12px 12px 0; border: 1px solid #eee; border-left: none;" class="theory-text-block">
              <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Theory Course</p>
              <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.4rem;">뮤토랑 음악이론반</h2>
              <p style="color: #666; font-size: 0.9rem; margin-bottom: 1.25rem; line-height: 1.6;">음악을 더 깊이 이해하는 시작</p>
              <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">대상</span>
                  <span style="color: #555; font-size: 0.875rem;">초등 고학년 ~ 중학생</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">수업 시간</span>
                  <span style="color: #555; font-size: 0.875rem;">주 1회 · 1회 50분</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">수강 옵션</span>
                  <span style="color: #555; font-size: 0.875rem;">정규반 (월 단위) · 단기 특강 가능</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">수업 방식</span>
                  <span style="color: #555; font-size: 0.875rem;">소그룹 (2~4인) · 1:1 개인 수업 선택 가능</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">특징</span>
                  <span style="color: #555; font-size: 0.875rem;">실기 병행 없이 이론만 수강 가능</span>
                </div>
              </div>
              <div style="border-top: 1px solid #f0f0f0; padding-top: 1.25rem;">
                <p style="font-size: 0.75rem; font-weight: 700; color: #B8941C; margin-bottom: 0.75rem; letter-spacing: 0.05em;">커리큘럼</p>
                <ul style="display: flex; flex-direction: column; gap: 0.45rem; list-style: none; padding: 0; margin: 0;">
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>악보 읽기 · 독보력 훈련 (음자리표, 박자, 박자표)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>리듬 훈련 (기초 리듬형 → 점음표 · 당김음)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>음정 · 음계 · 화성 기초 (장단음계, 3화음)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>시창 · 청음 입문 (계이름 읽기, 음정 구별)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>중급반: 조성 분석, 화성 진행, 악식론 기초</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 수업 안내 */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Lesson Info</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">수업 안내</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6" style="margin-bottom: 2.5rem;">
            {/* 개인 레슨 */}
            <div style="background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 32px; transition: all 0.3s;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"><i class="fas fa-user" style="color: #B8941C; font-size: 1.35rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 0.25rem;">개인 레슨</h3>
              <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 1rem;">1:1 맞춤 레슨</p>
              <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수업 시간</span><span style="color: #1a1a1a; font-weight: 500;">주 1회 · 40분</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수업 형태</span><span style="color: #1a1a1a; font-weight: 500;">1:1 개인 레슨</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수강료</span><span style="color: #1a1a1a; font-weight: 500;">문의</span></div>
              </div>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>전공자 출신 강사진 1:1 밀착 지도</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>개인 목표에 맞춘 진도 및 레퍼토리</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>추천 대상: 입문자 ~ 전공·입시 준비생</p>
            </div>
            {/* 원데이 클래스 */}
            <div style="background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 32px; transition: all 0.3s;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"><i class="fas fa-ticket-alt" style="color: #B8941C; font-size: 1.35rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 0.25rem;">원데이 클래스</h3>
              <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 1rem;">악기 첫 체험</p>
              <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수업 시간</span><span style="color: #1a1a1a; font-weight: 500;">30분</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수강료</span><span style="color: #1a1a1a; font-weight: 500;">20,000원</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">예약</span><span style="color: #1a1a1a; font-weight: 500;">카카오톡 · 전화</span></div>
              </div>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>트럼펫 · 호른 · 트롬본 · 유포늄 선택</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>악기 사전 지식 없이도 참여 가능</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>추천 대상: 입문 전 체험, 선물용</p>
            </div>
            {/* 악기 대여 */}
            <div style="background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 32px; transition: all 0.3s;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"><i class="fas fa-music" style="color: #B8941C; font-size: 1.35rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 0.25rem;">악기 대여</h3>
              <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 1rem;">수업 중 무료 제공</p>
              <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">대여료</span><span style="color: #1a1a1a; font-weight: 500;">수업 중 무료</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">보유 악기</span><span style="color: #1a1a1a; font-weight: 500;">4종 전 악기</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">문의</span><span style="color: #1a1a1a; font-weight: 500;">등록 시 안내</span></div>
              </div>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>트럼펫 · 호른 · 트롬본 · 유포늄 보유</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>악기 구매 전 충분히 체험 후 결정 가능</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>추천 대상: 악기 없이 바로 시작하고 싶은 분</p>
            </div>
          </div>
          <div style="text-align: center;">
            <a href="/location" style="display: inline-flex; align-items: center; gap: 0.75rem; background: #B8941C; color: #fff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;" onmouseover="this.style.background='#A0801A'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#B8941C'; this.style.transform='translateY(0)'">
              <i class="fas fa-phone-alt"></i> 상담 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
