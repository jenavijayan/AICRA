ROLE & CONTEXT
You are building an interactive, 3D-animated homepage prototype for AICAIML (All India
Council for Artificial Intelligence & Machine Learning) - a national accrediting council
offering AI/ML courses and issuing Council-certified credentials to students, teachers,
professionals, and individual learners. This is a client-facing PROTOTYPE - prioritize
visual polish, smooth motion, and a genuinely engaging, alive feel over backend
functionality. The site must feel like a serious national institution (comparable in
gravitas to CSI or ICAI) that has invested in outstanding modern digital design - both
authoritative AND delightful to interact with, at the same time.

DELIVERABLE
A single-page, scrollable, responsive homepage prototype in React + Tailwind CSS, using
Framer Motion for scroll/hover/entrance animation, Three.js or @react-three/fiber for 3D
objects, and an HTML5 Canvas particle layer for ambient background motion. Output as a
self-contained set of components. Use placeholder logo/certificate/photo assets only if
real files aren't supplied, clearly marked for swap-out.

BRAND FOUNDATIONS
Logo: circular seal - tricolor (saffron/white/green) shield behind a stylised AI/chip motif,
framed by a laurel wreath, with "AICAIML" text curved around it. Treat as an official seal:
never re-color, skew, or simplify it.
Color palette:
  - Primary navy:       #0B1F3A
  - Accent gold:         #B8860B
  - Tricolor accent:    saffron #FF9933 / white / green #138808 - thin hairline only
  - Neutral background:  #F7F8FA
  - Body text:           #1C1C1C
  - Verification green:  #1E7A34
Typography: Headings in a serif/slab-serif (Fraunces, Source Serif 4, or Libre
Baskerville) for institutional weight; body/UI in a geometric sans (Inter or General
Sans) for modern readability.

## AMBIENT 3D / MOTION SYSTEM (apply site-wide)
Build a small, reusable motion/effects library and use it consistently across sections -
restraint and repetition read as premium; novelty per-section reads as cluttered.
  1. Floating glow orbs: 2-3 large, very soft-blurred circular gradients (navy-to-gold,
     opacity 8-15%) positioned off-canvas at page corners, drifting slowly in an infinite
     ease-in-out loop (8-11s per cycle, translate + slight scale). Used behind the hero
     and behind the Certification Showcase section only - not the whole page.
  2. Ambient particle canvas: a full-bleed HTML5 canvas layer in the hero with 40-60 tiny
     soft-glow dots (gold and white, low opacity, slow independent drift, occasional
     gentle connecting lines between nearby particles like a subtle neural-network mesh).
     This is the professional equivalent of a starfield - engineered, not decorative.
  3. Entrance animation: every section's content enters on scroll with a fade + rise
     (translateY 40px to 0, opacity 0 to 1), staggered ~80ms per child, cubic-bezier
     (0.16,1,0.3,1), 600-900ms duration - confident and smooth, no bounce.
  4. Animated gradient headline (used ONCE, in the hero only): the main hero headline
     text uses a slow-moving gradient fill (navy -> gold -> white -> navy) via
     background-clip:text, ~6s ease loop. This is the one 'wow' text effect on the
     page - do not repeat it elsewhere or it loses impact.
  5. 3D card tilt on hover: cards (Who We Serve, course cards, dashboard preview cards)
     tilt toward the cursor using a perspective transform (max 8 degrees), with a soft
     shadow that grows and shifts opposite the tilt direction, reinforcing depth.
  6. Ripple-on-click micro-interaction: primary CTA buttons and the AICAIML seal in the
     header emit a soft circular ripple (gold, fading out, ~700ms) from the click point -
     confirms the interaction without needing a page transition.
  7. Rotating conic-gradient glow border (used ONCE, on the Certification Showcase
     certificate mockup only): a slow-spinning soft conic gradient (gold/white/navy) sits
     just behind the certificate as a glowing frame, reinforcing that this is the single
     most important object on the page.
  8. Hero shield: 3D-rendered AICAIML seal, slow Y-axis auto-rotation (~20s/revolution),
     cursor-parallax tilt (max 5 degrees), soft gold rim-light on the shield edge.
  9. Twinkle accents: 8-10 small sparkle glyphs (a subtle four-point star shape, not an
     emoji) scattered with very low opacity near the hero shield and the certificate
     mockup, each twinkling (opacity/scale pulse) on its own random timing.
 10. All motion must respect prefers-reduced-motion: fall back to a static layout with
     no orbs, no particles, no auto-rotation, no ripples - content still fully readable.

