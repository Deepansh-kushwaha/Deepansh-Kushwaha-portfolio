

function Form() {
  return (
    <form className="flex flex-col gap-6 w-full max-w-lg mx-auto p-8 rounded-[2rem] bg-[var(--surface-container-low)] soft-shadow">
      <div className="flex flex-col gap-2">
        <label className="label-md ml-2 opacity-60">Full Name</label>
        <input 
          type="text" 
          placeholder="John Doe"
          className="w-full px-6 py-4 rounded-[0.75rem] bg-[var(--surface-container-highest)] border-none focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 transition-all outline-none body-lg"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="label-md ml-2 opacity-60">Email Address</label>
        <input 
          type="email" 
          placeholder="john@example.com"
          className="w-full px-6 py-4 rounded-[0.75rem] bg-[var(--surface-container-highest)] border-none focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 transition-all outline-none body-lg"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="label-md ml-2 opacity-60">Message</label>
        <textarea 
          placeholder="How can I help you?"
          rows={5}
          className="w-full px-6 py-4 rounded-[0.75rem] bg-[var(--surface-container-highest)] border-none focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20 transition-all outline-none body-lg resize-none"
        />
      </div>

      <button type="submit" className="btn-primary mt-4 justify-center py-4">
        Send Message <i className="ri-send-plane-fill"></i>
      </button>
    </form>
  )
}

export default Form

