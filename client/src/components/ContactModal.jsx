import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactModal({ isOpen, onClose, isDark }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setFormData({ name: "", email: "", message: "" });
          onClose();
        }, 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <Motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative w-full max-w-lg p-8 rounded-3xl border shadow-2xl ${isDark ? "bg-slate-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Let's Connect</h2>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 hover:bg-slate-500/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {status === "success" ? (
              <div className="py-12 text-center">
                <CheckCircle2
                  size={64}
                  className="text-emerald-500 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">Message Received!</h3>
                <p className={isDark ? "text-slate-300" : "text-slate-600"}>
                  I'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    className={`text-sm font-bold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                  >
                    Your Name
                  </label>
                  <input
                    required
                    placeholder="Your Name"
                    className={`w-full p-4 rounded-xl border ${isDark ? "bg-slate-800 border-white/5" : "bg-slate-50 border-slate-200"}`}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    className={`w-full p-4 rounded-xl border ${isDark ? "bg-slate-800 border-white/5" : "bg-slate-50 border-slate-200"}`}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Project Details"
                    className={`w-full p-4 rounded-xl border ${isDark ? "bg-slate-800 border-white/5" : "bg-slate-50 border-slate-200"}`}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <button
                  disabled={status === "loading"}
                  className="w-full py-4 bg-cyan-400 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-500 transition-colors"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </Motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
