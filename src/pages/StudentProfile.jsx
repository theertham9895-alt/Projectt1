import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { User, Mail, Phone, BookOpen, Hash, Calendar, Edit2, Save, X } from 'lucide-react';

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Default student data (will come from database later)
  const [profile, setProfile] = useState({
    name: 'Student',
    email: 'student@college.edu',
    phone: '+91 9876543210',
    department: 'Information Technology',
    rollNo: 'IEAXEIT001',
    year: 3,
    joinedDate: '2024-08-15',
    totalHours: 0,
    activitiesAttended: 0
  });

  const [editData, setEditData] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
    alert('Profile updated! (In real app, saves to database)');
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  return (
    <div>
      <Sidebar role="student" userName={profile.name} userEmail={profile.email} />

      <main className="main-layout">
        <header className="page-header">
          <h1>My Profile</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 size={16} />
              Edit Profile
            </Button>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline" onClick={handleCancel}>
                <X size={16} />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save size={16} />
                Save Changes
              </Button>
            </div>
          )}
        </header>

        <div className="page-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            
            {/* Profile Card */}
            <Card>
              <CardContent style={{ paddingTop: '24px', textAlign: 'center' }}>
                <div className="avatar avatar-lg avatar-primary" style={{ margin: '0 auto 16px' }}>
                  {profile.name.charAt(0)}
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '4px' }}>{profile.name}</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{profile.rollNo}</p>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', padding: '16px 0', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>{profile.totalHours}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Hours</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-accent)' }}>{profile.activitiesAttended}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Activities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="input-group">
                      <label className="input-label">Full Name</label>
                      <Input
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Phone</label>
                      <Input
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Department</label>
                      <Input
                        name="department"
                        value={editData.department}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Roll Number</label>
                      <Input
                        name="rollNo"
                        value={editData.rollNo}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Year</label>
                      <Input
                        name="year"
                        type="number"
                        value={editData.year}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <InfoItem icon={<User size={18} />} label="Full Name" value={profile.name} />
                    <InfoItem icon={<Mail size={18} />} label="Email" value={profile.email} />
                    <InfoItem icon={<Phone size={18} />} label="Phone" value={profile.phone} />
                    <InfoItem icon={<BookOpen size={18} />} label="Department" value={profile.department} />
                    <InfoItem icon={<Hash size={18} />} label="Roll Number" value={profile.rollNo} />
                    <InfoItem icon={<Calendar size={18} />} label="Year" value={`Year ${profile.year}`} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// Info Item Component
function InfoItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <div className="icon-box icon-box-md" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontSize: '14px', fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}

export default StudentProfile;