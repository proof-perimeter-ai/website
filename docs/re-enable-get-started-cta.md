# Re-enabling "Get started for free" CTAs

All "Get started for free" / "Start free" CTAs are currently hidden site-wide, and every CTA has been consolidated to "Book Demo" as the primary action. This is a temporary state — the underlying get-started code was **not deleted**, only hidden or, in a few spots with no adjacent Book Demo button, converted to Book Demo text. This doc lists exactly what to change in each file to bring get-started CTAs back.

Two different situations were handled differently — check which one applies before editing a file:

- **Hidden pairs**: a get-started button sits right next to a Book Demo button. The get-started one has a `hidden` prop; the Book Demo one was promoted to the solid/primary button.
- **Converted solo CTAs**: there was no adjacent Book Demo button, so the slot's text/event was directly rewritten to say "Book Demo" — there's no `hidden` prop to remove here, you have to type the original copy back in.

## Hidden pairs — remove `hidden`, revert the promoted sibling

For each pair below: delete the `hidden` prop from the get-started button, and change its sibling's tag back from `BtnSolid` to `BtnGhost` (skip the tag change where noted — some pages already had Book Demo as the solid button). The get-started button's `trackEvent={GET_STARTED_EVENT}` was never touched while hidden, so once `hidden` is removed it goes back to firing the `get_started_for_free_clicked` event automatically — no event change needed on these.

- **`app/page.tsx`** — hero (~line 195), path-comparison table row (~line 354), closing section (~line 428). All three: remove `hidden` from the "Get started for free" `BtnSolid`, and change the adjacent "Book Demo" `BtnSolid` back to `BtnGhost`.
- **`app/enterprise/page.tsx`** — comparison-table footer link (~line 333): remove `hidden` from the "Get started for free" `TrackedLink`. No tag to revert (it's a plain text link, no promotion was applied).
- **`app/solutions/{healthcare,banking,financial-services,legal,insurance}/page.tsx`** (5 files) — hero and closing `BtnGhost` "Get started free": remove `hidden`. No promotion to revert — "Book Demo" was already `BtnSolid` in these pairs.
- **`app/pricing/page.tsx`** — closing section (~line 229): remove `hidden` from "Get started for free" `BtnSolid`; change "Book Demo" back to `BtnGhost`.
- **`app/home-v2/page.tsx`** — hero (~line 227): remove `hidden` from "Start free" `BtnSolid`; change "Book Demo" back to `BtnGhost`. Closing section (~line 433): remove `hidden` from "Start free with your own key" `BtnSolid`; **this one also needs its sibling's copy restored, not just its tag** — see the next section.

## Converted solo CTAs — restore the original copy

- **`app/page.tsx`** — the two standalone mid-page buttons after the capabilities grid (~line 273) and after the Document AI deep-dive grid (~line 300): change text back to "Get started for free" and `trackEvent={BOOK_DEMO_EVENT}` back to `trackEvent={GET_STARTED_EVENT}`.
- **`app/pricing/page.tsx`** — `plans` array, the "Bring Your Own Key" entry: `ctaLabel: "Book Demo"` → `"Get started for free"`, `ctaEvent: BOOK_DEMO_EVENT` → `GET_STARTED_EVENT`.
- **`app/home-v2/page.tsx`** — `tiers` array, the "Individual" entry: `cta: "Book Demo"` → `"Start free"`, `ctaEvent: BOOK_DEMO_EVENT` → `GET_STARTED_EVENT`. Also, in the closing section (~line 434), the button that currently reads "Book Demo" needs to go back to `BtnGhost` with the text **"Talk to us about enterprise"** and no `trackEvent` prop at all (it had no tracking before this change).
- **`components/MobileBookDemoCta.tsx`** — the sticky mobile bar's only button: change the visible text back to "Get started for free", swap `posthog.capture(BOOK_DEMO_EVENT)` back to `posthog.capture(GET_STARTED_EVENT)` (keep the `posthog.capture("mobile_sticky_cta_clicked")` call — that one never changed), and update the import back to `GET_STARTED_EVENT`.

## Once nothing uses `hidden` anymore

If you remove every `hidden` usage above and don't expect to need it again, the `hidden?: boolean` prop can be deleted from `BtnSolid`/`BtnGhost` (`components/Button.tsx`) and `TrackedLink` (`components/TrackedLink.tsx`) — it's otherwise dead code once the last call site stops passing it.
