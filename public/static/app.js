// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 스크롤 진행 바
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', function() {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollProgress.style.width = scrolled + '%';
    });
  }

  // 페이지 로드 시 fade-in 애니메이션
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
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

  // 문의 폼 제출
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="loading"></span> 전송중...';
      
      const formData = {
        name: e.target.name.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        type: e.target.type.value,
        message: e.target.message.value
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        const messageDiv = document.getElementById('form-message');
        
        if (result.success) {
          messageDiv.className = 'mt-4 p-4 rounded-lg bg-green-50 text-green-800 border-2 border-green-300';
          messageDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + result.message;
          messageDiv.classList.remove('hidden');
          contactForm.reset();
        } else {
          messageDiv.className = 'mt-4 p-4 rounded-lg bg-red-50 text-red-800 border-2 border-red-300';
          messageDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>' + result.message;
          messageDiv.classList.remove('hidden');
        }

        // 메시지 자동 숨김
        setTimeout(() => {
          messageDiv.classList.add('hidden');
        }, 5000);
      } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('form-message');
        messageDiv.className = 'mt-4 p-4 rounded-lg bg-red-50 text-red-800 border-2 border-red-300';
        messageDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.';
        messageDiv.classList.remove('hidden');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

  // 스크롤 애니메이션 (부드러운 스크롤)
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
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});
