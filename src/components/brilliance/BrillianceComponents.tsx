"use client";

import React, { memo } from "react";

// Reusable, memoized Badge component for performance-stable primitives
export const Badge = memo(({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)] shadow-xs">
      <div className="w-[14px] h-[14px] relative overflow-hidden flex items-center justify-center">{icon}</div>
      <div className="text-center flex justify-center flex-col text-[#37322F] text-xs font-medium leading-3 font-sans">
        {text}
      </div>
    </div>
  );
});

Badge.displayName = "Badge";

interface DashboardPreviewProps {
  activeCard: number;
}

// Memoized Dashboard preview content to avoid complex switch/case logic on each page render
export const DashboardPreview = memo(({ activeCard }: DashboardPreviewProps) => {
  const content = (() => {
    switch (activeCard) {
      case 0:
        return "Customer Subscription Status and Details";
      case 1:
        return "Analytics Dashboard - Real-time Insights";
      case 2:
        return "Data Visualization - Charts and Metrics";
      default:
        return "Customer Subscription Status and Details";
    }
  })();

  return <div className="text-[#828387] text-sm">{content}</div>;
});

DashboardPreview.displayName = "DashboardPreview";
