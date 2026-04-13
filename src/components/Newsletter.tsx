import React from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
         throw new Error("Server communication failed.");
      }

      const data = await response.json();
      if (data.success) {
        setStatus("Success! Welcome to the flow.");
        setEmail("");
      } else {
        setStatus("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription Error:", error);
      setStatus("Error connecting to server.");
    }
  };

  return (
    <section className="py-24 bg-[var(--surface-container-low)]">
      <div className="container mx-auto px-6 md:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="headline-lg mb-4">Stay in the Flow</h2>
            <p className="body-md opacity-60">
              Get an occasional dose of digital aesthetics, motion design tips, and project updates. No noise, just inspiration.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                required
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 md:px-8 py-4 rounded-full bg-[var(--surface)] border-none outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all body-md min-w-0 md:min-w-[300px] w-full"
              />
              <button 
                type="submit" 
                disabled={status === "Sending..."}
                className="btn-primary py-4 px-10 whitespace-nowrap justify-center disabled:opacity-50"
              >
                {status === "Sending..." ? "Encrypting..." : "Subscribe"} <i className="ri-send-plane-2-line ml-2"></i>
              </button>
            </form>
            {status && (
              <p className={`label-md ${status.includes("Success") ? "text-green-500" : "text-red-500"}`}>
                {status}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};


export default Newsletter;
