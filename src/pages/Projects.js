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

const Projects = () => {
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useContext(AppContext);
  const [projects, setProjects] = useState(resumeData.projects);
  const [currentProject, setCurrentProject] = useState({
    id: '',
    name: '',
    description: '',
    technologies: '',
    url: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      const updatedProjects = projects.map(proj => 
        proj.id === currentProject.id ? currentProject : proj
      );
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, { ...currentProject, id: uuidv4() }]);
    }
    
    setCurrentProject({
      id: '',
      name: '',
      description: '',
      technologies: '',
      url: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const projectToEdit = projects.find(proj => proj.id === id);
    setCurrentProject(projectToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const handleSaveAndContinue = () => {
    updateResumeData('projects', projects);
    navigate('/preview');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Projects
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Project Name"
                name="name"
                value={currentProject.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Technologies Used"
                name="technologies"
                value={currentProject.technologies}
                onChange={handleChange}
                placeholder="Comma separated list of technologies"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project URL"
                name="url"
                value={currentProject.url}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={currentProject.description}
                onChange={handleChange}
                placeholder="Describe the project and your contributions"
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color={isEditing ? 'secondary' : 'primary'}
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </Button>
          </Box>
        </Box>

        {projects.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Your Projects
            </Typography>
            <List>
              {projects.map((proj) => (
                <React.Fragment key={proj.id}>
                  <ListItem>
                    <ListItemText
                      primary={proj.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" display="block">
                            {proj.technologies}
                          </Typography>
                          {proj.description}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleEdit(proj.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDelete(proj.id)}>
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
          <Button variant="outlined" onClick={() => navigate('/skills')}>
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveAndContinue}
            disabled={projects.length === 0}
          >
            Preview Resume
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Projects;