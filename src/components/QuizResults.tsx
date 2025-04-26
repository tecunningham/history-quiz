import React from 'react';
import { Paper, Typography, Button, Box, Chip } from '@mui/material';
import { QuizQuestion } from '../types';

interface QuizResultsProps {
   questions: QuizQuestion[];
   userAnswers: { [key: number]: number };
   onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
   questions,
   userAnswers,
   onRestart,
}) => {
   const correctAnswers = questions.filter(
      (q) => userAnswers[q.id] === q.correctAnswer
   ).length;
   const score = Math.round((correctAnswers / questions.length) * 100);

   return (
      <Paper elevation={3} sx={{ p: 3 }}>
         <Typography variant="h4" component="h1" gutterBottom align="center">
            Quiz Complete!
         </Typography>

         <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Your Score: {score}%
         </Typography>

         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {questions.map((question) => (
               <Paper key={question.id} elevation={1} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                     <Typography variant="h6" component="h3">
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

                  <Typography
                     variant="body1"
                     color={userAnswers[question.id] === question.correctAnswer ? 'success.main' : 'error.main'}
                     sx={{ mb: 1 }}
                  >
                     Your answer: {question.options[userAnswers[question.id]]}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                     {question.explanation}
                  </Typography>
               </Paper>
            ))}
         </Box>

         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
               variant="contained"
               color="primary"
               size="large"
               onClick={onRestart}
            >
               Try Again
            </Button>
         </Box>
      </Paper>
   );
};

export default QuizResults; 