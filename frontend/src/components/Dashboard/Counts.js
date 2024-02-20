// src/components/Dashboard/Counts.js

import React, { useEffect, useState } from 'react';
import { getProjectCount, getSampleCount } from '../../services/apiService';

const Counts = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [sampleCount, setSampleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectCountResult = await getProjectCount();
        const sampleCountResult = await getSampleCount();
        setProjectCount(projectCountResult.data.count);
        setSampleCount(sampleCountResult.data.count);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="counts-container">
      <div className="count-item">
        <h2>Projects</h2>
        <p>Total: {projectCount}</p>
      </div>
      <div className="count-item">
        <h2>Samples</h2>
        <p>Total: {sampleCount}</p>
      </div>
    </div>
  );
};

export default Counts;
