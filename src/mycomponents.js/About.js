import React, { useState, useEffect } from "react";
import { fetchRecentEntries } from "./Api/Api";
const About = (props) => {
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    const getRecentEntries = async () => {
      const data = await fetchRecentEntries();
      setRecentEntries(data);
    };
    getRecentEntries();
  }, []);

  return (
    <div>
      <h1>Recent Entries</h1>
      <ul>
        {recentEntries.map((entry, index) => (
          <li key={index}>{entry.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
