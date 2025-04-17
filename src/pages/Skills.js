
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
import { Delete, Edit, DragHandle } from '@mui/icons-material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  SKILL: 'skill'
};

const DraggableSkill = ({ skill, index, moveSkill, onEdit, onDelete }) => {
  const ref = React.useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.SKILL,
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveSkill(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SKILL,
    item: () => ({ id: skill.id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} data-handler-id={handlerId}>
      <ListItem>
        <DragHandle sx={{ mr: 2, cursor: 'move' }} />
        <ListItemText primary={skill.name} secondary={skill.level} />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => onEdit(skill.id)}>
            <Edit />
          </IconButton>
          <IconButton edge="end" onClick={() => onDelete(skill.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </div>
  );
};

const Skills = () => {
  const navigate = useNavigate();
  const { resumeData, updateResumeData } = useContext(AppContext);
  const [skills, setSkills] = useState(resumeData.skills || []);
  const [currentSkill, setCurrentSkill] = useState({ id: '', name: '', level: 'Intermediate' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedSkills = skills.map(skill => skill.id === currentSkill.id ? currentSkill : skill);
      setSkills(updatedSkills);
    } else {
      setSkills([...skills, { ...currentSkill, id: uuidv4() }]);
    }
    setCurrentSkill({ id: '', name: '', level: 'Intermediate' });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const skillToEdit = skills.find(skill => skill.id === id);
    setCurrentSkill(skillToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const moveSkill = (fromIndex, toIndex) => {
    const updatedSkills = [...skills];
    const [movedSkill] = updatedSkills.splice(fromIndex, 1);
    updatedSkills.splice(toIndex, 0, movedSkill);
    setSkills(updatedSkills);
  };

  const handleSaveAndContinue = () => {
    updateResumeData('skills', skills);
    navigate('/projects');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="md" sx={{ mt: 12 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Skills
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Skill Name"
                  name="name"
                  value={currentSkill.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Proficiency Level"
                  name="level"
                  value={currentSkill.level}
                  onChange={handleChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </TextField>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button type="submit" variant="contained" color={isEditing ? 'secondary' : 'primary'}>
                {isEditing ? 'Update Skill' : 'Add Skill'}
              </Button>
            </Box>
          </Box>

          {skills.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Your Skills
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Drag and drop to reorder your skills
              </Typography>
              <List>
                {skills.map((skill, index) => (
                  <DraggableSkill
                    key={skill.id}
                    skill={skill}
                    index={index}
                    moveSkill={moveSkill}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </List>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" onClick={() => navigate('/experience')}>
              Back
            </Button>
            <Button variant="contained" onClick={handleSaveAndContinue}>
              Next: Projects
            </Button>
          </Box>
        </Box>
      </Container>
    </DndProvider>
  );
};

export default Skills;