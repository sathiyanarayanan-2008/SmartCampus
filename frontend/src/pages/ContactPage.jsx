import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaChevronDown } from 'react-icons/fa';

const ContactPage = () => {
  const { darkMode } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  const contacts = [
    { icon: <FaEnvelope />, title: 'Email', info: 'support@smartcampus.edu', color: '#3b82f6' },
    { icon: <FaPhone />, title: 'Phone', info: '+91 98765 43210', color: '#14b8a6' },
    { icon: <FaMapMarkerAlt />, title: 'Location', info: 'University Campus, Main Building', color: '#8b5cf6' },
  ];

  const faqs = [
    { q: 'How do I book a room?', a: 'Navigate to the Bookings page, select your preferred room, choose date and time, and submit your request. Admins will approve it shortly.' },
    { q: 'Can I cancel a booking?', a: 'Yes, you can cancel bookings from your dashboard. Go to your bookings list and click the cancel button on the respective booking.' },
    { q: 'How do I file a complaint?', a: 'Go to the Complaints page, fill in the details about your issue with the appropriate priority level, and submit. You can track its status in real-time.' },
    { q: 'Who can create events?', a: 'Admin users can create and manage campus events. Students can register for and view events through their dashboard.' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-vh-100" style={{ background: darkMode ? '#0a0f1e' : '#f8fafc' }}>
      {/* Hero */}
      <section className="py-5" style={{
        background: darkMode
          ? 'linear-gradient(180deg, #111827 0%, #0a0f1e 100%)'
          : 'linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)',
      }}>
        <div className="container py-5">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <span className="badge rounded-pill px-4 py-2 mb-3" style={{
                background: darkMode ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.08)',
                color: '#14b8a6', fontWeight: 600, fontSize: '0.8rem',
              }}>
                Contact Us
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} style={{
              fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: darkMode ? '#f1f5f9' : '#0f172a',
              letterSpacing: '-0.03em',
            }}>
              Get in <span className="gradient-text">Touch</span>
            </motion.h1>
            <motion.p variants={itemVariants} style={{
              color: darkMode ? '#94a3b8' : '#64748b',
              maxWidth: 500, margin: '0.5rem auto',
            }}>
              We'd love to hear from you. Reach out for support, feedback, or inquiries.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-5" style={{ background: darkMode ? '#0a0f1e' : '#fff' }}>
        <div className="container">
          <motion.div
            className="row g-4 justify-content-center mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {contacts.map((c, i) => (
              <motion.div key={i} className="col-md-4" variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="card border-0 text-center p-4 h-100"
                  style={{
                    borderRadius: 20,
                    background: darkMode ? '#1a1f36' : '#f8fafc',
                    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="mx-auto rounded-3 d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 60, height: 60,
                      background: `${c.color}12`,
                      color: c.color,
                      fontSize: '1.4rem',
                      borderRadius: 16,
                    }}
                  >
                    {c.icon}
                  </motion.div>
                  <h6 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{c.title}</h6>
                  <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginBottom: 0, fontSize: '0.9rem' }}>{c.info}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="row justify-content-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-md-8 col-lg-6">
              <div className="glass-card p-4 p-md-5" style={{
                borderRadius: 24,
                background: darkMode ? 'rgba(26, 31, 54, 0.6)' : 'rgba(255, 255, 255, 0.8)',
              }}>
                <h5 className="text-center mb-4" style={{
                  fontWeight: 700,
                  color: darkMode ? '#f1f5f9' : '#0f172a',
                }}>
                  Send us a Message
                </h5>
                <form>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input type="text" className="form-control glass-input"
                        placeholder="Your Name"
                        style={{ borderRadius: 12, padding: '12px 16px', color: darkMode ? '#f1f5f9' : '#0f172a' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input type="email" className="form-control glass-input"
                        placeholder="Your Email"
                        style={{ borderRadius: 12, padding: '12px 16px', color: darkMode ? '#f1f5f9' : '#0f172a' }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control glass-input"
                      placeholder="Subject"
                      style={{ borderRadius: 12, padding: '12px 16px', color: darkMode ? '#f1f5f9' : '#0f172a' }}
                    />
                  </div>
                  <div className="mb-4">
                    <textarea className="form-control glass-input" rows="4"
                      placeholder="Your Message..."
                      style={{ borderRadius: 12, padding: '12px 16px', color: darkMode ? '#f1f5f9' : '#0f172a', resize: 'none' }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 14,
                      fontWeight: 600,
                      padding: '14px',
                      boxShadow: '0 8px 25px rgba(59,130,246,0.3)',
                    }}
                  >
                    <FaPaperPlane /> Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-5" style={{ background: darkMode ? '#111827' : '#f1f5f9' }}>
        <div className="container py-4">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a', letterSpacing: '-0.02em' }}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="mb-3"
                >
                  <div
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="p-4"
                    style={{
                      borderRadius: openFaq === i ? '16px 16px 0 0' : 16,
                      background: darkMode ? '#1a1f36' : '#fff',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                      borderBottom: openFaq === i ? 'none' : undefined,
                    }}
                  >
                    <span style={{
                      fontWeight: 600,
                      color: darkMode ? '#f1f5f9' : '#0f172a',
                      fontSize: '0.95rem',
                    }}>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: '#3b82f6' }}
                    >
                      <FaChevronDown size={14} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          overflow: 'hidden',
                          background: darkMode ? '#1a1f36' : '#fff',
                          border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                          borderTop: 'none',
                          borderRadius: '0 0 16px 16px',
                        }}
                      >
                        <div className="p-4 pt-2" style={{
                          color: darkMode ? '#94a3b8' : '#64748b',
                          fontSize: '0.9rem',
                          lineHeight: 1.7,
                        }}>
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
