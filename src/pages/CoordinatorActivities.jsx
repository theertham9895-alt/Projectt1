import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { activities } from '../data/mockData';
import { Plus, Calendar, MapPin, Clock, Users, Edit2, Trash2 } from 'lucide-react';

function CoordinatorActivities() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    duration: '',
    maxParticipants: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    alert('Activity created! (In real app, saves to database)');
    console.log('New activity:', newActivity);
    setShowAddForm(false);
    setNewActivity({ title: '', description: '', date: '', location: '', duration: '', maxParticipants: '', category: '' });
  };

  return (
    <div>
      <Sidebar role="coordinator" userName="Coordinator" userEmail="coordinator@example.com" />

      <main className="main-layout">
        <header className="page-header">
          <h1>Activities</h1>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus size={16} />
            Create Activity
          </Button>
        </header>

        <div className="page-content">
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Total</p>
                <p style={{ fontSize: '32px', fontWeight: 700 }}>{activities.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Upcoming</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-warning)' }}>
                  {activities.filter(a => a.status === 'upcoming').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Ongoing</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {activities.filter(a => a.status === 'ongoing').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent style={{ paddingTop: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Completed</p>
                <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {activities.filter(a => a.status === 'completed').length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Activities List */}
          <Card>
            <CardHeader>
              <CardTitle>All Activities</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length === 0 ? (
                <div className="empty-state">
                  <Calendar size={64} className="empty-state-icon" />
                  <p className="empty-state-title">No activities yet</p>
                  <p className="empty-state-description">Create your first NSS activity</p>
                  <Button onClick={() => setShowAddForm(true)}>
                    <Plus size={16} />
                    Create Activity
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {activities.map((activity) => (
                    <div 
                      key={activity.id} 
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(45, 45, 74, 0.5)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="icon-box icon-box-lg icon-box-primary">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{activity.title}</h3>
                            <Badge variant={
                              activity.status === 'upcoming' ? 'warning' :
                              activity.status === 'ongoing' ? 'primary' : 'outline'
                            }>
                              {activity.status}
                            </Badge>
                          </div>
                          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={14} />
                              {new Date(activity.date).toLocaleDateString('en-IN')}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={14} />
                              {activity.location}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={14} />
                              {activity.duration}h
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Users size={14} />
                              {activity.registeredCount}/{activity.maxParticipants}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button variant="ghost" size="icon">
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" style={{ color: 'var(--color-error)' }}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add Activity Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddActivity}>
                    <div className="input-group" style={{ marginBottom: '16px' }}>
                      <label className="input-label">Title</label>
                      <Input
                        name="title"
                        value={newActivity.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Blood Donation Camp"
                        required
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: '16px' }}>
                      <label className="input-label">Description</label>
                      <Input
                        name="description"
                        value={newActivity.description}
                        onChange={handleInputChange}
                        placeholder="Brief description of the activity"
                        required
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div className="input-group">
                        <label className="input-label">Date</label>
                        <Input
                          name="date"
                          type="date"
                          value={newActivity.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Location</label>
                        <Input
                          name="location"
                          value={newActivity.location}
                          onChange={handleInputChange}
                          placeholder="e.g., College Auditorium"
                          required
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                      <div className="input-group">
                        <label className="input-label">Duration (hours)</label>
                        <Input
                          name="duration"
                          type="number"
                          value={newActivity.duration}
                          onChange={handleInputChange}
                          placeholder="e.g., 4"
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Max Participants</label>
                        <Input
                          name="maxParticipants"
                          type="number"
                          value={newActivity.maxParticipants}
                          onChange={handleInputChange}
                          placeholder="e.g., 50"
                          required
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Category</label>
                        <Input
                          name="category"
                          value={newActivity.category}
                          onChange={handleInputChange}
                          placeholder="e.g., Health"
                          required
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} fullWidth>
                        Cancel
                      </Button>
                      <Button type="submit" fullWidth>
                        Create Activity
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

export default CoordinatorActivities;