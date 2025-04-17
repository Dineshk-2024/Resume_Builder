// src/pages/SectionReorderer.js
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const SECTION_LABELS = {
  personalInfo: 'Personal Info',
  summary: 'Summary',
  education: 'Education',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
};

const SectionReorderer = () => {
  const { sectionOrder, moveSection } = useContext(AppContext);

  const handleMove = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < sectionOrder.length) {
      moveSection(index, newIndex);
    }
  };

  return (
    <List>
      {sectionOrder.map((sectionKey, index) => (
        <ListItem
          key={sectionKey}
          secondaryAction={
            <>
              <IconButton onClick={() => handleMove(index, -1)} disabled={index === 0}>
                <ArrowUpward />
              </IconButton>
              <IconButton onClick={() => handleMove(index, 1)} disabled={index === sectionOrder.length - 1}>
                <ArrowDownward />
              </IconButton>
            </>
          }
        >
          <ListItemText primary={SECTION_LABELS[sectionKey] || sectionKey} />
        </ListItem>
      ))}
    </List>
  );
};

export default SectionReorderer;
