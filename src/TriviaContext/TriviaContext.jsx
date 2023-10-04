import React, { createContext, useContext, useState, useEffect } from 'react';

const TriviaContext = createContext();

export function TriviaProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Define tus preguntas
    const initialQuestions = [
      { question: '¿Quién tomó la deuda con el FMI?', options: ['Macri', 'Cristina', 'Alberto', 'Massa'], correctAnswer: 'Macri' },
      { question: '¿Quién propuso cambiar las Malvinas por vacunas?', options: ['Milei', 'Bullrich', 'Massa', 'Schiaretti'], correctAnswer: 'Bullrich' },
      { question: '¿Quién dijo que hay que pagar la deuda y echar al FMI ?', options: ['Bullrich', 'Milei', 'Massa', 'Bregman'], correctAnswer: 'Massa' },
      { question: '¿Quién dijo que las empresas pueden contaminar los ríos todo lo que quieran?', options: ['Bullrich', 'Milei', 'Massa', 'Bregman'], correctAnswer: 'Milei' },
      { question: '¿Quién dijo que hay que pagar la deuda usando los ahorros de los argentinos?', options: ['Bullrich', 'Massa', 'Milei', 'Bregman'], correctAnswer: 'Bullrich' },
      { question: '¿Quién dijo que hay que hacer un ajuste más fuerte del que pide el FMI?', options: ['Milei', 'Massa', 'Bullrich', 'Bregman'], correctAnswer: 'Milei' }
    ];

    // Mezcla las preguntas de forma aleatoria
    const shuffledQuestions = shuffleArray(initialQuestions);

    // Almacena las preguntas mezcladas en el estado
    setQuestions(shuffledQuestions);
  }, []);

  // Función para mezclar un array aleatoriamente (Algoritmo de Fisher-Yates)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const checkAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    return currentQuestion;
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      let resultCategory = '';
      if (score === 0) {
        resultCategory = 'Malo';
      } else if (score === questions.length) {
        resultCategory = 'Excelente';
      } else {
        resultCategory = 'Regular';
      }
      setCategory(resultCategory);
    }
  };

  const value = {
    questions,
    currentQuestionIndex,
    score,
    category,
    checkAnswer,
    moveToNextQuestion,
  };

  return <TriviaContext.Provider value={value}>{children}</TriviaContext.Provider>;
}

export function useTrivia() {
  return useContext(TriviaContext);
}