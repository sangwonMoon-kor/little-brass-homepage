import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

// 메인 페이지
app.get('/', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="relative bg-gradient-to-r from-amber-700 to-amber-900 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-5xl font-bold mb-6">음악이 흐르는 공간, Little Brass</h1>
          <p class="text-xl mb-8">전문 강사진과 함께하는 프리미엄 음악 교육</p>
          <div class="flex justify-center space-x-4">
            <a href="/curriculum" class="bg-white text-amber-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              커리큘럼 보기
            </a>
            <a href="/contact" class="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-amber-700 transition">
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">왜 Little Brass일까요?</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="text-amber-700 text-5xl mb-4">
                <i class="fas fa-award"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">전문 강사진</h3>
              <p class="text-gray-600">음악 전공 및 풍부한 교육 경험을 갖춘 최고의 강사진</p>
            </div>
            <div class="text-center p-6">
              <div class="text-amber-700 text-5xl mb-4">
                <i class="fas fa-users"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">맞춤형 교육</h3>
              <p class="text-gray-600">학생 개개인의 수준과 목표에 맞춘 1:1 레슨</p>
            </div>
            <div class="text-center p-6">
              <div class="text-amber-700 text-5xl mb-4">
                <i class="fas fa-video"></i>
              </div>
              <h3 class="text-xl font-bold mb-3">온라인 레슨</h3>
              <p class="text-gray-600">Zoom을 통한 언제 어디서나 가능한 온라인 음악 레슨</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">제공 악기</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
              <i class="fas fa-music text-amber-700 text-4xl mb-3"></i>
              <h3 class="font-bold">피아노</h3>
            </div>
            <div class="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
              <i class="fas fa-music text-amber-700 text-4xl mb-3"></i>
              <h3 class="font-bold">바이올린</h3>
            </div>
            <div class="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
              <i class="fas fa-music text-amber-700 text-4xl mb-3"></i>
              <h3 class="font-bold">플루트</h3>
            </div>
            <div class="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
              <i class="fas fa-music text-amber-700 text-4xl mb-3"></i>
              <h3 class="font-bold">첼로</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-16 bg-amber-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold mb-4">지금 바로 시작하세요!</h2>
          <p class="text-xl mb-8">무료 체험 레슨을 신청하고 음악의 즐거움을 경험해보세요</p>
          <a href="/contact" class="bg-white text-amber-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition inline-block">
            무료 체험 신청하기
          </a>
        </div>
      </section>
    </div>,
    { title: 'Little Brass - 음악이 흐르는 공간' }
  )
})

// 학원 소개 페이지
app.get('/about', (c) => {
  return c.render(
    <div>
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">학원 소개</h1>
          
          <div class="prose prose-lg max-w-none">
            <div class="mb-12">
              <h2 class="text-2xl font-bold text-amber-700 mb-4">Little Brass를 소개합니다</h2>
              <p class="text-gray-700 leading-relaxed mb-4">
                Little Brass는 음악을 사랑하는 모든 이들을 위한 프리미엄 음악 교육 공간입니다. 
                2020년 설립 이래, 우리는 학생 개개인의 음악적 재능을 발견하고 발전시키는 데 헌신해왔습니다.
              </p>
              <p class="text-gray-700 leading-relaxed">
                전문적인 강사진과 체계적인 커리큘럼, 그리고 최신 시설을 갖춘 Little Brass에서 
                음악의 진정한 즐거움을 경험하실 수 있습니다.
              </p>
            </div>

            <div class="mb-12">
              <h2 class="text-2xl font-bold text-amber-700 mb-4">교육 철학</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-amber-50 p-6 rounded-lg">
                  <h3 class="font-bold text-lg mb-2">개인 맞춤형 교육</h3>
                  <p class="text-gray-700">학생 개개인의 수준과 목표에 맞춘 1:1 맞춤 레슨</p>
                </div>
                <div class="bg-amber-50 p-6 rounded-lg">
                  <h3 class="font-bold text-lg mb-2">체계적인 커리큘럼</h3>
                  <p class="text-gray-700">단계별로 설계된 과학적인 교육 프로그램</p>
                </div>
                <div class="bg-amber-50 p-6 rounded-lg">
                  <h3 class="font-bold text-lg mb-2">전문 강사진</h3>
                  <p class="text-gray-700">음악 전공 및 풍부한 교육 경험을 갖춘 강사진</p>
                </div>
                <div class="bg-amber-50 p-6 rounded-lg">
                  <h3 class="font-bold text-lg mb-2">최신 시설</h3>
                  <p class="text-gray-700">쾌적하고 현대적인 연습실 및 교육 환경</p>
                </div>
              </div>
            </div>

            <div class="mb-12">
              <h2 class="text-2xl font-bold text-amber-700 mb-4">차별화 포인트</h2>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-amber-700 mt-1 mr-3"></i>
                  <span class="text-gray-700">음악대학 출신 전문 강사진의 체계적인 지도</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-amber-700 mt-1 mr-3"></i>
                  <span class="text-gray-700">학생 수준에 맞춘 개인별 맞춤 커리큘럼</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-amber-700 mt-1 mr-3"></i>
                  <span class="text-gray-700">온라인 레슨 병행으로 시간과 장소의 제약 없음</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-amber-700 mt-1 mr-3"></i>
                  <span class="text-gray-700">정기 발표회 및 연주회를 통한 실전 경험 제공</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle text-amber-700 mt-1 mr-3"></i>
                  <span class="text-gray-700">소수 정예 수업으로 밀착 케어</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '학원 소개 - Little Brass' }
  )
})

