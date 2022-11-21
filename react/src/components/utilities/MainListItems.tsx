import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

export function MainListItems() {
  const navigate = useNavigate();

  return (
    <>
      <React.Fragment>
        <ListItemButton onClick={() => navigate('/Dashboard/CodeBlocks')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Code blocks" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/Dashboard/Students')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
}
