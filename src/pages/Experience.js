import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const Experience = () => {
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useContext(AppContext);
  const [experiences, setExperiences] = useState(resumeData.experience || []);
  const [currentExperience, setCurrentExperience] = useState({
    id: '',
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedExperiences = experiences.map(exp =>
        exp.id === currentExperience.id ? currentExperience : exp
      );
      setExperiences(updatedExperiences);
    } else {
      setExperiences([...experiences, { ...currentExperience, id: uuidv4() }]);
    }

    setCurrentExperience({
      id: '',
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const experienceToEdit = experiences.find(exp => exp.id === id);
    setCurrentExperience(experienceToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleSaveAndContinue = () => {
    updateResumeData('experience', experiences);
    navigate('/skills');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Experience
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company"
                name="company"
                value={currentExperience.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Role"
                name="role"
                value={currentExperience.role}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Start Date"
                name="startDate"
                type="month"
                InputLabelProps={{ shrink: true }}
                value={currentExperience.startDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="End Date (or present)"
                name="endDate"
                type="month"
                InputLabelProps={{ shrink: true }}
                value={currentExperience.endDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={currentExperience.description}
                onChange={handleChange}
                placeholder="Describe your responsibilities and achievements"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color={isEditing ? 'secondary' : 'primary'}
            >
              {isEditing ? 'Update Experience' : 'Add Experience'}
            </Button>
          </Box>
        </Box>

        {experiences.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Your Experiences
            </Typography>
            <List>
              {experiences.map((exp) => (
                <React.Fragment key={exp.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`${exp.role} @ ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})`}
                      secondary={
                        <Typography component="span" variant="body2" display="block">
                          {exp.description}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleEdit(exp.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDelete(exp.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate('/education')}>
            Back
          </Button>
          <Button variant="contained" onClick={handleSaveAndContinue}>
            Next: Skills
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Experience;
