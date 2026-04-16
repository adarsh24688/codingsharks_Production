# 🦈 Coding Sharks — Gesture FX v2 · Master Regeneration Prompt (v2 — Camera Fixed)

> **Use this prompt verbatim with Claude (claude.ai) to regenerate the exact HTML file every time.**
> ✅ v2 fixes: Camera initializes correctly on Safari, Chrome, Firefox, and mobile.

---

## ✅ THE PROMPT

```
Create a single self-contained HTML file called "codingsharks_safari_fixed.html" for a company called "Coding Sharks" — an IT/coding institute based in Bhawarkua, Indore, India. The file is a fullscreen, immersive particle-gesture experience with live webcam + MediaPipe hand tracking. Follow every specification below exactly.

---

### FONTS & IMPORTS
- Google Fonts: Orbitron (700, 900) and Space Grotesk (400, 600, 700)
- MediaPipe Hands CDN: https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js (crossorigin="anonymous"), loaded in <body> before <script>

---

### HTML STRUCTURE (in order)
1. <video id="webcam"> — hidden offscreen (position:fixed; top:-9999px; left:-9999px; width:1px; height:1px; opacity:0; pointer-events:none), with attributes: autoplay muted playsinline webkit-playsinline
2. <div id="vignette"> — fullscreen dark radial vignette overlay, z-index:1, pointer-events:none
3. <div id="colorgrade"> — fullscreen brand color-grade overlay, z-index:2, pointer-events:none, mix-blend-mode:screen
4. <canvas id="main"> — fullscreen particle canvas, z-index:3, position:fixed
5. <div id="ui-layer"> — fullscreen UI wrapper, z-index:10, pointer-events:none, containing:
   a. #logo — top-left (top:22px left:24px), flex row, gap:10px, opacity:0 → fadeIn 1s delay 2s
      - #logo-emoji: 🦈 emoji, font-size:28px, drop-shadow orange glow
      - #logo-text: "Coding Sharks" in Orbitron 900 14px, letter-spacing:2.5px, gradient text #FF6B35→#FF9500, uppercase
   b. #badge — top-right (top:22px right:24px): text "Indore's #1 Coding Institute", dark glassmorphism box, orange border, color:#FF9500, fadeIn delay 2.2s
   c. #mode-pill — top-center: text "⬡ GESTURE ACTIVE", dark glass pill, fadeIn delay 2.5s
   d. #status — absolute centered (top:50% left:50% translate -50%,-50%):
      - #status-text: "Initializing camera..." Orbitron 14px, orange, pulsing animation
      - #status-sub: "Allow access · Move your hands to control particles" small muted text
   e. #tip — below top, centered horizontally (top:70px), glass toast, hidden (opacity:0), transitions in/out
   f. #hud — bottom-left (bottom:110px left:24px), 4 lines: "PARTICLES: <span id='pc'>", "HANDS: <span id='hc'>", "RATING: 4.9 ★", "PLACED: Accenture · CSI"
   g. #stats-strip — bottom-right (bottom:110px right:24px), 3 stats:
      - "5,000+" / "Active Students"
      - "4.9★" / "Google Rating"
      - "+200%" / "Salary Growth"
      Each stat-num: Orbitron 900 20px, gradient #FF6B35→#FF9500
   h. #tagline — bottom-center (bottom:80px), two lines:
      - #tagline-main: "Dive Deep · Build Real · Get Hired" Orbitron, letter-spacing:5px, muted white
      - #tagline-url: "thecodingsharks.in · Bhawarkua, Indore" small orange muted
   i. #word-switcher — bottom-center (bottom:24px), 6 buttons: Sharks (active), Code, Hired, Build, Indore, AI — dark glass style with orange borders, Orbitron 10px, hover/active glow effect

---

### CSS RULES
- body: background:#000, overflow:hidden, cursor:none, font-family Space Grotesk
- #vignette: radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.82) 100%)
- #colorgrade: linear-gradient(135deg, rgba(255,107,53,0.07) 0%, rgba(0,0,0,0) 50%, rgba(255,45,85,0.05) 100%), mix-blend-mode:screen
- @keyframes fadeIn: from opacity:0 to opacity:1
- @keyframes pulse: 0%,100% opacity:0.6 / 50% opacity:1
- .word-btn: dark glass (rgba(0,0,0,0.45)), backdrop-filter blur(10px), border 1px rgba(255,107,53,0.3), color rgba(255,149,0,0.7), Orbitron 10px, border-radius:3px, uppercase, letter-spacing:2px
- .word-btn:hover / .word-btn.active: background rgba(255,107,53,0.2), border-color rgba(255,107,53,0.9), color:#FF9500, box-shadow 0 0 16px rgba(255,107,53,0.3)

---

### JAVASCRIPT — full implementation

**Global vars:**
- canvas, ctx, video, statusDiv, pcEl, hcEl, tipEl
- W, H, t=0
- particles=[], targetPoints=[], handLandmarks=[]
- currentWord='SHARKS', transitioning=false
- lastHandTime=0, autoCycleTimer
- mpReady=false, mpHands=null

**resize():** Set canvas W/H = window inner dimensions, call buildTargets(currentWord) + rebuildParticles(). Add window resize listener.

**Tips system:** Array of 4 tips: ['🦈 Raise both hands to scatter particles', '✋ Push slowly — particles resist your hands', '🎯 Switch words using buttons below', '🔴 Record screen for Instagram Reels']. showTip() fades tipEl in for 3s then out. Start first tip at 5s delay, cycle every 6s.

**buildTargets(word):**
- Create offscreen canvas (W×H)
- Font: `900 ${Math.min(W*0.28, H*0.38, 280)}px "Orbitron","Arial Black",monospace`
- Draw word centered (textAlign:center, textBaseline:middle) in white
- Sample pixels every step=Math.max(5, floor(W/220)) — collect all pixels with alpha>100
- Fisher-Yates shuffle the points array
- Assign to targetPoints

**Particle class:**
- constructor(target): random x/y start, vx/vy ±4, size 1.4–3.2, alpha 0.6–1.0, noise (Perlin substitute), ns 0.012–0.028, colorShift (60% orange #FF6B35, 20% red #FF2D23, 20% gold #FFB400)
- update(hands):
  - Spring toward target: vx += dx*0.055, vy += dy*0.055
  - Add Perlin-like noise: vx += cos(noise)*0.28, vy += sin(noise)*0.28
  - Hand repulsion: for each hand landmark (every 2nd), radius R=150px, force = ((R-dist)/R)*16, push particle away
  - Damping: vx*=0.86, vy*=0.86
  - Clamp to canvas bounds
- draw():
  - Determine "fast" if speed > 3.5
  - If fast: draw motion trail line (strokeStyle with alpha 0.38 max)
  - Draw filled circle (arc), size enlarged 1.4x if fast
  - Colors: colorShift 0 → rgba(255,107,53), 1 → rgba(255,45,35), 2 → rgba(255,180,0)

**rebuildParticles():**
- count = Math.min(1800, Math.max(targetPoints.length||600, 600))
- If particles empty: create new Particle for each slot
- Else: trim/expand array, reassign targets
- Update pcEl text

**switchWord(word, btn):**
- Guard: if transitioning or same word, return
- Set transitioning=true
- Scatter particles (random vx/vy impulse ±10)
- After 350ms: buildTargets(word), rebuildParticles(), transitioning=false
- Update active class on buttons

**Hand skeleton drawing — drawHands(hands):**
- Connection pairs: [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]]
- Draw lines: strokeStyle rgba(255,107,53,0.3), lineWidth 1, MIRRORED (use (1-lm.x)*W for x)
- Draw joint dots at indices [0,4,8,12,16,20]:
  - Outer glow ring: radius+5, lineWidth 7, very transparent
  - Inner ring: lineWidth 1.5, bright orange/gold
  - Filled dot center: index 0 → gold (#FFB300), others → orange (#FF6B35)
  - Pulse animation: scale by 1+0.12*sin(t*0.07+idx*0.9)

**Ambient dots — drawAmbient():**
- 40 ambient dots drifting slowly across screen
- Each: random x,y,vx,vy (very slow ±0.0007), radius 0.3–1.4, alpha 0.02–0.09
- Color: rgba(255,107,53,alpha)
- Wrap around screen edges using modulo

**drawScanline():**
- Draw 4 corner L-brackets (50px each arm), color rgba(255,107,53,0.15), lineWidth 1.5

**render() — main animation loop:**
1. t++
2. If video.readyState >= 2: draw mirrored webcam (ctx.translate(W,0) + ctx.scale(-1,1) + drawImage). Else: fill black
3. Draw vignette directly on canvas using createRadialGradient (center transparent → edge 0.75 opacity black)
4. Motion trail: fillStyle rgba(0,0,0,0.06), fillRect full canvas
5. drawAmbient()
6. drawScanline()
7. Single pass: for each particle → p.update(handLandmarks) → p.draw() (NO ctx.filter blur — Safari incompatible)
8. If handLandmarks.length > 0: drawHands(handLandmarks)
9. Reset globalAlpha=1
10. Update pcEl and hcEl text
11. requestAnimationFrame(render)

---

**startCamera() — ⚠️ CRITICAL: follow this exact order or camera will fail on Safari/mobile:**

```js
async function startCamera() {
  try {
    // Step 1: Get stream first
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode:'user', width:{ideal:1280}, height:{ideal:720} },
      audio: false
    });

    // Step 2: Set ALL attributes BEFORE assigning srcObject (Safari requires this order)
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('autoplay', '');

    // Step 3: NOW assign the stream
    video.srcObject = stream;

    // Step 4: Wait for metadata, then play
    await new Promise((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = (e) => reject(e);
      setTimeout(resolve, 3000); // fallback timeout
    });

    try {
      await video.play();
    } catch(playErr) {
      console.warn('play() warning (may be fine):', playErr);
    }

    document.getElementById('status-text').textContent = '🦈 MOVE YOUR HANDS';
    document.getElementById('status-sub').textContent = 'Particles respond to your gestures';
    setTimeout(() => hideStatus(false), 3000);
    return true;

  } catch(e) {
    console.error('Camera error:', e);
    let msg = 'Camera Access Needed';
    let sub = 'Click allow when browser asks for camera permission';
    if (e.name === 'NotAllowedError') sub = 'Permission denied — check browser/OS camera settings';
    else if (e.name === 'NotFoundError') sub = 'No camera found on this device';
    else if (e.name === 'NotReadableError') sub = 'Camera in use by another app — close it and refresh';
    document.getElementById('status-text').textContent = '⚠️ ' + msg;
    document.getElementById('status-sub').textContent = sub;
    return false;
  }
}
```

---

**hideStatus() helper — use this instead of directly setting statusDiv opacity:**
```js
let statusHidden = false;
function hideStatus(fast) {
  if (statusHidden) return;
  statusHidden = true;
  statusDiv.style.transition = fast ? 'opacity 0.6s' : 'opacity 2s';
  statusDiv.style.opacity = '0';
}
```

---

**initMP() — MediaPipe setup:**
- new Hands({ locateFile: f => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` })
- setOptions: maxNumHands:2, modelComplexity:0 (lite), minDetectionConfidence:0.65, minTrackingConfidence:0.55
- onResults: store r.multiHandLandmarks || [] into handLandmarks; if hands detected, update lastHandTime, call hideStatus(true)
- initialize().then(() => { mpReady=true; pumpFrames(); }).catch(() => { mpReady=false; })

