import React from 'react';
import Chip from '@mui/material/Chip';
import { useLocation } from 'react-router';

const routeLabels: Record<string, string> = {
  '/': 'home',
  '/experience': 'experience',
  '/hobbies': 'hobbies',
  '/asher-zone': 'asher zone',
};

const DynamicChip: React.FC = () => {
  const { pathname } = useLocation();
  const label = routeLabels[pathname] ?? pathname.replace('/', '');

  return (
    <Chip
      label={label}
      variant="outlined"
      size="small"
      sx={{
        mx: 1,
        color: 'inherit',
        borderColor: 'rgba(255,255,255,0.5)',
        fontWeight: 500,
      }}
    />
  );
};

export default DynamicChip;
