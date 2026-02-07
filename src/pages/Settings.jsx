import { useState } from 'react';
import { User, Lock, Bell, Shield, Eye, EyeOff, Save, ExternalLink } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    username: 'DragonTrader99',
    email: 'dragon@example.com',
    robloxUsername: 'DragonTrader99_RBX',
    bio: 'Experienced trader specializing in high-tier dragons. Always fair and honest!'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    tradeOffers: true,
    messages: true,
    priceAlerts: false,
    newsletter: true,
    emailNotifications: true,
    pushNotifications: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showTradeHistory: true,
    allowMessages: 'everyone', // everyone, verified, none
    showEmail: false
  });

  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    console.log('Save profile:', profileData);
  };

  const handleSavePassword = () => {
    if (validatePasswordForm()) {
      console.log('Save password');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setErrors({});
    }
  };

  const handleSaveNotifications = () => {
    console.log('Save notifications:', notificationSettings);
  };

  const handleSavePrivacy = () => {
    console.log('Save privacy:', privacySettings);
  };

  const handleConnectGoogle = () => {
    console.log('Connect Google');
  };

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card p-2 space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-left flex items-center gap-3 ${
                  activeTab === 'profile'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-left flex items-center gap-3 ${
                  activeTab === 'password'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Lock className="w-5 h-5" />
                Password
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-left flex items-center gap-3 ${
                  activeTab === 'notifications'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Bell className="w-5 h-5" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-left flex items-center gap-3 ${
                  activeTab === 'privacy'
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Shield className="w-5 h-5" />
                Privacy
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Roblox Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Roblox Username
                    </label>
                    <input
                      type="text"
                      name="robloxUsername"
                      value={profileData.robloxUsername}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Connected Accounts */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Connected Accounts
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-medium">Discord</p>
                            <p className="text-sm text-gray-400">Connected</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-dark-800 text-white rounded-lg hover:bg-dark-700 transition-colors text-sm">
                          Disconnect
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-dark-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-medium">Google</p>
                            <p className="text-sm text-gray-400">Not connected</p>
                          </div>
                        </div>
                        <button
                          onClick={handleConnectGoogle}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                
                <div className="space-y-6">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2 pr-12 bg-dark-900 border ${
                          errors.currentPassword ? 'border-primary' : 'border-dark-700'
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="text-primary text-sm mt-1">{errors.currentPassword}</p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2 pr-12 bg-dark-900 border ${
                          errors.newPassword ? 'border-primary' : 'border-dark-700'
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-primary text-sm mt-1">{errors.newPassword}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full px-4 py-2 pr-12 bg-dark-900 border ${
                          errors.confirmPassword ? 'border-primary' : 'border-dark-700'
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-primary text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    onClick={handleSavePassword}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'tradeOffers', label: 'Trade Offers', desc: 'Get notified when someone makes you a trade offer' },
                        { key: 'messages', label: 'Direct Messages', desc: 'Receive emails for new messages' },
                        { key: 'priceAlerts', label: 'Price Alerts', desc: 'Get notified of significant price changes' },
                        { key: 'newsletter', label: 'Newsletter', desc: 'Weekly updates and marketplace news' }
                      ].map(({ key, label, desc }) => (
                        <label key={key} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg cursor-pointer hover:bg-dark-800 transition-colors">
                          <div className="flex-1">
                            <p className="text-white font-medium">{label}</p>
                            <p className="text-sm text-gray-400">{desc}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings[key]}
                            onChange={() => handleNotificationToggle(key)}
                            className="w-5 h-5 bg-dark-800 border-dark-700 rounded text-primary focus:ring-primary"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Browser Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Enable all email notifications' },
                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get real-time browser notifications' }
                      ].map(({ key, label, desc }) => (
                        <label key={key} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg cursor-pointer hover:bg-dark-800 transition-colors">
                          <div className="flex-1">
                            <p className="text-white font-medium">{label}</p>
                            <p className="text-sm text-gray-400">{desc}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={notificationSettings[key]}
                            onChange={() => handleNotificationToggle(key)}
                            className="w-5 h-5 bg-dark-800 border-dark-700 rounded text-primary focus:ring-primary"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveNotifications}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  {/* Privacy Toggles */}
                  <div className="space-y-3">
                    {[
                      { key: 'showOnlineStatus', label: 'Show Online Status', desc: 'Let others see when you\'re online' },
                      { key: 'showTradeHistory', label: 'Public Trade History', desc: 'Allow others to view your trade history' },
                      { key: 'showEmail', label: 'Show Email', desc: 'Display your email on your profile' }
                    ].map(({ key, label, desc }) => (
                      <label key={key} className="flex items-center justify-between p-4 bg-dark-900 rounded-lg cursor-pointer hover:bg-dark-800 transition-colors">
                        <div className="flex-1">
                          <p className="text-white font-medium">{label}</p>
                          <p className="text-sm text-gray-400">{desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={privacySettings[key]}
                          onChange={() => handlePrivacyToggle(key)}
                          className="w-5 h-5 bg-dark-800 border-dark-700 rounded text-primary focus:ring-primary"
                        />
                      </label>
                    ))}
                  </div>

                  {/* Message Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Who can message you?</h3>
                    <div className="space-y-2">
                      {[
                        { value: 'everyone', label: 'Everyone' },
                        { value: 'verified', label: 'Verified users only' },
                        { value: 'none', label: 'No one' }
                      ].map(({ value, label }) => (
                        <label key={value} className="flex items-center p-4 bg-dark-900 rounded-lg cursor-pointer hover:bg-dark-800 transition-colors">
                          <input
                            type="radio"
                            name="allowMessages"
                            value={value}
                            checked={privacySettings.allowMessages === value}
                            onChange={(e) => handlePrivacyChange('allowMessages', e.target.value)}
                            className="w-4 h-4 bg-dark-800 border-dark-700 text-primary focus:ring-primary"
                          />
                          <span className="ml-3 text-white">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSavePrivacy}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
