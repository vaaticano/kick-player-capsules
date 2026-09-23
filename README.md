# Kick Video Player Controls - Capsule UI Proposal

A lightweight, high-performance UI/UX refactor for Kick.com's video player controls (`.z-controls`).

---

## 📽️ Video Demo & Preview

Check out how the new UI animations, capsule layout, and interactive Clip button work in real-time:

[![Watch the demo on YouTube](https://img.youtube.com/vi/TjQvTNvev9g/hqdefault.jpg)](https://youtu.be/TjQvTNvev9g "Click to watch on YouTube")

> 💡 *Click the image above to watch the full video preview on YouTube.*

---

## 🚀 Features & Enhancements

- **Capsule Architecture:** Clean rounded capsules (`border-radius: 999px`) grouping volume, timestamp, and right-side action controls with subtle semi-transparent background (`rgba(0, 0, 0, 0.15)`).
- **Interactive Clip Button:** Micro-interaction featuring a smooth scale effect (`scale(1.08)`) with a custom overshoot spring curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) and Kick's signature green color highlight (`#53FC18`).
- **Tabular Timestamps:** Applied `font-variant-numeric: tabular-nums` to ensure stable width and eliminate layout jitter as time progresses.
- **Performance Optimized:** Animated attributes restricted strictly to `transform` and `color` to leverage GPU compositing and prevent reflows.
- **Accessibility Ready:** Includes full support for `prefers-reduced-motion` and `@media (hover: hover)` targeting to prevent sticky hover states on touch devices.

---

## 📁 Repository Structure

This repository contains two distinct implementations depending on how you wish to review or integrate the proposal:

### 1. `kick-capsules-v5-en.js` (Injected Script / Proof of Concept)
- **Purpose:** Fast live-testing directly in your browser.
- **How to test:** 
  1. Open Kick.com on any active stream in Google Chrome, Brave, or Edge.
  2. Open Developer Tools (`F12` or `Ctrl+Shift+I`) and switch to the **Console** tab.
  3. Copy the full content of `kick-capsules-v5-en.js`, paste it into the console, and hit `Enter`.
  4. The control bar (`.z-controls`) will immediately update with the enhanced capsule layout, hover states, and Clip button scaling.

### 2. `kick-capsules-native-en.css` (Clean Production CSS)
- **Purpose:** Production-ready stylesheet for native UI integration in React/Vue components.
- **Key Technical Details:**
  - Zero `:has()` selectors or `!important` flags (clean cascade architecture).
  - Uses scoped CSS Custom Properties (`--kc-green`, `--kc-capsule-bg`, `--kc-clip-dur`, etc.) for instant theme customization.
  - Fully GPU-optimized: animations target only `transform` and `color` properties to prevent DOM layout reflows.
