import type { PageMeta } from '../types/site'

export const SITE = {
  name: 'Little Brass',
  businessName: '리틀브라스 음악학원',
  directors: '김효민 · 안세은',
  description:
    '리틀브라스 음악학원 - 트럼펫, 호른, 트롬본, 유포늄 금관악기 전문 교육. 서울 강동구 상일동.',
  phone: '010-5819-4687',
  email: 'little_brass@naver.com',
  address: '서울특별시 강동구 상일로12길 99 리엔프라자 501호',
  reservationUrl:
    'https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5',
  instagramUrl: 'https://www.instagram.com/little_brass.official/',
  ogImagePath: '/static/images/og/little-brass-og.jpg',
  hours: {
    weekday: '12:00–18:00',
    saturday: '10:00–13:00',
    sunday: '휴무',
  },
  hoursNote: '수업 일정에 따라 운영시간이 달라질 수 있으니 방문 전 예약 또는 문의해 주세요.',
} as const

export const PUBLIC_ROUTES: readonly PageMeta[] = [
  {
    path: '/',
    label: '홈',
    title: 'Little Brass - 음악이 흐르는 공간',
    description: SITE.description,
  },
  {
    path: '/curriculum',
    label: '커리큘럼',
    title: '커리큘럼 - Little Brass',
    description: '트럼펫, 호른, 트롬본, 유포늄 실기 과정과 음악이론 수업을 안내합니다.',
  },
  {
    path: '/philosophy',
    label: '교육철학',
    title: '교육철학 - Little Brass',
    description: '리틀브라스의 금관악기 전문 교육 철학과 수업 방향을 소개합니다.',
  },
  {
    path: '/gallery',
    label: '갤러리',
    title: '갤러리 - Little Brass',
    description: '리틀브라스의 합주실, 연습실, 악기와 학원 공간을 확인하세요.',
  },
  {
    path: '/location',
    label: '찾아오시는 길',
    title: '찾아오시는 길 - Little Brass',
    description: '서울 강동구 상일동 리틀브라스 위치와 교통, 주차 정보를 안내합니다.',
  },
]

export function getPageMeta(pathname: string): PageMeta | undefined {
  return PUBLIC_ROUTES.find((route) => route.path === pathname)
}

export function resolveSiteOrigin(requestUrl: string, configuredOrigin?: string): string {
  return new URL(configuredOrigin || requestUrl).origin
}

export function absoluteUrl(origin: string, path: string): string {
  return new URL(path, `${origin}/`).toString()
}
