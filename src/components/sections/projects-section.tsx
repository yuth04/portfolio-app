"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ExternalLink,
  FolderCode,
  ArrowUpRight,
  Sparkles,
  Code2,
} from "lucide-react";
import { PROJECTS, Project } from "@/lib/constants";

// Inline GitHub SVG component
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

export function ProjectsSection() {
  return (
    <section id="projects" className="md:py-28 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-3 mb-10 md:mb-16">
        <div className="inline-flex gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          <FolderCode className="w-3.5 h-3.5" />
          <span>Featured Work</span>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {PROJECTS.map((project: Project) => (
          <motion.article
            key={project.id}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/90 via-white/40 to-white/10 dark:from-zinc-900/90 dark:via-zinc-900/40 dark:to-zinc-950/20 p-6 md:p-7 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 dark:hover:border-blue-500/30 overflow-hidden"
          >
            {/* Ambient Background Gradient Glow on Hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-blue-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

            <div>
              {/* Card Header Tag & Quick Links */}
              <div className="flex items-center justify-between mb-5">


                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      // target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      // target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title with Arrow Micro-Interaction */}
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex items-center justify-between">
                <span>{project.title}</span>
                <div className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </h3>

              {/* Description */}
              <p className="mt-3 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-8 flex flex-wrap gap-1.5 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/40 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:border-blue-500/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
