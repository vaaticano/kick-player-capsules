(function () {
    'use strict';

    /* =========================================================
       CONFIG
       blur = false  -> no backdrop-filter (recommended: same
                        visual result, near-zero GPU cost).
       blur = true   -> real "glass" effect. Use a radius >= 4px;
                        below that it's not perceptible.
       ========================================================= */
    const CONFIG = {
        blur: false,
        blurPx: 8,
        respectReducedMotion: true, // false = always animate (useful for testing)
        green: '#53FC18',
        bg: 'rgba(0, 0, 0, 0.15)',
        bgHover: 'rgba(0, 0, 0, 0.28)',
        border: 'rgba(255, 255, 255, 0.08)',
        height: '36px'
    };

    const STYLE_ID = 'kick-yt-capsule-style';
    const old = document.getElementById(STYLE_ID);
    if (old) old.remove();

    /* ---------- Anchors (defined once) ---------- */
    const LEFT  = '.z-controls > div.flex:first-child';
    const RIGHT = '.z-controls > div.flex:has(> button[data-testid="video-player-clip"])';
    const CLIP  = '.z-controls button[data-testid="video-player-clip"]';

    const CAPSULES = [
        RIGHT,                                          // pip, clip, cc, theatre, fullscreen, settings
        `${LEFT} > div:has(svg[data-ds-icon^="Sound"])`, // volume (Quiet/Loud/Mute)
        `${LEFT} > span`                                 // timestamp
    ];
    const sel = (suffix = '') => CAPSULES.map(s => s + suffix).join(',\n');

    const blurCss = CONFIG.blur
        ? `@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
               ${sel()} {
                   backdrop-filter: blur(${CONFIG.blurPx}px) !important;
                   -webkit-backdrop-filter: blur(${CONFIG.blurPx}px) !important;
               }
           }`
        : '';

    // With OS-level "reduce motion" enabled, only the animation (transition) is
    // removed, but the end state is kept (scale + green): the effect stays visible.
    const reducedMotionCss = CONFIG.respectReducedMotion
        ? `@media (prefers-reduced-motion: reduce) {
               ${CLIP}, ${CLIP} * { transition: none !important; }
           }`
        : '';

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
    @supports selector(:has(*)) {

        .z-controls {
            --kc-bg: ${CONFIG.bg};
            --kc-bg-hover: ${CONFIG.bgHover};
            --kc-border: ${CONFIG.border};
            --kc-h: ${CONFIG.height};
            --kc-green: ${CONFIG.green};
        }

        /* 1. CAPSULES (one shared rule) */
        ${sel()} {
            background-color: var(--kc-bg) !important;
            border: 1px solid var(--kc-border) !important;
            border-radius: 100px !important;
            box-sizing: border-box !important;
            height: var(--kc-h) !important;
            padding: 0 10px !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 2px !important;
            overflow: visible !important;
            transition: background-color 0.2s ease !important;
        }

        ${RIGHT} {
            margin: 0 4px !important;
        }

        /* Stable width for the timestamp (prevents it from resizing every second) */
        ${LEFT} > span {
            font-variant-numeric: tabular-nums !important;
        }

        /* 2. LEFT GROUP: transparent container */
        ${LEFT} {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            gap: 6px !important;
        }

        /* 3. BUTTON RESET: scoped to the two groups only
              (does not touch the seekbar or the rest of the player) */
        ${LEFT} button, ${LEFT} button:hover, ${LEFT} a, ${LEFT} a:hover,
        ${RIGHT} button, ${RIGHT} button:hover, ${RIGHT} a, ${RIGHT} a:hover {
            background: transparent !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
        }

        /* Accessibility: visible focus ring for keyboard use (box-shadow was reset above) */
        ${LEFT} button:focus-visible,
        ${RIGHT} button:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.8) !important;
            outline-offset: -2px !important;
        }

        /* 4. CLIP BUTTON */
        ${CLIP} {
            transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
            transform-origin: center !important;
        }

        /* The color transition lives on the children, since they're what changes color */
        ${CLIP} * {
            transition: color 0.15s ease, fill 0.15s ease !important;
        }

        /* Keyboard focus: same green, no scale */
        ${CLIP}:focus-visible * {
            color: var(--kc-green) !important;
            fill: var(--kc-green) !important;
        }

        /* Press feedback (also works on touch) */
        ${CLIP}:active {
            transform: scale(0.95) !important;
            transition: transform 0.08s ease !important;
        }

        /* Hover only on devices with a real pointer: avoids "sticky hover" on mobile/tablet */
        @media (hover: hover) and (pointer: fine) {
            ${sel(':hover')} {
                background-color: var(--kc-bg-hover) !important;
            }
            ${CLIP}:hover {
                transform: scale(1.08) !important;
            }
            ${CLIP}:hover * {
                color: var(--kc-green) !important;
                fill: var(--kc-green) !important;
            }
        }

        ${reducedMotionCss}

        ${blurCss}
    }
    `;
    document.head.appendChild(style);
    const sysReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    console.log(`Kick capsules v5 applied (blur: ${CONFIG.blur ? CONFIG.blurPx + 'px' : 'off'}, system reduced-motion: ${sysReduced}).`);
})();
