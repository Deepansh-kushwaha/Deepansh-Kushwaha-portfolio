

import Form from "../components/Form"
import FAQ from "../components/FAQ"

function Contact() {
  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-24">
        <header className="mb-20 text-center reveal stagger-1">
          <p className="label-md text-[var(--primary)] mb-4">Contact</p>
          <h1 className="display-lg">GET IN <span className="text-[var(--primary)]">TOUCH</span></h1>
          <p className="body-lg opacity-60 mt-6 max-w-2xl mx-auto italic">
            "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
          </p>
        </header>

        <section className="reveal stagger-2 mb-32">
          <Form />
        </section>

        <FAQ />
      </div>
    </main>
  )
}

export default Contact


