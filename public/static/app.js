// 모바일 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 문의 폼 제출
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
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
          messageDiv.className = 'mt-4 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300';
          messageDiv.textContent = result.message;
          messageDiv.classList.remove('hidden');
          contactForm.reset();
        } else {
          messageDiv.className = 'mt-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300';
          messageDiv.textContent = result.message;
          messageDiv.classList.remove('hidden');
        }

        // 3초 후 메시지 숨기기
        setTimeout(() => {
          messageDiv.classList.add('hidden');
        }, 5000);
      } catch (error) {
        console.error('Error:', error);
        const messageDiv = document.getElementById('form-message');
        messageDiv.className = 'mt-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300';
        messageDiv.textContent = '문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.';
        messageDiv.classList.remove('hidden');
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
          behavior: 'smooth'
        });
      }
    });
  });
});
