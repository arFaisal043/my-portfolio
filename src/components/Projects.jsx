import React, { useState, useEffect, useRef } from "react";
import SectionLabel from "./SectionLabel";
import { PROJECTS } from "../data/constants";
import { useReveal } from "../hooks/useReveal";
import ShinyButton from "./ShinyButton";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px", fill: "currentColor" }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  useReveal([filter, showAll]);
  const tabs = [
    { id: "all", label: "All" },
    { id: "fullstack", label: "Full Stack Development" },
    { id: "backend", label: "Backend Development" },
    { id: "analytics", label: "Data Analytics" },
    { id: "database", label: "Database Design" },
    { id: "android", label: "Android Application" },
    { id: "ai", label: "AI / ML" },
    { id: "automation", label: "AI Automation" },
    { id: "cli", label: "CLI Projects" }
  ];
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const displayedProjects = showAll ? filtered : filtered.slice(0, 6);
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <SectionLabel text="projects" />
        <div className="filter-bar reveal" style={{ marginTop: 24 }}>
          {tabs.map(t => (
            <button key={t.id} className={`filter-btn${filter === t.id ? " active" : ""}`} onClick={() => { setFilter(t.id); setShowAll(false); }}>{t.label}</button>
          ))}
        </div>
        <div className="projects-grid">
          {displayedProjects.map((p, i) => (
            <div className={`proj-card reveal delay-${(i % 3) + 1}`} key={i}>
              <div className="proj-thumb" style={{ background: p.bg }}><span className="proj-thumb-icon">{p.icon}</span></div>
              <div className="proj-body">
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="proj-tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                <div className="proj-links">
                  <a href={p.github} className="proj-link" style={{ display: "flex", alignItems: "center", gap: "6px" }}><GitHubIcon /> {p.githubBackend ? "Frontend" : "GitHub"}</a>
                  {p.githubBackend && (
                    <a href={p.githubBackend} className="proj-link" style={{ display: "flex", alignItems: "center", gap: "6px" }}><GitHubIcon /> Backend</a>
                  )}
                  {(p.title.includes("FixItNow") || p.title.includes("DevPulse")) && (
                    <a href={p.demo} className="proj-link demo">↗ Live</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length > 6 && (
          <div className="reveal" style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <ShinyButton onClick={() => setShowAll(!showAll)}>
              {showAll ? "↑ Show Less" : "↓ Show More Projects"}
            </ShinyButton>
          </div>
        )}
      </div>
    </section>
  );
}