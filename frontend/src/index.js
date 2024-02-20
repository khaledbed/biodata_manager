import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Projects from './components/Dashboard/Projects';
import Samples from './components/Dashboard/Samples';
import Annotations from './components/Dashboard/Annotations';
import Methods from './components/Dashboard/Methods';
import References from './components/Dashboard/References';
import Dashboard from './components/Dashboard/Dashboard';
import RegisterDatasetForm from './components/Dashboard/RegisterDatasetForm';
import MetadataSearch from './components/Dashboard/MetadataSearch';
import MetadataVisualization from './components/Dashboard/MetadataVisualization';
import MetadataAnnotationForm from './components/Dashboard/MetadataAnnotationForm'; // Import MetadataAnnotationForm
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/projects" element={<Projects />} /> 
        <Route path="/dashboard/samples" element={<Samples />} /> 
        <Route path="/dashboard/annotations" element={<Annotations />} /> 
        <Route path="/dashboard/methods" element={<Methods />} />  
        <Route path="/dashboard/references" element={<References />} /> 
        <Route path="/dashboard/register-dataset" element={<RegisterDatasetForm />} /> 
        <Route path="/dashboard/metadata-search" element={<MetadataSearch />} /> 
        <Route path="/dashboard/metadata-visualization" element={<MetadataVisualization />} /> 
        <Route path="/dashboard/metadata-annotation-form" element={<MetadataAnnotationForm />} /> {/* Add route for MetadataAnnotationForm */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
