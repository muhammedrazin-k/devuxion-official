"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";



const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.25,
    },
  },
  viewport: { once: true },
};

export default function Home() {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [showStatus, setShowStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSending(true);
    setShowStatus("idle");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

    if (accessKey === "your_access_key" || !accessKey) {
      console.warn("Web3Forms access key not set. Using fallback for demo.");
      setTimeout(() => {
        setIsSending(false);
        setShowStatus("success");
        form.current?.reset();
        setTimeout(() => setShowStatus("idle"), 5000);
      }, 1500);
      return;
    }

    const formData = new FormData(form.current);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify({
      ...object,
      access_key: accessKey,
    });

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        const result = await response.json();
        if (result.success) {
          setIsSending(false);
          setShowStatus("success");
          form.current?.reset();
          setTimeout(() => setShowStatus("idle"), 5000);
        } else {
          throw new Error(result.message || "Submission failed");
        }
      })
      .catch((error) => {
        console.error("Web3Forms Error:", error);
        setIsSending(false);
        setShowStatus("error");
        setTimeout(() => setShowStatus("idle"), 5000);
      });
  };


  return (

    <>
      {/* ===== HEADER ===== */}
      <header className="header" id="header">
        <div className="header-inner">
          <Image
            src="/logo.png"
            alt="Devuxion Logo"
            width={140}
            height={28}
            className="header-logo"
            priority
          />
          <a href="#contact" className="header-cta">
            Let&apos;s Talk
          </a>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" id="hero">
        {/* Light pattern background */}
        <Image
          src="/light pattern.png"
          alt=""
          fill
          className="hero-bg-pattern light-pattern-float"
          priority
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div className="hero-gradient-overlay" aria-hidden="true" />

        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Designing{" "}
            <span className="italic-accent">Digital Experiences</span> That Grow
            Businesses.
          </motion.h1>
          <motion.p className="hero-description" variants={fadeInUp}>
            We create user-focused websites, modern interfaces, and marketing
            systems that help brands attract and convert customers online.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <a href="#contact" className="hero-cta">
              Start a Project
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== MOBILE IDEA SECTION (visible on mobile only) ===== */}
      <motion.section
        className="idea-section-mobile"
        aria-label="Our promise"
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Image
          src="/light pattern.png"
          alt=""
          fill
          className="idea-mobile-bg"
          aria-hidden="true"
        />
        <div className="idea-mobile-content">
          <p className="idea-mobile-label">Your idea starts here</p>
          <h2 className="idea-mobile-title">
            Let&apos;s create your{" "}
            <span className="accent-highlight">website or app</span>{" "}
            professionally.
          </h2>
        </div>
      </motion.section>

      {/* ===== MAIN CONTENT: CONTACT + IDEA SIDE ===== */}
      <section className="main-content-section" id="contact">
        <div className="main-content-inner">
          {/* Contact Form */}
          <motion.div
            className="contact-section"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 className="contact-title" variants={fadeInUp}>Let&apos;s Talk</motion.h2>
            <motion.p className="contact-subtitle" variants={fadeInUp}>
              We&apos;re here to listen—reach out and let&apos;s explore
              <br />
              new possibilities together
            </motion.p>

            <form
              ref={form}
              onSubmit={sendEmail}
              id="contact-form"
            >
              <motion.div className="form-group" variants={fadeInUp}>
                <label htmlFor="fullname" className="form-label">
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="form-input"
                  placeholder="Your Name"
                  required
                />
              </motion.div>

              <motion.div className="form-group" variants={fadeInUp}>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="your@company.com"
                  required
                />
              </motion.div>

              <motion.div className="form-group" variants={fadeInUp}>
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Leave us a message..."
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className={`form-submit ${isSending ? 'is-sending' : ''}`}
                id="submit-btn"
                variants={fadeInUp}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                disabled={isSending}
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </motion.button>

              <AnimatePresence>
                {showStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="status-message success"
                  >
                    Message sent successfully! We&apos;ll get back to you soon.
                  </motion.p>
                )}
                {showStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="status-message error"
                  >
                    Something went wrong. Please try again or email us directly at m.razin600@gmail.com.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

          </motion.div>

          {/* Idea Side (Desktop only) */}
          <motion.div
            className="idea-side"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image
              src="/light pattern.png"
              alt=""
              width={400}
              height={400}
              className="idea-bg-floating light-pattern-float"
              aria-hidden="true"
            />
            <motion.div
              className="idea-side-content"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.4 }}
            >
              <p className="idea-side-label">Your idea starts here</p>
              <h2 className="idea-side-title">
                Let&apos;s create your{" "}
                <span className="accent-highlight">website or app</span>{" "}
                professionally.
              </h2>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" id="footer">
        <motion.div
          className="footer-inner"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <Image
              src="/logo.png"
              alt="Devuxion Logo"
              width={120}
              height={24}
              className="footer-logo"
            />
          </motion.div>

          <motion.p className="footer-tagline" variants={fadeInUp}>
            Empowering Your Business Growth with Strategic
            <br />
            Digital Solutions
          </motion.p>

          <div className="footer-socials">
            {/* X (Twitter) */}
            <motion.a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="X (Twitter)"
              id="social-x"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
              id="social-linkedin"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
              id="social-instagram"
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </motion.a>
          </div>

          <div className="footer-divider" />
        </motion.div>
      </footer>
    </>
  );
}
