import { useState, useEffect } from "react";
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
} from "lucide-react";
import ContactModal from "./components/ContactModal";
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

return (
  <div
    className={`min-h-screen transition-colors duration-300 ${isDark? "bg-[#0f172a] text-white selection:bg-cyan-400 selection:text-slate-900" : "bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white"}`}
  >
    {systemHealth && <div>System Health: {systemHealth.status}</div>}
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 p-6 flex justify-between items-center max-w-6xl mx-auto border-b backdrop-blur-md ${isDark ? "border-white/5 bg-[#0f172a]/80" : "border-slate-200 bg-slate-50/80"}`}
      >
        <Motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold tracking-tighter"
        >
          PATRICK<span className="text-cyan-400">.DEV</span>
        </Motion.h1>
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
                href="/Patrick_Anim_Resume.pdf"
                download
                className={`px-8 py-4 rounded-2xl font-bold transition-transform hover:scale-105 flex items-center gap-2 ${isDark ? "bg-slate-800 border border-slate-700 text-white" : "bg-white border border-slate-200 text-slate-900 shadow-sm"}`}
              >
                Resume PDF <Download size={18} />
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
        <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
          Technical Projects{" "}
          <span
            className={`h-px flex-1 ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
          ></span>
        </h2>
        {loadingProjects ? (
          <div className="flex justify-center items-center py-20">
            <Loader2
              className={`w-8 h-8 animate-spin ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
            />
            <span
              className={`ml-3 text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Loading projects...
            </span>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project._id}
                  className={`group relative aspect-square rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer ${isDark ? "shadow-lg shadow-slate-700/30 hover:shadow-2xl hover:shadow-cyan-400/20" : "shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-cyan-500/20"}`}
                >
                  {/* Always Visible Browser Frame Header */}
                  <div
                    className={`absolute top-0 left-0 right-0 z-10 flex items-center gap-1.5 px-4 py-3 backdrop-blur-md ${isDark ? "bg-slate-900/60" : "bg-cyan-600/5"}`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-sm" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-sm" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-sm" />
                    <div className="ml-4 h-2 w-24 rounded-full bg-slate-600/50" />
                  </div>

                  {/* Always Visible Browser Frame Footer with Action Buttons */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 z-10 px-4 py-3 backdrop-blur-md ${isDark ? "bg-slate-900/60" : "bg-cyan-600/5"}`}
                  >
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 backdrop-blur-sm text-center py-2 rounded-lg font-bold transition-all text-sm border shadow-lg ${isDark ? "bg-blue-600/90 text-white hover:bg-blue-500 border-blue-500/30" : "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"}`}
                        >
                          Live Demo
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`py-2 backdrop-blur-sm rounded-lg font-bold transition-all text-sm shadow-lg ${project.liveUrl ? "px-4" : "flex-1 text-center"} ${isDark ? "border border-slate-400/50 hover:bg-slate-600/50 text-white" : "border border-slate-300 hover:bg-slate-100 text-slate-700"}`}
                      >
                        Source
                      </a>
                    </div>
                  </div>

                  {/* Sliding Details Panel - Slides from left on hover */}
                  <div
                    className={`absolute left-0 top-0 z-20 border-r w-2/3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-full group-hover:translate-x-0 ${isDark ? "bottom-20 bg-slate-900/90 backdrop-blur-sm border-slate-700/50" : "bottom-20 bg-white/95 backdrop-blur-sm border-slate-200/50"}`}
                  >
                    <div className="p-4 h-full flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                          {project.title}
                        </h3>
                        {project.isLive && (
                          <span
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold animate-pulse border ${isDark ? "bg-emerald-500/30 text-emerald-300 border-emerald-400/50" : "bg-emerald-500/20 text-emerald-700 border-emerald-400/30"}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-600"}`}
                            />
                            LIVE
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm mb-3 leading-relaxed ${isDark ? "text-slate-200" : "text-slate-600"}`}
                      >
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 rounded text-xs font-mono border ${isDark ? "bg-cyan-500/20 text-cyan-200 border-cyan-400/30" : "bg-cyan-500/10 text-cyan-700 border-cyan-400/20"}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-cyan-400/0 via-transparent to-blue-500/0 group-hover:from-cyan-400/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

                  <img
                    src={project.imageUrl}
                    alt={`Preview of ${project.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>

            {/* Archive Toggle */}
            {archiveProjects.length > 0 && (
              <div className="mt-20 flex flex-col items-center">
                <button
                  onClick={() => setShowArchive(!showArchive)}
                  className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border-2 ${showArchive ? "bg-slate-900 text-white border-slate-900" : isDark ? "border-slate-800 text-slate-400 hover:border-cyan-400" : "border-slate-200 text-slate-500 hover:border-blue-600 shadow-sm"}`}
                >
                  <span>
                    {showArchive ? "Hide Archive" : "View Legacy Projects"}
                  </span>
                  <div
                    className={`transition-transform duration-300 ${showArchive ? "rotate-180" : "group-hover:translate-y-1"}`}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>
                {showArchive && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left w-full animate-in fade-in slide-in-from-top-4 duration-500">
                    {archiveProjects.map((project) => (
                      <div
                        key={project._id}
                        className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}
                      >
                        <h4 className="font-bold text-lg mb-2">
                          {project.title}
                        </h4>
                        <p className="text-sm text-slate-500 mb-4">
                          {project.description}
                        </p>
                        <div className="flex gap-4">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            GitHub
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              Live
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
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}

export default App;