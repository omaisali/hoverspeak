import React, { useState } from 'react';
import { Mic, Mouse, Smartphone, TrendingUp, Globe, Shield, Upload, Settings, BarChart3, Users, Plus, Eye, Edit, Trash2, Play, Pause } from 'lucide-react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  subscriptionPlan: string;
}

interface Advertisement {
  id: string;
  textMessage: string;
  audioFileUrl: string;
  imageTemplateUrl: string;
  primaryLanguage: string;
  translateToLocal: boolean;
  translationText?: string;
  localLanguageTTSVoice?: string;
  speechVoice: string;
  receivingSites: string[];
  receivingSitesFileUrl?: string;
  displayUntilDate: string;
  isActive: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'register' | 'dashboard' | 'create-ad'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Registration form state
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
    companyName: '',
    businessWebsite: '',
    subscriptionPlan: 'free',
    billingFrequency: 'monthly',
    agreeTerms: false,
    agreePrivacy: false
  });

  // Ad creation form state
  const [adData, setAdData] = useState({
    textMessage: '',
    audioFileUrl: '',
    imageTemplateUrl: '',
    primaryLanguage: 'en-US',
    translateToLocal: false,
    translationText: '',
    localLanguageTTSVoice: '',
    speechVoice: 'default',
    receivingSites: [''],
    displayUntilDate: ''
  });

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would be an API call
    const mockUser: User = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      company: 'Demo Company',
      subscriptionPlan: 'Pro'
    };
    setUser(mockUser);
    setCurrentView('dashboard');
  };

  const handleRegister = () => {
    // Mock registration - in real app, this would be an API call
    const newUser: User = {
      id: Date.now().toString(),
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      email: registrationData.email,
      company: registrationData.companyName,
      subscriptionPlan: registrationData.subscriptionPlan
    };
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleCreateAd = () => {
    const newAd: Advertisement = {
      id: Date.now().toString(),
      ...adData,
      receivingSites: adData.receivingSites.filter(site => site.trim() !== ''),
      isActive: true
    };
    setAdvertisements([...advertisements, newAd]);
    setCurrentView('dashboard');
    // Reset form
    setAdData({
      textMessage: '',
      audioFileUrl: '',
      imageTemplateUrl: '',
      primaryLanguage: 'en-US',
      translateToLocal: false,
      translationText: '',
      localLanguageTTSVoice: '',
      speechVoice: 'default',
      receivingSites: [''],
      displayUntilDate: ''
    });
  };

  const toggleAdPlayback = (adId: string) => {
    if (isPlaying === adId) {
      setIsPlaying(null);
    } else {
      setIsPlaying(adId);
      // Mock audio playback - in real app, this would play actual audio
      setTimeout(() => setIsPlaying(null), 3000);
    }
  };

  const addReceivingSite = () => {
    setAdData({
      ...adData,
      receivingSites: [...adData.receivingSites, '']
    });
  };

  const updateReceivingSite = (index: number, value: string) => {
    const updatedSites = [...adData.receivingSites];
    updatedSites[index] = value;
    setAdData({
      ...adData,
      receivingSites: updatedSites
    });
  };

  const removeReceivingSite = (index: number) => {
    const updatedSites = adData.receivingSites.filter((_, i) => i !== index);
    setAdData({
      ...adData,
      receivingSites: updatedSites.length > 0 ? updatedSites : ['']
    });
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div className="text-white font-bold text-xl">HoverSpeak™</div>
        </div>
        <div className="space-x-4">
          <button 
            onClick={() => setCurrentView('login')}
            className="text-white hover:text-blue-300 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => setCurrentView('register')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Where Digital Advertising<br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Finds Its Voice
            </span>
          </h1>
          <p className="text-blue-200 text-xl mb-4">Patent Pending | M. Atlas Technologies, LLC</p>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              We've All Been Playing by the Same Rule: Click or Nothing. Until Now.
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Every ad on the Internet fights for one thing: A click. But before a user clicks — there's hesitation, 
              uncertainty, or just plain indifference. And in that silent moment, the opportunity is lost.
            </p>
            <p className="text-emerald-400 text-xl font-semibold mb-4">HoverSpeak™ breaks that silence.</p>
            <p className="text-slate-300 text-lg">
              It introduces a bold new concept in digital marketing: Voice-triggered ads activated before the click.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <Mouse className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">Hover with Mouse</h3>
              <p className="text-slate-300">On desktop, move the cursor over an ad</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <Smartphone className="w-12 h-12 text-emerald-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-3">Touch-and-Hold</h3>
              <p className="text-slate-300">On mobile, press and hold an ad for ~1 second</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: TrendingUp, title: "Boosts Click-Through Rates", desc: "Spoken ads outperform silent ones" },
              { icon: Globe, title: "Localized Instantly", desc: "Language, dialect, even currency adapt in real time" },
              { icon: Shield, title: "Data-Driven", desc: "Track audio triggers, listens, and behavior" }
            ].map((benefit, index) => (
              <div key={index} className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <benefit.icon className="w-10 h-10 text-orange-400 mb-4 mx-auto" />
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-slate-300 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-x-4">
            <button 
              onClick={() => setCurrentView('register')}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
            >
              Start Your Free Trial
            </button>
            <button className="border border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-xl text-lg font-semibold transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Login Component
  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your HoverSpeak™ account</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, password); }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentView('register')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Don't have an account? Sign up
            </button>
          </div>
          <div className="mt-4 text-center">
            <button 
              onClick={() => setCurrentView('landing')}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Registration Component
  const RegistrationPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 py-8 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Join HoverSpeak™</h2>
          <p className="text-gray-600">Create your account and start speaking to your audience</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-6">
          {/* Account Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={registrationData.firstName}
                  onChange={(e) => setRegistrationData({...registrationData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={registrationData.lastName}
                  onChange={(e) => setRegistrationData({...registrationData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={registrationData.password}
                  onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  value={registrationData.confirmPassword}
                  onChange={(e) => setRegistrationData({...registrationData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={registrationData.companyName}
                  onChange={(e) => setRegistrationData({...registrationData, companyName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Website</label>
                <input
                  type="url"
                  value={registrationData.businessWebsite}
                  onChange={(e) => setRegistrationData({...registrationData, businessWebsite: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Plan</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { id: 'free', name: 'Free', price: '$0/month', features: ['5 ads', 'Basic analytics'] },
                { id: 'pro', name: 'Pro', price: '$29/month', features: ['Unlimited ads', 'Advanced analytics', 'Multi-language'] },
                { id: 'enterprise', name: 'Enterprise', price: 'Custom', features: ['Everything', 'White-label', 'API access'] }
              ].map(plan => (
                <div key={plan.id} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  registrationData.subscriptionPlan === plan.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`} onClick={() => setRegistrationData({...registrationData, subscriptionPlan: plan.id})}>
                  <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                  <p className="text-lg font-bold text-blue-600 mb-2">{plan.price}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={registrationData.agreeTerms}
                onChange={(e) => setRegistrationData({...registrationData, agreeTerms: e.target.checked})}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> *
              </label>
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                checked={registrationData.agreePrivacy}
                onChange={(e) => setRegistrationData({...registrationData, agreePrivacy: e.target.checked})}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="privacy" className="text-sm text-gray-700">
                I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span> *
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <button 
            onClick={() => setCurrentView('login')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Already have an account? Sign in
          </button>
          <br />
          <button 
            onClick={() => setCurrentView('landing')}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">HoverSpeak™ Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.firstName}!</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.subscriptionPlan} Plan</p>
              <p className="text-xs text-gray-500">{user?.company}</p>
            </div>
            <button 
              onClick={() => setUser(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Active Ads', value: advertisements.filter(ad => ad.isActive).length, icon: TrendingUp, color: 'blue' },
            { title: 'Total Listens', value: '12,543', icon: Users, color: 'emerald' },
            { title: 'Click-Through Rate', value: '8.3%', icon: BarChart3, color: 'orange' },
            { title: 'Revenue', value: '$2,847', icon: TrendingUp, color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ads Management */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Your Advertisements</h2>
              <button 
                onClick={() => setCurrentView('create-ad')}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-blue-700 hover:to-emerald-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Ad</span>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {advertisements.length === 0 ? (
              <div className="text-center py-12">
                <Mic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No advertisements yet</h3>
                <p className="text-gray-600 mb-6">Create your first voice-enabled ad to get started</p>
                <button 
                  onClick={() => setCurrentView('create-ad')}
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all"
                >
                  Create Your First Ad
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {advertisements.map((ad) => (
                  <div key={ad.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">Ad #{ad.id}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            ad.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {ad.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{ad.textMessage}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Language: {ad.primaryLanguage}</span>
                          <span>Sites: {ad.receivingSites.length}</span>
                          <span>Expires: {ad.displayUntilDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAdPlayback(ad.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Play/Pause Preview"
                        >
                          {isPlaying === ad.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Edit Ad">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Ad">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Create Ad Component
  const CreateAdPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center space-x-4">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ←
          </button>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create New Advertisement</h1>
            <p className="text-sm text-gray-600">Set up your voice-enabled ad campaign</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); handleCreateAd(); }} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Basic Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Message *</label>
                  <textarea
                    value={adData.textMessage}
                    onChange={(e) => setAdData({...adData, textMessage: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the text that will be converted to speech..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">This text will be converted to speech using Text-to-Speech technology</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Language *</label>
                    <select
                      value={adData.primaryLanguage}
                      onChange={(e) => setAdData({...adData, primaryLanguage: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es-ES">Spanish (Spain)</option>
                      <option value="es-MX">Spanish (Mexico)</option>
                      <option value="fr-FR">French</option>
                      <option value="de-DE">German</option>
                      <option value="it-IT">Italian</option>
                      <option value="pt-BR">Portuguese (Brazil)</option>
                      <option value="ja-JP">Japanese</option>
                      <option value="ko-KR">Korean</option>
                      <option value="zh-CN">Chinese (Simplified)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Speech Voice</label>
                    <select
                      value={adData.speechVoice}
                      onChange={(e) => setAdData({...adData, speechVoice: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="default">Default Voice</option>
                      <option value="neural-male">Neural Male</option>
                      <option value="neural-female">Neural Female</option>
                      <option value="professional-male">Professional Male</option>
                      <option value="professional-female">Professional Female</option>
                      <option value="casual-male">Casual Male</option>
                      <option value="casual-female">Casual Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={adData.translateToLocal}
                      onChange={(e) => setAdData({...adData, translateToLocal: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Translate to local language automatically</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-7">When enabled, the system will detect the user's location and translate the message accordingly</p>
                </div>

                {adData.translateToLocal && (
                  <div className="bg-blue-50 rounded-lg p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Translation Text</label>
                      <textarea
                        value={adData.translationText}
                        onChange={(e) => setAdData({...adData, translationText: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Pre-translated version (optional - system will auto-translate if empty)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Local Language TTS Voice</label>
                      <select
                        value={adData.localLanguageTTSVoice}
                        onChange={(e) => setAdData({...adData, localLanguageTTSVoice: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Auto-select based on language</option>
                        <option value="local-male">Local Male Voice</option>
                        <option value="local-female">Local Female Voice</option>
                        <option value="local-professional">Local Professional Voice</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Media & Templates */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Media & Templates
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image Template Upload</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">HTML, PNG, JPG up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*,.html"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Mock file upload - in real app, this would upload to server
                          setAdData({...adData, imageTemplateUrl: `https://example.com/uploads/${file.name}`});
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                        input?.click();
                      }}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                  {adData.imageTemplateUrl && (
                    <p className="text-sm text-green-600 mt-2">✓ Template uploaded successfully</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audio File URL (Optional)</label>
                  <input
                    type="url"
                    value={adData.audioFileUrl}
                    onChange={(e) => setAdData({...adData, audioFileUrl: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/audio/my-ad.mp3"
                  />
                  <p className="text-xs text-gray-500 mt-1">If provided, this audio file will be used instead of TTS. Leave empty to use text-to-speech.</p>
                </div>
              </div>
            </div>

            {/* Receiving Websites */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Receiving Websites
              </h2>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Specify up to 10 websites where this ad can be displayed</p>
                
                {adData.receivingSites.map((site, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="url"
                      value={site}
                      onChange={(e) => updateReceivingSite(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                    />
                    {adData.receivingSites.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeReceivingSite(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                
                {adData.receivingSites.length < 10 && (
                  <button
                    type="button"
                    onClick={addReceivingSite}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Website</span>
                  </button>
                )}

                <div className="border-t pt-4 mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Upload (Optional)</label>
                  <input
                    type="file"
                    accept=".txt,.csv"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload a text or CSV file with one URL per line</p>
                </div>
              </div>
            </div>

            {/* Campaign Settings */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Campaign Settings
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Display Until Date *</label>
                <input
                  type="date"
                  value={adData.displayUntilDate}
                  onChange={(e) => setAdData({...adData, displayUntilDate: e.target.value})}
                  className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">The ad will automatically stop displaying after this date</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-medium"
              >
                Create Advertisement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Main App Render
  if (user) {
    if (currentView === 'create-ad') {
      return <CreateAdPage />;
    }
    return <Dashboard />;
  }

  switch (currentView) {
    case 'login':
      return <LoginPage />;
    case 'register':
      return <RegistrationPage />;
    default:
      return <LandingPage />;
  }
}

export default App;