// 강사 소개 페이지
app.get('/teachers', (c) => {
  return c.render(
    <div>
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-center text-gray-800 mb-4">강사 소개</h1>
          <p class="text-center text-gray-600 mb-12">음악 전공 및 풍부한 교육 경험을 갖춘 전문 강사진을 소개합니다</p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 강사 1 */}
            <div class="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div class="bg-amber-100 h-48 flex items-center justify-center">
                <i class="fas fa-user-circle text-amber-700 text-8xl"></i>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">김지현 강사</h3>
                <p class="text-amber-700 font-semibold mb-4">피아노 전공</p>
                <div class="text-sm text-gray-600 space-y-2 mb-4">
                  <p><i class="fas fa-graduation-cap mr-2"></i>서울대학교 음악대학 피아노과 졸업</p>
                  <p><i class="fas fa-trophy mr-2"></i>국제 피아노 콩쿨 입상</p>
                  <p><i class="fas fa-briefcase mr-2"></i>15년 이상 교육 경력</p>
                </div>
                <p class="text-gray-700 text-sm italic">"학생 한 분 한 분의 음악적 잠재력을 발견하고 키워드리는 것이 저의 기쁨입니다."</p>
              </div>
            </div>

            {/* 강사 2 */}
            <div class="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div class="bg-amber-100 h-48 flex items-center justify-center">
                <i class="fas fa-user-circle text-amber-700 text-8xl"></i>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">박민수 강사</h3>
                <p class="text-amber-700 font-semibold mb-4">바이올린 전공</p>
                <div class="text-sm text-gray-600 space-y-2 mb-4">
                  <p><i class="fas fa-graduation-cap mr-2"></i>한국예술종합학교 바이올린 전공</p>
                  <p><i class="fas fa-trophy mr-2"></i>전국 바이올린 콩쿨 대상</p>
                  <p><i class="fas fa-briefcase mr-2"></i>10년 이상 교육 경력</p>
                </div>
                <p class="text-gray-700 text-sm italic">"음악은 기술이 아닌 마음으로 전달됩니다. 함께 음악의 감동을 나누고 싶습니다."</p>
              </div>
            </div>

            {/* 강사 3 */}
            <div class="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div class="bg-amber-100 h-48 flex items-center justify-center">
                <i class="fas fa-user-circle text-amber-700 text-8xl"></i>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">이수정 강사</h3>
                <p class="text-amber-700 font-semibold mb-4">플루트 전공</p>
                <div class="text-sm text-gray-600 space-y-2 mb-4">
                  <p><i class="fas fa-graduation-cap mr-2"></i>이화여자대학교 음악대학 플루트과 졸업</p>
                  <p><i class="fas fa-trophy mr-2"></i>아시아 플루트 페스티벌 금상</p>
                  <p><i class="fas fa-briefcase mr-2"></i>8년 교육 경력</p>
                </div>
                <p class="text-gray-700 text-sm italic">"플루트의 아름다운 선율을 통해 음악의 즐거움을 함께 나누겠습니다."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '강사 소개 - Little Brass' }
  )
})