**pumpFrames() — manual frame pump (Safari-safe, no Camera utility):**
```js
let pumping = false;
async function pumpFrames() {
  if (!mpReady || pumping) return;
  pumping = true;
  const loop = async () => {
    if (video.readyState >= 2 && !video.paused) {
      try { await mpHands.send({image: video}); } catch(_){}
    }
    setTimeout(loop, 50); // ~20fps
  };
  loop();
}
```

**Auto-cycle:**
- WORDS array: ['SHARKS','CODE','HIRED','BUILD','INDORE','AI']
- setInterval every 4000ms: if Date.now()-lastHandTime < 5000, skip; else advance wIdx, call switchWord with matching button

**Boot sequence (last 3 lines of script):**
```js
resize();
render();
startCamera().then(ok => { if (ok) initMP(); });
```

---

### CRITICAL CONSTRAINTS — DO NOT DEVIATE
- ❌ NO ctx.filter used anywhere (breaks Safari)
- ❌ DO NOT assign video.srcObject before setting video attributes — Safari will fail
- ❌ DO NOT use `statusDiv.style.opacity !== '0'` string comparison — use the statusHidden boolean flag
- ❌ DO NOT use MediaPipe Camera utility — use manual pumpFrames() only
- ✅ Max 1800 particles (Safari performance)
- ✅ All hand landmark x-coords MIRRORED: use (1-lm.x)*W
- ✅ Video element has both `playsinline` AND `webkit-playsinline` in HTML attributes AND set via JS before srcObject
- ✅ MediaPipe loaded via <script src> tag, NOT dynamic import
- ✅ Everything in a single .html file — no external CSS or JS files except MediaPipe CDN + Google Fonts
- ✅ cursor:none on body
- ✅ Brand colors: primary #FF6B35 (orange), accent #FF9500 (amber), highlight #FFB300 (gold), danger #FF2D23 (red)
```

---

## 📋 QUICK CHECKLIST — verify output has all of these

- [ ] Hidden `<video>` with `playsinline` + `webkit-playsinline` in HTML tag
- [ ] `startCamera()` sets all video attributes BEFORE `video.srcObject = stream`
- [ ] `onloadedmetadata` Promise used before `video.play()`
- [ ] `hideStatus()` helper function with `statusHidden` boolean flag
- [ ] `hideStatus()` called in both camera success (after 3s) AND MediaPipe onResults
- [ ] Three overlay layers: `#vignette`, `#colorgrade`, `#main` canvas
- [ ] Logo with 🦈 emoji + "Coding Sharks" gradient text (Orbitron)
- [ ] Top badge: "Indore's #1 Coding Institute"
- [ ] Top pill: "⬡ GESTURE ACTIVE"
- [ ] HUD bottom-left with live PARTICLES and HANDS counters
- [ ] Stats bottom-right: 5,000+ / 4.9★ / +200%
- [ ] 6 word-switcher buttons: Sharks (active), Code, Hired, Build, Indore, AI
- [ ] Tagline: "Dive Deep · Build Real · Get Hired" + "thecodingsharks.in · Bhawarkua, Indore"
- [ ] Tip toast system (4 tips, starts at 5s, cycles every 6s)
- [ ] Particle class with spring physics + hand repulsion + 3 color variants
- [ ] Hand skeleton with mirrored X coords + pulsing joints
- [ ] 40 ambient dots + 4 corner scanline brackets
- [ ] Manual `pumpFrames()` at ~20fps (setTimeout 50ms) — NO Camera utility
- [ ] Auto-cycle every 4s, pauses 5s after hand detected
- [ ] NO `ctx.filter` anywhere
- [ ] Single self-contained `.html` file

---

## 🐛 Known Bug History (already fixed in v2)

| Bug | Old (broken) | Fixed (v2) |
|-----|-------------|------------|
| Safari camera blank | `srcObject` assigned before attributes | Attributes set first, then `srcObject` |
| play() crash | `await video.play()` immediately | Wait for `onloadedmetadata` Promise first |
| Status never hides | `style.opacity !== '0'` string check | `statusHidden` boolean flag + `hideStatus()` helper |
| Error message generic | Single catch message | `NotAllowedError` / `NotFoundError` / `NotReadableError` handled separately |
