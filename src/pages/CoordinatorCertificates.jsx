import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { activities, students, certificates } from '../data/mockData';
import { Award, Plus, Send } from 'lucide-react';

function CoordinatorCertificates() {
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [newCertificate, setNewCertificate] = useState({
    studentId: '',
    activityId: '',
    title: '',
    type: 'Participation'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({ ...prev, [name]: value }));
  };

  const handleIssueCertificate = (e) => {
    e.preventDefault();
    alert('Certificate issued! (In real app, saves to database)');
    console.log('Certificate:', newCertificate);
    setShowIssueForm(false);
    setNewCertificate({ studentId: '', activityId: '', title: '', type: 'Participation' });
  };

  return (
    <div>
      <Sidebar role="coordinator" userName="Coordinator" userEmail="coordinator@example.com" />

      <main className="main-layout">
        <header className="page-header">
          <h1>Certificates</h1>
          <Button onClick={() => setShowIssueForm(true)}>
            <Plus size={16} />
            Issue Certificate
          </Button>
        </header>

        <div className="page-content">
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total Issued</p>
                <p style={{ fontSize: '32px', fontWeight: 700 }}>{certificates.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>This Month</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>0</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Pending</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-warning)' }}>0</p>
              </CardContent>
            </Card>
          </div>

          {/* Certificates List */}
          <Card>
            <CardHeader>
              <CardTitle>Issued Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              {certificates.length === 0 ? (
                <div className="empty-state">
                  <Award size={64} className="empty-state-icon" />
                  <p className="empty-state-title">No certificates issued yet</p>
                  <p className="empty-state-description">Issue certificates to students for their participation</p>
                  <Button onClick={() => setShowIssueForm(true)}>
                    <Plus size={16} />
                    Issue First Certificate
                  </Button>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Activity</th>
                      <th>Type</th>
                      <th>Date Issued</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert) => (
                      <tr key={cert.id}>
                        <td>{cert.studentName}</td>
                        <td>{cert.activityTitle}</td>
                        <td>{cert.type}</td>
                        <td>{new Date(cert.issueDate).toLocaleDateString('en-IN')}</td>
                        <td>
                          <Button variant="ghost" size="sm">
                            <Send size={14} />
                            Resend
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Issue Certificate Modal */}
        {showIssueForm && (
          <div className="modal-overlay">
            <div className="modal">
              <Card>
                <CardHeader>
                  <CardTitle>Issue Certificate</CardTitle>
                </CardHeader>
                <CardContent>
                  {students.length === 0 ? (
                    <div className="empty-state">
                      <Award size={48} className="empty-state-icon" />
                      <p className="empty-state-title">No students available</p>
                      <p className="empty-state-description">Add students first to issue certificates</p>
                      <Button variant="outline" onClick={() => setShowIssueForm(false)}>
                        Close
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleIssueCertificate}>
                      <div className="input-group" style={{ marginBottom: '16px' }}>
                        <label className="input-label">Select Student</label>
                        <select
                          name="studentId"
                          value={newCertificate.studentId}
                          onChange={handleInputChange}
                          required
                          className="input"
                        >
                          <option value="">Choose a student</option>
                          {students.map(s => (
                            <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>
                          ))}
                        </select>
                      </div>
                      <div className="input-group" style={{ marginBottom: '16px' }}>
                        <label className="input-label">Select Activity</label>
                        <select
                          name="activityId"
                          value={newCertificate.activityId}
                          onChange={handleInputChange}
                          required
                          className="input"
                        >
                          <option value="">Choose an activity</option>
                          {activities.map(a => (
                            <option key={a.id} value={a.id}>{a.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="input-group" style={{ marginBottom: '16px' }}>
                        <label className="input-label">Certificate Title</label>
                        <Input
                          name="title"
                          value={newCertificate.title}
                          onChange={handleInputChange}
                          placeholder="e.g., Blood Donation Camp Participation"
                          required
                        />
                      </div>
                      <div className="input-group" style={{ marginBottom: '24px' }}>
                        <label className="input-label">Certificate Type</label>
                        <select
                          name="type"
                          value={newCertificate.type}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="Participation">Participation</option>
                          <option value="Appreciation">Appreciation</option>
                          <option value="Achievement">Achievement</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <Button type="button" variant="outline" onClick={() => setShowIssueForm(false)} fullWidth>
                          Cancel
                        </Button>
                        <Button type="submit" fullWidth>
                          <Award size={16} />
                          Issue Certificate
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CoordinatorCertificates;