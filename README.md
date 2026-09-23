# Kick Video Player Controls - Capsule UI Proposal

A lightweight, high-performance UI/UX refactor for Kick.com's video player controls (`.z-controls`).

## 🚀 Features & Enhancements

- **Capsule Architecture:** Clean rounded capsules (`border-radius: 999px`) grouping volume, timestamp, and right-side action controls with subtle semi-transparent background (`rgba(0, 0, 0, 0.15)`).
- **Interactive Clip Button:** Micro-interaction featuring a smooth scale effect (`scale(1.08)`) with a custom overshoot spring curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) and Kick's signature green color highlight (`#53FC18`).
- **Tabular Timestamps:** Applied `font-variant-numeric: tabular-nums` to ensure stable width and eliminate layout jitter as time progresses.
- **Performance Optimized:** Animated attributes restricted strictly to `transform` and `color` to leverage GPU compositing and prevent reflows.
- **Accessibility Ready:** Includes full support for `prefers-reduced-motion` and `@media (hover: hover)` targeting to prevent sticky hover states on touch devices.

## 📁 Repository Structure

- `kick-capsules-native-en.css`: Clean production-ready CSS with custom CSS variables, zero `:has()` dependencies, and no `!important` rules—designed for native component integration.
- `kick-capsules-v5-en.js`: Injected proof-of-concept script for testing directly on the live site.
