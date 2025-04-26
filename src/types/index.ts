export interface HistoryQA {
   id: number;
   question: string;
   answer: string;
   date: string;
   category?: string;
}

export interface QAHistoryState {
   questions: HistoryQA[];
   currentQuestion: string;
}

export interface QuizQuestion {
   id: number;
   question: string;
   options: string[];
   correctAnswer: number;
   explanation: string;
   category: string;
}

export interface QuizState {
   questions: QuizQuestion[];
   currentQuestionIndex: number;
   userAnswers: { [key: number]: number };
   showResults: boolean;
} 