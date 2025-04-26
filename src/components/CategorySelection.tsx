import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

interface CategorySelectionProps {
   onCategorySelect: (category: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onCategorySelect }) => {
   return (
      <Paper elevation={3} sx={{ p: 3 }}>
         <Typography variant="h4" component="h1" gutterBottom align="center">
            Choose Your History Quiz
         </Typography>
         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
               variant="contained"
               color="primary"
               size="large"
               onClick={() => onCategorySelect('Tudor History')}
            >
               Tudor History
            </Button>
            <Button
               variant="contained"
               color="secondary"
               size="large"
               onClick={() => onCategorySelect('Mexican Revolution')}
            >
               Mexican Revolution
            </Button>
         </Box>
      </Paper>
   );
};

export default CategorySelection; 