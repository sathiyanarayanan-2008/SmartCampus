import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptop, FaUsers, FaGlobe, FaCheckCircle } from 'react-icons/fa';

const AboutPage = () => {
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const values = [
    { icon: <FaGraduationCap />, title: 'SDG 4 Aligned', desc: 'Promoting quality education through digital campus management and accessibility.', color: '#3b82f6' },
    { icon: <FaLaptop />, title: 'Digital First', desc: 'Replacing manual processes with automated, paperless, and efficient workflows.', color: '#14b8a6' },
    { icon: <FaUsers />, title: 'Community Driven', desc: 'Designed for both students and administrators with intuitive role-based access.', color: '#8b5cf6' },
    { icon: <FaGlobe />, title: 'Scalable', desc: 'Built with modern technologies for campuses of any size, anywhere in the world.', color: '#f59e0b' },
  ];

  const milestones = [
    { year: '2024', title: 'Project Inception', desc: 'Idea conceptualized as part of SDG 4 initiative.' },
    { year: '2025', title: 'Development Phase', desc: 'Built with Spring Boot, React, and MongoDB stack.' },
    { year: '2026', title: 'Campus Launch', desc: 'Deployed and serving 500+ students across campus.' },
  ];

  return (
    <div className="min-vh-100" style={{ background: darkMode ? '#0a0f1e' : '#f8fafc' }}>
      {/* Hero */}
      <section className="py-5 position-relative" style={{
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
                background: darkMode ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.08)',
                color: '#3b82f6', fontWeight: 600, fontSize: '0.8rem',
              }}>
                About Us
              </span>
            </motion.div>
            <motion.h1 variants={itemVariants} style={{
              fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: darkMode ? '#f1f5f9' : '#0f172a',
              letterSpacing: '-0.03em',
            }}>
              About{' '}<span className="gradient-text">SmartCampus</span>
            </motion.h1>
            <motion.p variants={itemVariants} style={{
              color: darkMode ? '#94a3b8' : '#64748b',
              maxWidth: 650, margin: '1rem auto',
              fontSize: '1.05rem', lineHeight: 1.8,
            }}>
              Smart Campus Service Hub is a comprehensive digital solution designed to automate and streamline campus services,
              aligned with United Nations Sustainable Development Goal 4 — Quality Education.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-5" style={{ background: darkMode ? '#0a0f1e' : '#fff' }}>
        <div className="container py-4">
          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {values.map((item, i) => (
              <motion.div key={i} className="col-md-6 col-lg-3" variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8 }}
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
                      background: `${item.color}12`,
                      color: item.color,
                      fontSize: '1.5rem',
                      borderRadius: 16,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h6 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{item.title}</h6>
                  <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem', marginBottom: 0 }}>{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-5" style={{ background: darkMode ? '#111827' : '#f1f5f9' }}>
        <div className="container py-4">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a', letterSpacing: '-0.02em' }}>
              Our <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div className="row g-4 justify-content-center">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="col-md-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <motion.div whileHover={{ y: -6 }} className="text-center p-4" style={{
                  borderRadius: 20,
                  background: darkMode ? '#1a1f36' : '#fff',
                  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                  position: 'relative',
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    marginBottom: 16,
                  }}>
                    {m.year}
                  </div>
                  <h6 style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>{m.title}</h6>
                  <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem', marginBottom: 0 }}>{m.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-5" style={{ background: darkMode ? '#0a0f1e' : '#fff' }}>
        <div className="container py-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 text-center"
            style={{
              borderRadius: 24,
              background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
              boxShadow: '0 20px 60px rgba(59,130,246,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 150, height: 150, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }} />
            <h3 style={{ fontWeight: 800, color: '#fff', marginBottom: 8 }}>Technology Stack</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 24 }}>Built with industry-standard technologies</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {['Java 21', 'Spring Boot 3', 'MongoDB', 'React 19', 'Vite', 'Bootstrap 5'].map((tech) => (
                <motion.span key={tech} whileHover={{ scale: 1.08 }} className="badge rounded-pill px-4 py-2" style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#fff',
                  cursor: 'default',
                }}>
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
