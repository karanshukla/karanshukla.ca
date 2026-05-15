import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AsherZone, disableAsherZone } from '../modules/AsherZone';

function AsherZoneContent() {
  const navigate = useNavigate();

  useEffect(() => {
    AsherZone();
    return () => disableAsherZone();
  }, []);

  const exit = () => {
    disableAsherZone();
    navigate('/');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={exit}
      sx={{
        position: 'fixed',
        top: 72,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10001,
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        textTransform: 'none',
      }}
    >
      exit the asher zone
    </Button>
  );
}

export default AsherZoneContent;
