import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button 
} from '@mui/material';

const Summary = () => {
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useContext(AppContext);
  const [summary, setSummary] = useState(resumeData.personalInfo.summary || '');

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSaveAndNext = () => {
    updateResumeData('personalInfo', { ...resumeData.personalInfo, summary });
    navigate('/education');
  };

  const handleBack = () => {
    updateResumeData('personalInfo', { ...resumeData.personalInfo, summary });
    navigate('/personal-info');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Professional Summary
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          value={summary}
          onChange={handleChange}
          variant="outlined"
          placeholder="Briefly describe your professional background and skills"
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleSaveAndNext}>
            Next: Education
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Summary;
