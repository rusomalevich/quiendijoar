import React, { createContext, useContext, useState, useEffect } from 'react';

const TriviaContext = createContext();

export function TriviaProvider({ children }) {
  const [questions, setQuestions] = useState([]); // Aquí almacenaremos las preguntas
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState('');
  
  useEffect(() => {
    // Aquí debes cargar las preguntas desde tu objeto de preguntas (10 preguntas) y almacenarlas en el estado 'questions'.
    // Cada pregunta debe tener una estructura como { question: '...', options: ['...', '...'], correctAnswer: '...' }
    // Asegúrate de obtener una categoría aleatoria para mostrar al usuario.
  }, []);

  const checkAnswer = (selectedAnswer) => {
    // Implementa la lógica para comprobar si la respuesta seleccionada es correcta.
    // Actualiza el estado 'score' y el índice 'currentQuestionIndex'.
    // Si el usuario ha respondido a todas las preguntas, calcula la categoría y muestra el resultado.
  };

  const value = {
    questions,
    currentQuestionIndex,
    score,
    category,
    checkAnswer,
  };

  return <TriviaContext.Provider value={value}>{children}</TriviaContext.Provider>;
}

export function useTrivia() {
  return useContext(TriviaContext);
}