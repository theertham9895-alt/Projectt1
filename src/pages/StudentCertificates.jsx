import React from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import { Award, Download, Calendar, Clock } from 'lucide-react';

function StudentCertificates() {
  // Empty certificates (will come from database later)
  const certificates = [];

  return (
    <div>
      <Sidebar role="student" userName="Student" userEmail="student@example.com" />

      <main className="main-layout">
        <header className="page-header">
          <h1>My Certificates</h1>
        </header>

        <div className="page-content">
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total Certificates</p>
                <p style={{ fontSize: '32px', fontWeight: 700 }}>{certificates.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Participation</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {certificates.filter(c => c.type === 'Participation').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Achievement</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-accent)' }}>
                  {certificates.filter(c => c.type === 'Achievement').length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Certificates Grid */}
          {certificates.length === 0 ? (
            <Card>
              <CardContent>
                <div className="empty-state">
                  <Award size={64} className="empty-state-icon" />
                  <p className="empty-state-title">No certificates yet</p>
                  <p className="empty-state-description">
                    Participate in NSS activities to earn certificates. They will appear here once issued by the coordinator.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
              {certificates.map((cert) => (
                <Card key={cert.id} hover>
                  <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div className="icon-box icon-box-lg icon-box-primary">
                        <Award size={24} />
                      </div>
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        backgroundColor: cert.type === 'Achievement' 
                          ? 'rgba(234, 179, 8, 0.2)' 
                          : 'rgba(34, 197, 94, 0.2)',
                        color: cert.type === 'Achievement' 
                          ? 'var(--color-warning)' 
                          : 'var(--color-primary)'
                      }}>
                        {cert.type}
                      </span>
                    </div>
                    <CardTitle style={{ marginTop: '16px' }}>{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      {cert.activity}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        <Calendar size={14} />
                        {new Date(cert.issueDate).toLocaleDateString('en-IN')}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        <Clock size={14} />
                        {cert.hours} hours
                      </div>
                    </div>

                    <Button variant="outline" fullWidth>
                      <Download size={16} />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentCertificates;