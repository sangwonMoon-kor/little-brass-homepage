import { PageIntro } from '../components/PageIntro'

const galleryImages = [
  { src: '/static/images/academy/lobby-01.webp', alt: '리틀브라스 대기 공간', caption: '수업 전후 머무는 대기 공간', width: 1600, height: 1067, className: 'gallery-figure gallery-figure-lead' },
  { src: '/static/images/academy/practice-room-01.webp', alt: '리틀브라스 개인 연습실', caption: '개인 연습실', width: 1385, height: 2048, className: 'gallery-figure gallery-figure-tall' },
  { src: '/static/images/academy/lesson-room-01.webp', alt: '리틀브라스 금관악기 레슨실', caption: '금관악기 레슨실', width: 1600, height: 1021, className: 'gallery-figure' },
  { src: '/static/images/academy/display-02.webp', alt: '리틀브라스 금관악기 진열', caption: '수업을 기다리는 악기들', width: 988, height: 1034, className: 'gallery-figure' },
  { src: '/static/images/academy/yellow-door-02.webp', alt: '리틀브라스 노란색 출입문', caption: '리틀브라스 입구', width: 1366, height: 2048, className: 'gallery-figure gallery-figure-tall' },
  { src: '/static/images/academy/corridor-01.webp', alt: '리틀브라스 학원 복도', caption: '레슨실로 이어지는 복도', width: 1432, height: 2048, className: 'gallery-figure' },
]

export function GalleryPage() {
  return (
    <div class="gallery-page">
      <PageIntro
        index="03"
        title="갤러리"
        description="사진으로 먼저 만나는 리틀브라스의 레슨실, 연습실과 악기들입니다."
        image="/static/images/academy/corridor-02.webp"
        imageAlt="리틀브라스 학원 복도와 안내판"
        imageWidth={1434}
        imageHeight={2048}
      />

      <section class="editorial-section" aria-labelledby="gallery-title">
        <div class="editorial-container">
          <div class="section-heading reveal">
            <div>
              <p class="section-kicker">실제 학원 공간</p>
              <h2 id="gallery-title" class="section-title">교육 공간</h2>
            </div>
            <p>모든 사진은 서울 강동구 상일동에 있는 리틀브라스에서 촬영했습니다.</p>
          </div>

          <div class="editorial-gallery reveal">
            {galleryImages.map((image) => (
              <figure class={image.className}>
                <div class="gallery-image">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section class="gallery-journal-line">
        <div class="editorial-container gallery-journal-inner reveal">
          <div>
            <p class="section-kicker">수업과 연주회</p>
            <h2>더 많은 기록은 블로그에 이어집니다.</h2>
          </div>
          <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer" class="text-link">
            네이버 블로그 보기
          </a>
        </div>
      </section>
    </div>
  )
}
