# Instagram Link Placement Design

## Goal

Make the official Little Brass Instagram account easy to discover without adding an embedded feed, duplicating the existing photo galleries, or increasing page weight.

## Placement

- Home: add an Instagram account row directly below the existing Naver Blog link in the `수업과 무대의 기록` section. This keeps all ongoing academy records in one editorial area and avoids creating another full-height section.
- Gallery: expand the existing closing journal line so it offers both the Naver Blog and Instagram as complementary destinations.
- Footer: replace the generic `인스타그램` label with the visible account handle `@little_brass.official`.

## Content and Interaction

- Supporting copy: `사진과 짧은 소식은 인스타그램에서도 이어집니다.`
- Visible account label: `@little_brass.official`
- Destination: the canonical profile URL from `SITE.instagramUrl`, without the mobile share-tracking query string.
- External links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.
- No Instagram logo is required; typography, rule lines, and spacing will keep the treatment consistent with the current editorial design.

## Visual Treatment

- Use a compact bordered row rather than a separate section or image grid.
- Keep the account handle visually stronger than the supporting sentence but weaker than the section heading.
- Provide a subtle arrow and a small press response only; no looping or decorative animation.
- Stack copy and action vertically on mobile while preserving a full-width, easy-to-tap link.

## Data and Failure Behavior

- All placements read the URL from `SITE.instagramUrl` so the profile address has one source of truth.
- The site does not call the Instagram API and does not depend on Instagram scripts, cookies, login state, or embed availability.
- If Instagram changes its web experience, the academy site remains functional and the link can be updated in one configuration value.

## Verification

- Rendered HTML contains the canonical Instagram URL in the home journal, gallery journal, and footer.
- Every added external link includes safe new-tab attributes.
- Desktop and 390 px mobile layouts have no horizontal overflow.
- Existing unit tests and production build continue to pass.
