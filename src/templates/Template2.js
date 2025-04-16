import React, { forwardRef, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Box, Typography, Divider, Grid, Avatar } from '@mui/material';

const Template2 = forwardRef((props, ref) => {
  const { resumeData, sectionOrder } = useContext(AppContext);

  const renderSection = (section) => {
    switch (section) {
      case 'summary':
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              Profile Summary
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {resumeData.personalInfo.summary}
            </Typography>
          </Box>
        );
      case 'education':
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              Education
            </Typography>
            {resumeData.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{edu.institution}</Typography>
                <Typography variant="body2">{edu.degree} in {edu.fieldOfStudy}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {edu.startDate} - {edu.endDate}
                </Typography>
                {edu.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {edu.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        );
      case 'experience':
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              Experience
            </Typography>
            {resumeData.experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{exp.position} at {exp.company}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {exp.startDate} - {exp.endDate}
                </Typography>
                {exp.description && (
                  <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                    {exp.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        );
      case 'skills':
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              Skills
            </Typography>
            <Grid container spacing={1}>
              {resumeData.skills.map((skill, index) => (
                <Grid item key={index}>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      backgroundColor: 'primary.light',
                      borderRadius: 2,
                      fontSize: 12,
                      color: 'primary.contrastText',
                    }}
                  >
                    {skill.name} ({skill.level})
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 'projects':
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              Projects
            </Typography>
            {resumeData.projects.map((proj, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1">{proj.name}</Typography>
                {proj.technologies && (
                  <Typography variant="caption" color="text.secondary">
                    Technologies: {proj.technologies}
                  </Typography>
                )}
                {proj.url && (
                  <Typography variant="caption" display="block">
                    URL: {proj.url}
                  </Typography>
                )}
                {proj.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {proj.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        width: '210mm',
        minHeight: '297mm',
        backgroundColor: 'background.paper',
        boxShadow: 3,
        p: 0,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: '30%',
          backgroundColor: 'grey.100',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {resumeData.personalInfo.photo && (
          <Avatar
            src={resumeData.personalInfo.photo}
            alt="Profile"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
        )}
        <Typography variant="h6" align="center">
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {resumeData.personalInfo.jobTitle}
        </Typography>
        <Divider sx={{ my: 2, width: '100%' }} />
        <Box sx={{ width: '100%' }}>
          <Typography variant="body2"><strong>Email:</strong> {resumeData.personalInfo.email}</Typography>
          <Typography variant="body2"><strong>Phone:</strong> {resumeData.personalInfo.phone}</Typography>
          <Typography variant="body2"><strong>Address:</strong> {resumeData.personalInfo.address}</Typography>
          <Typography variant="body2">
            {resumeData.personalInfo.city}, {resumeData.personalInfo.state} {resumeData.personalInfo.zip}
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ width: '70%', p: 4 }}>
        {sectionOrder.map((section) => (
          <React.Fragment key={section}>
            {renderSection(section)}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
});

export default Template2;
