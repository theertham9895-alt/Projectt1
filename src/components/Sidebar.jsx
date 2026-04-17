import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  ClipboardCheck, 
  Award, 
  User, 
  Users, 
  LogOut,
  Settings
} from 'lucide-react';
import Button from './Button';

function Sidebar({ role, userName = 'User', userEmail = 'user@example.com' }) {
  const location = useLocation();

  // Menu items for students
  const studentLinks = [
    { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/activities', label: 'Activities', icon: Calendar },
    { path: '/student/attendance', label: 'My Attendance', icon: ClipboardCheck },
    { path: '/student/certificates', label: 'Certificates', icon: Award },
    { path: '/student/profile', label: 'Profile', icon: User },
  ];

  // Menu items for coordinators
  const coordinatorLinks = [
    { path: '/coordinator', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/coordinator/students', label: 'Students', icon: Users },
    { path: '/coordinator/activities', label: 'Activities', icon: Calendar },
    { path: '/coordinator/attendance', label: 'Attendance', icon: ClipboardCheck },
    { path: '/coordinator/certificates', label: 'Certificates', icon: Award },
  ];

  const links = role === 'student' ? studentLinks : coordinatorLinks;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <div className="sidebar-logo-icon">N</div>
          <div className="sidebar-logo-text">
            <h1>NSS Management</h1>
            <p style={{ textTransform: 'capitalize' }}>{role} Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar avatar-sm avatar-secondary">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <p>{userName}</p>
            <span>{userEmail}</span>
          </div>
        </div>
        
        <div className="sidebar-actions">
          <Button variant="ghost" size="sm">
            <Settings size={16} />
            Settings
          </Button>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <LogOut size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;