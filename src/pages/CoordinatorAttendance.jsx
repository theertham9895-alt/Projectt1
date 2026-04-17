import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { activities, students } from '../data/mockData';
import { CheckCircle, XCircle, Clock, Save } from 'lucide-react';

function CoordinatorAttendance() {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [attendance, setAttendance] = useState({});

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    alert('Attendance saved! (In real app, saves to database)');
    console.log('Attendance:', attendance);
  };

  const selectedActivityData = activities.find(a => a.id === selectedActivity);

  return (
    <div>
      <Sidebar role="coordinator" userName="Coordinator" userEmail="coordinator@example.com" />

      <main className="main-layout">
        <header className="page-header">
          <h1>Mark Attendance</h1>
          {selectedActivity && students.length > 0 && (
            <Button onClick={handleSave}>
              <Save size={16} />
              Save Attendance
            </Button>
          )}
        </header>

        <div className="page-content">
          {/* Select Activity */}
          <Card style={{ marginBottom: '24px' }}>
            <CardHeader>
              <CardTitle>Select Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {activities.map((activity) => (
                  <Button
                    key={activity.id}
                    variant={selectedActivity === activity.id ? 'primary' : 'outline'}
                    onClick={() => setSelectedActivity(activity.id)}
                  >
                    {activity.title}
                    <Badge variant={
                      activity.status === 'upcoming' ? 'warning' :
                      activity.status === 'ongoing' ? 'primary' : 'outline'
                    } style={{ marginLeft: '8px' }}>
                      {activity.status}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          {selectedActivity && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Mark Attendance - {selectedActivityData?.title} ({students.length} students)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {students.length === 0 ? (
                  <div className="empty-state">
                    <Clock size={64} className="empty-state-icon" />
                    <p className="empty-state-title">No students registered</p>
                    <p className="empty-state-description">Add students first to mark attendance</p>
                  </div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Roll No</th>
                        <th>Status</th>
                        <th>Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => {
                        const status = attendance[student.id] || 'present';
                        return (
                          <tr key={student.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="avatar avatar-sm avatar-primary">
                                  {student.name.charAt(0)}
                                </div>
                                <div>
                                  <p style={{ fontWeight: 500 }}>{student.name}</p>
                                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td>{student.rollNo}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <Button
                                  size="sm"
                                  variant={status === 'present' ? 'primary' : 'outline'}
                                  onClick={() => handleStatusChange(student.id, 'present')}
                                >
                                  <CheckCircle size={14} />
                                  Present
                                </Button>
                                <Button
                                  size="sm"
                                  variant={status === 'absent' ? 'primary' : 'outline'}
                                  onClick={() => handleStatusChange(student.id, 'absent')}
                                  style={status === 'absent' ? { backgroundColor: 'var(--color-error)' } : {}}
                                >
                                  <XCircle size={14} />
                                  Absent
                                </Button>
                              </div>
                            </td>
                            <td>
                              <Badge variant={status === 'present' ? 'primary' : 'outline'}>
                                {status === 'present' ? `+${selectedActivityData?.duration || 0}h` : '-'}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          )}

          {!selectedActivity && (
            <Card>
              <CardContent>
                <div className="empty-state">
                  <Clock size={64} className="empty-state-icon" />
                  <p className="empty-state-title">Select an activity</p>
                  <p className="empty-state-description">Choose an activity above to mark attendance</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

export default CoordinatorAttendance;