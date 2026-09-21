import { Layout, Terminal, Database, Wrench } from "lucide-react";
import { SkillCategory, CategoryData } from "@/types/about";

export const SKILL_DATA: Record<SkillCategory, CategoryData> = {
  frontend: {
    label: "Frontend",
    icon: Layout,
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Next.js 15", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Framer Motion", level: "Intermediate" },
    ],
  },
  backend: {
    label: "Backend",
    icon: Terminal,
    skills: [
      { name: "Laravel 12", level: "Advanced" },
      { name: "REST APIs", level: "Advanced" },
      { name: "Node.js", level: "Intermediate" },
      { name: "PHP", level: "Advanced" },
    ],
  },
  database: {
    label: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "Database Schema Design", level: "Advanced" },
    ],
  },
  tools: {
    label: "Tools & Cloud",
    icon: Wrench,
    skills: [
      { name: "Vercel", level: "Deployment" },
      { name: "Railway / Render", level: "Deployment" },
      { name: "Git & GitHub", level: "Version Control" },
      { name: "Power BI", level: "Data Viz" },
      { name: "Figma", level: "UI Design" },
    ],
  },
};
