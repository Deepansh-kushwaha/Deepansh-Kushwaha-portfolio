

import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
        throw new Error("Server communication failed. Check your console for details.");
      }

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error connecting to server.");
    }
  };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg mx-auto p-8 rounded-[2rem] bg-[var(--surface-container-low)] soft-shadow">
      <div className="flex flex-col gap-2">
        <label className="label-md ml-2 opacity-60">Full Name</label>
        <input 
          type="text" 
          required
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-6 py-4 rounded-[0.75rem] bg-[var(--surface-container-highest)] border-none focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 transition-all outline-none body-lg"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="label-md ml-2 opacity-60">Email Address</label>
        <input 
          type="email" 
          required
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-6 py-4 rounded-[0.75rem] bg-[var(--surface-container-highest)] border-none focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 transition-all outline-none body-lg"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="label-md ml-2 opacity-60">Message</label>
        <textarea 
          required
          placeholder="How can I help you?"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-6 py-4 rounded-[0.75rem] bg-[var(--surface-container-highest)] border-none focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 transition-all outline-none body-lg resize-none"
        />
      </div>

      <button type="submit" className="btn-primary mt-4 justify-center py-4">
        {status === "Sending..." ? "Sending..." : "Send Message"} <i className="ri-send-plane-fill ml-2"></i>
      </button>
      
      {status && (
        <p className={`text-center label-md ${status.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {status}
        </p>
      )}
    </form>
  )
}

export default Form