// 커리큘럼 페이지
app.get('/curriculum', (c) => {
  return c.render(
    <div>
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-center text-gray-800 mb-4">커리큘럼</h1>
          <p class="text-center text-gray-600 mb-12">체계적이고 단계적인 교육 프로그램</p>
          
          {/* 피아노 커리큘럼 */}
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-amber-700 mb-6 flex items-center">
              <i class="fas fa-music mr-3"></i>피아노 과정
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-700">
                <h3 class="font-bold text-lg mb-2">입문 과정</h3>
                <p class="text-sm text-gray-600 mb-3">악보 읽기, 기본 자세, 손가락 운지법</p>
                <p class="text-xs text-gray-500">4주 과정</p>
              </div>
              <div class="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-600">
                <h3 class="font-bold text-lg mb-2">초급 과정</h3>
                <p class="text-sm text-gray-600 mb-3">스케일, 아르페지오, 간단한 곡 연주</p>
                <p class="text-xs text-gray-500">12주 과정</p>
              </div>
              <div class="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                <h3 class="font-bold text-lg mb-2">중급 과정</h3>
                <p class="text-sm text-gray-600 mb-3">다양한 장르, 리듬 패턴, 표현력 향상</p>
                <p class="text-xs text-gray-500">24주 과정</p>
              </div>
              <div class="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400">
                <h3 class="font-bold text-lg mb-2">고급 과정</h3>
                <p class="text-sm text-gray-600 mb-3">클래식 명곡, 콩쿨 준비, 입시 대비</p>
                <p class="text-xs text-gray-500">48주 이상</p>
              </div>
            </div>
          </div>

          {/* 바이올린 커리큘럼 */}
          <div class="mb-12">
            <h2 class="text-2xl font-bold text-amber-700 mb-6 flex items-center">
              <i class="fas fa-music mr-3"></i>바이올린 과정
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-700">
                <h3 class="font-bold text-lg mb-2">입문 과정</h3>
                <p class="text-sm text-gray-600 mb-3">악기 다루기, 활 사용법, 기본 음계</p>
                <p class="text-xs text-gray-500">4주 과정</p>
              </div>
              <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 class="font-bold text-lg mb-2">초급 과정</h3>
                <p class="text-sm text-gray-600 mb-3">1st 포지션, 간단한 멜로디 연주</p>
                <p class="text-xs text-gray-500">12주 과정</p>
              </div>
              <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 class="font-bold text-lg mb-2">중급 과정</h3>
                <p class="text-sm text-gray-600 mb-3">3rd 포지션, 비브라토, 다양한 곡</p>
                <p class="text-xs text-gray-500">24주 과정</p>
              </div>
              <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                <h3 class="font-bold text-lg mb-2">고급 과정</h3>
                <p class="text-sm text-gray-600 mb-3">협주곡, 실내악, 오케스트라 참여</p>
                <p class="text-xs text-gray-500">48주 이상</p>
              </div>
            </div>
          </div>

          {/* 수업 정보 */}
          <div class="bg-gray-50 p-8 rounded-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">수업 안내</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-user text-amber-700 mr-2"></i>개인 레슨
                </h3>
                <ul class="space-y-2 text-gray-700">
                  <li>• 주 1회 (40분/회)</li>
                  <li>• 1:1 맞춤 레슨</li>
                  <li>• 월 20만원~</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-users text-amber-700 mr-2"></i>그룹 레슨
                </h3>
                <ul class="space-y-2 text-gray-700">
                  <li>• 주 1회 (60분/회)</li>
                  <li>• 2~4명 소그룹</li>
                  <li>• 월 15만원~</li>
                </ul>
              </div>
            </div>
            <div class="mt-6 p-4 bg-amber-50 rounded border-l-4 border-amber-700">
              <p class="text-sm text-gray-700">
                <i class="fas fa-info-circle text-amber-700 mr-2"></i>
                <strong>참고:</strong> 수강료는 악기 및 레벨에 따라 상이할 수 있습니다. 자세한 상담은 문의 페이지를 이용해주세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '커리큘럼 - Little Brass' }
  )
})

