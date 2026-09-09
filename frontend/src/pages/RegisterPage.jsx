import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaIdCard, FaBuilding, FaUserPlus, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

const RegisterPage = () => {
  const { register } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', studentId: '', department: '', role: 'STUDENT',
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [focused, setFocused] = useState({});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => {
    // Basic validation before moving next
    if (step === 1 && (!formData.firstName || !formData.lastName || !formData.email)) return;
    if (step === 2 && (!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword)) {
        if (formData.password !== formData.confirmPassword) alert("Passwords do not match");
        return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      navigate('/login');
    } catch {
      // Handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name, label, type = 'text', icon, placeholder, props = {}) => (
    <div className="mb-4">
      <label className="form-label d-flex align-items-center gap-2"
             style={{ fontWeight: 600, color: darkMode ? '#e2e8f0' : '#334155', fontSize: '0.88rem' }}>
        {icon && <span style={{ color: '#3b82f6' }}>{icon}</span>} {label}
      </label>
      <motion.div animate={focused[name] ? { scale: 1.01 } : { scale: 1 }}>
        <input
          type={type}
          name={name}
          className="form-control form-control-lg glass-input"
          style={{
            borderRadius: 14,
            padding: '14px 18px',
            fontSize: '0.95rem',
            color: darkMode ? '#f1f5f9' : '#0f172a',
            borderColor: focused[name] ? '#3b82f6' : undefined,
          }}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          onFocus={() => setFocused({ ...focused, [name]: true })}
          onBlur={() => setFocused({ ...focused, [name]: false })}
          required
          {...props}
        />
      </motion.div>
    </div>
  );

  return (
    <div className="min-vh-100 d-flex align-items-center py-5 position-relative overflow-hidden" style={{
      background: darkMode ? '#0a0f1e' : '#f8fafc',
    }}>
      {/* Background elements */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', top: '-20%', right: '-10%', width: '70vw', height: '70vw', borderRadius: '40%', background: darkMode ? 'radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)' : 'radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60vw', height: '60vw', borderRadius: '40%', background: darkMode ? 'radial-gradient(circle, rgba(20,184,166,0.05), transparent 70%)' : 'radial-gradient(circle, rgba(20,184,166,0.05), transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-5">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <h2 style={{ fontWeight: 800, color: darkMode ? '#f1f5f9' : '#0f172a', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#fff' }}>🎓</div>
                  SmartCampus
                </h2>
              </Link>
              <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginTop: 12 }}>Join us and streamline your campus experience</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-card p-4 p-md-5" style={{ borderRadius: 24, background: darkMode ? 'rgba(26, 31, 54, 0.6)' : 'rgba(255, 255, 255, 0.8)' }}>
              
              {/* Progress Bar */}
              <div className="mb-5 position-relative">
                <div style={{ height: 4, background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: 4 }}>
                  <motion.div initial={{ width: '33%' }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.3 }} style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #14b8a6)', borderRadius: 4 }} />
                </div>
                <div className="d-flex justify-content-between position-absolute w-100" style={{ top: -8 }}>
                  {[1, 2, 3].map((num) => (
                    <div key={num} style={{ width: 20, height: 20, borderRadius: '50%', background: step >= num ? '#14b8a6' : (darkMode ? '#334155' : '#cbd5e1'), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', transition: 'background 0.3s' }}>
                      {step > num ? <FaCheck /> : num}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <h5 className="mb-4" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Personal Details</h5>
                      <div className="row">
                        <div className="col-sm-6">{renderInput('firstName', 'First Name', 'text', <FaUser />, 'John')}</div>
                        <div className="col-sm-6">{renderInput('lastName', 'Last Name', 'text', <FaUser />, 'Doe')}</div>
                      </div>
                      {renderInput('email', 'Email Address', 'email', <FaEnvelope />, 'john@university.edu')}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <h5 className="mb-4" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Security</h5>
                      {renderInput('password', 'Password', 'password', <FaLock />, '••••••••', { minLength: 6 })}
                      {renderInput('confirmPassword', 'Confirm Password', 'password', <FaLock />, '••••••••', { minLength: 6 })}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <h5 className="mb-4" style={{ fontWeight: 700, color: darkMode ? '#f1f5f9' : '#0f172a' }}>Academic Info</h5>
                      <div className="row">
                        <div className="col-sm-6">{renderInput('phone', 'Phone Number (Optional)', 'tel', <FaPhone />, '+1 234 567 8900', { required: false })}</div>
                        <div className="col-sm-6">{renderInput('studentId', 'Student ID (Optional)', 'text', <FaIdCard />, 'STU-12345', { required: false })}</div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-sm-6">
                          <label className="form-label d-flex align-items-center gap-2" style={{ fontWeight: 600, color: darkMode ? '#e2e8f0' : '#334155', fontSize: '0.88rem' }}>
                            <span style={{ color: '#3b82f6' }}><FaBuilding /></span> Department
                          </label>
                          <select name="department" className="form-select form-select-lg glass-input" style={{ borderRadius: 14, fontSize: '0.95rem', color: darkMode ? '#f1f5f9' : '#0f172a' }} value={formData.department} onChange={handleChange}>
                            <option value="">Select...</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Civil">Civil</option>
                            <option value="Business">Business</option>
                            <option value="Arts">Arts</option>
                          </select>
                        </div>
                        <div className="col-sm-6">
                           <label className="form-label d-flex align-items-center gap-2" style={{ fontWeight: 600, color: darkMode ? '#e2e8f0' : '#334155', fontSize: '0.88rem' }}>
                            <span style={{ color: '#3b82f6' }}><FaUser /></span> Role
                          </label>
                          <select name="role" className="form-select form-select-lg glass-input" style={{ borderRadius: 14, fontSize: '0.95rem', color: darkMode ? '#f1f5f9' : '#0f172a' }} value={formData.role} onChange={handleChange}>
                            <option value="STUDENT">Student</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="d-flex justify-content-between mt-4">
                  {step > 1 ? (
                    <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={prevStep} className="btn btn-glass d-flex align-items-center gap-2" style={{ borderRadius: 12 }}>
                      <FaArrowLeft size={12} /> Back
                    </motion.button>
                  ) : <div></div>}
                  
                  {step < 3 ? (
                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-premium d-flex align-items-center gap-2" style={{ borderRadius: 12 }}>
                      Continue <FaArrowRight size={12} />
                    </motion.button>
                  ) : (
                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-premium d-flex align-items-center gap-2" disabled={loading} style={{ borderRadius: 12 }}>
                      {loading ? <span className="spinner-border spinner-border-sm" /> : <><FaUserPlus /> Complete Registration</>}
                    </motion.button>
                  )}
                </div>
              </form>

              <p className="text-center mt-4 mb-0" style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>Sign in here</Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
