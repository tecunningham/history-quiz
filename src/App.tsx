import React, { useState, useRef } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Paper, Typography, Button, Box, List, ListItem } from '@mui/material';

// Define the Question type
interface QuizQuestion {
   id: number;
   question: string;
   options: string[];
   correctAnswer: number;
   explanation?: string; // Optional explanation
   category: string;
}

const theme = createTheme({
   palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
   },
});

// Renamed to allQuestions and added categories + dummy questions
const allQuestions: QuizQuestion[] = [
   // Tudor History Dummies
   {
      id: 1,
      question: "Who was the first tudor monarch?",
      options: ["Henry VII", "James I", "Elizibeth I", "Anne I"],
      correctAnswer: 0,
      category: "Tudor History"
   },
   {
      id: 2,
      question: "How many wives did Henry VIII have?",
      options: ["10", "5", "6", "200"],
      correctAnswer: 2,
      category: "Tudor History"
   },
   {
      id: 3,
      question: "how long was the tuder reign?",
      options: [" 203", "118", "63", "1000"],
      correctAnswer: 1,
      category: "Tudor History"
   },
   // Mexican Revolution History Dummies
   {
      id: 4,
      question: "when did the mexican revolution begin?",
      options: ["1905", "1910", "1915", "1920"],
      correctAnswer: 1,
      category: "Mexican Revolution History"
   },
   {
      id: 5,
      question: "who was a key leader of the revolution in the north?",
      options: ["Emiliano Zapata", "Porfirio Díaz", "Venustiano Carranza", "Pancho Villa"],
      correctAnswer: 3,
      category: "Mexican Revolution History"
   },
   {
      id: 6,
      question: "who won the mexican revolution?",
      options: ["Venustiano Carranza", "Porfirio Díaz", "Emiliano Zapata", "Pancho Villa"],
      correctAnswer: 0,
      category: "Mexican Revolution History"
   },
   {
      id: 7,
      question: "when did the viicorrian period begin?",
      options: ["1842", "1837", "1850", "2001"],
      correctAnswer: 1,
      category: "Victorian History"
   },
   {
      id: 8,
      question: "who was the first victorrian monarch?",
      options: ["Victoria", "Edward VII", "George V", "George VI"],
      correctAnswer: 0,
      category: "Victorian History"
   },
   {
      id: 9,
      question: "what was the exebiton in the crystal palace called?",
      options: ["The Great Exhibition", "the glasshouse", "The London Eye", "The Tower of London"],
      correctAnswer: 0,
      category: "Victorian History"
   }
];

