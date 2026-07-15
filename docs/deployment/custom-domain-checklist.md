# `littlebrass.com` 연결 체크리스트

이 문서는 현재 정상 운영 중인 `little-brass-homepage.pages.dev`를 유지한 채 `littlebrass.com`을 Cloudflare Pages에 연결할 때 사용합니다. 도메인 연결은 코드 배포와 분리해서 진행합니다.

## 1. 연결 전

- [ ] `https://little-brass-homepage.pages.dev`에서 최신 프로덕션 빌드가 정상인지 확인한다.
- [ ] `/`, `/curriculum`, `/philosophy`, `/gallery`, `/location`과 임의의 404 경로를 확인한다.
- [ ] 도메인 등록기관 로그인 정보를 준비한다.
- [ ] 기존 DNS 레코드를 내보내거나 화면 캡처한다. 특히 MX, SPF, DKIM, DMARC 등 메일 관련 레코드를 보존한다.
- [ ] 대표 주소를 `https://littlebrass.com`으로 정하고 `www`는 이 주소로 리디렉션하기로 한다.
- [ ] DNSSEC가 이미 활성화되어 있는지 확인한다.

## 2. Cloudflare DNS 준비

이미 `littlebrass.com`이 같은 Cloudflare 계정에서 Active 상태라면 이 절차를 건너뛴다.

- [ ] Cloudflare의 Domains에서 `littlebrass.com`을 추가한다.
- [ ] 자동으로 가져온 DNS 레코드와 백업을 대조한다.
- [ ] 등록기관에서 DNSSEC가 활성화돼 있다면 네임서버 변경 전에 일시 해제한다.
- [ ] Cloudflare가 지정한 두 네임서버를 도메인 등록기관에 설정한다.
- [ ] Cloudflare의 zone 상태가 `Active`가 될 때까지 기다린다.
- [ ] 기존 메일·외부 서비스 DNS 레코드가 그대로 있는지 다시 확인한다.
- [ ] zone 활성화 후 Cloudflare에서 DNSSEC를 다시 활성화하고 등록기관에 DS 레코드를 반영한다.

Cloudflare Free/Pro 플랜에서 apex 도메인을 연결하려면 일반적으로 Cloudflare를 권한 DNS로 사용하는 full setup이 필요합니다.

## 3. Pages 프로젝트에 도메인 연결

- [ ] Cloudflare 대시보드에서 Workers & Pages → `little-brass-homepage` → Custom domains로 이동한다.
- [ ] `littlebrass.com`을 Pages의 커스텀 도메인으로 추가한다.
- [ ] 같은 화면에서 `www.littlebrass.com`도 추가한다.
- [ ] Pages 연결 절차가 완료되기 전에 DNS 화면에서 CNAME을 임의로 먼저 만들지 않는다.
- [ ] `www`에서 `https://littlebrass.com`으로 301 또는 308 리디렉션하는 규칙을 설정한다.
- [ ] 두 호스트 모두 인증서 상태가 Active인지 확인한다.

## 4. 사이트 설정과 재배포

- [ ] Pages 프로젝트의 Production 환경 변수에 `PUBLIC_SITE_URL=https://littlebrass.com`을 추가한다.
- [ ] 최신 커밋을 다시 배포한다.
- [ ] `pages.dev` 주소로 접근해도 canonical이 `https://littlebrass.com/...`을 가리키는지 확인한다.

## 5. 출시 확인

```bash
curl -I https://littlebrass.com/
curl -I https://www.littlebrass.com/
curl -I https://littlebrass.com/favicon.svg
curl -I https://littlebrass.com/does-not-exist
curl -sS https://littlebrass.com/robots.txt
curl -sS https://littlebrass.com/sitemap.xml
```

- [ ] apex는 HTTPS 200을 반환한다.
- [ ] `www`는 apex로 한 번만 리디렉션한다.
- [ ] 없는 경로는 404를 반환한다.
- [ ] 브라우저에서 인증서 경고와 mixed content가 없다.
- [ ] 모든 공개 페이지의 canonical, Open Graph 이미지, 내비게이션, 예약·전화·지도 링크를 확인한다.
- [ ] 모바일 네트워크에서 히어로 포스터와 영상, WebP 이미지 로딩을 확인한다.
- [ ] `robots.txt`와 `sitemap.xml`이 `https://littlebrass.com`을 사용한다.
- [ ] 필요하면 Google Search Console과 네이버 서치어드바이저에 도메인과 sitemap을 등록한다.

## 6. 문제 발생 시 되돌리기

- [ ] Pages 프로젝트에서 커스텀 도메인을 분리한다.
- [ ] DNS 변경 전 백업한 레코드를 복원한다.
- [ ] 네임서버 자체를 복원해야 한다면 DNSSEC 상태를 먼저 점검한다.
- [ ] 복구 중에는 `https://little-brass-homepage.pages.dev`를 공식 임시 URL로 사용한다.
- [ ] 원인 해결 후 DNS → Pages custom domain → `PUBLIC_SITE_URL` 순서로 다시 적용한다.

## 공식 문서

- [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare DNS full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
