"use client";

import React from "react";
import { motion,Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Mail,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import {
  FiFacebook as FacebookIcon,
  FiInstagram as InstagramIcon,
  FiSend as SendIcon,
} from "react-icons/fi";
import { useInfiniteTypewriter, CodeLine } from "@/hooks/useInfiniteTypewriter";
import { useCardTilt } from "@/hooks/useCardTilt";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

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

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const CODE_LINES: CodeLine[] = [
  { text: "const developer = {", indent: 0, type: "declaration" },
  { text: 'name: "Full-Stack Developer",', indent: 4, type: "prop-1" },
  {
    text: 'skills: ["React", "Next.js", "Laravel"],',
    indent: 4,
    type: "prop-2",
  },
  { text: 'focus: "Clean & Scalable Code",', indent: 4, type: "prop-3" },
  { text: 'status: "Open to Work"', indent: 4, type: "prop-4" },
  { text: "};", indent: 0, type: "closing" },
];

function InfiniteTypewriterCode() {
  const { currentLineIndex, currentCharIndex } =
    useInfiniteTypewriter(CODE_LINES);

  const renderFormattedLine = (lineText: string, type: string) => {
    if (type === "declaration") {
      return (
        <>
          <span className="text-purple-600 dark:text-purple-400">const</span>{" "}
          <span className="text-blue-600 dark:text-blue-400">developer</span> ={" "}
          {"{"}
        </>
      );
    }
    if (type === "closing") {
      return <>{"};"}</>;
    }

    const [key, ...valueParts] = lineText.split(":");
    const value = valueParts.join(":");

    return (
      <>
        <span className="text-zinc-400 dark:text-zinc-500">{key}:</span>
        <span className="text-emerald-600 dark:text-emerald-400">{value}</span>
      </>
    );
  };

  return (
    <div className="pt-4 font-mono text-xs sm:text-sm leading-relaxed space-y-1.5 min-h-[180px] text-zinc-700 dark:text-zinc-300">
      {CODE_LINES.map((line, index) => {
        if (index > currentLineIndex) return null;

        const isCurrentLine = index === currentLineIndex;
        const isLastLineCompleted =
          currentLineIndex >= CODE_LINES.length &&
          index === CODE_LINES.length - 1;
        const visibleText = isCurrentLine
          ? line.text.slice(0, currentCharIndex)
          : line.text;

        return (
          <p key={index} style={{ paddingLeft: `${line.indent * 0.5}rem` }}>
            {renderFormattedLine(visibleText, line.type)}
            {(isCurrentLine || isLastLineCompleted) && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block w-2 h-4 bg-blue-500 ml-0.5 align-middle"
              />
            )}
          </p>
        );
      })}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}as const;

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}as const;

export function HeroSection() {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt();
  const { copied, copyToClipboard } = useCopyToClipboard();

  const commandText = "npx create-next-app@latest";

  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center py-16 md:py-20 overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 -z-10" />

      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-500/20 blur-[130px] rounded-full -z-10 pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                Available for Hire
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
            >
              Welcome to my{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Portfolio Website
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed"
            >
              Full-stack developer specializing in Next.js, React, and modern UI
              engineering. Crafting responsive digital products with clean
              architecture.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 px-6 py-3.5 text-sm font-semibold text-zinc-100 dark:text-zinc-900 shadow-xl shadow-zinc-900/10 dark:shadow-zinc-100/10 transition-all"
              >
                <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-600" />
                Explore Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
              >
                <Mail className="w-4 h-4 text-zinc-500" />
                Get in Touch
              </motion.a>
            </motion.div>
            {/* Social media */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 w-full flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <a
                  href="/not-found"
                  // target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="/not-foun"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="/not-found"
                  // target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Facebook Profile"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
                <a
                  href="/not-foun"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="/not-foun"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Telegram Channel or Profile"
                >
                  <SendIcon className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative flex justify-center [perspective:1000px]"
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY }}
              className="w-full max-w-lg rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 p-4 sm:p-6 transition-all duration-200 ease-out"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  <Terminal className="w-3.5 h-3.5" /> developer.config.ts
                </div>
              </div>

              <InfiniteTypewriterCode />

              <div className="mt-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between text-xs bg-zinc-100/60 dark:bg-zinc-950/60 rounded-xl px-3.5 py-2.5">
                <span className="font-mono text-zinc-500 dark:text-zinc-400 truncate">
                  $ {commandText}
                </span>
                <button
                  onClick={() => copyToClipboard(commandText)}
                  className="ml-2 p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  aria-label="Copy Command"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
