import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Paper, Typography, Button, Box, List, ListItem } from '@mui/material';

const theme = createTheme({
   palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
   },
});

const initialQuestions = [
   {
      id: 1,
      question: "When was the Declaration of Independence signed?",
      options: [
         "July 2, 1776",
         "July 4, 1776",
         "July 6, 1776",
         "July 10, 1776"
      ],
      correctAnswer: 1,
      explanation: "The Declaration of Independence was signed on July 4, 1776, although some delegates signed it later.",
      category: "American History"
   },
   {
      id: 2,
      question: "Who was the first President of the United States?",
      options: [
         "Thomas Jefferson",
         "John Adams",
         "George Washington",
         "Benjamin Franklin"
      ],
      correctAnswer: 2,
      explanation: "George Washington was the first President of the United States, serving from 1789 to 1797.",
      category: "American History"
   },
   {
      id: 3,
      question: "Which ancient civilization built the pyramids?",
      options: [
         "Ancient Greece",
         "Ancient Rome",
         "Ancient Egypt",
         "Ancient China"
      ],
      correctAnswer: 2,
      explanation: "The ancient Egyptians built the pyramids, most notably the Great Pyramid of Giza around 2560 BCE.",
      category: "Ancient History"
   }
];

function App() {
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
   const [showResults, setShowResults] = useState(false);

   const handleAnswerSelect = (selectedOptionIndex: number) => {
      setUserAnswers((prev) => ({
         ...prev,
         [currentQuestionIndex]: selectedOptionIndex
      }));
   };

   const handleNextQuestion = () => {
      if (currentQuestionIndex + 1 < initialQuestions.length) {
         setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
         setShowResults(true);
      }
   };

   const handleRestart = () => {
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResults(false);
   };

   if (showResults) {
      let correctCount = 0;
      initialQuestions.forEach((q, idx) => {
         if (userAnswers[idx] === q.correctAnswer) correctCount++;
      });
      return (
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ py: 4 }}>
               <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                     Quiz Results
                  </Typography>
                  <Typography variant="h6">
                     You got {correctCount} out of {initialQuestions.length} correct!
                  </Typography>
                  <Box mt={3}>
                     <Button variant="contained" onClick={handleRestart}>
                        Restart Quiz
                     </Button>
                  </Box>
               </Paper>
            </Container>
         </ThemeProvider>
      );
   }

   const question = initialQuestions[currentQuestionIndex];

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
               <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Question {currentQuestionIndex + 1} / {initialQuestions.length}
               </Typography>
               <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  {question.question}
               </Typography>
               <List sx={{ width: '100%' }}>
                  {question.options.map((option, idx) => (
                     <ListItem key={idx} disablePadding sx={{ mb: 1.5 }}>
                        <Button
                           fullWidth
                           variant={userAnswers[currentQuestionIndex] === idx ? "contained" : "outlined"}
                           onClick={() => handleAnswerSelect(idx)}
                           sx={{
                              py: 1.5,
                              justifyContent: 'flex-start',
                              textTransform: 'none',
                              fontSize: '1rem'
                           }}
                        >
                           {option}
                        </Button>
                     </ListItem>
                  ))}
               </List>
               <Box mt={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                     variant="contained"
                     onClick={handleNextQuestion}
                     disabled={userAnswers[currentQuestionIndex] === undefined}
                  >
                     {currentQuestionIndex + 1 < initialQuestions.length ? "Next Question" : "Finish Quiz"}
                  </Button>
               </Box>
            </Paper>
         </Container>
      </ThemeProvider>
   );
}

export default App;