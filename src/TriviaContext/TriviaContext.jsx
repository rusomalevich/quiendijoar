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
    setQuestions([
      { question: '¿Quién tomó la deuda con el FMI?', options: ['Macri', 'Cristina', 'Alberto', 'Massa'], correctAnswer: 'Macri' },
      { question: '¿Quién propuso cambiar las Malvinas por vacunas?', options: ['Milei', 'Bullrich', 'Massa', 'Schiaretti'], correctAnswer: 'Bullrich'},
      { question: '¿Quién dijo que hay que pagar la deuda y echar al FMI ?', options: ['Bullrich', 'Milei', 'Massa', 'Bregman'], correctAnswer: 'Massa'},
      { question: '¿Quién dijo que las empresas pueden contaminar los ríos todo lo que quieran?', options: ['Bullrich', 'Milei', 'Massa', 'Bregman'], correctAnswer: 'Milei'},
      { question: '¿Quién dijo que hay que pagar la deuda usando los ahorros de los argentinos?', options: ['Bullrich', 'Milei', 'Massa', 'Bregman'], correctAnswer: 'Bullrich'},
      { question: '¿Quién dijo que hay que hacer un ajuste más fuerte del que pide el FMI?', options: ['Bullrich', 'Milei', 'Massa', 'Bregman'], correctAnswer: 'Milei'}
    ])}, [])

    // Implementa la lógica para comprobar si la respuesta seleccionada es correcta.
    // Actualiza el estado 'score' y el índice 'currentQuestionIndex'.
    // Si el usuario ha respondido a todas las preguntas, calcula la categoría y muestra el resultado.
    // Obtén la pregunta actual
  
    const checkAnswer = (selectedAnswer) => {
      // Obtén la pregunta actual
      const currentQuestion = questions[currentQuestionIndex];
    
      // Comprueba si la respuesta seleccionada coincide con la respuesta correcta
      if (selectedAnswer === currentQuestion.correctAnswer) {
        // Respuesta correcta: incrementa el puntaje
        setScore(score + 1);
      }
    
      // Incrementa el índice para pasar a la siguiente pregunta
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
    
      // Verifica si se ha respondido a todas las preguntas
      if (nextQuestionIndex === questions.length) {
        // Calcula la categoría en función del puntaje
        let resultCategory = '';
        if (score === 0) {
          resultCategory = 'Malo';
        } else if (score === questions.length) {
          resultCategory = 'Excelente';
        } else {
          resultCategory = 'Regular';
        }
        setCategory(resultCategory);
    
        // Redirecciona al resultado final
        // Aquí puedes utilizar el componente de redirección de React Router Dom o manejarlo de la manera que desees.
      }
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