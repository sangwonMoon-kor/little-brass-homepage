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

// 갤러리 페이지
app.get('/gallery', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span class="inline-block px-4 py-2 bg-gold-500/20 text-gold-400 rounded-full text-sm font-semibold mb-4 border border-gold-500/30">
            Gallery
          </span>
          <h1 class="text-5xl md:text-6xl font-display font-bold mb-6">갤러리</h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Little Brass의 생동감 넘치는 순간들<br/>
            수업, 발표회, 학원 시설을 한눈에
          </p>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section class="py-8 bg-white border-b border-gray-200 sticky top-20 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap justify-center gap-3">
            <button class="gallery-filter px-6 py-2 bg-gold-500 text-white rounded-full font-semibold shadow-gold hover:bg-gold-600 transition" data-category="all">
              전체보기
            </button>
            <button class="gallery-filter px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition" data-category="performance">
              발표회
            </button>
            <button class="gallery-filter px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition" data-category="lesson">
              수업 현장
            </button>
            <button class="gallery-filter px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition" data-category="facility">
              시설
            </button>
            <button class="gallery-filter px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition" data-category="video">
              영상
            </button>
          </div>
        </div>
      </section>

      {/* YouTube 영상 섹션 */}
      <section class="py-16 bg-gradient-to-b from-gray-50 to-white" data-category="video">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-bold text-navy-900 mb-4">연주 영상</h2>
            <p class="text-gray-600 text-lg">학생들의 멋진 연주와 발표회 하이라이트</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* YouTube 영상 1 */}
            <div class="premium-card overflow-hidden">
              <div class="aspect-video bg-gray-900 relative group cursor-pointer">
                <div class="absolute inset-0 flex items-center justify-center bg-navy-900/90 group-hover:bg-navy-900/70 transition">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition shadow-gold">
                      <i class="fas fa-play text-white text-2xl ml-1"></i>
                    </div>
                    <p class="text-white font-semibold">2024 겨울 발표회</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-lg text-navy-900 mb-2">2024 겨울 발표회 하이라이트</h3>
                <p class="text-gray-600 text-sm">학생들의 1년 간의 연습 성과를 담은 멋진 연주</p>
                <div class="flex items-center mt-4 text-sm text-gray-500">
                  <i class="fas fa-calendar-alt mr-2 text-gold-500"></i>
                  <span>2024.12.20</span>
                </div>
              </div>
            </div>

            {/* YouTube 영상 2 */}
            <div class="premium-card overflow-hidden">
              <div class="aspect-video bg-gray-900 relative group cursor-pointer">
                <div class="absolute inset-0 flex items-center justify-center bg-navy-900/90 group-hover:bg-navy-900/70 transition">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition shadow-gold">
                      <i class="fas fa-play text-white text-2xl ml-1"></i>
                    </div>
                    <p class="text-white font-semibold">트럼펫 마스터클래스</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-lg text-navy-900 mb-2">특별 마스터클래스</h3>
                <p class="text-gray-600 text-sm">유명 연주자 초청 특별 레슨</p>
                <div class="flex items-center mt-4 text-sm text-gray-500">
                  <i class="fas fa-calendar-alt mr-2 text-gold-500"></i>
                  <span>2024.10.15</span>
                </div>
              </div>
            </div>

            {/* YouTube 영상 3 */}
            <div class="premium-card overflow-hidden">
              <div class="aspect-video bg-gray-900 relative group cursor-pointer">
                <div class="absolute inset-0 flex items-center justify-center bg-navy-900/90 group-hover:bg-navy-900/70 transition">
                  <div class="text-center">
                    <div class="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition shadow-gold">
                      <i class="fas fa-play text-white text-2xl ml-1"></i>
                    </div>
                    <p class="text-white font-semibold">학원 소개 영상</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-bold text-lg text-navy-900 mb-2">Little Brass 소개</h3>
                <p class="text-gray-600 text-sm">최고의 시설과 전문 강사진을 만나보세요</p>
                <div class="flex items-center mt-4 text-sm text-gray-500">
                  <i class="fas fa-calendar-alt mr-2 text-gold-500"></i>
                  <span>2024.09.01</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사진 갤러리 */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-display font-bold text-navy-900 mb-4">포토 갤러리</h2>
            <p class="text-gray-600 text-lg">Little Brass의 다양한 모습</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="photo-gallery">
            {/* 발표회 사진 1 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="performance">
              <div class="aspect-square bg-gradient-to-br from-navy-100 to-gold-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-music text-6xl text-gold-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">2024 발표회</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-xs font-semibold">발표회</span>
                <h3 class="font-semibold text-navy-900 mt-2">2024 겨울 발표회</h3>
              </div>
            </div>

            {/* 수업 사진 1 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="lesson">
              <div class="aspect-square bg-gradient-to-br from-blue-100 to-purple-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-chalkboard-teacher text-6xl text-blue-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">1:1 레슨</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">수업</span>
                <h3 class="font-semibold text-navy-900 mt-2">개인 맞춤 레슨</h3>
              </div>
            </div>

            {/* 시설 사진 1 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="facility">
              <div class="aspect-square bg-gradient-to-br from-green-100 to-teal-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-door-open text-6xl text-green-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">연습실 A</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">시설</span>
                <h3 class="font-semibold text-navy-900 mt-2">프리미엄 연습실</h3>
              </div>
            </div>

            {/* 발표회 사진 2 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="performance">
              <div class="aspect-square bg-gradient-to-br from-pink-100 to-rose-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-trophy text-6xl text-pink-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">시상식</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-semibold">발표회</span>
                <h3 class="font-semibold text-navy-900 mt-2">우수 연주자 시상</h3>
              </div>
            </div>

            {/* 수업 사진 2 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="lesson">
              <div class="aspect-square bg-gradient-to-br from-amber-100 to-yellow-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-users text-6xl text-amber-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">그룹 레슨</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">수업</span>
                <h3 class="font-semibold text-navy-900 mt-2">앙상블 수업</h3>
              </div>
            </div>

            {/* 시설 사진 2 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="facility">
              <div class="aspect-square bg-gradient-to-br from-indigo-100 to-blue-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-couch text-6xl text-indigo-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">대기실</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">시설</span>
                <h3 class="font-semibold text-navy-900 mt-2">편안한 휴게 공간</h3>
              </div>
            </div>

            {/* 발표회 사진 3 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="performance">
              <div class="aspect-square bg-gradient-to-br from-purple-100 to-pink-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-microphone text-6xl text-purple-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">무대</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">발표회</span>
                <h3 class="font-semibold text-navy-900 mt-2">솔로 퍼포먼스</h3>
              </div>
            </div>

            {/* 수업 사진 3 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="lesson">
              <div class="aspect-square bg-gradient-to-br from-teal-100 to-cyan-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-book-open text-6xl text-teal-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">이론 수업</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-semibold">수업</span>
                <h3 class="font-semibold text-navy-900 mt-2">음악 이론 교육</h3>
              </div>
            </div>

            {/* 시설 사진 3 */}
            <div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="facility">
              <div class="aspect-square bg-gradient-to-br from-orange-100 to-red-50 relative group overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <i class="fas fa-building text-6xl text-orange-500 mb-4 opacity-30"></i>
                    <p class="text-navy-900 font-semibold">외관</p>
                  </div>
                </div>
                <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <i class="fas fa-search-plus text-white text-3xl"></i>
                </div>
              </div>
              <div class="p-4">
                <span class="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">시설</span>
                <h3 class="font-semibold text-navy-900 mt-2">학원 전경</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gradient-to-r from-navy-900 to-navy-800 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <i class="fas fa-camera text-5xl text-gold-400 mb-6"></i>
          <h2 class="text-4xl font-display font-bold mb-4">여러분도 주인공이 되어보세요!</h2>
          <p class="text-xl text-gray-300 mb-8">
            다음 발표회와 이벤트의 주인공은 바로 여러분입니다
          </p>
          <a href="/contact" class="inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-gold-400 hover:to-gold-500 transition shadow-gold">
            무료 체험 레슨 신청하기
          </a>
        </div>
      </section>
    </div>,
    { title: '갤러리 - Little Brass' }
  )
})

