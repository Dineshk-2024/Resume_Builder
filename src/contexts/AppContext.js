import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [resumeData, setResumeData] = useLocalStorage('resumeData', {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      photo: null,
      summary: '',
    },
    summary: [],
    education: [],
    experience: [],
    skills: [],
    projects: [],
  });
  
  const [activeTemplate, setActiveTemplate] = useLocalStorage('activeTemplate', 'template1');
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [sectionOrder, setSectionOrder] = useLocalStorage('sectionOrder', [
    'personalInfo',
    'summary',
    'education',
    'experience',
    'skills',
    'projects',
  ]);

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const moveSection = (fromIndex, toIndex) => {
    const newOrder = [...sectionOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setSectionOrder(newOrder);
  };

  return (
    <AppContext.Provider value={{
      resumeData,
      updateResumeData,
      activeTemplate,
      setActiveTemplate,
      darkMode,
      setDarkMode,
      sectionOrder,
      moveSection
    }}>
      {children}
    </AppContext.Provider>
  );
};