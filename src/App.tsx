import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { QuizQuestion, QuizState } from './types';
import QuizQuestionCard from './components/QuizQuestionCard';
import QuizResults from './components/QuizResults';
import CategorySelection from './components/CategorySelection';

const theme = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#1976d2',
      },
      secondary: {
         main: '#dc004e',
      },
   },
});

const initialQuestions: QuizQuestion[] = [
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
   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
   const [quizState, setQuizState] = useState<QuizState>({
      questions: initialQuestions,
      currentQuestionIndex: 0,
      userAnswers: {},
      showResults: false
   });

   const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      // Here you would typically load questions for the selected category
      // For now, we'll just use the initial questions
   };

   const handleAnswerSelect = (questionId: number, selectedOption: number) => {
      setQuizState(prev => ({
         ...prev,
         userAnswers: {
            ...prev.userAnswers,
            [questionId]: selectedOption
         }
      }));
   };

   const handleNextQuestion = () => {
      setQuizState(prev => ({
         ...prev,
         currentQuestionIndex: prev.currentQuestionIndex + 1,
         showResults: prev.currentQuestionIndex + 1 >= prev.questions.length
      }));
   };

   const handleRestart = () => {
      setSelectedCategory(null);
      setQuizState({
         questions: initialQuestions,
         currentQuestionIndex: 0,
         userAnswers: {},
         showResults: false
      });
   };

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <Container maxWidth="md" sx={{ py: 4 }}>
            {!selectedCategory ? (
               <CategorySelection onCategorySelect={handleCategorySelect} />
            ) : !quizState.showResults ? (
               <QuizQuestionCard
                  question={quizState.questions[quizState.currentQuestionIndex]}
                  selectedAnswer={quizState.userAnswers[quizState.questions[quizState.currentQuestionIndex].id]}
                  onAnswerSelect={handleAnswerSelect}
                  onNext={handleNextQuestion}
               />
            ) : (
               <QuizResults
                  questions={quizState.questions}
                  userAnswers={quizState.userAnswers}
                  onRestart={handleRestart}
               />
            )}
         </Container>
      </ThemeProvider>
   );
}

export default App;
