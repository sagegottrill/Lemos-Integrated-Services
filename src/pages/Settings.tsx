import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Shield } from 'lucide-react';

export const Settings: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@lemosintegrated.com',
    role: 'System Administrator'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <User className="text-cyan-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={profile.role}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2 rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-cyan-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="w-5 h-5 text-cyan-500"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">Push Notifications</span>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="w-5 h-5 text-cyan-500"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">SMS Alerts</span>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="w-5 h-5 text-cyan-500"
              />
            </label>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-cyan-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
          </div>
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-all mb-3">
            Change Password
          </button>
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-all">
            Enable Two-Factor Auth
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-cyan-500" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Access Control</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-gray-700">Dashboard</span>
              <span className="text-green-600 font-medium">Full Access</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-gray-700">Reports</span>
              <span className="text-green-600 font-medium">Full Access</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-gray-700">Settings</span>
              <span className="text-green-600 font-medium">Full Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
