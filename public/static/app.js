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

  // FAQ 검색 기능
  const faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    faqSearch.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const summary = item.querySelector('summary').textContent.toLowerCase();
        const content = item.querySelector('div').textContent.toLowerCase();
        const keywords = item.getAttribute('data-keywords') || '';
        
        if (summary.includes(searchTerm) || content.includes(searchTerm) || keywords.includes(searchTerm)) {
          item.style.display = 'block';
          if (searchTerm.length > 0) {
            item.setAttribute('open', '');
          }
        } else {
          item.style.display = 'none';
        }
      });
      
      // 카테고리 섹션 표시/숨김
      document.querySelectorAll('[data-faq-category]').forEach(section => {
        const visibleItems = section.querySelectorAll('.faq-item[style*="display: block"]');
        if (visibleItems.length === 0 && searchTerm.length > 0) {
          section.style.display = 'none';
        } else {
          section.style.display = 'block';
        }
      });
    });
  }

  // FAQ 카테고리 필터
  const faqCategoryButtons = document.querySelectorAll('.faq-category');
  if (faqCategoryButtons.length > 0) {
    faqCategoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // 버튼 스타일 업데이트
        faqCategoryButtons.forEach(btn => {
          btn.classList.remove('bg-gold-500', 'text-white', 'shadow-gold');
          btn.classList.add('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');
        });
        this.classList.remove('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');
        this.classList.add('bg-gold-500', 'text-white', 'shadow-gold');
        
        // 검색 초기화
        if (faqSearch) {
          faqSearch.value = '';
        }
        
        // 카테고리 필터링
        const sections = document.querySelectorAll('[data-faq-category]');
        if (category === 'all') {
          sections.forEach(section => {
            section.style.display = 'block';
            section.querySelectorAll('.faq-item').forEach(item => {
              item.style.display = 'block';
            });
          });
        } else {
          sections.forEach(section => {
            const sectionCategory = section.getAttribute('data-faq-category');
            if (sectionCategory === category) {
              section.style.display = 'block';
              section.querySelectorAll('.faq-item').forEach(item => {
                item.style.display = 'block';
              });
            } else {
              section.style.display = 'none';
            }
          });
        }
      });
    });
  }

  // 갤러리 필터 기능
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const photoGallery = document.getElementById('photo-gallery');
  
  if (galleryFilters.length > 0) {
    galleryFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // 버튼 스타일 업데이트
        galleryFilters.forEach(btn => {
          btn.classList.remove('bg-gold-500', 'text-white', 'shadow-gold');
          btn.classList.add('bg-gray-100', 'text-gray-700');
        });
        this.classList.remove('bg-gray-100', 'text-gray-700');
        this.classList.add('bg-gold-500', 'text-white', 'shadow-gold');
        
        // 영상 섹션 표시/숨김
        const videoSection = document.querySelector('section[data-category="video"]');
        if (videoSection) {
          if (category === 'all' || category === 'video') {
            videoSection.style.display = 'block';
          } else {
            videoSection.style.display = 'none';
          }
        }
        
        // 사진 갤러리 필터링
        if (category === 'all') {
          galleryItems.forEach(item => {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-out';
          });
          if (photoGallery) {
            photoGallery.parentElement.style.display = 'block';
          }
        } else if (category === 'video') {
          // 영상만 보기
          if (photoGallery) {
            photoGallery.parentElement.style.display = 'none';
          }
        } else {
          // 특정 카테고리만 표시
          if (photoGallery) {
            photoGallery.parentElement.style.display = 'block';
          }
          galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === category) {
              item.style.display = 'block';
              item.style.animation = 'fadeIn 0.5s ease-out';
            } else {
              item.style.display = 'none';
            }
          });
        }
      });
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

  // 네이버 블로그 RSS 로딩
  const blogContainer = document.getElementById('blog-posts-container');
  if (blogContainer) {
    loadBlogPosts();
  }

  async function loadBlogPosts() {
    try {
      const response = await fetch('/api/blog/rss');
      const data = await response.json();

      if (data.success && data.posts.length > 0) {
        blogContainer.innerHTML = '';
        
        data.posts.forEach((post, index) => {
          const bgColors = [
            'from-gold-400 to-gold-600',
            'from-navy-600 to-navy-800', 
            'from-amber-500 to-orange-600'
          ];
          const icons = ['fa-music', 'fa-trophy', 'fa-lightbulb'];
          
          const bgColor = bgColors[index % 3];
          const icon = icons[index % 3];
          
          const postCard = document.createElement('a');
          postCard.href = post.link;
          postCard.target = '_blank';
          postCard.rel = 'noopener noreferrer';
          postCard.className = 'group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2';
          
          postCard.innerHTML = `
            <div class="h-48 bg-gradient-to-br ${bgColor} flex items-center justify-center relative">
              ${post.isPinned ? '<div class="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><i class="fas fa-thumbtack"></i> 고정</div>' : ''}
              <i class="fas ${icon} text-white text-6xl opacity-50"></i>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <i class="fas fa-calendar-alt"></i>
                <span>${post.category}</span>
              </div>
              <h3 class="text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition line-clamp-2">
                ${escapeHtml(post.title)}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
                ${escapeHtml(post.description)}
              </p>
              <div class="flex items-center text-gold-600 font-medium group-hover:gap-3 transition-all">
                <span>자세히 보기</span>
                <i class="fas fa-arrow-right ml-2"></i>
              </div>
            </div>
          `;
          
          blogContainer.appendChild(postCard);
        });
      } else {
        blogContainer.innerHTML = `
          <div class="col-span-3 text-center py-12">
            <i class="fas fa-exclamation-circle text-gray-400 text-5xl mb-4"></i>
            <p class="text-gray-600">최신 소식을 불러올 수 없습니다.</p>
            <a href="https://blog.naver.com/little_brass" target="_blank" class="inline-block mt-4 text-gold-600 hover:text-gold-700 font-medium">
              블로그 직접 방문하기 <i class="fas fa-external-link-alt ml-1"></i>
            </a>
          </div>
        `;
      }
    } catch (error) {
      console.error('블로그 RSS 로딩 오류:', error);
      blogContainer.innerHTML = `
        <div class="col-span-3 text-center py-12">
          <i class="fas fa-exclamation-circle text-gray-400 text-5xl mb-4"></i>
          <p class="text-gray-600">최신 소식을 불러오는 중 오류가 발생했습니다.</p>
          <a href="https://blog.naver.com/little_brass" target="_blank" class="inline-block mt-4 text-gold-600 hover:text-gold-700 font-medium">
            블로그 직접 방문하기 <i class="fas fa-external-link-alt ml-1"></i>
          </a>
        </div>
      `;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});


  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);

  // 애니메이션 적용할 요소들
  const animatedElements = document.querySelectorAll('section, .premium-card, .info-card, .faq-item, .blog-card, .achievement-card, .review-card');
  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
