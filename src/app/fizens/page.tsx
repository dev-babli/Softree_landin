"use client";

import { useState } from "react";

export default function FizensExactClone() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          zIndex: 9999
        }}>
          <div style={{ fontFamily: "sans-serif", fontSize: 16 }}>Loading Softree...</div>
        </div>
      )}
      <iframe
        src="/fizens-html/fizens-softree.html?v=softree-runtime-r4"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          display: loaded ? "block" : "none"
        }}
        onLoad={() => setLoaded(true)}
        title="Softree - Creative Technology Studio"
      />
    </>
  );
}