// 온라인 과정 페이지
app.get('/online', (c) => {
  return c.render(
    <div>
      <section class="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">온라인 레슨</h1>
            <p class="text-xl text-gray-600">어디서든 배우는 음악, Zoom으로 만나는 전문 레슨</p>
          </div>

          {/* Hero Banner */}
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-12 mb-12 text-center">
            <i class="fas fa-video text-6xl mb-6"></i>
            <h2 class="text-3xl font-bold mb-4">집에서도, 출장지에서도, 언제 어디서나!</h2>
            <p class="text-xl">Zoom을 통한 실시간 1:1 온라인 레슨</p>
          </div>

          {/* 진행 방식 */}
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">레슨 진행 방식</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-3xl font-bold text-blue-700">1</span>
                </div>
                <h3 class="text-xl font-bold mb-3">수강 신청</h3>
                <p class="text-gray-600">원하시는 악기와 시간을 선택하여 온라인 레슨을 신청해주세요</p>
              </div>
              <div class="text-center">
                <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-3xl font-bold text-blue-700">2</span>
                </div>
                <h3 class="text-xl font-bold mb-3">Zoom 링크 전송</h3>
                <p class="text-gray-600">수업 전 이메일 또는 카카오톡으로 Zoom 링크를 보내드립니다</p>
              </div>
              <div class="text-center">
                <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-3xl font-bold text-blue-700">3</span>
                </div>
                <h3 class="text-xl font-bold mb-3">실시간 레슨</h3>
                <p class="text-gray-600">전문 강사와 1:1 실시간 화상 레슨을 받으세요</p>
              </div>
            </div>
          </div>

          {/* 수업 가능 악기 */}
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">온라인 레슨 가능 악기</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <i class="fas fa-music text-blue-600 text-4xl mb-3"></i>
                <h3 class="font-bold text-lg">피아노</h3>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <i class="fas fa-music text-blue-600 text-4xl mb-3"></i>
                <h3 class="font-bold text-lg">바이올린</h3>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <i class="fas fa-music text-blue-600 text-4xl mb-3"></i>
                <h3 class="font-bold text-lg">플루트</h3>
              </div>
              <div class="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                <i class="fas fa-music text-blue-600 text-4xl mb-3"></i>
                <h3 class="font-bold text-lg">보컬</h3>
              </div>
            </div>
          </div>

          {/* 온라인 레슨의 장점 */}
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">온라인 레슨의 장점</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-clock text-blue-600 mr-3"></i>시간 절약
                </h3>
                <p class="text-gray-600">이동 시간 없이 집에서 편안하게 수업을 받을 수 있습니다</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-map-marker-alt text-blue-600 mr-3"></i>장소 제약 없음
                </h3>
                <p class="text-gray-600">어디에 계시든 인터넷만 있으면 수업이 가능합니다</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-calendar-alt text-blue-600 mr-3"></i>유연한 스케줄
                </h3>
                <p class="text-gray-600">바쁜 일정에 맞춰 시간을 조정할 수 있습니다</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-video text-blue-600 mr-3"></i>녹화 가능
                </h3>
                <p class="text-gray-600">수업 내용을 녹화하여 복습할 수 있습니다 (선택사항)</p>
              </div>
            </div>
          </div>

          {/* 필요 장비 */}
          <div class="bg-gray-50 p-8 rounded-lg mb-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">필요한 장비</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex items-start">
                <i class="fas fa-laptop text-blue-600 text-2xl mr-4 mt-1"></i>
                <div>
                  <h3 class="font-bold mb-2">컴퓨터/태블릿</h3>
                  <p class="text-sm text-gray-600">PC, 노트북, 태블릿 등</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-wifi text-blue-600 text-2xl mr-4 mt-1"></i>
                <div>
                  <h3 class="font-bold mb-2">안정적인 인터넷</h3>
                  <p class="text-sm text-gray-600">화상 통화 가능한 인터넷 환경</p>
                </div>
              </div>
              <div class="flex items-start">
                <i class="fas fa-headphones text-blue-600 text-2xl mr-4 mt-1"></i>
                <div>
                  <h3 class="font-bold mb-2">웹캠/마이크</h3>
                  <p class="text-sm text-gray-600">내장 또는 외장 카메라/마이크</p>
                </div>
              </div>
            </div>
          </div>

          {/* 수강료 */}
          <div class="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">온라인 레슨 수강료</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-bold mb-4 text-blue-700">개인 레슨 (1:1)</h3>
                <p class="text-3xl font-bold text-gray-800 mb-2">월 18만원</p>
                <p class="text-sm text-gray-600 mb-4">주 1회 (40분/회)</p>
                <ul class="text-sm text-gray-700 space-y-2">
                  <li>✓ 맞춤형 1:1 레슨</li>
                  <li>✓ 수업 자료 제공</li>
                  <li>✓ 연습 피드백</li>
                </ul>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="text-xl font-bold mb-4 text-blue-700">체험 레슨</h3>
                <p class="text-3xl font-bold text-gray-800 mb-2">무료</p>
                <p class="text-sm text-gray-600 mb-4">1회 (30분)</p>
                <ul class="text-sm text-gray-700 space-y-2">
                  <li>✓ 레벨 테스트</li>
                  <li>✓ 커리큘럼 상담</li>
                  <li>✓ 수업 방식 체험</li>
                </ul>
              </div>
            </div>
            <p class="text-center text-sm text-gray-600 mt-6">
              ※ 오프라인 레슨 대비 10% 할인된 가격입니다
            </p>
          </div>

          {/* CTA */}
          <div class="text-center mt-12">
            <a href="/contact" class="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition inline-block">
              무료 체험 레슨 신청하기
            </a>
          </div>

          {/* FAQ */}
          <div class="mt-16">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">자주 묻는 질문</h2>
            <div class="space-y-4 max-w-3xl mx-auto">
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="font-bold text-lg mb-2">Q. Zoom을 처음 사용하는데 괜찮을까요?</h3>
                <p class="text-gray-600">A. 걱정 마세요! 처음 수업 전에 Zoom 사용법을 자세히 안내해드리며, 테스트 접속도 가능합니다.</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="font-bold text-lg mb-2">Q. 녹화가 가능한가요?</h3>
                <p class="text-gray-600">A. 네, 학생의 복습을 위해 수업 녹화가 가능합니다. (강사와 사전 협의 필요)</p>
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h3 class="font-bold text-lg mb-2">Q. 악기가 없어도 수업이 가능한가요?</h3>
                <p class="text-gray-600">A. 실습이 필요한 악기 레슨은 악기가 필수입니다. 악기 구매 전 상담을 통해 적합한 악기를 추천해드립니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '온라인 레슨 - Little Brass' }
  )
})

