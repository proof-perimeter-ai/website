# Tracking setup guide — app.proofperimeter.com

This is a copy-paste guide for wiring up conversion/analytics tracking on the **product app** (`app.proofperimeter.com`), which lives in a separate repo not included here. It reuses the same GTM container, GA4 property, and Google Ads account already live on the marketing site (`website/`), so that the full funnel — ad click → landing page → signup → activation — rolls up into one continuous session instead of two disconnected datasets. See `website/app/layout.tsx` and `website/components/BookDemoConversion.tsx` for the marketing-site equivalents these are mirrored from.

Everything below is vanilla HTML/JS (`<script>` tags), since the app's framework isn't known yet — adapt the placement to wherever the app's root `<head>` is (root layout, `index.html`, `_document`, etc.) if it turns out to be a framework with its own script-injection convention.

Your prepared list of in-app funnel events (signup, activation, etc.) is out of scope here — this doc only covers the three tags to install and the one new Google Ads conversion action for signup.

## 1. Google Tag Manager (GTM)

Reuses the marketing site's container: **`GTM-P22VGXKT`**.

Paste as high as possible in `<head>`, before any other scripts:

```html
<!-- Google Tag Manager -->
<script>
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P22VGXKT');
</script>
<!-- End Google Tag Manager -->
```

Paste immediately after the opening `<body>` tag:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P22VGXKT"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## 2. Google Analytics 4 (GA4)

Reuses the marketing site's property/measurement ID: **`G-LX9SVDZ842`**.

> Before deploying: in GA4 admin, add a new **data stream** for `app.proofperimeter.com` under this same property (Admin → Data Streams → Add stream), so app traffic is attributed to its own hostname while still counting toward the same property/user journey.

Add after the GTM snippet in `<head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LX9SVDZ842"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-LX9SVDZ842');
</script>
```

(If GTM is already firing a GA4 config tag internally, this direct snippet is redundant — either configure GA4 as a tag inside the GTM container, or use this direct snippet and skip the GTM-side GA4 config. Don't do both, or pageviews double-count.)

## 3. Google Ads conversion — Signup

This needs a **new conversion action** in Google Ads, kept separate from the existing "Book a Demo" conversion (`AW-18327393246/CheQCMCutdEcEN6nl6NE`, value 10.0 INR) so Ads can report and bid on signup and demo-booking independently.

### Create the conversion action

1. Google Ads → **Goals → Conversions → Summary → + New conversion action**.
2. Category: **Sign-up**. Name: `App Signup Completed` (or similar — distinct from `Book a Demo`).
3. Value: **use the same value for each conversion → `5`**. Currency: `INR` (matching the existing Book Demo conversion's currency — change if signup should be tracked in a different currency).
4. Count: **One** (one conversion per signup, not per click).
5. Save, then open the tag setup — Google Ads will show a new conversion label in the form `AW-18327393246/XXXXXXXXXXXXXXXXXXXX`. Copy that exact label and replace the placeholder below.

### Fire it on signup completion

Place this call at the moment a signup is confirmed (e.g. right after account creation succeeds, same spot your PostHog `app_signup_completed`-equivalent event fires):

```html
<script>
  gtag('event', 'conversion', {
    'send_to': 'AW-18327393246/REPLACE_WITH_NEW_SIGNUP_LABEL',
    'value': 5.0,
    'currency': 'INR'
  });
</script>
```

If GTM is the source of truth instead of calling `gtag` directly, push a custom event to the `dataLayer` and set up a GTM trigger + "Google Ads Conversion Tracking" tag off it instead:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  dataLayer.push({
    event: 'app_signup_completed',
    conversion_value: 5.0,
    conversion_currency: 'INR'
  });
</script>
```

## 4. PostHog — init script only

Reuses the marketing site's PostHog **project** (same `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` / `NEXT_PUBLIC_POSTHOG_HOST` values from `website/.env.local`, so anonymous marketing-site sessions merge with authenticated app sessions under one project). Pull the actual token/host values from `.env.local` — they're gitignored and not reproduced here.

Paste in `<head>`, as early as possible:

```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSurveys getActiveMatchingSurveys renderSurvey".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('<POSTHOG_PROJECT_TOKEN>', {
    api_host: '<POSTHOG_HOST>',
    person_profiles: 'identified_only'
  });
</script>
```

`person_profiles: 'identified_only'` matches how the marketing site scopes profile creation — only creates a full person profile once someone is identified (e.g. after signup), rather than for every anonymous visitor. Swap in the real token/host before deploying.

## Placement summary

| Script | Location |
|---|---|
| GTM head snippet | Top of `<head>`, before everything else |
| GTM noscript iframe | Immediately after opening `<body>` |
| GA4 gtag.js | `<head>`, after GTM (skip if GA4 is configured as a tag inside GTM instead) |
| Google Ads signup conversion | Fired in app code at signup-success, not a static tag |
| PostHog init | `<head>`, as early as possible |
