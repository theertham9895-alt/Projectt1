import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import { Users, Calendar, Award, ClipboardCheck, ArrowRight } from 'lucide-react';

function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      if (activeTab === 'student') {
        navigate('/student');
      } else {
        navigate('/coordinator');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="landing-header-content">
            <div className="landing-logo">
              <img src="/nss.jpg" alt="NSS Logo" className="landing-logo-icon" />
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: 600 }}>NSS Activity Management</h1>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>National Service Scheme</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container">
          <div className="landing-hero-grid">
            {/* Left - Text */}
            <div>
              <h2 className="landing-hero-title">
                Manage NSS Activities <span>Efficiently</span>
              </h2>
              <p className="landing-hero-subtitle">
                A centralized digital platform to manage volunteer records, track activities, 
                monitor attendance, and generate reports for the National Service Scheme.
              </p>
              
              <div className="landing-features-list">
                <div className="landing-feature-tag">
                  <div className="landing-feature-dot"></div>
                  Digital Records
                </div>
                <div className="landing-feature-tag">
                  <div className="landing-feature-dot"></div>
                  Event Management
                </div>
                <div className="landing-feature-tag">
                  <div className="landing-feature-dot"></div>
                  Attendance Tracking
                </div>
              </div>
            </div>

            {/* Right - Login Card */}
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Access your NSS dashboard</CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: '24px' }}>
                  <button 
                    className={`tab ${activeTab === 'student' ? 'active' : ''}`}
                    onClick={() => setActiveTab('student')}
                  >
                    Student
                  </button>
                  <button 
                    className={`tab ${activeTab === 'coordinator' ? 'active' : ''}`}
                    onClick={() => setActiveTab('coordinator')}
                  >
                    Coordinator
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>
                  <div className="input-group" style={{ marginBottom: '16px' }}>
                    <label className="input-label">Email</label>
                    <Input
                      type="email"
                      placeholder={activeTab === 'student' ? 'student@college.edu' : 'coordinator@college.edu'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="input-group" style={{ marginBottom: '24px' }}>
                    <label className="input-label">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" fullWidth>
                    Sign in as {activeTab === 'student' ? 'Student' : 'Coordinator'}
                    <ArrowRight size={16} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features-section">
        <div className="container">
          <h3 style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center' }}>Key Features</h3>
          
          <div className="landing-features-grid">
            <FeatureCard 
              icon={<Users size={24} />} 
              title="Volunteer Management" 
              description="Maintain digital records of all NSS volunteers" 
            />
            <FeatureCard 
              icon={<Calendar size={24} />} 
              title="Event Planning" 
              description="Schedule and manage NSS activities and events" 
            />
            <FeatureCard 
              icon={<ClipboardCheck size={24} />} 
              title="Attendance Tracking" 
              description="Record attendance and calculate service hours" 
            />
            <FeatureCard 
              icon={<Award size={24} />} 
              title="Certificates" 
              description="Generate participation certificates automatically" 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="landing-footer-content">
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              NSS Activity Management System - Department of IT
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Group No: 06
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <Card hover>
      <CardContent style={{ paddingTop: '24px' }}>
        <div className="icon-box icon-box-lg icon-box-primary" style={{ marginBottom: '16px' }}>
          {icon}
        </div>
        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>{title}</h4>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{description}</p>
      </CardContent>
    </Card>
  );
}

export default Landing;