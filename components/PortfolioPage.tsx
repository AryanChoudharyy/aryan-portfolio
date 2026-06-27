"use client";

import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "framer-motion";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Project,
  aiNodes,
  experience,
  links,
  numbers,
  projects,
  techStack,
} from "@/lib/content";

const navItems = ["Home", "Projects", "Experience", "About", "Contact"];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
};

const aiNodePositions = [
  [50, 7],
  [73, 15],
  [88, 34],
  [86, 62],
  [68, 82],
  [32, 82],
  [14, 62],
  [12, 34],
  [27, 15],
  [50, 92],
];

function useSmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.88,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);
}

function usePointerLight() {
  useEffect(() => {
    const update = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", update);
    return () => window.removeEventListener("pointermove", update);
  }, []);
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -80, y: -80 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, .magnetic, [data-cursor='true']")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="cursor"
      animate={{
        x: position.x - (active ? 24 : 7),
        y: position.y - (active ? 24 : 7),
        width: active ? 48 : 14,
        height: active ? 48 : 14,
        opacity: position.x < 0 ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.4 }}
    />
  );
}

function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
    >
      {["ARYAN", "AI ENGINEER", "Building Intelligence..."].map((label, index) => (
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: index * 0.46, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > previous && current > 120);
      previous = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="nav"
      animate={{ y: hidden ? -92 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="nav__mark" href="#home" aria-label="Aryan Choudhary home">
        AC
      </a>
      <div className="nav__links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

function MagneticLink({
  href,
  children,
  className = "",
  download,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
}) {
  return (
    <a className={`magnetic ${className}`} href={href} download={download}>
      {children}
    </a>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <motion.div
      className="section-intro"
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__letters" aria-hidden="true">
        AI
      </div>
      <motion.div
        className="portrait-frame"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92, rotate: -4, filter: "blur(18px)" }}
        animate={{ opacity: 1, scale: 1, rotate: -2, filter: "blur(0px)" }}
        transition={{ delay: 2.1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="portrait-frame__oval" />
        <span className="portrait-frame__bust" />
        <span className="portrait-frame__face" />
        <span className="portrait-frame__light portrait-frame__light--one" />
        <span className="portrait-frame__light portrait-frame__light--two" />
        <span className="portrait-frame__caption">AI</span>
      </motion.div>

      <motion.div
        className="hero__content"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 1.45 } },
        }}
      >
        <motion.p variants={reveal} className="hero__kicker">
          AI engineer / CSE undergraduate / product builder
        </motion.p>
        <motion.h1 variants={reveal}>
          Hello,
          <br />
          I&apos;m Aryan
          <br />
          Choudhary.
        </motion.h1>
        <motion.div variants={reveal} className="hero__bottom">
          <p>
            Building intelligent software, LLM systems, distributed backends, and
            quantitative products with a product-first engineering bias.
          </p>
          <MagneticLink href="#projects" className="hero__cta">
            Explore work <ArrowUpRight size={18} strokeWidth={1.8} />
          </MagneticLink>
        </motion.div>
      </motion.div>

      <div className="scroll-indicator" aria-hidden="true">
        <span />
        Scroll
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about section-pad">
      <SectionIntro eyebrow="Who I am" title="An engineer for products that need thought, speed, and taste." />
      <motion.div
        className="about__copy"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      >
        <p>
          I am a Computer Science undergraduate at Scaler School of Technology
          and BITS Pilani, drawn to the places where AI engineering, distributed
          systems, finance, and product craft collide.
        </p>
        <p>
          My work has moved from live campus applications to high-performance
          infrastructure and quant research tooling. I like problems where the
          interface needs to feel simple, while the system underneath has to be
          rigorous, scalable, and measurable.
        </p>
      </motion.div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience section-pad">
      <SectionIntro
        eyebrow="Experience"
        title="Internships, systems, and leadership in the open."
        copy="A short timeline of real work from AI product flows to mobile product engineering."
      />
      <div className="timeline">
        {experience.map((item, index) => (
          <motion.article
            key={`${item.place}-${item.role}`}
            className="timeline__item magnetic"
            initial={{ opacity: 0, x: index % 2 ? 42 : -42 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="true"
          >
            <div>
              <span>{item.date}</span>
              <h3>{item.place}</h3>
              <p className="timeline__role">{item.role}</p>
            </div>
            <p>{item.detail}</p>
            <small>{item.location}</small>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.article
      className="project-card magnetic"
      initial={{ opacity: 0, y: 52, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      data-cursor="true"
    >
      <div className="project-card__meta">
        <span>{project.signal}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-card__stage" aria-hidden="true">
        <div className="project-card__orb">
          <span>{project.title.slice(0, 1)}</span>
        </div>
        <div className="project-card__rail">
          {project.architecture.map((step, stepIndex) => (
            <i key={step} style={{ "--step": stepIndex } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.subtitle}</p>
      </div>
      <div className="project-card__footer">
        <strong>{project.stat}</strong>
        <button type="button">
          Open <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.article>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button className="modal__close" type="button" onClick={onClose} aria-label="Close case study">
            <X size={22} />
          </button>
          <motion.div
            className="modal__panel"
            data-lenis-prevent
            onWheelCapture={(event) => event.stopPropagation()}
            onTouchMoveCapture={(event) => event.stopPropagation()}
            initial={{ y: 72, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 72, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="modal__hero">
              <div className="modal__signal">
                <span>{project.signal}</span>
                <strong>{project.stat}</strong>
              </div>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
              <div className="modal__links">
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github size={17} /> GitHub
                  </a>
                ) : null}
                {project.demo ? (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    <ExternalLink size={17} /> Live
                  </a>
                ) : null}
              </div>
            </div>

            <div className="modal__grid">
              <div>
                <span>Problem</span>
                <p>{project.problem}</p>
              </div>
              <div>
                <span>Solution</span>
                <p>{project.solution}</p>
              </div>
              <div>
                <span>Challenge</span>
                <p>{project.challenges}</p>
              </div>
              <div>
                <span>Metrics</span>
                <ul>
                  {project.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="architecture" aria-label={`${project.title} architecture`}>
              <div className="architecture__spine" />
              {project.architecture.map((step, index) => (
                <span key={step} style={{ "--index": index } as React.CSSProperties}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {step}
                </span>
              ))}
            </div>

            <div className="code-window">
              <span>system trace</span>
              <code>{project.snippet}</code>
            </div>

            <div className="stack-list">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="projects section-pad">
      <SectionIntro
        eyebrow="Featured work"
        title="Systems with real constraints, not portfolio theater."
        copy="Four projects that show the range: quant research, raw networking, distributed ingestion, and a campus product used by real students."
      />
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} onOpen={setActive} />
        ))}
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

function AIGraph() {
  const [active, setActive] = useState(0);

  return (
    <section className="ai-section section-pad">
      <SectionIntro
        eyebrow="AI engineering"
        title="A working map of the AI systems I keep reaching for."
        copy="Not a skill list. A compact graph of the tools and ideas that show up in my product work."
      />
      <motion.div
        className="ai-map"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {aiNodePositions.map(([x, y], index) => (
            <motion.line
              key={`${x}-${y}`}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: index === active ? 0.55 : 0.22 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            />
          ))}
        </svg>
        <div className="ai-map__center">
          <span>AI</span>
          <strong>Engineering</strong>
        </div>
        {aiNodes.map(([label, short], index) => {
          const [x, y] = aiNodePositions[index];
          return (
            <button
              key={label}
              type="button"
              className={active === index ? "is-active" : ""}
              style={
                {
                  "--desktop-left": `${7 + x * 0.54}%`,
                  "--desktop-top": `${8 + y * 0.78}%`,
                  "--mobile-left": `${5 + x * 0.9}%`,
                  "--mobile-top": `${6 + y * 0.54}%`,
                } as React.CSSProperties
              }
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              aria-label={label}
            >
              <span>{short}</span>
            </button>
          );
        })}
        <div className="ai-map__detail">
          <strong>{aiNodes[active][0]}</strong>
          <p>{aiNodes[active][2]}</p>
        </div>
      </motion.div>
    </section>
  );
}

function TechCloud() {
  return (
    <section className="tech section-pad">
      <SectionIntro eyebrow="Stack" title="Tools that can leave the lab and ship." />
      <div className="tech-cloud" aria-label="Technology stack">
        {techStack.map((tech, index) => (
          <motion.span
            key={tech.label}
            title={tech.label}
            aria-label={tech.label}
            data-group={tech.group}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: index % 2 === 0 ? [0, -5, 0] : [0, 5, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: index * 0.03 },
              y: { duration: 5 + (index % 5), repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <b>{tech.symbol}</b>
            <small>{tech.group}</small>
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, isInView, value]);

  return (
    <div ref={ref} className="counter">
      <motion.strong>{rounded}</motion.strong>
      <span>{label}</span>
    </div>
  );
}

function Numbers() {
  return (
    <section className="numbers section-pad">
      {numbers.map((item) => (
        <Counter key={item.label} {...item} />
      ))}
    </section>
  );
}

function Quote() {
  return (
    <section className="quote">
      <motion.blockquote
        initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        I don&apos;t build software as a pile of screens. I engineer systems that
        think, respond, and hold up under pressure.
      </motion.blockquote>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact section-pad">
      <SectionIntro eyebrow="Contact" title="Let's build something meaningful." />
      <div className="contact__links">
        <MagneticLink href={links.email}>
          <Mail size={20} /> Email
        </MagneticLink>
        <MagneticLink href={links.linkedin}>
          <Linkedin size={20} /> LinkedIn
        </MagneticLink>
        <MagneticLink href={links.github}>
          <Github size={20} /> GitHub
        </MagneticLink>
        <MagneticLink href={links.resume} download>
          <Download size={20} /> Resume
        </MagneticLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Aryan Choudhary</span>
      <span>Built with Next.js, Framer Motion, Tailwind, Lenis, OpenAI Codex, and Claude Pro.</span>
    </footer>
  );
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  useSmoothScroll();
  usePointerLight();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 2600);
    return () => window.clearTimeout(timeout);
  }, []);

  const grainDots = useMemo(() => Array.from({ length: 26 }, (_, index) => index), []);

  return (
    <>
      <AnimatePresence>{loading ? <Loader /> : null}</AnimatePresence>
      <CustomCursor />
      <div className="site-shell">
        <div className="grain" aria-hidden="true" />
        <div className="pointer-light" aria-hidden="true" />
        <div className="particles" aria-hidden="true">
          {grainDots.map((dot) => (
            <span key={dot} style={{ "--i": dot } as React.CSSProperties} />
          ))}
        </div>
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <AIGraph />
          <TechCloud />
          <Numbers />
          <Quote />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
