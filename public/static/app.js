// 모바일 메뉴 토글
function initMobileMenu() {
  console.log('[모바일 메뉴] 초기화 시작');
  
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  console.log('[모바일 메뉴] 버튼 요소:', mobileMenuButton);
  console.log('[모바일 메뉴] 메뉴 요소:', mobileMenu);
  
  if (!mobileMenuButton) {
    console.error('[모바일 메뉴] 버튼 요소를 찾을 수 없습니다! (id="mobile-menu-button")');
    return;
  }
  
  if (!mobileMenu) {
    console.error('[모바일 메뉴] 메뉴 요소를 찾을 수 없습니다! (id="mobile-menu")');
    return;
  }
  
  // 기존 이벤트 리스너 제거 (중복 방지)
  const newButton = mobileMenuButton.cloneNode(true);
  mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);
  
  const button = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  
  console.log('[모바일 메뉴] 이벤트 리스너 등록 시작');
  
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('[모바일 메뉴] 버튼 클릭 이벤트 발생');
    const isHidden = menu.classList.contains('hidden');
    console.log('[모바일 메뉴] 현재 상태 (hidden):', isHidden);
    console.log('[모바일 메뉴] 메뉴 요소 클래스:', menu.className);
    
    menu.classList.toggle('hidden');
    const newState = !menu.classList.contains('hidden');
    button.setAttribute('aria-expanded', newState ? 'true' : 'false');
    
    console.log('[모바일 메뉴] 토글 후 상태 (hidden):', menu.classList.contains('hidden'));
    console.log('[모바일 메뉴] 토글 후 메뉴 요소 클래스:', menu.className);
    console.log('[모바일 메뉴] aria-expanded:', button.getAttribute('aria-expanded'));
  });
  
  // 버튼 내부 아이콘 클릭도 처리
  const icon = button.querySelector('i');
  if (icon) {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('[모바일 메뉴] 아이콘 클릭 이벤트 발생');
      button.click();
    });
  }
  
  console.log('[모바일 메뉴] 이벤트 리스너 등록 완료');
}

// DOMContentLoaded 또는 이미 로드된 경우 즉시 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
  // DOM이 이미 로드된 경우
  initMobileMenu();
}

