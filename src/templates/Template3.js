// Updated Template3.jsx to support section reordering based on sectionOrder

import React, { forwardRef, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import {
  Box, Typography, Chip, Divider, Avatar,
} from '@mui/material';
import {
  Email, Phone, LocationOn, GitHub, LinkedIn, School, Work, Code, Task, Person,
} from '@mui/icons-material';
import { styled } from '@mui/system';

// Styled components
const Sidebar = styled(Box)(({ theme }) => ({
  background: `linear-gradient(180deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  color: 'white',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100%',
}));

const Main = styled(Box)(({ theme }) => ({
  background: '#f9f9f9',
  padding: theme.spacing(4),
  flexGrow: 1,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
}));

const DividerLine = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
  backgroundColor: theme.palette.primary.main,
}));

const Template3 = forwardRef((props, ref) => {
  const { resumeData, sectionOrder } = useContext(AppContext);
  const info = resumeData.personalInfo;

  const renderContact = () => (
    <Box textAlign="center">
      {info.photo && (
        <Avatar
          src={info.photo}
          sx={{ width: 120, height: 120, mb: 2 }}
        />
      )}
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{info.firstName} {info.lastName}</Typography>
      <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }}>{info.jobTitle}</Typography>
      <Box sx={{ mt: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}><Email sx={{ mr: 1 }} /> {info.email}</Box>
        <Box display="flex" alignItems="center" justifyContent="center" mb={1}><Phone sx={{ mr: 1 }} /> {info.phone}</Box>
        {info.address && <Box display="flex" alignItems="center" justifyContent="center" mb={1}><LocationOn sx={{ mr: 1 }} /> {info.address}</Box>}
        {info.github && <Box display="flex" alignItems="center" justifyContent="center" mb={1}><GitHub sx={{ mr: 1 }} /> {info.github}</Box>}
        {info.linkedin && <Box display="flex" alignItems="center" justifyContent="center" mb={1}><LinkedIn sx={{ mr: 1 }} /> {info.linkedin}</Box>}
      </Box>
    </Box>
  );

  const renderSkills = () => (
    <Box mt={4}>
      <SectionTitle><Code /> Skills</SectionTitle>
      <Box display="flex" flexWrap="wrap">
        {resumeData.skills.map((skill, index) => (
          <SkillChip key={index} label={skill.name} />
        ))}
      </Box>
    </Box>
  );

  const renderSummary = () => (
    <Box mb={4}>
      <SectionTitle><Person /> Summary</SectionTitle>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{info.summary}</Typography>
      <DividerLine />
    </Box>
  );

  const renderExperience = () => (
    <Box mb={4}>
      <SectionTitle><Work /> Experience</SectionTitle>
      {resumeData.experience.map((exp, i) => (
        <Box key={i} mb={2}>
          <Typography variant="h6">{exp.position}</Typography>
          <Typography variant="subtitle2" color="text.secondary">{exp.company} | {exp.startDate} - {exp.endDate}</Typography>
          <Typography variant="body2" mt={1}>{exp.description}</Typography>
        </Box>
      ))}
      <DividerLine />
    </Box>
  );

  const renderEducation = () => (
    <Box mb={4}>
      <SectionTitle><School /> Education</SectionTitle>
      {resumeData.education.map((edu, i) => (
        <Box key={i} mb={2}>
          <Typography variant="h6">{edu.institution}</Typography>
          <Typography variant="subtitle2">{edu.degree} in {edu.fieldOfStudy}</Typography>
          <Typography variant="caption" color="text.secondary">{edu.startDate} - {edu.endDate}</Typography>
          <Typography variant="body2">{edu.description}</Typography>
        </Box>
      ))}
      <DividerLine />
    </Box>
  );

  const renderProjects = () => (
    <Box mb={4}>
      <SectionTitle><Task /> Projects</SectionTitle>
      {resumeData.projects.map((proj, i) => (
        <Box key={i} mb={2}>
          <Typography variant="h6">{proj.name}</Typography>
          <Typography variant="subtitle2" color="text.secondary">{proj.technologies}</Typography>
          {proj.url && (
            <Typography variant="body2">
              <a href={proj.url} target="_blank" rel="noreferrer">{proj.url}</a>
            </Typography>
          )}
          <Typography variant="body2">{proj.description}</Typography>
        </Box>
      ))}
      <DividerLine />
    </Box>
  );

  const renderMainSections = () => {
    const sectionMap = {
      summary: renderSummary,
      experience: renderExperience,
      education: renderEducation,
      projects: renderProjects,
    };

    return sectionOrder.map((sectionKey) => {
      const renderFn = sectionMap[sectionKey];
      return renderFn ? renderFn() : null;
    });
  };

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        width: '210mm',
        minHeight: '297mm',
        boxShadow: 4,
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <Sidebar sx={{ width: '30%' }}>
        {renderContact()}
        {renderSkills()}
      </Sidebar>

      {/* Main */}
      <Main>
        {renderMainSections()}
      </Main>
    </Box>
  );
});

export default Template3;
