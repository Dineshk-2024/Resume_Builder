import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppProvider, AppContext } from './contexts/AppContext';
import { lightTheme, darkTheme } from './theme';
import HomePage from './pages/HomePage';
import PersonalInfo from './pages/PersonalInfo';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Preview from './pages/Preview';
import Summary from './pages/Summary';  // Import the Summary page
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function AppContent() {
  const { darkMode } = React.useContext(AppContext);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <NavBar />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/personal-info" element={<PersonalInfo />} />
              <Route path="/summary" element={<Summary />} /> {/* Add the route for Summary */}
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/preview" element={<Preview />} />
            </Routes>
          </div>
          <br />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
