# Technical Debt & Concerns

## Known Issues and Tech Debt
- **Outstanding Tasks:** A source code scan yielded zero explicit inline `// TODO`, `// FIXME`, or `// HACK` comments indicating there's no major tracked technical debt embedded internally.
- **Architectural Overlap:** Components are heavily segregated into domains (`brilliance`, `optimus`, `landing`), which may potentially lead to code duplication natively when design implementations converge.

## Performance Concerns
- **WebGL and UI Overlay Complexity:** The app concurrently mounts GSAP transitions, complex Framer Motion composite tracking mechanisms, and WebGL React Three Fiber scenes. Careful calibration is mandatory to ensure cross-device consistency and maintain 60 FPS, notably impacting low-end mobile interfaces.
- **Lacking Automated Tests:** Without continuous automated regression (via Vitest/Playwright), cascading style sheet modification and motion-dom hierarchy mutation carry inherently high risk during code merge scenarios.

## Security
- No explicit surface-level secret or access vulnerability tokens explicitly hardcoded in the codebase were flagged. The integration with Better-Auth dictates the backend handles credential exchanges safely if provisioned properly.
