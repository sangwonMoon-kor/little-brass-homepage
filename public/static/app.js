// 모바일 메뉴 토글
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuButton || !mobileMenu) return;

  // 기존 이벤트 리스너 제거 (중복 방지)
  const newButton = mobileMenuButton.cloneNode(true);
  mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);

  const button = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  button.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    menu.classList.toggle('hidden');
    const isOpen = !menu.classList.contains('hidden');
    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // 버튼 내부 아이콘 클릭도 처리
  const icon = button.querySelector('i');
  if (icon) {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      button.click();
    });
  }
}

// DOMContentLoaded 또는 이미 로드된 경우 즉시 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
  });
} else {
  initMobileMenu();
}

// 히어로 배경 영상 모바일 자동재생 강제 호출
function initHeroVideo() {
  var video = document.getElementById('hero-video');
  if (!video) return;

  // muted 속성 재확인 (iOS 필수)
  video.muted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  function tryPlay() {
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function() {
        // 자동재생 실패 시 조용히 무시 — 사용자 인터랙션 대기
      });
    }
  }

  // 1) 즉시 시도
  tryPlay();

  // 2) canplay 이벤트 시 재시도
  video.addEventListener('canplay', function() {
    tryPlay();
  }, { once: true });

  // 3) 사용자 첫 터치/스크롤 시 재시도 (iOS 최후 폴백)
  var fallbackEvents = ['touchstart', 'scroll', 'click'];
  function onUserInteraction() {
    tryPlay();
    fallbackEvents.forEach(function(evt) {
      document.removeEventListener(evt, onUserInteraction);
    });
  }
  fallbackEvents.forEach(function(evt) {
    document.addEventListener(evt, onUserInteraction, { once: true, passive: true });
  });
}

// 나머지 페이지 스크립트는 DOMContentLoaded 이후에 실행
document.addEventListener('DOMContentLoaded', function () {
  // 히어로 영상 자동재생
  initHeroVideo();

  // 스크롤 진행 바
  const scrollProgress = document.getElementById('scroll-progress');
  const mainNav = document.getElementById('main-nav');
  const topInfoBar = document.getElementById('top-info-bar');

  // 홈페이지일 때만 투명 nav로 복원
  if (mainNav && window.location.pathname === '/') {
    mainNav.classList.remove('nav-scrolled');
    if (topInfoBar) topInfoBar.style.display = '';
  }

  window.addEventListener('scroll', function () {
    // Scroll progress bar
    if (scrollProgress) {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    }

    // Nav scrolled state: toggle white bg after scrolling past hero (homepage only)
    if (mainNav && window.location.pathname === '/') {
      if (window.scrollY > window.innerHeight * 0.6) {
        mainNav.classList.add('nav-scrolled');
        if (topInfoBar) topInfoBar.style.display = 'none';
      } else {
        mainNav.classList.remove('nav-scrolled');
        if (topInfoBar) topInfoBar.style.display = '';
      }
    }
  });

  // 페이지 로드 시 fade-in 애니메이션
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 애니메이션 적용할 요소들
  document.querySelectorAll('section, .premium-card, .info-card').forEach(el => {
    observer.observe(el);
  });

  // 부드러운 스크롤 (anchor 클릭)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 카드 호버 효과 강화
  document.querySelectorAll('.premium-card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 커리큘럼 탭 전환
  const tabButtons = document.querySelectorAll('[data-tab]');
  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const tab = this.getAttribute('data-tab');
        tabButtons.forEach(b => { b.classList.remove('tab-active'); b.classList.add('tab-inactive'); });
        this.classList.remove('tab-inactive'); this.classList.add('tab-active');
        document.querySelectorAll('[id^="tab-content-"]').forEach(c => c.style.display = 'none');
        const target = document.getElementById('tab-content-' + tab);
        if (target) target.style.display = 'block';
      });
    });
  }
});