// 위치 페이지
app.get('/location', (c) => {
  return c.render(
    <div>
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">오시는 길</h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 지도 영역 */}
            <div>
              <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <i class="fas fa-map-marked-alt text-6xl mb-4"></i>
                  <p class="text-lg">지도 영역</p>
                  <p class="text-sm">(카카오맵 또는 네이버맵 연동 예정)</p>
                </div>
              </div>
            </div>

            {/* 위치 정보 */}
            <div>
              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-map-marker-alt text-amber-700 mr-3"></i>주소
                  </h3>
                  <p class="text-gray-700 ml-9">서울특별시 강남구 테헤란로 123</p>
                  <p class="text-gray-700 ml-9">Little Brass 빌딩 3층</p>
                </div>

                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-subway text-amber-700 mr-3"></i>지하철
                  </h3>
                  <ul class="text-gray-700 ml-9 space-y-2">
                    <li>• 2호선 강남역 3번 출구 (도보 5분)</li>
                    <li>• 신분당선 강남역 하차</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-bus text-amber-700 mr-3"></i>버스
                  </h3>
                  <ul class="text-gray-700 ml-9 space-y-2">
                    <li>• 간선버스: 146, 740, 341</li>
                    <li>• 지선버스: 3412, 4319</li>
                    <li>• 강남역 정류장 하차</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-car text-amber-700 mr-3"></i>주차 안내
                  </h3>
                  <p class="text-gray-700 ml-9">건물 지하 주차장 이용 가능</p>
                  <p class="text-gray-700 ml-9">2시간 무료 (이후 10분당 1,000원)</p>
                </div>

                <div class="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-700">
                  <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-phone text-amber-700 mr-3"></i>연락처
                  </h3>
                  <p class="text-gray-700 ml-9 mb-2">
                    <strong>전화:</strong> 02-1234-5678
                  </p>
                  <p class="text-gray-700 ml-9 mb-2">
                    <strong>이메일:</strong> info@littlebrass.com
                  </p>
                  <p class="text-gray-700 ml-9">
                    <strong>운영시간:</strong> 평일 10:00 - 22:00, 주말 10:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 주변 랜드마크 */}
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">주변 랜드마크</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <i class="fas fa-building text-amber-700 text-2xl mb-2"></i>
                <p class="font-semibold">강남역 CGV 앞</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <i class="fas fa-coffee text-amber-700 text-2xl mb-2"></i>
                <p class="font-semibold">스타벅스 강남점 옆</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <i class="fas fa-store text-amber-700 text-2xl mb-2"></i>
                <p class="font-semibold">강남 교보문고 근처</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '오시는 길 - Little Brass' }
  )
})

