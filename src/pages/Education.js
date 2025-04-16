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

const Education = () => {
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useContext(AppContext);
  const [educations, setEducations] = useState(resumeData.education);
  const [currentEducation, setCurrentEducation] = useState({
    id: '',
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      const updatedEducations = educations.map(edu => 
        edu.id === currentEducation.id ? currentEducation : edu
      );
      setEducations(updatedEducations);
    } else {
      setEducations([...educations, { ...currentEducation, id: uuidv4() }]);
    }
    
    setCurrentEducation({
      id: '',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const educationToEdit = educations.find(edu => edu.id === id);
    setCurrentEducation(educationToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const handleSaveAndContinue = () => {
    updateResumeData('education', educations);
    navigate('/experience');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Education
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Institution"
                name="institution"
                value={currentEducation.institution}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Degree"
                name="degree"
                value={currentEducation.degree}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Field of Study"
                name="fieldOfStudy"
                value={currentEducation.fieldOfStudy}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="month"
                InputLabelProps={{ shrink: true }}
                value={currentEducation.startDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date (or expected)"
                name="endDate"
                type="month"
                InputLabelProps={{ shrink: true }}
                value={currentEducation.endDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={3}
                value={currentEducation.description}
                onChange={handleChange}
                placeholder="Any honors, awards, or relevant coursework"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color={isEditing ? 'secondary' : 'primary'}
            >
              {isEditing ? 'Update Education' : 'Add Education'}
            </Button>
          </Box>
        </Box>

        {educations.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Your Education History
            </Typography>
            <List>
              {educations.map((edu) => (
                <React.Fragment key={edu.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${edu.degree} at ${edu.institution}`}
                      secondary={`${edu.startDate} - ${edu.endDate}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleEdit(edu.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDelete(edu.id)}>
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
          <Button variant="outlined" onClick={() => navigate('/personal-info')}>
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveAndContinue}
            disabled={educations.length === 0}
          >
            Next: Experience
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Education;