/* ==========================================================================
   Surprise Birthday Experience - Master JavaScript Engine
   Features:
   - Web Audio API Procedural Birthday Music Box & SFX Synthesizer
   - Canvas Floating Hearts, Glowing Sparkles, & Particle Physics Engine
   - 3D CSS Interactive Cake & Lighter Automation
   - Multi-Touch / Mouse Draggable Cake Knife with Collision Detection
   - Interactive Wax-Seal Envelope Unfolding & Typewriter Letter Engine
   - Fully Responsive, Touch-Optimized & Accessible
   ========================================================================== */

(function () {
  'use strict';

  // CONFIGURATION & PERSONALIZATION DATA
  const CONFIG = {
    birthdayName: "Aruna",
    senderName: "Your Friend 💌",
    letterText: `Happy Birthday, Aruna! 💗

I hope your special day brings you endless smiles, beautiful memories, and all the happiness your heart can hold.

May this new chapter of your life be filled with exciting adventures, wonderful opportunities, and people who make you feel truly appreciated.

Always keep smiling, keep shining, and never stop being the amazing person you are. You deserve so many beautiful things in life, and I hope this year brings you closer to every dream you have.

Thank you for being such a wonderful friend. I hope your birthday is as special and lovely as you are.

Stay happy, stay blessed, and keep smiling always. ✨

With lots of best wishes and friendship,
Your Friend 💌`
  };

  // GLOBAL STATE
  const state = {
    currentStage: 1,
    litCandlesCount: 0,
    totalCandles: 4,
    isCandlesLighting: false,
    isCakeCut: false,
    isMuted: false,
    audioContext: null,
    isAudioPlaying: false,
    typewriterActive: false
  };

  // DOM ELEMENTS
  const dom = {
    audioBtn: document.getElementById('audio-toggle'),
    soundOnIcon: document.querySelector('.icon-sound-on'),
    soundOffIcon: document.querySelector('.icon-sound-off'),
    audioLabel: document.querySelector('.audio-label'),
    bgCanvas: document.getElementById('bg-canvas'),
    celebCanvas: document.getElementById('celebration-canvas'),
    
    // Stages
    stage1: document.getElementById('stage-1'),
    stage2: document.getElementById('stage-2'),
    stage4: document.getElementById('stage-4'),
    stage5: document.getElementById('stage-5'),
    
    // Buttons & Interactives
    startBtn: document.getElementById('start-btn'),
    lighter: document.getElementById('lighter'),
    autoLightBtn: document.getElementById('auto-light-btn'),
    wishModal: document.getElementById('wish-modal'),
    wishDoneBtn: document.getElementById('wish-done-btn'),
    cutGuide: document.getElementById('cut-guide'),
    cakeSlice: document.getElementById('cake-slice'),
    draggableKnife: document.getElementById('draggable-knife'),
    fallbackCutBtn: document.getElementById('fallback-cut-btn'),
    envelope: document.getElementById('envelope'),
    letterModal: document.getElementById('letter-modal'),
    closeLetterBtn: document.getElementById('close-letter-btn'),
    letterContent: document.getElementById('letter-content-body'),
    replayBtn: document.getElementById('replay-btn'),
    shareBtn: document.getElementById('share-love-btn'),
    finalToast: document.getElementById('final-toast'),
    
    candles: [
      document.getElementById('candle-1'),
      document.getElementById('candle-2'),
      document.getElementById('candle-3'),
      document.getElementById('candle-4')
    ]
  };

  // INITIALIZATION ON DOM READY
  document.addEventListener('DOMContentLoaded', () => {
    initCanvases();
    setupEventListeners();
    setupKnifeDrag();
  });

  /* ==========================================================================
     WEB AUDIO API PROCEDURAL MUSIC & SOUND EFFECTS SYNTHESIZER
     ========================================================================== */
  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.isLooping = false;
      this.isPlaying = false;
      this.melodyTimer = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playNote(freq, duration = 0.5, type = 'sine', gainVal = 0.15) {
      if (state.isMuted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn('Audio note play error:', e);
      }
    }

    // Procedural Music Box "Happy Birthday" Melody Engine
    startBirthdayMusic() {
      this.init();
      if (this.isPlaying || state.isMuted) return;
      this.isPlaying = true;

      // Note Frequencies for Happy Birthday Melody (in C Major / G Major kalimba style)
      // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
      const notes = [
        { note: 261.63, dur: 0.4, delay: 0 },
        { note: 261.63, dur: 0.4, delay: 0.4 },
        { note: 293.66, dur: 0.8, delay: 0.8 },
        { note: 261.63, dur: 0.8, delay: 1.6 },
        { note: 349.23, dur: 0.8, delay: 2.4 },
        { note: 329.63, dur: 1.4, delay: 3.2 },

        { note: 261.63, dur: 0.4, delay: 4.8 },
        { note: 261.63, dur: 0.4, delay: 5.2 },
        { note: 293.66, dur: 0.8, delay: 5.6 },
        { note: 261.63, dur: 0.8, delay: 6.4 },
        { note: 392.00, dur: 0.8, delay: 7.2 },
        { note: 349.23, dur: 1.4, delay: 8.0 },

        { note: 261.63, dur: 0.4, delay: 9.6 },
        { note: 261.63, dur: 0.4, delay: 10.0 },
        { note: 523.25, dur: 0.8, delay: 10.4 },
        { note: 440.00, dur: 0.8, delay: 11.2 },
        { note: 349.23, dur: 0.8, delay: 12.0 },
        { note: 329.63, dur: 0.8, delay: 12.8 },
        { note: 293.66, dur: 1.2, delay: 13.6 },

        { note: 466.16, dur: 0.4, delay: 15.0 },
        { note: 466.16, dur: 0.4, delay: 15.4 },
        { note: 440.00, dur: 0.8, delay: 15.8 },
        { note: 349.23, dur: 0.8, delay: 16.6 },
        { note: 392.00, dur: 0.8, delay: 17.4 },
        { note: 349.23, dur: 1.6, delay: 18.2 }
      ];

      const playSequence = () => {
        if (!this.isPlaying || state.isMuted) return;
        notes.forEach(n => {
          setTimeout(() => {
            if (this.isPlaying && !state.isMuted) {
              this.playNote(n.note, n.dur, 'triangle', 0.12);
              // Soft warm bass note accompaniment
              if (n.delay % 1.6 === 0) {
                this.playNote(n.note / 2, n.dur * 1.5, 'sine', 0.08);
              }
            }
          }, n.delay * 1000);
        });

        // Loop after 21 seconds
        this.melodyTimer = setTimeout(playSequence, 21000);
      };

      playSequence();
    }

    stopMusic() {
      this.isPlaying = false;
      if (this.melodyTimer) clearTimeout(this.melodyTimer);
    }

    // Sound FX Helpers
    playSparkSFX() {
      this.init();
      this.playNote(800, 0.1, 'sawtooth', 0.1);
      setTimeout(() => this.playNote(1200, 0.15, 'sine', 0.12), 80);
    }

    playFlameLitSFX() {
      this.init();
      this.playNote(400, 0.3, 'sine', 0.15);
      this.playNote(600, 0.4, 'triangle', 0.1);
      setTimeout(() => this.playNote(900, 0.5, 'sine', 0.18), 120);
    }

    playChimeMagicSFX() {
      this.init();
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        setTimeout(() => this.playNote(freq, 0.6, 'sine', 0.15), idx * 100);
      });
    }

    playCutSFX() {
      this.init();
      this.playNote(300, 0.2, 'sawtooth', 0.08);
      setTimeout(() => this.playChimeMagicSFX(), 150);
    }

    playEnvelopeSFX() {
      this.init();
      this.playNote(440, 0.3, 'sine', 0.1);
      setTimeout(() => this.playNote(880, 0.5, 'triangle', 0.15), 150);
    }
  }

  const audio = new AudioEngine();

  /* ==========================================================================
     CANVAS PARTICLE ENGINE (BACKGROUND SPARKLES & CELEBRATION BALLOONS/CONFETTI)
     ========================================================================== */
  let bgCtx, celebCtx;
  let bgParticles = [];
  let celebrationParticles = [];
  let animFrameBg, animFrameCeleb;

  function initCanvases() {
    bgCtx = dom.bgCanvas.getContext('2d');
    celebCtx = dom.celebCanvas.getContext('2d');

    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);

    createBgParticles();
    animateBgParticles();
  }

  function resizeCanvases() {
    dom.bgCanvas.width = window.innerWidth;
    dom.bgCanvas.height = window.innerHeight;
    dom.celebCanvas.width = window.innerWidth;
    dom.celebCanvas.height = window.innerHeight;
  }

  // Background Ambient Hearts & Sparkles
  function createBgParticles() {
    bgParticles = [];
    const count = Math.min(Math.floor(window.innerWidth / 15), 45);
    for (let i = 0; i < count; i++) {
      bgParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 12 + 6,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: Math.sin(Math.random() * Math.PI) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        type: Math.random() > 0.4 ? 'heart' : 'sparkle',
        color: Math.random() > 0.5 ? '#f8c8dc' : '#e6e6fa'
      });
    }
  }

  function animateBgParticles() {
    bgCtx.clearRect(0, 0, dom.bgCanvas.width, dom.bgCanvas.height);

    bgParticles.forEach(p => {
      p.y -= p.speedY;
      p.x += Math.sin(p.y * 0.02) * 0.3;

      if (p.y < -20) {
        p.y = dom.bgCanvas.height + 20;
        p.x = Math.random() * dom.bgCanvas.width;
      }

      bgCtx.save();
      bgCtx.globalAlpha = p.opacity;

      if (p.type === 'heart') {
        drawHeart(bgCtx, p.x, p.y, p.size, p.color);
      } else {
        drawSparkle(bgCtx, p.x, p.y, p.size, '#f3e5ab');
      }

      bgCtx.restore();
    });

    animFrameBg = requestAnimationFrame(animateBgParticles);
  }

  // Helper Drawing Functions
  function drawHeart(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
  }

  function drawSparkle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    }
    ctx.fill();
  }

  // Celebration Confetti & Floating Balloons Engine
  function triggerCelebrationParticles(burst = false) {
    const particleCount = burst ? 120 : 60;
    const colors = ['#f8c8dc', '#e84393', '#d4af37', '#e6e6fa', '#ffeb3b', '#ff7eb3'];

    for (let i = 0; i < particleCount; i++) {
      celebrationParticles.push({
        x: Math.random() * dom.celebCanvas.width,
        y: burst ? dom.celebCanvas.height * 0.6 : -20,
        vx: (Math.random() - 0.5) * 6,
        vy: burst ? -(Math.random() * 8 + 4) : Math.random() * 3 + 2,
        size: Math.random() * 14 + 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1,
        type: Math.random() > 0.6 ? 'balloon' : (Math.random() > 0.3 ? 'confetti' : 'heart'),
        opacity: 1
      });
    }

    if (!animFrameCeleb) {
      animateCelebration();
    }
  }

  function animateCelebration() {
    celebCtx.clearRect(0, 0, dom.celebCanvas.width, dom.celebCanvas.height);

    for (let i = celebrationParticles.length - 1; i >= 0; i--) {
      const p = celebrationParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      if (p.type === 'confetti') {
        p.vy += 0.05; // gravity
      }

      if (p.y > dom.celebCanvas.height + 40 || p.x < -30 || p.x > dom.celebCanvas.width + 30) {
        celebrationParticles.splice(i, 1);
        continue;
      }

      celebCtx.save();
      celebCtx.translate(p.x, p.y);
      celebCtx.rotate(p.rotation);
      celebCtx.globalAlpha = p.opacity;

      if (p.type === 'balloon') {
        // Draw Cute Floating Balloon
        celebCtx.fillStyle = p.color;
        celebCtx.beginPath();
        celebCtx.ellipse(0, 0, p.size, p.size * 1.25, 0, 0, Math.PI * 2);
        celebCtx.fill();

        // Balloon knot & string
        celebCtx.fillStyle = p.color;
        celebCtx.beginPath();
        celebCtx.arc(0, p.size * 1.25, 2, 0, Math.PI * 2);
        celebCtx.fill();

        celebCtx.strokeStyle = 'rgba(255,255,255,0.7)';
        celebCtx.lineWidth = 1;
        celebCtx.beginPath();
        celebCtx.moveTo(0, p.size * 1.25);
        celebCtx.lineTo(Math.sin(p.rotation) * 8, p.size * 1.25 + 20);
        celebCtx.stroke();
      } else if (p.type === 'heart') {
        drawHeart(celebCtx, 0, 0, p.size, p.color);
      } else {
        // Confetti Strip
        celebCtx.fillStyle = p.color;
        celebCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }

      celebCtx.restore();
    }

    if (celebrationParticles.length > 0) {
      animFrameCeleb = requestAnimationFrame(animateCelebration);
    } else {
      animFrameCeleb = null;
    }
  }

  /* ==========================================================================
     EVENT LISTENERS & STAGE TRANSITIONS
     ========================================================================== */
  function setupEventListeners() {
    // Audio Toggle
    dom.audioBtn.addEventListener('click', toggleAudio);

    // Stage 1 -> Stage 2
    dom.startBtn.addEventListener('click', () => {
      audio.init();
      audio.startBirthdayMusic();
      audio.playChimeMagicSFX();
      switchStage(1, 2);
    });

    // Lighter Click
    dom.lighter.addEventListener('click', handleLighterClick);
    dom.autoLightBtn.addEventListener('click', autoLightAllCandles);

    // Wish Done -> Stage 4
    dom.wishDoneBtn.addEventListener('click', () => {
      dom.wishModal.classList.remove('show');
      audio.playChimeMagicSFX();

      // Move cake container into cutting scene
      const cuttingScene = document.getElementById('cutting-scene');
      const cakeContainer = document.getElementById('cake-container');
      if (cuttingScene && cakeContainer) {
        cuttingScene.insertBefore(cakeContainer, dom.draggableKnife);
      }

      switchStage(2, 4);
      setTimeout(() => {
        dom.cutGuide.classList.add('show');
      }, 600);
    });

    // Individual Candle Click Support
    dom.candles.forEach(candle => {
      candle.addEventListener('click', () => {
        if (!candle.classList.contains('lit')) {
          candle.classList.add('lit');
          audio.playFlameLitSFX();
          triggerCelebrationParticles(false);
          state.litCandlesCount++;
          if (state.litCandlesCount >= state.totalCandles) {
            onAllCandlesLit();
          }
        }
      });
    });

    // Fallback Cut Button
    dom.fallbackCutBtn.addEventListener('click', triggerCakeCut);

    // Envelope Click
    dom.envelope.addEventListener('click', openEnvelope);

    // Font Toggle Button Listener
    const fontToggleBtn = document.getElementById('font-toggle-btn');
    if (fontToggleBtn) {
      fontToggleBtn.addEventListener('click', () => {
        const isCursive = dom.letterContent.classList.toggle('cursive-font');
        fontToggleBtn.querySelector('span').textContent = isCursive ? "Font: Cursive ✒️" : "Font: Clean 🔤";
        audio.playSparkSFX();
      });
    }

    // Letter Modal Close & Replay
    dom.closeLetterBtn.addEventListener('click', closeLetterModal);
    dom.replayBtn.addEventListener('click', replayExperience);
    dom.shareBtn.addEventListener('click', () => {
      triggerCelebrationParticles(true);
      audio.playChimeMagicSFX();
      showToast("Sent with love & hugs! 🤗💗");
    });
  }

  function toggleAudio() {
    state.isMuted = !state.isMuted;
    if (state.isMuted) {
      dom.soundOnIcon.classList.add('hidden');
      dom.soundOffIcon.classList.remove('hidden');
      dom.audioBtn.classList.add('muted');
      dom.audioLabel.textContent = "Music: Off";
      audio.stopMusic();
    } else {
      dom.soundOnIcon.classList.remove('hidden');
      dom.soundOffIcon.classList.add('hidden');
      dom.audioBtn.classList.remove('muted');
      dom.audioLabel.textContent = "Music: On";
      audio.startBirthdayMusic();
    }
  }

  function switchStage(fromStageNum, toStageNum) {
    const fromStage = document.getElementById(`stage-${fromStageNum}`);
    const toStage = document.getElementById(`stage-${toStageNum}`);

    if (fromStage) {
      fromStage.classList.remove('active');
      setTimeout(() => fromStage.classList.add('hidden-stage'), 600);
    }

    if (toStage) {
      toStage.classList.remove('hidden-stage');
      setTimeout(() => {
        toStage.classList.add('active');
        state.currentStage = toStageNum;
      }, 100);
    }
  }

  /* ==========================================================================
     STAGE 2: LIGHTER & CANDLE IGNITION LOGIC
     ========================================================================== */
  function handleLighterClick() {
    if (state.isCandlesLighting || state.litCandlesCount >= state.totalCandles) return;
    autoLightAllCandles();
  }

  function autoLightAllCandles() {
    if (state.isCandlesLighting || state.litCandlesCount >= state.totalCandles) return;
    state.isCandlesLighting = true;

    // Lighter open lid & ignite flame
    dom.lighter.classList.add('open');
    audio.playSparkSFX();

    let candleIdx = 0;

    function lightNext() {
      if (candleIdx < dom.candles.length) {
        const candle = dom.candles[candleIdx];

        // Animate flame appearing
        candle.classList.add('lit');
        audio.playFlameLitSFX();
        triggerCelebrationParticles(false);

        state.litCandlesCount++;
        candleIdx++;

        setTimeout(lightNext, 600);
      } else {
        // All candles lit!
        setTimeout(() => {
          dom.lighter.classList.remove('open');
          state.isCandlesLighting = false;
          onAllCandlesLit();
        }, 500);
      }
    }

    setTimeout(lightNext, 400);
  }

  function onAllCandlesLit() {
    audio.playChimeMagicSFX();
    triggerCelebrationParticles(true);

    // Show Wish Modal
    setTimeout(() => {
      dom.wishModal.classList.remove('hidden');
      setTimeout(() => dom.wishModal.classList.add('show'), 50);
    }, 800);
  }

  /* ==========================================================================
     STAGE 4: INTERACTIVE DRAGGABLE KNIFE & CUTTING ENGINE
     ========================================================================== */
  let isDraggingKnife = false;
  let dragOffsetX = 0, dragOffsetY = 0;

  function setupKnifeDrag() {
    const knife = document.getElementById('draggable-knife') || dom.draggableKnife;
    if (!knife) return;

    // Pointer Events (Mouse / Touch)
    knife.addEventListener('pointerdown', onKnifePointerDown);
    window.addEventListener('pointermove', onKnifePointerMove);
    window.addEventListener('pointerup', onKnifePointerUp);
    window.addEventListener('pointercancel', onKnifePointerUp);

    // Touch Event Fallbacks for Mobile Browsers
    knife.addEventListener('touchstart', onKnifeTouchStart, { passive: false });
    window.addEventListener('touchmove', onKnifeTouchMove, { passive: false });
    window.addEventListener('touchend', onKnifeTouchEnd);

    // Direct Tap / Click Knife to Cut
    knife.addEventListener('click', () => {
      if (!state.isCakeCut) {
        triggerCakeCut();
      }
    });
  }

  function onKnifePointerDown(e) {
    if (state.isCakeCut) return;
    const knife = dom.draggableKnife;
    if (!knife) return;

    isDraggingKnife = true;
    try {
      knife.setPointerCapture(e.pointerId);
    } catch (err) {}

    const rect = knife.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    knife.style.transition = 'none';
    knife.style.right = 'auto';
  }

  function onKnifePointerMove(e) {
    if (!isDraggingKnife || state.isCakeCut) return;
    const knife = dom.draggableKnife;
    const cuttingScene = document.getElementById('cutting-scene');
    if (!knife || !cuttingScene) return;

    const sceneRect = cuttingScene.getBoundingClientRect();
    let newX = e.clientX - sceneRect.left - dragOffsetX;
    let newY = e.clientY - sceneRect.top - dragOffsetY;

    // Constrain position within scene
    newX = Math.max(-20, Math.min(newX, sceneRect.width - 60));
    newY = Math.max(-20, Math.min(newY, sceneRect.height - 40));

    knife.style.left = `${newX}px`;
    knife.style.top = `${newY}px`;

    // Check collision with cake element
    const cakeContainer = document.getElementById('cake-container');
    if (cakeContainer) {
      const knifeRect = knife.getBoundingClientRect();
      const cakeRect = cakeContainer.getBoundingClientRect();

      const isOverlapping = !(
        knifeRect.right < cakeRect.left + 30 ||
        knifeRect.left > cakeRect.right - 30 ||
        knifeRect.bottom < cakeRect.top + 20 ||
        knifeRect.top > cakeRect.bottom - 20
      );

      if (isOverlapping) {
        triggerCakeCut();
      }
    }
  }

  function onKnifePointerUp(e) {
    if (!isDraggingKnife) return;
    isDraggingKnife = false;
    const knife = dom.draggableKnife;
    if (knife) {
      knife.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
  }

  function onKnifeTouchStart(e) {
    if (state.isCakeCut) return;
    const touch = e.touches[0];
    if (!touch) return;

    const knife = dom.draggableKnife;
    if (!knife) return;

    isDraggingKnife = true;
    const rect = knife.getBoundingClientRect();
    dragOffsetX = touch.clientX - rect.left;
    dragOffsetY = touch.clientY - rect.top;

    knife.style.transition = 'none';
    knife.style.right = 'auto';
    e.preventDefault();
  }

  function onKnifeTouchMove(e) {
    if (!isDraggingKnife || state.isCakeCut) return;
    const touch = e.touches[0];
    if (!touch) return;

    onKnifePointerMove(touch);
    e.preventDefault();
  }

  function onKnifeTouchEnd() {
    isDraggingKnife = false;
  }

  function triggerCakeCut() {
    if (state.isCakeCut) return;
    state.isCakeCut = true;

    audio.playCutSFX();
    dom.cutGuide.classList.remove('show');

    // Slice separation animation
    dom.cakeSlice.classList.add('separated');
    triggerCelebrationParticles(true);

    showToast("Delicious slice cut! 🍰✨");

    // Transition to Stage 5 (Envelope) after cut
    setTimeout(() => {
      switchStage(4, 5);
      audio.playChimeMagicSFX();
    }, 1600);
  }

  /* ==========================================================================
     STAGE 5: ENVELOPE & TYPEWRITER LETTER ENGINE
     ========================================================================== */
  function openEnvelope() {
    if (dom.envelope.classList.contains('open')) return;

    dom.envelope.classList.add('open');
    audio.playEnvelopeSFX();
    triggerCelebrationParticles(true);

    setTimeout(() => {
      dom.letterModal.classList.remove('hidden');
      setTimeout(() => {
        dom.letterModal.classList.add('show');
        startTypewriterEffect();
      }, 100);
    }, 800);
  }

  function startTypewriterEffect() {
    if (state.typewriterActive) return;
    state.typewriterActive = true;

    dom.letterContent.textContent = '';
    const text = CONFIG.letterText;
    let charIdx = 0;

    function typeChar() {
      if (charIdx < text.length) {
        dom.letterContent.textContent += text.charAt(charIdx);
        charIdx++;
        
        // Scroll letter as it types
        const scrollArea = dom.letterModal.querySelector('.letter-scroll-area');
        if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;

        setTimeout(typeChar, 22);
      } else {
        state.typewriterActive = false;
        triggerCelebrationParticles(true);
        showFinalCelebration();
      }
    }

    typeChar();
  }

  function showFinalCelebration() {
    showToast(`Happy Birthday Once Again, ${CONFIG.birthdayName}! 🎂💖`);
    triggerCelebrationParticles(true);
  }

  function closeLetterModal() {
    dom.letterModal.classList.remove('show');
    setTimeout(() => dom.letterModal.classList.add('hidden'), 500);
  }

  /* ==========================================================================
     REPLAY & UTILITIES
     ========================================================================== */
  function replayExperience() {
    // Reset State
    state.currentStage = 1;
    state.litCandlesCount = 0;
    state.isCandlesLighting = false;
    state.isCakeCut = false;
    state.typewriterActive = false;

    // Move cake container back to stage 2
    const cakeDisplayWrapper = document.getElementById('cake-display-wrapper');
    const cakeContainer = document.getElementById('cake-container');
    const lighterWrapper = document.getElementById('lighter-wrapper');
    if (cakeDisplayWrapper && cakeContainer) {
      cakeDisplayWrapper.insertBefore(cakeContainer, lighterWrapper);
    }

    // Reset Elements
    dom.candles.forEach(c => c.classList.remove('lit'));
    dom.cakeSlice.classList.remove('separated');
    dom.envelope.classList.remove('open');
    dom.letterModal.classList.remove('show');
    dom.letterModal.classList.add('hidden');
    dom.finalToast.classList.remove('show');

    // Reset Knife Position
    dom.draggableKnife.style.left = '';
    dom.draggableKnife.style.top = '';

    // Switch back to stage 1
    document.querySelectorAll('.stage').forEach(s => {
      s.classList.remove('active');
      s.classList.add('hidden-stage');
    });

    dom.stage1.classList.remove('hidden-stage');
    setTimeout(() => dom.stage1.classList.add('active'), 100);

    audio.playChimeMagicSFX();
    showToast("Replaying your surprise! 💖");
  }

  function showToast(msg) {
    const toast = dom.finalToast;
    toast.querySelector('.toast-text').textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

})();
