import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { Button, Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();
  const { resumeData, activeTemplate, setActiveTemplate } = useContext(AppContext);

  const templates = [
    { id: 'template1', name: 'Classic', description: 'Clean and professional layout' },
    { id: 'template2', name: 'Modern', description: 'Contemporary design with emphasis on skills' },
    { id: 'template3', name: 'Creative', description: 'For designers and creative professionals' },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom>
          Build Your Perfect Resume
        </Typography>
        <Typography variant="body1" paragraph>
          Follow the steps to create a professional resume that stands out.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Choose a Template
          </Typography>
          <Grid container spacing={3}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    border: activeTemplate === template.id ? '2px solid primary.main' : 'none'
                  }}
                  onClick={() => setActiveTemplate(template.id)}
                >
                  <CardContent>
                    <Typography variant="h6">{template.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/personal-info')}
          >
            Start Building
          </Button>
          {Object.values(resumeData.personalInfo).some(val => val) && (
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => navigate('/preview')}
            >
              Continue Editing
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;