PAGE SECTIONS (build in this order)
1. HERO - navy background, particle canvas + 2 floating glow orbs, animated-gradient
   headline, subhead, two CTAs (primary gold, secondary outline), 3D rotating seal on
   the right with twinkle accents.
2. TRUST BAR - thin strip, 3-4 stats with scroll-triggered count-up.
3. WHO WE SERVE - four cards (Students / Teachers & Educators / Professionals /
   Individual Learners), gold line-art icons, 3D cursor-tilt hover.
4. CERTIFICATION SHOWCASE - centerpiece. 3D certificate mockup with rotating
   conic-gradient glow border, AICAIML seal top-center, signature block bottom-right;
   on scroll, certificate rotates to reveal a QR verification code then settles back.
   Adjacent copy: certification tiers (Course -> Specialization -> AICAIML-Certified
   Professional) with a link to the public verification tool.
5. COURSE / LEARNING PATH PREVIEW - horizontal scroll-snap carousel, depth-of-field
   blur on non-centered cards.
6. WHY AICAIML / COUNCIL CREDIBILITY - Managing Director + governing council intro,
   faint laurel-wreath watermark.
7. INSTITUTION / AFFILIATE CTA BAND - full-width gold band, single strong CTA.
8. REGISTRATION FORM MODULE (Student / Institution sign-up) - see State & District
   Selector spec below; this is the section that most needs to feel smooth and modern
   since it's a form, not just marketing content.
9. FOOTER - dense sitemap-style footer with a prominent 'Verify a Certificate' search
   field and trust badges.

## STATE & DISTRICT CASCADING SELECTOR (for the Registration Form Module)
Build a two-step location selector: a State dropdown, followed by a District dropdown
that populates based on the selected State. Behavior:
  - Both dropdowns are searchable/type-to-filter, not plain <select> elements.
  - District dropdown is disabled (visibly greyed, with a placeholder like 'Select a
    state first') until a State is chosen.
  - On State selection, the District dropdown animates open with a smooth height/opacity
    transition (~250ms) rather than snapping.
  - On State change, previously selected District clears automatically.
  - Include a small inline note: 'Don't see your district? Contact us and we'll add it.'
    since the reference dataset below is a demo subset, not the full list of India's
    districts.
Use this sample reference dataset (for demo purposes - enough states/districts to prove
the cascading behavior convincingly to a client; production should include all Indian
states/UTs and their full district lists):

const STATE_DISTRICT_DATA = {
"Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tirunelveli"],
"Delhi (NCT)": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
"Karnataka": ["Bengaluru Urban", "Mysuru", "Mangaluru", "Hubballi-Dharwad", "Belagavi"],
"Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
"Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida (Gautam Buddh Nagar)"],
"West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Durgapur"],
"Kerala": ["Thiruvananthapuram", "Kochi (Ernakulam)", "Kozhikode", "Thrissur", "Kollam"],
"Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
"Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
"Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"]
};

MOTION & INTERACTION PRINCIPLES
  - One consistent easing curve and timing set reused everywhere (see ambient system
    above) rather than inventing new motion per section.
  - Button hover: soft gold glow, not a hard color swap.
  - Keep the 'wow' effects rationed: ONE animated-gradient headline, ONE rotating
    conic-glow border. Repeating showy effects everywhere cancels the premium feel.

RESPONSIVENESS
  - Desktop-first, graceful tablet/mobile fallback.
  - Disable cursor-follow tilt/parallax on touch devices; keep scroll fade-ins and the
    State/District selector's animated open/close (that one is touch-friendly by nature).
  - On mobile, simplify the hero shield to slow auto-rotation only (no parallax) to
    protect performance.

OUTPUT FORMAT
  - Componentized code: Hero.jsx, TrustBar.jsx, WhoWeServe.jsx, CertificationShowcase.jsx,
    CourseCarousel.jsx, CouncilCredibility.jsx, AffiliateCTA.jsx, RegistrationForm.jsx
    (including StateDistrictSelector.jsx), Footer.jsx, plus a top-level page assembling
    them in order.
  - Inline comments marking where real assets/content (logo file, certificate design,
    photos, real stats, full state/district list) should replace placeholders/demo data.