function App() {
   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
   const [questions, setQuestions] = useState<QuizQuestion[]>([]);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
   const [showResults, setShowResults] = useState(false);
   const [selectedOption, setSelectedOption] = useState<number | null>(null);
   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
   const [isFeedback, setIsFeedback] = useState(false);

   // Use refs to store audio objects for cross-platform compatibility
   const pingRef = useRef<HTMLAudioElement | null>(null);
   const fartRef = useRef<HTMLAudioElement | null>(null);
   const audioInitialized = useRef(false);

   const handleCategorySelect = (category: string) => {
      const filteredQuestions = allQuestions.filter(q => q.category === category);
      setQuestions(filteredQuestions);
      setSelectedCategory(category);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResults(false);
      setSelectedOption(null);
      setIsCorrect(null);
      setIsFeedback(false);
      // Reset audio refs on new category
      audioInitialized.current = false;
      pingRef.current = null;
      fartRef.current = null;
   };

   const handleAnswerSelect = (selectedOptionIndex: number) => {
      if (isFeedback) return; // Prevent double-clicks during feedback

      const correct = questions[currentQuestionIndex].correctAnswer === selectedOptionIndex;

      // Initialize audio objects on first user interaction
      if (!audioInitialized.current) {
         pingRef.current = new Audio(process.env.PUBLIC_URL + '/ping.mp3');
         fartRef.current = new Audio(process.env.PUBLIC_URL + '/fart.mp3');
         // Play and pause to "prime" for iOS
         pingRef.current.play().then(() => pingRef.current!.pause()).catch(() => { });
         fartRef.current.play().then(() => fartRef.current!.pause()).catch(() => { });
         audioInitialized.current = true;
      }

      // Play the correct sound
      const sound = correct ? pingRef.current : fartRef.current;
      if (sound) {
         sound.currentTime = 0;
         sound.play();
      }

      setSelectedOption(selectedOptionIndex);
      setIsCorrect(correct);
      setUserAnswers((prev) => ({
         ...prev,
         [currentQuestionIndex]: selectedOptionIndex
      }));
      setIsFeedback(true);
      setTimeout(() => {
         setIsFeedback(false);
         setSelectedOption(null);
         setIsCorrect(null);
         if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
         } else {
            setShowResults(true);
         }
      }, 1000);
   };

   const handleRestart = () => {
      setSelectedCategory(null); // Go back to category selection
      setQuestions([]); // Clear active questions
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResults(false);
   };

   // --- Render Logic ---

   // 1. Category Selection Screen
   if (!selectedCategory) {
      const categories = Array.from(new Set(allQuestions.map(q => q.category)));
      return (
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ py: 4, textAlign: 'center' }}>
               <Paper elevation={3} sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                     Select a Quiz Category
                  </Typography>
                  <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                     {/* Convert Set to Array here before mapping */}
                     {categories.map(category => (
                        <Button
                           key={category}
                           variant="contained"
                           onClick={() => handleCategorySelect(category)}
                           size="large"
                        >
                           {category}
                        </Button>
                     ))}
                  </Box>
               </Paper>
            </Container>
         </ThemeProvider>
      );
   }

   // 2. Results Screen (uses `questions` state now)
   if (showResults) {
      let correctCount = 0;
      questions.forEach((q, idx) => { // Iterate over active questions
         if (userAnswers[idx] === q.correctAnswer) correctCount++;
      });
      return (
         <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ py: 4 }}>
               <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                     Quiz Results for {selectedCategory} {/* Show category */}
                  </Typography>
                  <Typography variant="h6">
                     You got {correctCount} out of {questions.length} correct!
                  </Typography>
                  {/* Display explanations or review (optional feature) */}
                  <Box mt={3}>
                     <Button variant="contained" onClick={handleRestart}>
                        Choose New Category
                     </Button>
                  </Box>
               </Paper>
            </Container>
         </ThemeProvider>
      );
   }

   // 3. Quiz Question Screen (uses `questions` state now)
   if (questions.length === 0) {
      // Handle case where questions might be empty after filtering (shouldn't happen with current setup)
      // This case might occur briefly during state updates, maybe add a loading indicator?
      return <div>Loading questions or category not found...</div>;
   }

   const question = questions[currentQuestionIndex]; // Get current question from active set

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
               <Typography variant="caption" display="block" gutterBottom>
                  Category: {selectedCategory} {/* Show category */}
               </Typography>
               <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Question {currentQuestionIndex + 1} / {questions.length}
               </Typography>
               <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  {question.question}
               </Typography>

               <List sx={{ width: '100%' }}>
                  {question.options.map((option, idx) => {
                     let color: 'primary' | 'success' | 'error' | 'inherit' = 'primary';
                     let variant: 'contained' | 'outlined' = 'outlined';
                     if (isFeedback && selectedOption === idx) {
                        color = isCorrect ? 'success' : 'error';
                        variant = 'contained';
                     } else if (!isFeedback && userAnswers[currentQuestionIndex] === idx) {
                        variant = 'contained';
                     }
                     return (
                        <ListItem key={idx} disablePadding sx={{ mb: 1.5 }}>
                           <Button
                              fullWidth
                              variant={variant}
                              color={color}
                              onClick={() => handleAnswerSelect(idx)}
                              sx={{
                                 py: 1.5,
                                 justifyContent: 'flex-start',
                                 textTransform: 'none',
                                 fontSize: '1rem'
                              }}
                              disabled={isFeedback}
                           >
                              {option}
                           </Button>
                        </ListItem>
                     );
                  })}
               </List>
            </Paper>
         </Container>
      </ThemeProvider>
   );
}

export default App;