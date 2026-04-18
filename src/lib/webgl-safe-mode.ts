"use client";

const WEBGL_SAFE_MODE_KEY = "softree:webgl-safe-mode";
const WEBGL_SAFE_MODE_EVENT = "softree:webgl-safe-mode-change";
const WEBGL_GUARD_FLAG = "__softreeWebGLGuardInstalled";

type SafeModeDetail = {
  enabled: boolean;
  reason?: string;
};

function emitSafeModeChange(detail: SafeModeDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<SafeModeDetail>(WEBGL_SAFE_MODE_EVENT, { detail })
  );
}

export function isWebGLSafeModeEnabled() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(WEBGL_SAFE_MODE_KEY) === "1";
}

export function enableWebGLSafeMode(reason = "webgl-context-loss") {
  if (typeof window === "undefined") return;
  if (!isWebGLSafeModeEnabled()) {
    window.sessionStorage.setItem(WEBGL_SAFE_MODE_KEY, "1");
  }
  emitSafeModeChange({ enabled: true, reason });
}

export function subscribeWebGLSafeMode(
  callback: (detail: SafeModeDetail) => void
) {
  if (typeof window === "undefined") return () => { };

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<SafeModeDetail>).detail;
    callback(detail ?? { enabled: isWebGLSafeModeEnabled() });
  };

  window.addEventListener(WEBGL_SAFE_MODE_EVENT, handler);
  return () => window.removeEventListener(WEBGL_SAFE_MODE_EVENT, handler);
}

export function installWebGLSafeModeGuard() {
  if (typeof window === "undefined") return;
  if ((window as any)[WEBGL_GUARD_FLAG]) return;
  (window as any)[WEBGL_GUARD_FLAG] = true;

  const activate = (reason: string) => enableWebGLSafeMode(reason);

  window.addEventListener(
    "webglcontextlost",
    (event) => {
      event.preventDefault?.();
      activate("webglcontextlost");
    },
    true
  );

  window.addEventListener(
    "webglcontextcreationerror",
    () => {
      activate("webglcontextcreationerror");
    },
    true
  );

  window.addEventListener(
    "error",
    (event) => {
      const msg =
        (event as ErrorEvent)?.message ||
        String((event as any)?.error?.message || "");
      if (
        msg.includes("THREE.WebGLRenderer") ||
        msg.includes("WebGL context could not be created") ||
        msg.includes("context loss")
      ) {
        activate("renderer-error");
      }
    },
    true
  );
}

