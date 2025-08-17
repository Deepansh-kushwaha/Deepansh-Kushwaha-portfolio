
import AboutSection from "../components/AboutSection";
import me from '../assets/me.jpg';
export default function About() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <AboutSection
        name="Deepansh Kushwaha"
        title="Full-Stack Web Developer"
        bio="I build immersive, high-performance web experiences with React, TypeScript, and WebGL/Three.js. Passionate about smooth UI, micro-interactions, and scalable frontend architecture."
        skills={[
          "React",
          "TypeScript",
          "Tailwind CSS",
          "GSAP",
          "Three.js",
          "React Three Fiber",
          "Vite",
        ]}
        resumeUrl="https://drive.google.com/file/d/1aWxmFfQ49iL5jwyDcuSLdCxArps6Kei5/view?usp=drive_link"
        avatarUrl={me}
        socials={[
          { label: "GitHub", href: "https://github.com/deepansh-kushwaha" },
          { label: "LinkedIn", href: "https://linkedin.com/in/deepansh-kushwaha" },
          { label: "Email", href: "mailto:deepanshkushwaha9@gmail.com?subject=Inquiry&body=I would like to know more about your services."},
        ]}
      />
    </main>
  );
}
