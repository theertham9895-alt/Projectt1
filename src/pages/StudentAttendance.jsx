import React from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

function StudentAttendance() {
  // Empty attendance records (will come from database later)
  const attendanceRecords = [];
  
  // Calculate stats
  const totalRecords = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(r => r.status === 'present').length;
  const absentCount = attendanceRecords.filter(r => r.status === 'absent').length;
  const totalHours = attendanceRecords.reduce((sum, r) => sum + (r.hours || 0), 0);
  const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

  return (
    <div>
      <Sidebar role="student" userName="Student" userEmail="student@example.com" />

      <main className="main-layout">
        <header className="page-header">
          <h1>My Attendance</h1>
        </header>

        <div className="page-content">
          {/* Stats */}
          <div className="stats-grid">
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <div className="stat-card">
                  <div className="icon-box icon-box-lg icon-box-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="stat-label">Total Hours</p>
                    <p className="stat-value">{totalHours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <div className="stat-card">
                  <div className="icon-box icon-box-lg icon-box-success">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="stat-label">Present</p>
                    <p className="stat-value">{presentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <div className="stat-card">
                  <div className="icon-box icon-box-lg" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--color-error)' }}>
                    <XCircle size={24} />
                  </div>
                  <div>
                    <p className="stat-label">Absent</p>
                    <p className="stat-value">{absentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <div className="stat-card">
                  <div className="icon-box icon-box-lg icon-box-accent">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <p className="stat-label">Attendance Rate</p>
                    <p className="stat-value">{attendanceRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              {attendanceRecords.length === 0 ? (
                <div className="empty-state">
                  <Clock size={64} className="empty-state-icon" />
                  <p className="empty-state-title">No attendance records yet</p>
                  <p className="empty-state-description">
                    Your attendance will appear here once you participate in activities
                  </p>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.id}>
                        <td>{record.activity}</td>
                        <td>
                          {new Date(record.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td>
                          <Badge variant={
                            record.status === 'present' ? 'primary' :
                            record.status === 'absent' ? 'error' : 'warning'
                          }>
                            {record.status}
                          </Badge>
                        </td>
                        <td>{record.hours > 0 ? `+${record.hours}` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default StudentAttendance;