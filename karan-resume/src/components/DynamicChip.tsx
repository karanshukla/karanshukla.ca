import React from 'react';
import { Chip } from '@mui/material';

interface DynamicChipProps {
    initialLabel?: string;
}

const DynamicChip: React.FC<DynamicChipProps> = ({ initialLabel = 'Home' }) => {
    return (
        <Chip
            label={ initialLabel}
            color="primary"
            variant="outlined"
            sx={{ margin: 1 }}
        />
    );
};

export default DynamicChip;