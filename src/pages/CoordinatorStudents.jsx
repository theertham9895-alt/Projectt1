import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { students } from '../data/mockData';
import { Plus, Search, Users } from 'lucide-react';

function CoordinatorStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: '',
    year: '',
    phone: ''
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    alert('Student added! (In real app, saves to database)');
    console.log('New student:', newStudent);
    setShowAddForm(false);
    setNewStudent({ name: '', email: '', rollNo: '', department: '', year: '', phone: '' });
  };

  return (
    <div>
      <Sidebar role="coordinator" userName="Coordinator" userEmail="coordinator@example.com" />

      <main className="main-layout">
        <header className="page-header">
          <h1>Students</h1>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus size={16} />
            Add Student
          </Button>
        </header>

        <div className="page-content">
          {/* Stats */}
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total Volunteers</p>
                <p style={{ fontSize: '32px', fontWeight: 700 }}>{students.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Active This Month</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>{students.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Avg. Service Hours</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-accent)' }}>
                  {students.length > 0 
                    ? Math.round(students.reduce((sum, s) => sum + (s.totalHours || 0), 0) / students.length)
                    : 0}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="input-with-icon" style={{ marginBottom: '24px' }}>
            <Search size={18} className="input-icon" />
            <Input
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Students List */}
          <Card>
            <CardHeader>
              <CardTitle>All Students ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredStudents.length === 0 ? (
                <div className="empty-state">
                  <Users size={64} className="empty-state-icon" />
                  <p className="empty-state-title">No students registered yet</p>
                  <p className="empty-state-description">
                    Click "Add Student" to register your first volunteer
                  </p>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus size={16} />
                    Add First Student
                  </Button>
                </div>
              ) : (
                <div>
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="student-item">
                      <div className="student-info">
                        <div className="avatar avatar-md avatar-primary">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="student-name">{student.name}</p>
                          <p className="student-meta">{student.rollNo} - {student.department}</p>
                        </div>
                      </div>
                      <div className="student-actions">
                        <Badge>{student.totalHours || 0}h</Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add Student Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddStudent}>
                    <div className="input-group" style={{ marginBottom: '16px' }}>
                      <label className="input-label">Full Name</label>
                      <Input
                        name="name"
                        value={newStudent.name}
                        onChange={handleInputChange}
                        placeholder="Enter student name"
                        required
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: '16px' }}>
                      <label className="input-label">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={newStudent.email}
                        onChange={handleInputChange}
                        placeholder="student@college.edu"
                        required
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: '16px' }}>
                      <label className="input-label">Roll Number</label>
                      <Input
                        name="rollNo"
                        value={newStudent.rollNo}
                        onChange={handleInputChange}
                        placeholder="e.g., IEAXEIT001"
                        required
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: '16px' }}>
                      <label className="input-label">Department</label>
                      <Input
                        name="department"
                        value={newStudent.department}
                        onChange={handleInputChange}
                        placeholder="e.g., Information Technology"
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                      <div className="input-group">
                        <label className="input-label">Year</label>
                        <Input
                          name="year"
                          type="number"
                          value={newStudent.year}
                          onChange={handleInputChange}
                          placeholder="1-4"
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Phone</label>
                        <Input
                          name="phone"
                          value={newStudent.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setShowAddForm(false)}
                        fullWidth
                      >
                        Cancel
                      </Button>
                      <Button type="submit" fullWidth>
                        Add Student
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CoordinatorStudents;