import React from "react";

export type SkillCategory = "frontend" | "backend" | "database" | "tools";

export interface SkillItem {
  name: string;
  level: string;
}

export interface CategoryData {
  label: string;
  icon: React.ElementType;
  skills: SkillItem[];
}