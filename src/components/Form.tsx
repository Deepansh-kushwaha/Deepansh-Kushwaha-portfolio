import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerHaptic } from "../utils/haptics";

function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    interests: [] as string[],
    message: ""
  });
  const [status, setStatus] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      setStatus("Please select at least one interest.");
      return;
    }
    setStatus("Sending...");
    triggerHaptic('medium');

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: formData.interests.join(", ")
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setShowSuccessModal(true);
        setFormData({ fullName: "", email: "", interests: [], message: "" });
        triggerHaptic('success');
      } else {
        setStatus("error");
        triggerHaptic('error');
      }
    } catch (error) {
      setStatus("error");
      triggerHaptic('error');
    }
  };

  const services = [
    "Web Development", 
    "E-Commerce", 
    "Social Media Management",
    "Meta Ads"
  ];

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
    triggerHaptic('light');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left: Branding & Context */}
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="label-md text-[var(--primary)] uppercase tracking-[0.5em] text-xs md:text-sm">Project Initiation</p>
            <h2 className="display-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.85] font-black italic text-[var(--on-surface)] break-words">
              START YOUR <br /> <span className="text-outline-primary">PROJECT BRIEF</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-6">
            <p className="body-lg max-w-sm text-[var(--on-surface)] opacity-60 text-sm md:text-lg">
              Submit your project details to receive a personalized strategic proposal within 24 business hours. We review each brief with surgical precision.
            </p>
            <div className="flex gap-6">
              <a href="#" className="label-sm text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors underline opacity-60 hover:opacity-100 uppercase tracking-widest text-[10px]">Instagram</a>
              <a href="#" className="label-sm text-[var(--on-surface)] hover:text-[var(--primary)] transition-colors underline opacity-60 hover:opacity-100 uppercase tracking-widest text-[10px]">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Right: The Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div className="relative">
              <input 
                type="text"
                placeholder="FIRST & LAST NAME"
                required
                onFocus={() => { setFocusedField("name"); triggerHaptic('light'); }}
                onBlur={() => setFocusedField(null)}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--on-surface)]/20 py-4 md:py-6 text-lg md:text-xl outline-none focus:border-[var(--primary)] transition-all placeholder:text-[var(--on-surface)] placeholder:opacity-40 text-[var(--on-surface)] uppercase tracking-widest font-normal"
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-[var(--primary)]"
                animate={{ width: focusedField === "name" ? "100%" : "0%" }}
              />
            </motion.div>

            <motion.div className="relative">
              <input 
                type="email"
                placeholder="YOUR WORK EMAIL"
                required
                onFocus={() => { setFocusedField("email"); triggerHaptic('light'); }}
                onBlur={() => setFocusedField(null)}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-[var(--on-surface)]/20 py-4 md:py-6 text-lg md:text-xl outline-none focus:border-[var(--primary)] transition-all placeholder:text-[var(--on-surface)] placeholder:opacity-40 text-[var(--on-surface)] uppercase tracking-widest font-normal"
              />
              <motion.div 
                className="absolute bottom-0 left-0 h-[1px] bg-[var(--primary)]"
                animate={{ width: focusedField === "email" ? "100%" : "0%" }}
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="label-sm text-[var(--on-surface)] opacity-80 uppercase tracking-widest font-black text-[10px] md:text-xs">WHAT SHOULD WE HELP YOU WITH?</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {services.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleInterest(s)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full border text-[9px] md:text-[10px] uppercase tracking-widest transition-all font-bold ${
                    formData.interests.includes(s)
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20" 
                      : "border-[var(--on-surface)]/20 hover:border-[var(--on-surface)]/40 text-[var(--on-surface)]/60 hover:text-[var(--on-surface)] bg-[var(--on-surface)]/5"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <motion.div className="relative mt-4">
            <textarea 
              placeholder="TELL US ABOUT YOUR PROJECT VISION"
              required
              rows={3}
              onFocus={() => { setFocusedField("msg"); triggerHaptic('light'); }}
              onBlur={() => setFocusedField(null)}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-transparent border-b border-[var(--on-surface)]/20 py-4 md:py-6 text-lg md:text-xl outline-none focus:border-[var(--primary)] transition-all placeholder:text-[var(--on-surface)] placeholder:opacity-40 text-[var(--on-surface)] uppercase tracking-widest font-normal resize-none h-[100px] md:h-[120px]"
            />
            <motion.div 
              className="absolute bottom-0 left-0 h-[1px] bg-[var(--primary)]"
              animate={{ width: focusedField === "msg" ? "100%" : "0%" }}
            />
          </motion.div>

          <button 
            type="submit" 
            disabled={status === "Sending..."}
            className="btn-primary py-5 md:py-6 px-12 md:px-16 self-start text-lg md:text-xl group relative overflow-hidden mt-4"
          >
            <AnimatePresence mode="wait">
              {status === "Sending..." ? (
                <motion.span key="transmitting" initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-3 text-white">
                  TRANSMITTING... <i className="ri-loader-4-line animate-spin" />
                </motion.span>
              ) : (
                <motion.span key="initiate" initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-3 text-white font-black italic">
                  SEND ENQUIRY <i className="ri-arrow-right-line group-hover:translate-x-2 transition-transform text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {status && status !== "success" && status !== "Sending..." && (
            <p className="label-sm text-red-500 uppercase tracking-widest opacity-80">{status}</p>
          )}

        </form>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="flex flex-col items-center text-center gap-10 max-w-2xl"
            >
              <div className="relative">
                <motion.div 
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-32 h-32 rounded-full border-4 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] text-6xl"
                >
                  <i className="ri-check-line" />
                </motion.div>
                <div className="absolute inset-0 animate-ping rounded-full border border-[var(--primary)]/30" />
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="display-lg text-6xl md:text-8xl uppercase font-black italic">MISSION <br /> <span className="text-outline-primary">CONFIRMED</span></h2>
                <p className="body-lg opacity-60">Your vision has been successfully transmitted. <br /> Our studio will contact you within 24 hours.</p>
              </div>

              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  setStatus("");
                  triggerHaptic('light');
                }}
                className="btn-primary py-5 px-12 group"
              >
                RETURN TO STUDIO <i className="ri-arrow-left-line group-hover:-translate-x-1 transition-transform ml-2" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Form


