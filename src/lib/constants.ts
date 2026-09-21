export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "vendo",
    title: "Vendo — E-Commerce Platform",
    description:
      "A full-scale e-commerce platform built with Next.js 15 App Router, Laravel 12 backend REST API, and integrated with Bakong KHQR dynamic payments.",
    tags: [
      "Next.js 15",
      "Laravel 12",
      "Tailwind CSS",
      "Bakong KHQR",
      "PostgreSQL",
    ],
    image: "/images/projects/vendo.png",
    githubUrl: "/not-found",
    liveUrl: "/not-found",
    featured: true,
  },
  {
    id: "clothify",
    title: "Clothify — Fashion Brand Store",
    description:
      "Modern streetwear and apparel e-commerce web application featuring type-based category filtering, promotional discount engines, and fast checkout.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "MySQL"],
    image: "/images/projects/clothify.png",
    githubUrl: "/not-found",
    liveUrl: "/not-found",
    featured: true,
  },
  {
    id: "analytics-dashboard",
    title: "Retail Performance Dashboard",
    description:
      "Interactive data visualization platform for tracking sales metrics, promotional discount performance, and inventory forecasting.",
    tags: ["Next.js", "TypeScript", "Power BI", "Tailwind CSS"],
    image: "/images/projects/dashboard.png",
    githubUrl: "/not-found",
    featured: false,
  },
];
