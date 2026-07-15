export function NotFoundPage() {
  return (
    <div class="not-found-page">
      <section class="not-found-inner" aria-labelledby="not-found-title">
        <p class="not-found-code" aria-hidden="true">404</p>
        <h1 id="not-found-title">페이지를 찾을 수 없습니다</h1>
        <p>
          요청한 페이지가 없거나 주소가 변경되었습니다.<br />주소를 확인하거나 홈에서 다시 시작해 주세요.
        </p>
        <a href="/" class="button button-primary">홈으로 돌아가기</a>
      </section>
    </div>
  )
}
