"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code2, GraduationCap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import profile from "@/assets/pf.jpg";
import { SKILL_DATA } from "@/lib/aboutMockdata";
import { SkillCategory } from "@/types/about";

export default function AboutSection() {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>("frontend");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  }as const;

  return (
    <section className="md:py-24 max-w-5xl mx-auto px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-10"
      >
        {/* Top Header Badge */}
        <motion.div variants={itemVariants} className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
        </motion.div>

        {/* Main Content Grid: Image + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Profile Image & Status Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative group"
          >
            <div className="relative h-[360px] sm:h-[420px] w-full rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 shadow-xl">
              <Image
                src={profile}
                alt="Profile picture"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for opportunities
              </div>

              {/* Location Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100">
                <p className="font-bold text-sm">Full-Stack Web Developer</p>
                <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>Phnom Penh, Cambodia</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio & Cards */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4 text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                I specialize in modern web application development using{" "}
                <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">
                  Next.js, React, Tailwind CSS, and Laravel
                </strong>
                . I focus on bridging smooth frontend interfaces with robust,
                scalable backend architectures.
              </p>
              <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
                Whether designing responsive e-commerce platforms or integrating
                real-time API systems, I prioritize performance, clean code
                patterns, and intuitive user experiences.
              </p>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md space-y-2">
                <div className="flex items-center justify-between">
                  <GraduationCap className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                  Education
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Information Technology graduated at Rule University
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md space-y-2">
                <div className="flex items-center justify-between">
                  <Code2 className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">
                  Focus Areas
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Next.js App Router, Laravel REST APIs & Database Design
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Skill Category Tabs */}
        <motion.div
          variants={itemVariants}
          className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(SKILL_DATA) as SkillCategory[]).map((key) => {
              const category = SKILL_DATA[key];
              const Icon = category.icon;
              const isActive = activeCategory === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-skill-tab"
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Skill Badges Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              {SKILL_DATA[activeCategory].skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col justify-between p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/40 dark:bg-zinc-900/30 backdrop-blur-sm hover:border-blue-500/40 transition-colors"
                >
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {skill.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                    {skill.level}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