// FAQ 페이지
app.get('/faq', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span class="inline-block px-4 py-2 bg-gold-500/20 text-gold-400 rounded-full text-sm font-semibold mb-4 border border-gold-500/30">
            FAQ
          </span>
          <h1 class="text-5xl md:text-6xl font-display font-bold mb-6">자주 묻는 질문</h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Little Brass에 대해 궁금하신 점을 확인해보세요
          </p>
        </div>
      </section>

      {/* 검색 바 */}
      <section class="py-8 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative">
            <input 
              type="text" 
              id="faq-search" 
              placeholder="궁금한 내용을 검색해보세요..." 
              class="w-full px-6 py-4 pl-14 border-2 border-gray-300 rounded-full focus:border-gold-500 focus:outline-none text-lg"
            />
            <i class="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>
        </div>
      </section>

      {/* 카테고리 버튼 */}
      <section class="py-6 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap justify-center gap-3">
            <button class="faq-category px-6 py-2 bg-gold-500 text-white rounded-full font-semibold shadow-gold hover:bg-gold-600 transition" data-category="all">
              전체
            </button>
            <button class="faq-category px-6 py-2 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-gray-200" data-category="admission">
              입학 관련
            </button>
            <button class="faq-category px-6 py-2 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-gray-200" data-category="lesson">
              수업 관련
            </button>
            <button class="faq-category px-6 py-2 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-gray-200" data-category="cost">
              비용 관련
            </button>
            <button class="faq-category px-6 py-2 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-gray-200" data-category="online">
              온라인 레슨
            </button>
            <button class="faq-category px-6 py-2 bg-white text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition border-2 border-gray-200" data-category="facility">
              시설 관련
            </button>
          </div>
        </div>
      </section>

      {/* FAQ 아코디언 */}
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 입학 관련 */}
          <div class="mb-12" data-faq-category="admission">
            <h2 class="text-2xl font-display font-bold text-navy-900 mb-6 flex items-center">
              <div class="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-door-open text-gold-600"></i>
              </div>
              입학 관련
            </h2>
            <div class="space-y-4">
              <details class="faq-item bg-white" data-keywords="체험 무료 레슨 신청">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  무료 체험 레슨이 있나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  네, Little Brass에서는 30분 무료 체험 레슨을 제공하고 있습니다. 
                  체험 레슨을 통해 학원 시설과 강사진의 수업 방식을 미리 경험하실 수 있습니다. 
                  문의하기 페이지나 전화로 신청해주세요.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="나이 연령 제한 성인 아이">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  나이 제한이 있나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  나이 제한은 없습니다. 초등학생부터 성인까지 누구나 레슨을 받으실 수 있습니다. 
                  각 연령대와 수준에 맞는 맞춤형 커리큘럼을 제공하고 있습니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="악기 준비 구매 없어도">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  악기를 준비하지 못했는데 괜찮을까요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  걱정하지 마세요! 초기에는 학원 악기를 대여해드리며, 악기 구매 시기와 적합한 악기 선택에 대해 상담해드립니다. 
                  체험 레슨 시에도 학원 악기를 사용하실 수 있습니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="등록 절차 방법 신청">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  등록 절차가 어떻게 되나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  1. 무료 체험 레슨 신청<br/>
                  2. 레벨 테스트 및 상담<br/>
                  3. 수강 과목 및 시간 선택<br/>
                  4. 등록 및 수강료 납부<br/>
                  5. 레슨 시작<br/>
                  전화나 문의하기를 통해 간편하게 신청하실 수 있습니다.
                </div>
              </details>
            </div>
          </div>

          {/* 수업 관련 */}
          <div class="mb-12" data-faq-category="lesson">
            <h2 class="text-2xl font-display font-bold text-navy-900 mb-6 flex items-center">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-chalkboard-teacher text-blue-600"></i>
              </div>
              수업 관련
            </h2>
            <div class="space-y-4">
              <details class="faq-item bg-white" data-keywords="개인 그룹 레슨 차이">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  개인 레슨과 그룹 레슨의 차이는 무엇인가요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  <strong>개인 레슨:</strong> 1:1 맞춤 수업으로 학생의 수준과 목표에 맞춰 진행됩니다. 주 1회 40분, 더 집중적인 지도가 가능합니다.<br/><br/>
                  <strong>그룹 레슨:</strong> 2-4명 소그룹으로 진행되며, 앙상블 연습과 협주 경험을 쌓을 수 있습니다. 주 1회 60분 진행됩니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="결석 보강 휴강">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  결석 시 보강 수업이 가능한가요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  네, 사전에 알려주시면 보강 수업이 가능합니다. 
                  단, 당일 취소는 보강이 어려울 수 있으니 최소 1일 전에 연락 부탁드립니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="시간 변경 조정">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  수업 시간 변경이 가능한가요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  네, 강사와 상담 후 시간 조정이 가능합니다. 
                  학기 중에도 스케줄 변경이 필요하시면 언제든 말씀해주세요.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="교재 교구 준비물">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  교재는 별도로 구매해야 하나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  네, 교재는 학생 수준에 맞춰 선정하며 별도 구매입니다. 
                  첫 수업 시 강사가 적합한 교재를 추천해드리며, 온라인이나 서점에서 구매하실 수 있습니다.
                </div>
              </details>
            </div>
          </div>

          {/* 비용 관련 */}
          <div class="mb-12" data-faq-category="cost">
            <h2 class="text-2xl font-display font-bold text-navy-900 mb-6 flex items-center">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-won-sign text-green-600"></i>
              </div>
              비용 관련
            </h2>
            <div class="space-y-4">
              <details class="faq-item bg-white" data-keywords="수강료 비용 가격 얼마">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  수강료는 얼마인가요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  <strong>개인 레슨:</strong> 월 20만원~ (주 1회 40분)<br/>
                  <strong>그룹 레슨:</strong> 월 15만원~ (주 1회 60분)<br/>
                  <strong>온라인 레슨:</strong> 월 18만원 (오프라인 대비 10% 할인)<br/><br/>
                  ※ 악기 및 레벨에 따라 차이가 있을 수 있습니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="결제 방법 카드 계좌이체">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  결제 방법은 어떻게 되나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  계좌이체 또는 카드 결제가 가능합니다. 
                  매월 초 또는 등록 시점에 월 단위로 결제하실 수 있습니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="할인 이벤트 프로모션">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  할인 혜택이 있나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  형제/자매 등록 시 10% 할인, 3개월 이상 선결제 시 5% 할인 혜택이 있습니다. 
                  또한 정기적으로 시즌별 프로모션을 진행하고 있으니 문의해주세요.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="환불 규정 정책">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  환불 규정은 어떻게 되나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  수강 시작 전: 전액 환불<br/>
                  수강 1/3 경과 전: 2/3 환불<br/>
                  수강 1/2 경과 전: 1/2 환불<br/>
                  수강 1/2 경과 후: 환불 불가<br/><br/>
                  ※ 평생교육법 시행령 제23조에 따릅니다.
                </div>
              </details>
            </div>
          </div>

          {/* 온라인 레슨 */}
          <div class="mb-12" data-faq-category="online">
            <h2 class="text-2xl font-display font-bold text-navy-900 mb-6 flex items-center">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-video text-purple-600"></i>
              </div>
              온라인 레슨
            </h2>
            <div class="space-y-4">
              <details class="faq-item bg-white" data-keywords="줌 zoom 화상 온라인">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  Zoom을 처음 사용하는데 어렵지 않을까요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  걱정 마세요! 처음 수업 전에 Zoom 사용법을 자세히 안내해드리며, 테스트 접속도 가능합니다. 
                  간단한 클릭 몇 번으로 쉽게 수업에 참여하실 수 있습니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="녹화 녹음 복습">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  온라인 수업 녹화가 가능한가요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  네, 학생의 복습을 위해 수업 녹화가 가능합니다. 
                  단, 강사와 사전 협의가 필요하며, 녹화 파일은 개인 학습 목적으로만 사용 가능합니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="장비 준비 필요 카메라 마이크">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  필요한 장비가 있나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  PC, 노트북, 태블릿 중 하나와 안정적인 인터넷 연결만 있으면 됩니다. 
                  내장 카메라와 마이크로 충분하며, 더 좋은 음질을 원하시면 외장 마이크를 권장합니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="오프라인 전환 병행">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  온라인에서 오프라인으로 전환할 수 있나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  물론입니다! 언제든 오프라인 레슨으로 전환 가능하며, 
                  온라인과 오프라인을 번갈아가며 병행하는 것도 가능합니다. 유연하게 조정 가능합니다.
                </div>
              </details>
            </div>
          </div>

          {/* 시설 관련 */}
          <div class="mb-12" data-faq-category="facility">
            <h2 class="text-2xl font-display font-bold text-navy-900 mb-6 flex items-center">
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-building text-orange-600"></i>
              </div>
              시설 관련
            </h2>
            <div class="space-y-4">
              <details class="faq-item bg-white" data-keywords="주차 주차장 차">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  주차가 가능한가요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  네, 건물 지하 주차장을 이용하실 수 있습니다. 
                  2시간 무료 주차가 가능하며, 이후에는 10분당 1,000원입니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="연습실 대여 개인연습">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  연습실을 개인적으로 사용할 수 있나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  수강생에 한해 연습실 대여가 가능합니다. 
                  시간당 5,000원으로 예약제로 운영되며, 사전에 전화로 예약해주시면 됩니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="운영시간 영업시간 휴무">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  학원 운영 시간은 어떻게 되나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  <strong>평일:</strong> 10:00 - 22:00<br/>
                  <strong>주말:</strong> 10:00 - 18:00<br/>
                  <strong>휴무:</strong> 매주 월요일<br/><br/>
                  ※ 공휴일은 별도 공지합니다.
                </div>
              </details>

              <details class="faq-item bg-white" data-keywords="대기실 휴게실 편의시설">
                <summary class="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:text-gold-600 transition">
                  대기 공간이 있나요?
                </summary>
                <div class="px-6 pb-6 text-gray-700 leading-relaxed">
                  네, 편안한 대기실이 마련되어 있습니다. 
                  무료 음료와 간식이 제공되며, 보호자분들께서 편하게 기다리실 수 있습니다.
                </div>
              </details>
            </div>
          </div>

        </div>
      </section>

      {/* 네이버 예약 CTA */}
      <section class="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <i class="fas fa-calendar-check text-5xl mb-6"></i>
          <h2 class="text-4xl font-display font-bold mb-4">간편하게 예약하세요</h2>
          <p class="text-xl text-green-100 mb-8">
            네이버 플레이스에서 체험 레슨을 바로 예약하실 수 있습니다
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-white text-green-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition shadow-lg">
              <i class="fab fa-neos mr-3"></i>
              네이버 예약하기
            </a>
            <a href="/contact" class="inline-flex items-center justify-center border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-700 transition">
              <i class="fas fa-comments mr-3"></i>
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 여전히 궁금하신가요 */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-display font-bold text-navy-900 mb-4">여전히 궁금하신가요?</h2>
          <p class="text-gray-600 text-lg mb-8">
            찾으시는 답변이 없다면 언제든 연락주세요
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-md">
              <i class="fas fa-phone text-3xl text-gold-500 mb-3"></i>
              <h3 class="font-bold text-lg mb-2">전화 문의</h3>
              <p class="text-gray-600 text-sm mb-3">평일 10:00 - 22:00</p>
              <a href="tel:02-1234-5678" class="text-gold-600 font-semibold hover:text-gold-700">02-1234-5678</a>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md">
              <i class="fas fa-envelope text-3xl text-gold-500 mb-3"></i>
              <h3 class="font-bold text-lg mb-2">이메일 문의</h3>
              <p class="text-gray-600 text-sm mb-3">24시간 접수</p>
              <a href="mailto:info@littlebrass.com" class="text-gold-600 font-semibold hover:text-gold-700">info@littlebrass.com</a>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-md">
              <i class="fas fa-comments text-3xl text-gold-500 mb-3"></i>
              <h3 class="font-bold text-lg mb-2">카카오톡 상담</h3>
              <p class="text-gray-600 text-sm mb-3">실시간 답변</p>
              <a href="#" class="text-gold-600 font-semibold hover:text-gold-700">카톡 상담하기</a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: 'FAQ - Little Brass' }
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
