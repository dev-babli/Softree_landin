"use client";

import React, { memo } from "react";
import { RefreshCcw, Grip, Layers, Compass, TrendingUp, Grid as GridIcon } from "lucide-react";

export const FeatureProgressSection = memo(() => {
  return (
    <div className="w-full flex justify-center py-24 bg-[#0a0a0a]">
      <div className="w-full max-w-[1100px] px-6 flex flex-col items-start font-sans">
        
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <h2 className="text-white text-5xl md:text-[64px] font-bold tracking-tight leading-[1.05] mb-6">
            Sync with GitHub.<br />
            Both ways.
          </h2>
          <p className="text-[#a1a1aa] text-[17px] leading-relaxed max-w-[580px]">
            Manage your tasks efficiently with Huly's bidirectional GitHub synchronization.<br />
            Use Huly as an advanced front-end for GitHub Issues and GitHub Projects.
          </p>
        </div>

        {/* GitHub Window UI with Glowing Border */}
        <div className="relative w-full rounded-xl mt-4 mb-28">
          <div className="absolute -inset-[1.5px] rounded-xl bg-gradient-to-r from-[#ff5100] via-black to-[#0070ff] blur-[15px] opacity-70"></div>
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#ff5100] via-[#1a1a1a] to-[#0070ff] opacity-100"></div>
          
          <div className="relative bg-[#0d1117] rounded-xl w-full flex flex-col overflow-hidden text-left shadow-2xl">
            <GithubMockUI />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 w-full mt-4">
          <FeatureItem 
            icon={<RefreshCcw className="w-9 h-9" stroke="url(#blue-gradient)" strokeWidth={1.5} />} 
            title="Two-way synchronization" 
            description="Integrate your task tracker with GitHub to sync changes instantly." 
          />
          <FeatureItem 
            icon={<Grip className="w-9 h-9" stroke="url(#blue-gradient)" strokeWidth={1.5} />} 
            title="Private tasks" 
            description="Integration and management of multiple data repositories effectively." 
          />
          <FeatureItem 
            icon={<Layers className="w-9 h-9" stroke="url(#blue-gradient)" strokeWidth={1.5} />} 
            title="Multiple repositories" 
            description="Organize multiple projects for more effective planning and collaboration." 
          />
          <FeatureItem 
            icon={<Compass className="w-9 h-9" stroke="url(#blue-gradient)" strokeWidth={1.5} />} 
            title="Milestone migration" 
            description="Seamless migration of key project milestones between repositories." 
          />
          <FeatureItem 
            icon={<TrendingUp className="w-9 h-9" stroke="url(#blue-gradient)" strokeWidth={1.5} />} 
            title="Track progress" 
            description="Keep track of GitHub contributions and changes within your workspace." 
          />
          <FeatureItem 
            icon={<GridIcon className="w-9 h-9" stroke="url(#blue-gradient)" strokeWidth={1.5} />} 
            title="Advanced filtering" 
            description="Precise project data search with advanced filtering capabilities." 
          />
        </div>
        
        {/* Shared SVG Defs for Icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
});

FeatureProgressSection.displayName = "FeatureProgressSection";

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col items-start text-left">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-white text-xl font-semibold tracking-tight mb-2">{title}</h3>
    <p className="text-[#a1a1aa] text-[15px] leading-relaxed">
      {description}
    </p>
  </div>
);

const GithubMockUI = () => (
  <div className="w-full text-[#c9d1d9] font-sans flex flex-col pointer-events-none select-none">
    {/* GitHub Header */}
    <div className="flex items-center justify-between px-5 py-3 border-b border-[#30363d] bg-[#161b22]">
      <div className="flex items-center gap-4">
        {/* Menu icon */}
        <div className="w-5 h-5 flex flex-col justify-center gap-[3px]">
          <div className="w-full h-[2px] bg-[#8b949e] rounded-full"></div>
          <div className="w-full h-[2px] bg-[#8b949e] rounded-full"></div>
          <div className="w-full h-[2px] bg-[#8b949e] rounded-full"></div>
        </div>
        {/* Github Logo */}
        <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" className="fill-white">
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        <div className="text-[14px] font-semibold text-white ml-1 flex items-center gap-1">
          <span className="text-[#8b949e] font-normal">acme-project</span>
          <span className="text-[#8b949e]">/</span>
          <span>database-api</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-[6px] px-2 py-1 w-[260px] text-[#8b949e] text-[13px]">
          <svg className="w-[14px] h-[14px] mr-2" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.998 0A4.499 4.499 0 0 0 11.5 7Z"></path>
          </svg>
          <span className="flex-1 opacity-80">Type</span> 
          <span className="border border-[#30363d] rounded-[4px] px-1.5 py-[1px] text-[10px] mx-1">/</span>
          <span className="opacity-80">to search</span>
        </div>
        {/* App actions */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md border border-[#30363d] flex items-center justify-center text-[#8b949e]">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg>
          </div>
          <div className="w-7 h-7 rounded-md border border-[#30363d] flex items-center justify-center text-[#8b949e]">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM6.5 4.5h3A1.5 1.5 0 0 1 11 6v4a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 5 10V6a1.5 1.5 0 0 1 1.5-1.5Z"></path></svg>
          </div>
          <div className="w-7 h-7 flex items-center justify-center text-[#8b949e]">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a1.5 1.5 0 0 1 1.5 1.5v4.307a2.5 2.5 0 0 0 1.094 2.062l.142.095c.277.186.425.492.425.827v1.459A1.5 1.5 0 0 1 9.661 13.5H6.339A1.5 1.5 0 0 1 4.84 12.25v-1.46c0-.334.148-.64.425-.826l.142-.095A2.5 2.5 0 0 0 6.5 7.807V3.5A1.5 1.5 0 0 1 8 2Z"></path></svg>
          </div>
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-200 to-amber-700 overflow-hidden ml-1 border border-[#30363d]"></div>
        </div>
      </div>
    </div>
    
    {/* Navigation */}
    <div className="flex items-center gap-6 px-5 py-[14px] bg-[#161b22] border-b border-[#30363d] text-[14px]">
      <div className="flex items-center gap-2 text-[#8b949e]">
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"></path>
        </svg>
        Code
      </div>
      <div className="flex items-center gap-2 font-semibold text-white relative">
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
        </svg>
        Issues <span className="bg-[#30363d] text-white px-2 py-[1px] rounded-full text-[12px] font-medium ml-1">140</span>
        <div className="absolute -bottom-[15px] left-0 right-0 h-[2px] bg-[#f78166] rounded-t-full"></div>
      </div>
      <div className="flex items-center gap-2 text-[#8b949e]">
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
           <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854v2.5h.5A1.5 1.5 0 0 1 12 4.854v5.522a2.251 2.251 0 1 1-1.5 0V4.854a.5.5 0 0 0-.5-.5h-.5v2.5a.25.25 0 0 1-.427.177L6.677 4.63a.25.25 0 0 1 0-.354Zm7.823 9.423a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM2.25 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        </svg>
        Pull requests <span className="bg-[#30363d] text-white px-2 py-[1px] rounded-full text-[12px] font-medium ml-1">21</span>
      </div>
      <div className="flex items-center gap-2 text-[#8b949e]">Actions</div>
      <div className="flex items-center gap-2 text-[#8b949e]">Wiki</div>
      <div className="flex items-center gap-2 text-[#8b949e]">Security</div>
      <div className="flex items-center gap-2 text-[#8b949e]">Insights</div>
    </div>
    
    {/* Issues List Area */}
    <div className="flex flex-col flex-1 pl-4 pr-3 py-1">
      {/* List Header removed per image flow, just issues */}
      <IssueRow 
        title="Store markup as ProseMirror JSON instead of HTML" 
        tags={[{name: 'enhancement', color: '#58a6ff'}]}
        number="#5055" time="3 hours ago" user="aannikov" opacity={1}
      />
      <IssueRow 
        title="Feature Request: Document analysis" 
        tags={[{name: 'bug', color: '#f85149'}]}
        number="#5054" time="7 hours ago" user="aannikov" opacity={0.6}
      />
      <IssueRow 
        title="Improve inbox grouping" 
        tags={[{name: 'enhancement', color: '#58a6ff'}]}
        number="#5052" time="8 hours ago" user="aannikov" opacity={0.35}
      />
      <IssueRow 
        title="Storage adapter configuration" 
        tags={[{name: 'enhancement', color: '#58a6ff'}]}
        number="#5049" time="12 hours ago" user="haiodo" opacity={0.2}
      />
      <IssueRow 
        title="Enforce translation rules for asset plugins" 
        tags={[{name: 'enhancement', color: '#58a6ff'}]}
        number="#5048" time="12 hours ago" user="haiodo" opacity={0.08}
      />
      <IssueRow 
        title="BUG > Copy URL link does not work in this button (copy)" 
        tags={[{name: 'bug', color: '#e5534b'}]}
        number="#5038" time="3 days ago" user="lexivOre" opacity={0.03}
      />
      <IssueRow 
        title="Collaborative doc branching infrastructure" 
        tags={[{name: 'enhancement', color: '#58a6ff'}]}
        number="#5037" time="3 days ago" user="aannikov" opacity={0.01}
      />
    </div>
    
    {/* Bottom padding bleed */}
    <div className="h-6"></div>
  </div>
);

const IssueRow = ({ title, tags, number, time, user, opacity }: { title: string, tags: any[], number: string, time: string, user: string, opacity: number }) => (
  <div className="flex items-start gap-[14px] px-3 py-[10px] border-b border-[#30363d]/50" style={{ opacity }}>
    <div className="pt-0.5">
      <div className="w-[14px] h-[14px] rounded-[3px] border border-[#8b949e]"></div>
    </div>
    <div className="pt-0.5">
      <svg className="w-[15px] h-[15px] text-[#3fb950]" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
      </svg>
    </div>
    <div className="flex flex-col">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-semibold text-[#e6edf3] text-[15px] leading-tight hover:text-[#58a6ff] cursor-pointer">
          {title}
        </span>
        {tags.map(tag => (
          <span key={tag.name} className="px-2 py-[1px] rounded-full text-[12px] font-medium border" style={{ borderColor: `${tag.color}40`, color: tag.color, backgroundColor: `${tag.color}15` }}>
            {tag.name}
          </span>
        ))}
      </div>
      <div className="text-[12px] text-[#8b949e] mt-1">
        {number} opened {time} by <span className="hover:text-[#58a6ff] cursor-pointer">{user}</span>
      </div>
    </div>
  </div>
);

