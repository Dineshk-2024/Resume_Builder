import React, { forwardRef, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { Box, Typography, Divider, Grid } from '@mui/material';


const Template1 = forwardRef((props, ref) => {
  const { resumeData, sectionOrder } = useContext(AppContext);

  const renderSection = (section) => {
    switch (section) {
      case 'personalInfo':
        return (
          <Box>
            <Typography variant="h3" gutterBottom>
              {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {resumeData.personalInfo.jobTitle}
            </Typography>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Typography>Email: {resumeData.personalInfo.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Phone: {resumeData.personalInfo.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>Address: {resumeData.personalInfo.address}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  {resumeData.personalInfo.city}, {resumeData.personalInfo.state} {resumeData.personalInfo.zip}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
          </Box>
        );
        case 'summary':
            return (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ borderBottom: '2px solid', pb: 1 }}>
                  Summary
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {resumeData.personalInfo.summary}
                </Typography>
              </Box>
            );
          
      case 'education':
        return (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ borderBottom: '2px solid', pb: 1 }}>
              Education
            </Typography>
            {resumeData.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{edu.institution}</Typography>
                <Typography variant="subtitle1">
                  {edu.degree} in {edu.fieldOfStudy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.startDate} - {edu.endDate}
                </Typography>
                {edu.description && (
                  <Typography variant="body1" sx={{ mt: 1 }}>
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
            <Typography variant="h5" gutterBottom sx={{ borderBottom: '2px solid', pb: 1 }}>
              Experience
            </Typography>
            {resumeData.experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{exp.position}</Typography>
                <Typography variant="subtitle1">{exp.company}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.startDate} - {exp.endDate}
                </Typography>
                {exp.description && (
                  <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
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
            <Typography variant="h5" gutterBottom sx={{ borderBottom: '2px solid', pb: 1 }}>
              Skills
            </Typography>
            <Grid container spacing={1}>
              {resumeData.skills.map((skill, index) => (
                <Grid item key={index}>
                  <Box sx={{ p: 1, backgroundColor: 'primary.light', borderRadius: 1, color: 'primary.contrastText' }}>
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
            <Typography variant="h5" gutterBottom sx={{ borderBottom: '2px solid', pb: 1 }}>
              Projects
            </Typography>
            {resumeData.projects.map((proj, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{proj.name}</Typography>
                {proj.technologies && (
                  <Typography variant="subtitle2" color="text.secondary">
                    Technologies: {proj.technologies}
                  </Typography>
                )}
                {proj.url && (
                  <Typography variant="body2">
                    URL: {proj.url}
                  </Typography>
                )}
                {proj.description && (
                  <Typography variant="body1" sx={{ mt: 1 }}>
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
        width: '210mm',
        minHeight: '297mm',
        p: '20mm',
        backgroundColor: 'background.paper',
        boxShadow: 3,
        position: 'relative',
      }}
    >
      {resumeData.personalInfo.photo && (
        <Box
          sx={{
            position: 'absolute',
            top: '20mm',
            right: '20mm',
            width: '40mm',
            height: '40mm',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid',
            borderColor: 'divider',
          }}
        >
          <img
            src={resumeData.personalInfo.photo}
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      )}

      {sectionOrder.map((section) => (
        <React.Fragment key={section}>
          {renderSection(section)}
        </React.Fragment>
      ))}
    </Box>
  );
});

export default Template1;
