import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Projects from './components/Searchable/Projects';
import Samples from './components/Searchable/Samples';
import Annotations from './components/Searchable/Annotations';
import Methods from './components/Searchable/Methods';
import References from './components/Searchable/References';
import Datasets from './components/Searchable/Datasets';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Users/Profile';
import Support from './components/Tools/SupportPage';
import ActivityFeed from './components/Tools/ActivityFeed';
import SettingsPage from './components/Settings/SettingsPage';
import RegisterDatasetForm from './components/Datasets/RegisterDatasetForm';
import MetadataSearch from './components/Metadata/MetadataSearch';
import MetadataVisualization from './components/Metadata/MetadataVisualization';
import MetadataAnnotationForm from './components/Metadata/MetadataAnnotationForm';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Support />} />
        <Route path="/activity" element={<ActivityFeed />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard/projects" element={<Projects />} /> 
        <Route path="/dashboard/samples" element={<Samples />} /> 
        <Route path="/dashboard/annotations" element={<Annotations />} /> 
        <Route path="/dashboard/methods" element={<Methods />} />  
        <Route path="/dashboard/references" element={<References />} /> 
        <Route path="/dashboard/datasets" element={<Datasets />} /> 
        <Route path="/dashboard/register-dataset" element={<RegisterDatasetForm />} /> 
        <Route path="/dashboard/metadata-search" element={<MetadataSearch />} /> 
        <Route path="/dashboard/metadata-visualization" element={<MetadataVisualization />} /> 
        <Route path="/dashboard/metadata-annotation-form" element={<MetadataAnnotationForm />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
