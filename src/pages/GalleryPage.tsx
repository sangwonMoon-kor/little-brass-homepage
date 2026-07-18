import { PageIntro } from '../components/PageIntro'

const galleryImages = [
  { src: '/static/images/academy/academy-concert-group-01.webp', alt: '리틀브라스 정기 연주회 단체 사진', caption: '함께 만든 정기 연주회', width: 2400, height: 1351, className: 'gallery-figure gallery-figure-lead' },
  { src: '/static/images/academy/recital-solo-performance-01.webp', alt: '무대에서 독주하는 리틀브라스 연주자', caption: '무대에서 완성하는 한 곡', width: 1800, height: 2400, className: 'gallery-figure gallery-figure-tall' },
  { src: '/static/images/academy/faculty-recital-stage-01.webp', alt: '리틀브라스 강사진의 연주회 무대', caption: '강사진 연주회', width: 2048, height: 1365, className: 'gallery-figure' },
  { src: '/static/images/academy/ensemble-lesson-02.webp', alt: '함께 금관악기를 연주하는 리틀브라스 학생들', caption: '서로의 소리를 듣는 합주 수업', width: 2400, height: 1800, className: 'gallery-figure' },
  { src: '/static/images/academy/award-ceremony-01.webp', alt: '연주회에서 상장을 받은 리틀브라스 학생', caption: '연습이 기록으로 남는 순간', width: 1800, height: 2400, className: 'gallery-figure gallery-figure-tall' },
  { src: '/static/images/academy/awards-display-01.webp', alt: '리틀브라스 연주 활동의 트로피', caption: '차곡차곡 쌓이는 무대의 기록', width: 1081, height: 1440, className: 'gallery-figure' },
]

export function GalleryPage() {
  return (
    <div class="gallery-page">
      <PageIntro
        index="03"
        variant="gallery"
        title="갤러리"
        description="교육 공간에서 시작한 소리가 합주와 연주회 무대로 이어지는 순간들을 모았습니다."
      />

      <section class="editorial-section gallery-content" aria-labelledby="gallery-title">
        <div class="editorial-container">
          <div class="section-heading gallery-heading reveal">
            <div>
              <p class="section-kicker">LESSON &amp; STAGE</p>
              <h2 id="gallery-title" class="section-title">수업과 연주회의 기록</h2>
            </div>
            <p>합주 수업, 학생 연주와 정기 연주회까지 리틀브라스가 함께한 실제 기록입니다.</p>
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
