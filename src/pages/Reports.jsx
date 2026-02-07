import { useState } from 'react';
import { AlertTriangle, Flag, Search, Calendar, User } from 'lucide-react';
import Badge from '../components/Badge';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('submit');
  const [formData, setFormData] = useState({
    reportedUser: '',
    reportType: 'scam',
    description: '',
    evidence: ''
  });
  const [errors, setErrors] = useState({});

  const mockReports = [
    {
      id: 1,
      reportedUser: 'SuspiciousTrader123',
      reportedBy: 'DragonTrader99',
      type: 'scam',
      description: 'User tried to scam me by switching pets at last moment',
      date: '2024-02-07T10:30:00Z',
      status: 'investigating',
      evidence: 'Screenshots attached'
    },
    {
      id: 2,
      reportedUser: 'FakeTrader456',
      reportedBy: 'SafariHunter',
      type: 'fake_middleman',
      description: 'Pretended to be a middleman and stole my pet',
      date: '2024-02-06T14:20:00Z',
      status: 'resolved',
      evidence: 'Chat logs and video'
    },
    {
      id: 3,
      reportedUser: 'RudeUser789',
      reportedBy: 'ParrotLover',
      type: 'harassment',
      description: 'Sending harassing messages after declining trade',
      date: '2024-02-05T16:45:00Z',
      status: 'investigating',
      evidence: 'Message screenshots'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.reportedUser.trim()) {
      newErrors.reportedUser = 'Username is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Report submitted:', formData);
      setFormData({
        reportedUser: '',
        reportType: 'scam',
        description: '',
        evidence: ''
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'resolved':
        return 'bg-green-500/20 text-green-500';
      case 'dismissed':
        return 'bg-gray-500/20 text-gray-500';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  const reportTypes = [
    { value: 'scam', label: 'Scam / Fraud' },
    { value: 'fake_middleman', label: 'Fake Middleman' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'spam', label: 'Spam' },
    { value: 'inappropriate', label: 'Inappropriate Content' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-dark-950 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Report Center</h1>
          <p className="text-gray-400">Report scams and suspicious activity</p>
        </div>

        {/* Warning Banner */}
        <div className="card p-4 mb-8 border-l-4 border-primary">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium mb-1">Important</p>
              <p className="text-sm text-gray-400">
                False reports are taken seriously and may result in account suspension. 
                Please only submit legitimate reports with evidence.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card p-2 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('submit')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'submit'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Submit Report
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'recent'
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
              }`}
            >
              Recent Reports
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'submit' && (
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Reported User */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username to Report *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="reportedUser"
                    value={formData.reportedUser}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-dark-900 border ${
                      errors.reportedUser ? 'border-primary' : 'border-dark-700'
                    } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Enter username"
                  />
                </div>
                {errors.reportedUser && (
                  <p className="text-primary text-sm mt-1">{errors.reportedUser}</p>
                )}
              </div>

              {/* Report Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Report Type *
                </label>
                <select
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                >
                  {reportTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-2 bg-dark-900 border ${
                    errors.description ? 'border-primary' : 'border-dark-700'
                  } rounded-lg text-white focus:outline-none focus:border-primary transition-colors resize-none`}
                  placeholder="Provide detailed information about the incident..."
                />
                {errors.description && (
                  <p className="text-primary text-sm mt-1">{errors.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 20 characters. Be as detailed as possible.
                </p>
              </div>

              {/* Evidence */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Evidence (Links or Description)
                </label>
                <textarea
                  name="evidence"
                  value={formData.evidence}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Links to screenshots, videos, or detailed description of evidence..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload screenshots to imgur.com or similar and paste links here
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Flag className="w-5 h-5" />
                Submit Report
              </button>
            </form>
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="space-y-4">
            {mockReports.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-gray-400">No reports found</p>
              </div>
            ) : (
              mockReports.map(report => (
                <div key={report.id} className="card p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          {report.reportedUser}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <Flag className="w-4 h-4" />
                          <span>{reportTypes.find(t => t.value === report.type)?.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>by {report.reportedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(report.date)}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-2">{report.description}</p>
                      
                      {report.evidence && (
                        <p className="text-sm text-gray-400">
                          <span className="font-medium">Evidence:</span> {report.evidence}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
