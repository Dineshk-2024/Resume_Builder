import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Avatar, 
  IconButton 
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useContext(AppContext);
  const [formData, setFormData] = useState(resumeData.personalInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResumeData('personalInfo', formData);
    navigate('/summary'); // Navigate to summary step
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Personal Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={formData.photo}
                sx={{ width: 120, height: 120 }}
              />
              <IconButton 
                color="primary" 
                aria-label="upload picture" 
                component="label"
                sx={{ position: 'absolute', bottom: 0, right: 0 }}
              >
                <input 
                  hidden 
                  accept="image/*" 
                  type="file" 
                  onChange={handlePhotoChange}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Java Developer, Frontend Engineer"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Next: Summary
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PersonalInfo;