// 나머지 페이지 스크립트는 DOMContentLoaded 이후에 실행
document.addEventListener('DOMContentLoaded', function () {
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

      if (data.success && data.posts && data.posts.length > 0) {
        // 기존 내용 제거
        blogContainer.innerHTML = '';
        
        data.posts.forEach((post, index) => {
          // URL 검증
          const safeLink = isValidUrl(post.link) ? post.link : 'https://blog.naver.com/little_brass';
          
          const bgColors = [
            'from-gold-400 to-gold-600',
            'from-navy-600 to-navy-800', 
            'from-amber-500 to-orange-600'
          ];
          const icons = ['fa-music', 'fa-trophy', 'fa-lightbulb'];
          
          const bgColor = bgColors[index % 3];
          const icon = icons[index % 3];
          
          // DOM API를 사용하여 안전하게 요소 생성
          const postCard = document.createElement('a');
          postCard.href = safeLink;
          postCard.target = '_blank';
          postCard.rel = 'noopener noreferrer';
          postCard.className = 'group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2';
          
          // 헤더 영역
          const headerDiv = document.createElement('div');
          headerDiv.className = `h-48 bg-gradient-to-br ${bgColor} flex items-center justify-center relative`;
          
          // 고정 배지 (isPinned이 true일 때만)
          if (post.isPinned) {
            const pinnedBadge = document.createElement('div');
            pinnedBadge.className = 'absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1';
            const thumbtackIcon = document.createElement('i');
            thumbtackIcon.className = 'fas fa-thumbtack';
            const pinnedText = document.createTextNode(' 고정');
            pinnedBadge.appendChild(thumbtackIcon);
            pinnedBadge.appendChild(pinnedText);
            headerDiv.appendChild(pinnedBadge);
          }
          
          // 아이콘
          const iconElement = document.createElement('i');
          iconElement.className = `fas ${icon} text-white text-6xl opacity-50`;
          headerDiv.appendChild(iconElement);
          postCard.appendChild(headerDiv);
          
          // 본문 영역
          const contentDiv = document.createElement('div');
          contentDiv.className = 'p-6';
          
          // 카테고리
          const categoryDiv = document.createElement('div');
          categoryDiv.className = 'flex items-center gap-2 text-sm text-gray-500 mb-3';
          const calendarIcon = document.createElement('i');
          calendarIcon.className = 'fas fa-calendar-alt';
          categoryDiv.appendChild(calendarIcon);
          const categorySpan = document.createElement('span');
          categorySpan.textContent = escapeHtml(post.category || '일반');
          categoryDiv.appendChild(categorySpan);
          contentDiv.appendChild(categoryDiv);
          
          // 제목
          const titleH3 = document.createElement('h3');
          titleH3.className = 'text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition line-clamp-2';
          titleH3.textContent = escapeHtml(post.title || '제목 없음');
          contentDiv.appendChild(titleH3);
          
          // 설명
          const descP = document.createElement('p');
          descP.className = 'text-gray-600 mb-4 line-clamp-3';
          descP.textContent = escapeHtml(post.description || '');
          contentDiv.appendChild(descP);
          
          // 자세히 보기 링크
          const linkDiv = document.createElement('div');
          linkDiv.className = 'flex items-center text-gold-600 font-medium group-hover:gap-3 transition-all';
          const linkSpan = document.createTextNode('자세히 보기');
          linkDiv.appendChild(linkSpan);
          const arrowIcon = document.createElement('i');
          arrowIcon.className = 'fas fa-arrow-right ml-2';
          linkDiv.appendChild(arrowIcon);
          contentDiv.appendChild(linkDiv);
          
          postCard.appendChild(contentDiv);
          blogContainer.appendChild(postCard);
        });
      } else {
        // 에러 메시지도 DOM API로 생성
        const errorDiv = document.createElement('div');
        errorDiv.className = 'col-span-3 text-center py-12';
        
        const errorIcon = document.createElement('i');
        errorIcon.className = 'fas fa-exclamation-circle text-gray-400 text-5xl mb-4';
        errorDiv.appendChild(errorIcon);
        
        const errorP = document.createElement('p');
        errorP.className = 'text-gray-600';
        errorP.textContent = '최신 소식을 불러올 수 없습니다.';
        errorDiv.appendChild(errorP);
        
        const errorLink = document.createElement('a');
        errorLink.href = 'https://blog.naver.com/little_brass';
        errorLink.target = '_blank';
        errorLink.rel = 'noopener noreferrer';
        errorLink.className = 'inline-block mt-4 text-gold-600 hover:text-gold-700 font-medium';
        const linkText = document.createTextNode('블로그 직접 방문하기 ');
        errorLink.appendChild(linkText);
        const externalIcon = document.createElement('i');
        externalIcon.className = 'fas fa-external-link-alt ml-1';
        errorLink.appendChild(externalIcon);
        errorDiv.appendChild(errorLink);
        
        blogContainer.appendChild(errorDiv);
      }
    } catch (error) {
      console.error('블로그 RSS 로딩 오류:', error);
      
      // 에러 메시지도 DOM API로 생성
      const errorDiv = document.createElement('div');
      errorDiv.className = 'col-span-3 text-center py-12';
      
      const errorIcon = document.createElement('i');
      errorIcon.className = 'fas fa-exclamation-circle text-gray-400 text-5xl mb-4';
      errorDiv.appendChild(errorIcon);
      
      const errorP = document.createElement('p');
      errorP.className = 'text-gray-600';
      errorP.textContent = '최신 소식을 불러오는 중 오류가 발생했습니다.';
      errorDiv.appendChild(errorP);
      
      const errorLink = document.createElement('a');
      errorLink.href = 'https://blog.naver.com/little_brass';
      errorLink.target = '_blank';
      errorLink.rel = 'noopener noreferrer';
      errorLink.className = 'inline-block mt-4 text-gold-600 hover:text-gold-700 font-medium';
      const linkText = document.createTextNode('블로그 직접 방문하기 ');
      errorLink.appendChild(linkText);
      const externalIcon = document.createElement('i');
      externalIcon.className = 'fas fa-external-link-alt ml-1';
      errorLink.appendChild(externalIcon);
      errorDiv.appendChild(errorLink);
      
      blogContainer.appendChild(errorDiv);
    }
  }

  function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  }

  function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    try {
      const urlObj = new URL(url);
      // 허용된 도메인만 허용 (네이버 블로그)
      return urlObj.hostname === 'blog.naver.com' || urlObj.hostname === 'm.blog.naver.com';
    } catch {
      return false;
    }
  }

  // 공지사항 검색 기능
  const noticeSearch = document.getElementById('notice-search');
  if (noticeSearch) {
    noticeSearch.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const noticeItems = document.querySelectorAll('.notice-item');
      const noResults = document.getElementById('no-results');
      let visibleCount = 0;
      
      noticeItems.forEach(item => {
        const keywords = item.getAttribute('data-keywords') || '';
        
        if (keywords.toLowerCase().includes(searchTerm)) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (visibleCount === 0 && searchTerm.length > 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    });
  }

  // 공지사항 카테고리 필터
  const noticeFilters = document.querySelectorAll('.notice-filter');
  if (noticeFilters.length > 0) {
    noticeFilters.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // 버튼 스타일 업데이트
        noticeFilters.forEach(btn => {
          btn.classList.remove('bg-gold-500', 'text-white', 'shadow-md');
          btn.classList.add('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');
        });
        this.classList.remove('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');
        this.classList.add('bg-gold-500', 'text-white', 'shadow-md');
        
        // 검색 초기화
        if (noticeSearch) {
          noticeSearch.value = '';
        }
        
        // 카테고리 필터링
        const noticeItems = document.querySelectorAll('.notice-item');
        const noResults = document.getElementById('no-results');
        let visibleCount = 0;

        if (category === 'all') {
          noticeItems.forEach(item => {
            item.style.display = 'block';
            visibleCount++;
          });
        } else {
          noticeItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === category) {
              item.style.display = 'block';
              visibleCount++;
            } else {
              item.style.display = 'none';
            }
          });
        }

        if (visibleCount === 0) {
          noResults.classList.remove('hidden');
        } else {
          noResults.classList.add('hidden');
        }
      });
    });
  }

  // 이미지 갤러리 라이트박스
  const galleryImages = document.querySelectorAll('.gallery-item');
  if (galleryImages.length > 0) {
    // 라이트박스 HTML 생성
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'fixed inset-0 bg-black/95 z-[100] hidden items-center justify-center p-4';
    lightbox.innerHTML = `
      <button id="lightbox-close" class="absolute top-6 right-6 text-white hover:text-gold-400 transition z-10">
        <i class="fas fa-times text-3xl"></i>
      </button>
      <button id="lightbox-prev" class="absolute left-6 text-white hover:text-gold-400 transition z-10">
        <i class="fas fa-chevron-left text-4xl"></i>
      </button>
      <button id="lightbox-next" class="absolute right-6 text-white hover:text-gold-400 transition z-10">
        <i class="fas fa-chevron-right text-4xl"></i>
      </button>
      <div class="max-w-6xl w-full">
        <img id="lightbox-image" src="" alt="" class="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl">
        <div id="lightbox-caption" class="text-white text-center mt-4 text-lg"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    const visibleImages = [];

    function updateVisibleImages() {
      visibleImages.length = 0;
      galleryImages.forEach((item, index) => {
        if (item.style.display !== 'none') {
          visibleImages.push({ element: item, originalIndex: index });
        }
      });
    }

    function showImage(index) {
      if (visibleImages.length === 0) return;
      
      currentImageIndex = index;
      if (currentImageIndex < 0) currentImageIndex = visibleImages.length - 1;
      if (currentImageIndex >= visibleImages.length) currentImageIndex = 0;

      const imageData = visibleImages[currentImageIndex].element;
      const imgElement = imageData.querySelector('img');
      const caption = imageData.querySelector('h3').textContent;

      document.getElementById('lightbox-image').src = imgElement.src;
      document.getElementById('lightbox-caption').textContent = caption;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }

    // 이미지 클릭 이벤트
    galleryImages.forEach((item, index) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function() {
        updateVisibleImages();
        const visibleIndex = visibleImages.findIndex(img => img.originalIndex === index);
        if (visibleIndex !== -1) {
          showImage(visibleIndex);
        }
      });
    });

    // 닫기 버튼
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

    // 이전/다음 버튼
    document.getElementById('lightbox-prev').addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(currentImageIndex - 1);
    });

    document.getElementById('lightbox-next').addEventListener('click', function(e) {
      e.stopPropagation();
      showImage(currentImageIndex + 1);
    });

    // 배경 클릭 시 닫기
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // 키보드 단축키
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
      }
    });
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
