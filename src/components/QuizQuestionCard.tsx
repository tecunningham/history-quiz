import React from 'react';
import { Paper, Typography, Button, Box, Radio, FormControlLabel, Chip } from '@mui/material';
import { QuizQuestion } from '../types';

interface QuizQuestionCardProps {
   question: QuizQuestion;
   selectedAnswer: number | undefined;
   onAnswerSelect: (questionId: number, optionIndex: number) => void;
   onNext: () => void;
}

const QuizQuestionCard: React.FC<QuizQuestionCardProps> = ({
   question,
   selectedAnswer,
   onAnswerSelect,
   onNext,
}) => {
   return (
      <Paper elevation={3} sx={{ p: 3 }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
               {question.question}
            </Typography>
            {question.category && (
               <Chip
                  label={question.category}
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
               />
            )}
         </Box>

         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {question.options.map((option, index) => (
               <FormControlLabel
                  key={index}
                  control={
                     <Radio
                        checked={selectedAnswer === index}
                        onChange={() => onAnswerSelect(question.id, index)}
                        color="primary"
                     />
                  }
                  label={option}
                  sx={{
                     border: '1px solid #e0e0e0',
                     borderRadius: 1,
                     p: 1,
                     '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                     },
                  }}
               />
            ))}
         </Box>

         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
               variant="contained"
               color="primary"
               onClick={onNext}
               disabled={selectedAnswer === undefined}
            >
               Next Question
            </Button>
         </Box>
      </Paper>
   );
};

export default QuizQuestionCard; 