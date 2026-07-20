import { InstagramProfileLink } from '../components/InstagramProfileLink'
import { PageIntro } from '../components/PageIntro'

type GalleryImage = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  className: string
}

const spaceImages = [
  {
    src: '/static/images/academy/brand-wall-01.webp',
    alt: '리틀브라스 로고와 금관악기 전시가 보이는 학원 공간',
    caption: 'Brand Wall · 리틀브라스의 첫인상',
    width: 1155,
    height: 1362,
    className: 'gallery-figure gallery-figure-lead gallery-figure-front',
  },
  {
    src: '/static/images/academy/lobby-01.webp',
    alt: '리틀브라스 학원 로비와 대기 공간',
    caption: 'Lobby · 대기 공간',
    width: 1600,
    height: 1067,
    className: 'gallery-figure',
  },
  {
    src: '/static/images/academy/lesson-room-01.webp',
    alt: '금관악기 수업을 진행하는 리틀브라스 합주실',
    caption: 'Ensemble Room · 합주실',
    width: 1600,
    height: 1021,
    className: 'gallery-figure',
  },
  {
    src: '/static/images/academy/practice-room-01.webp',
    alt: '방음 설비를 갖춘 리틀브라스 개인 연습실',
    caption: 'Practice Room · 개인 연습실',
    width: 1385,
    height: 2048,
    className: 'gallery-figure gallery-figure-tall',
  },
  {
    src: '/static/images/academy/corridor-01.webp',
    alt: '리틀브라스 레슨실로 이어지는 복도',
    caption: 'Hallway · 레슨실 복도',
    width: 1432,
    height: 2048,
    className: 'gallery-figure gallery-figure-tall',
  },
] satisfies readonly GalleryImage[]

const lessonStageImages = [
  {
    src: '/static/images/academy/ensemble-lesson-02.webp',
    alt: '함께 금관악기를 연주하는 리틀브라스 학생들',
    caption: 'Ensemble Lesson · 합주 수업',
    width: 2400,
    height: 1800,
    className: 'gallery-figure gallery-figure-lead',
  },
  {
    src: '/static/images/academy/academy-concert-group-01.webp',
    alt: '리틀브라스 정기 연주회 단체 사진',
    caption: 'Academy Concert · 정기 연주회',
    width: 2400,
    height: 1351,
    className: 'gallery-figure',
  },
  {
    src: '/static/images/academy/recital-solo-performance-01.webp',
    alt: '무대에서 독주하는 리틀브라스 연주자',
    caption: 'Solo Recital · 독주 무대',
    width: 1800,
    height: 2400,
    className: 'gallery-figure gallery-figure-tall',
  },
  {
    src: '/static/images/academy/student-performance-01.webp',
    alt: '무대에서 금관악기를 연주하는 리틀브라스 학생',
    caption: 'Student Stage · 학생 연주',
    width: 1800,
    height: 2400,
    className: 'gallery-figure gallery-figure-tall',
  },
  {
    src: '/static/images/academy/award-ceremony-01.webp',
    alt: '연주회에서 상장을 받은 리틀브라스 학생',
    caption: 'Award · 연습이 기록으로 남는 순간',
    width: 1800,
    height: 2400,
    className: 'gallery-figure',
  },
  {
    src: '/static/images/academy/faculty-recital-stage-01.webp',
    alt: '리틀브라스 강사진의 연주회 무대',
    caption: 'Faculty Recital · 강사진 연주회',
    width: 2048,
    height: 1365,
    className: 'gallery-figure',
  },
] satisfies readonly GalleryImage[]

function GalleryGrid({
  images,
  className = '',
}: {
  images: readonly GalleryImage[]
  className?: string
}) {
  const gridClassName = className
    ? `editorial-gallery ${className} reveal`
    : 'editorial-gallery reveal'

  return (
    <div class={gridClassName}>
      {images.map((image, index) => (
        <figure class={image.className}>
          <div class="gallery-image">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          </div>
          <figcaption>{image.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export function GalleryPage() {
  return (
    <div class="gallery-page">
      <PageIntro
        index="03"
        variant="gallery"
        title="갤러리"
        description="교육 공간에서 시작한 소리가 합주와 연주회 무대로 이어지는 순간들을 모았습니다."
      />

      <section
        class="editorial-section gallery-content gallery-section gallery-section-space"
        aria-labelledby="gallery-space-title"
      >
        <div class="editorial-container">
          <div class="section-heading gallery-heading reveal">
            <div>
              <p class="section-kicker">OUR SPACE</p>
              <h2 id="gallery-space-title" class="section-title">학원 공간</h2>
            </div>
            <p>수업과 개인 연습에 집중하고, 수업 전후 편안히 머물 수 있도록 준비한 공간입니다.</p>
          </div>
          <GalleryGrid images={spaceImages} className="gallery-space-grid" />
        </div>
      </section>

      <section
        class="editorial-section gallery-section gallery-section-stage"
        aria-labelledby="gallery-stage-title"
      >
        <div class="editorial-container">
          <div class="section-heading gallery-heading reveal">
            <div>
              <p class="section-kicker">LESSON &amp; STAGE</p>
              <h2 id="gallery-stage-title" class="section-title">수업과 무대</h2>
            </div>
            <p>합주 수업, 학생 연주와 정기 연주회까지 리틀브라스가 함께한 실제 기록입니다.</p>
          </div>
          <GalleryGrid images={lessonStageImages} />
        </div>
      </section>

      <section class="gallery-journal-line">
        <div class="editorial-container gallery-journal-inner reveal">
          <div>
            <p class="section-kicker">수업과 연주회</p>
            <h2>더 많은 기록은 블로그와 인스타그램에 이어집니다.</h2>
          </div>
          <div class="gallery-journal-actions">
            <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer" class="text-link">
              네이버 블로그 보기
            </a>
            <InstagramProfileLink className="instagram-profile-link" />
          </div>
        </div>
      </section>
    </div>
  )
}
