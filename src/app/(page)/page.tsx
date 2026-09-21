import HeroPage from "./hero/page";
import AboutPage from "./about/page";
import ProjectPage from "./projects/page";
import ContactPage from "./contact/page";
import { ScrollSection } from "@/components/animations/ScrollSection";

export default function HomePage() {
  return (
    <>
      <ScrollSection id="home">
        <HeroPage />
      </ScrollSection>
      <ScrollSection className="min-h-screen" id="about">
        <AboutPage />
      </ScrollSection>
      <ScrollSection className="min-h-screen" id="projects">
        <ProjectPage />
      </ScrollSection>
      <ScrollSection className="min-h-screen" id="contact">
        <ContactPage />
      </ScrollSection>
    </>
  );
}