// 문의하기 페이지
app.get('/contact', (c) => {
  return c.render(
    <div>
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-bold text-center text-gray-800 mb-4">문의하기</h1>
          <p class="text-center text-gray-600 mb-12">궁금하신 사항을 남겨주시면 빠르게 답변드리겠습니다</p>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 문의 폼 */}
            <div>
              <form id="contact-form" class="space-y-6">
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">이름 *</label>
                  <input type="text" name="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700" placeholder="홍길동" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">연락처 *</label>
                  <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700" placeholder="010-1234-5678" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">이메일</label>
                  <input type="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700" placeholder="example@email.com" />
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">문의 유형 *</label>
                  <select name="type" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700">
                    <option value="">선택해주세요</option>
                    <option value="오프라인 레슨">오프라인 레슨</option>
                    <option value="온라인 레슨">온라인 레슨</option>
                    <option value="수강료 문의">수강료 문의</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">문의 내용 *</label>
                  <textarea name="message" required rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700" placeholder="문의하실 내용을 자세히 적어주세요"></textarea>
                </div>
                <button type="submit" class="w-full bg-amber-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-800 transition">
                  문의하기
                </button>
              </form>
              <div id="form-message" class="mt-4 p-4 rounded-lg hidden"></div>
            </div>

            {/* 연락처 정보 */}
            <div>
              <div class="bg-amber-50 p-8 rounded-lg mb-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h3>
                <div class="space-y-4">
                  <div class="flex items-start">
                    <i class="fas fa-phone text-amber-700 text-xl mr-4 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-800">전화</p>
                      <p class="text-gray-700">02-1234-5678</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <i class="fas fa-envelope text-amber-700 text-xl mr-4 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-800">이메일</p>
                      <p class="text-gray-700">info@littlebrass.com</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <i class="fas fa-clock text-amber-700 text-xl mr-4 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-800">운영 시간</p>
                      <p class="text-gray-700">평일: 10:00 - 22:00</p>
                      <p class="text-gray-700">주말: 10:00 - 18:00</p>
                      <p class="text-gray-700 text-sm text-red-600">매주 월요일 휴무</p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <i class="fas fa-map-marker-alt text-amber-700 text-xl mr-4 mt-1"></i>
                    <div>
                      <p class="font-semibold text-gray-800">주소</p>
                      <p class="text-gray-700">서울특별시 강남구 테헤란로 123</p>
                      <p class="text-gray-700">Little Brass 빌딩 3층</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
                <h3 class="text-xl font-bold text-gray-800 mb-4">빠른 상담</h3>
                <p class="text-gray-700 mb-4">카카오톡으로 더 빠른 상담을 받아보세요!</p>
                <a href="#" class="block bg-yellow-400 text-gray-800 py-3 px-6 rounded-lg font-bold text-center hover:bg-yellow-500 transition">
                  <i class="fab fa-kickstarter-k mr-2"></i>카카오톡 상담하기
                </a>
              </div>

              {/* FAQ */}
              <div class="mt-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">자주 묻는 질문</h3>
                <div class="space-y-3">
                  <details class="bg-gray-50 p-4 rounded-lg">
                    <summary class="font-semibold cursor-pointer">무료 체험 레슨이 있나요?</summary>
                    <p class="mt-2 text-gray-600 text-sm">네, 30분 무료 체험 레슨을 제공합니다. 문의하기를 통해 신청해주세요.</p>
                  </details>
                  <details class="bg-gray-50 p-4 rounded-lg">
                    <summary class="font-semibold cursor-pointer">악기를 준비하지 못했는데 괜찮을까요?</summary>
                    <p class="mt-2 text-gray-600 text-sm">걱정 마세요! 초기에는 학원 악기를 대여해드리며, 악기 구매 상담도 도와드립니다.</p>
                  </details>
                  <details class="bg-gray-50 p-4 rounded-lg">
                    <summary class="font-semibold cursor-pointer">성인도 레슨을 받을 수 있나요?</summary>
                    <p class="mt-2 text-gray-600 text-sm">물론입니다! 나이 제한 없이 누구나 레슨을 받으실 수 있습니다.</p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '문의하기 - Little Brass' }
  )
})

// 문의 제출 API
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    // 여기에 이메일 전송 또는 DB 저장 로직 추가 예정
    console.log('Contact form submission:', body)
    
    return c.json({ 
      success: true, 
      message: '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: '문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.' 
    }, 500)
  }
})

export default app
