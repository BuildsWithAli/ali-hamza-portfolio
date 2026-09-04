import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

// Re-read content on every request so an /admin edit shows up immediately
// without a redeploy.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <main id="top">
      <Nav />
      <Hero content={content} />
      <Stats content={content} />
      <About content={content} />
      <Experience content={content} />
      <Projects content={content} />
      <Skills content={content} />
      <Education content={content} />
      <Contact content={content} />
      <Footer />
    </main>
  );
}
