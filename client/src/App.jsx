import { useState, useEffect, Suspense, lazy } from "react";
const ContactModal = lazy(() => import("./components/ContactModal"));
import useSystemHealth from "./hooks/useSystemHealth";
import { motion as Motion } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  ExternalLink,
  Download,
  Code2,
  Rocket,
  Cpu,
  Moon,
  Sun,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  Loader2,
  MessageCircle, // Added for WhatsApp icon
} from "lucide-react";
import { PROFILE_DATA } from "./constants";

function App() {
  const systemHealth = useSystemHealth();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showArchive, setShowArchive] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch projects from your backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/projects`,
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const featuredProjects = projects.filter((p) => p.isFeatured);
  const archiveProjects = projects.filter((p) => !p.isFeatured);

  const isDark = theme === "dark";

  // System Health Indicator Component
  const StatusIndicator = () => {
    const isUp =
      systemHealth?.status === "UP" && systemHealth?.database === "CONNECTED";
    const isPending = !systemHealth;

    const handleClick = () => {
      if (isUp)
        alert("🚀 All systems operational. Backend & Database are healthy.");
      else if (isPending) alert("⏳ Checking system status...");
      else
        alert(
          "⚠️ System maintenance in progress. Backend or Database might be offline.",
        );
    };

    return (
      <div
        onClick={handleClick}
        className={`flex items-center gap-2 px-3 py-1 rounded-full border cursor-pointer transition-all ${
          isDark
            ? "bg-slate-800/50 border-white/10 hover:bg-slate-700/50"
            : "bg-slate-200/50 border-slate-300 hover:bg-slate-300/50"
        }`}
      >
        <span className="relative flex h-2 w-2">
          {isUp && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isUp
                ? "bg-emerald-500"
                : isPending
                  ? "bg-amber-500"
                  : "bg-rose-500"
            }`}
          ></span>
        </span>
        <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
          {isUp ? "System Live" : isPending ? "Checking..." : "Offline"}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0f172a] text-white selection:bg-cyan-400 selection:text-slate-900" : "bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white"}`}
    >
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 p-6 flex justify-between items-center max-w-6xl mx-auto border-b backdrop-blur-md ${isDark ? "border-white/5 bg-[#0f172a]/80" : "border-slate-200 bg-slate-50/80"}`}
      >
        <div className="flex items-center gap-4">
          <Motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold tracking-tighter"
          >
            PATRICK<span className="text-cyan-400">.DEV</span>
          </Motion.h1>
          <StatusIndicator />
        </div>

        <div
          className={`hidden md:flex space-x-8 text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          <a href="#projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">
            Skills
          </a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </a>
          {/* Updated Resume Link in Nav */}
          <a
            href="/LEO_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Patrick_Anim_Resume.pdf"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Download size={14} /> Resume
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-full transition-all ${isDark ? "bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20" : "bg-slate-200 text-slate-700 hover:bg-slate-300"}`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsContactOpen(true)}
            className={`px-5 py-2 rounded-full border transition-all text-sm font-bold ${isDark ? "bg-cyan-400/10 text-cyan-400 border-cyan-400/20 hover:bg-cyan-400/20" : "bg-cyan-600/10 text-cyan-700 border-cyan-600/20 hover:bg-cyan-600/20"}`}
            aria-label="Open contact form"
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        <section className="flex flex-col items-center text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/10 text-cyan-400 text-xs font-mono mb-6">
              <Rocket size={14} /> <span>OPEN TO OPPORTUNITIES</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tight italic">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                Fluid Interfaces.
              </span>
            </h2>
            <p
              className={`max-w-2xl text-lg md:text-xl mb-12 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              {PROFILE_DATA.heroDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="bg-cyan-400 text-slate-900 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-cyan-400/20"
              >
                View Projects <Code2 size={18} />
              </a>
              <a
                href="/LEO_RESUME.pdf"
                download="Patrick_Anim_Resume.pdf"
                className={`px-8 py-4 rounded-2xl font-bold transition-transform hover:scale-105 flex items-center gap-2 ${isDark ? "bg-slate-800 border border-slate-700 text-white" : "bg-white border border-slate-200 text-slate-900 shadow-sm"}`}
              >
                Download Resume
                <Download size={18} />
              </a>
            </div>
          </Motion.div>
        </section>
      </main>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-4 flex items-center gap-4">
              Technical Projects
              <span
                className={`h-px w-24 ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
              ></span>
            </h2>
            <p
              className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"} max-w-2xl`}
            >
              A curated selection of my work, ranging from full-stack
              applications to system utilities.
            </p>
          </div>
        </div>

        {loadingProjects ? (
          <div className="flex flex-col justify-center items-center py-32">
            <Loader2
              className={`w-10 h-10 animate-spin ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
            />
            <p
              className={`mt-4 font-medium animate-pulse ${isDark ? "text-slate-500" : "text-slate-400"}`}
            >
              Syncing with database...
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProjects.map((project) => (
                <div
                  key={project._id}
                  className={`group relative aspect-square rounded-[2.5rem] overflow-hidden transition-all duration-700 border ${
                    isDark
                      ? "bg-slate-900 border-white/5 shadow-2xl shadow-black/50"
                      : "bg-white border-slate-200 shadow-xl shadow-slate-200/60"
                  }`}
                >
                  {/* Status Badge */}
                  {project.isLive && (
                    <div className="absolute top-6 right-6 z-30">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                        Live System
                      </span>
                    </div>
                  )}

                  {/* Project Image */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          {project.title}
                        </h3>
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-cyan-400 text-slate-950 rounded-2xl hover:bg-white hover:scale-110 transition-all shadow-lg"
                              title="Visit Live Site"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-2xl hover:bg-white/20 hover:scale-110 transition-all"
                            title="View Source Code"
                          >
                            <GithubIcon size={20} />
                          </a>
                        </div>
                      </div>

                      {/* Description - Hidden until hover */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                      </p>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/5 border border-white/10 text-cyan-300 uppercase tracking-widest"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Archive Section */}
            {archiveProjects.length > 0 && (
              <div className="mt-24">
                <div className="flex items-center gap-4 mb-12">
                  <h3
                    className={`text-xl font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Legacy Archive
                  </h3>
                  <div
                    className={`h-px flex-1 ${isDark ? "bg-slate-800/50" : "bg-slate-100"}`}
                  ></div>
                  <button
                    onClick={() => setShowArchive(!showArchive)}
                    className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                      showArchive
                        ? "bg-slate-800 text-white"
                        : isDark
                          ? "text-slate-400 hover:text-white"
                          : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {showArchive ? "Show Less" : "Explore More"}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${showArchive ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {showArchive && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {archiveProjects.map((project) => (
                      <div
                        key={project._id}
                        className={`p-8 rounded-3xl border transition-all hover:border-blue-500/50 ${
                          isDark
                            ? "bg-slate-900/40 border-slate-800"
                            : "bg-white border-slate-100 shadow-sm"
                        }`}
                      >
                        <h4 className="font-bold text-lg mb-3 tracking-tight">
                          {project.title}
                        </h4>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-6">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors"
                          >
                            Codebase
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors"
                            >
                              Deployment
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-24 px-6 max-w-7xl mx-auto border-t scroll-mt-20 ${isDark ? "border-slate-800/50" : "border-slate-100"}`}
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-linear-to-tr from-blue-600 to-cyan-400 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>

            {/* Profile Image Container */}
            <div
              className={`relative aspect-square rounded-3xl overflow-hidden border-2 shadow-2xl ${isDark ? "border-slate-800" : "border-white"}`}
            >
              <img
                src="https://res.cloudinary.com/dush99zlh/image/upload/f_auto,q_auto/v1768755771/leo_zsgwak.png"
                alt="Patrick Anim - Software Engineer"
                loading="lazy"
                width={600}
                height={600}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
              <p className="text-4xl font-black text-blue-600">IPMC</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                Certified Engineer
              </p>
            </div>
          </div>

          <div>
            <div
              className={`inline-block px-4 py-1.5 mb-6 rounded-full border ${isDark ? "bg-blue-900/30 border-blue-800 text-blue-400" : "bg-blue-600/10 border-blue-200 text-blue-700"}`}
            >
              <span className="text-sm font-bold">The Developer</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight italic">
              Building high-performance{" "}
              <span className="text-blue-600 underline decoration-cyan-400/30">
                MERN applications.
              </span>
            </h2>
            <p
              className={`text-lg mb-6 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              {PROFILE_DATA.aboutDescription}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4
                  className={`font-bold mb-1 italic text-sm underline decoration-cyan-400/30 ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  Technical Logic
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {PROFILE_DATA.technicalLogic}
                </p>
              </div>
              <div>
                <h4
                  className={`font-bold mb-1 italic text-sm underline decoration-cyan-400/30 ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  UI Execution
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {PROFILE_DATA.uiExecution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-24 px-6 max-w-7xl mx-auto border-t scroll-mt-20 ${isDark ? "border-slate-800/50" : "border-slate-100"}`}
      >
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Technical Arsenal</h3>
          <p className={isDark ? "text-slate-400" : "text-slate-600"}>
            Built on solid Computer Science fundamentals.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Frontend",
              tech: ["React", "JavaScript", "Tailwind CSS"],
              icon: <Rocket className="text-cyan-500" />,
            },
            {
              name: "Backend",
              tech: ["Node.js", "Express", "MongoDB"],
              icon: <Cpu className="text-emerald-500" />,
            },
            {
              name: "Languages",
              tech: ["C#", "C++", "Java", "Python"],
              icon: <Code2 className="text-purple-500" />,
            },
            {
              name: "Tools",
              tech: ["Git", "Postman", "Figma", "Netlify"],
              icon: <ExternalLink className="text-orange-500" />,
            },
          ].map((group, idx) => (
            <Motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-3xl border ${isDark ? "bg-slate-900/50 border-white/5" : "bg-white border-slate-200 shadow-sm"} hover:border-cyan-400/50 transition-colors`}
            >
              <div className="mb-4">{group.icon}</div>
              <h4 className="font-bold mb-4">{group.name}</h4>
              <ul className="space-y-2">
                {group.tech.map((t) => (
                  <li key={t} className="text-sm font-mono text-slate-500">
                    {t}
                  </li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-24 px-6 max-w-7xl mx-auto border-t scroll-mt-20 ${isDark ? "border-slate-800/50" : "border-slate-100"}`}
      >
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Let's <span className="text-cyan-500">connect.</span>
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium">
              I am available for frontend roles and freelance collaborations.
              Reach out via email or phone.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-600/10 text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Email
                  </p>
                  <a
                    href="mailto:abrahampatrick18@gmail.com"
                    className={`text-lg font-bold hover:text-blue-600 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    abrahampatrick18@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-600/10 text-emerald-600">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Mobile
                  </p>
                  <a
                    href="tel:+233544443408"
                    className={`text-lg font-bold hover:text-emerald-600 transition-colors ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    +233 54 444 3408
                  </a>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/Leospe24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl transition-all ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 shadow-sm"}`}
                  aria-label="Visit GitHub profile"
                >
                  <GithubIcon size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/patrick-anim-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl transition-all ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 shadow-sm"}`}
                  aria-label="Visit LinkedIn profile"
                >
                  <LinkedinIcon size={24} />
                </a>
                {/* Modern WhatsApp Link */}
                <a
                  href="https://wa.me/233207946237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl transition-all hover:scale-110 flex items-center justify-center group ${
                    isDark
                      ? "bg-slate-800 hover:bg-slate-700 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                      : "bg-white border border-slate-200 hover:bg-slate-50 shadow-sm"
                  }`}
                  aria-label="Chat on WhatsApp"
                >
                  {/* Custom High-Quality WhatsApp SVG */}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-6 h-6 transition-transform group-hover:rotate-12 ${isDark ? "fill-[#25D366]" : "fill-[#128C7E]"}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div
            className={`p-8 rounded-3xl border shadow-xl ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100"}`}
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-cyan-500" />
              <h3 className="text-xl font-bold italic">Quick Message</h3>
            </div>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-full py-4 bg-cyan-400 text-slate-900 font-black rounded-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-400/20"
            >
              OPEN CONTACT FORM
            </button>
            <p className="text-center mt-4 text-xs text-slate-500 italic font-mono font-bold">
              Standard response time: 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t ${isDark ? "border-white/5 bg-[#0b1222]" : "border-slate-200 bg-slate-100"}`}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 italic font-medium">
            © 2026 Patrick Anim. Accra, Ghana.
          </p>
          <div className="flex gap-8 text-sm font-bold text-slate-500">
            <a
              href="https://github.com/Leospe24"
              className="hover:text-cyan-500 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/patrick-anim-dev"
              className="hover:text-cyan-500 transition-colors"
            >
              LinkedIn
            </a>
            <a href="#about" className="hover:text-cyan-500 transition-colors">
              About
            </a>
            <a
              href="https://wa.me/233207946237"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366] transition-colors flex items-center gap-1.5 group"
            >
              {/* Modern Brand SVG for Footer */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* Optimized Lazy-Loaded Modal */}
      <Suspense fallback={null}>
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          isDark={isDark}
        />
      </Suspense>
    </div>
  );
}

export default App;
