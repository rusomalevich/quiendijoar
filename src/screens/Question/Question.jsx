import React, { useState, useContext } from 'react';
import { useTrivia } from '../../TriviaContext/TriviaContext';

const Question = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { questions, currentQuestionIndex, score, category, checkAnswer } = useTrivia(); // Utiliza useTrivia directamente

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    // Si no hay una pregunta actual, puedes mostrar un mensaje o redirigir al usuario a la página de resultados.
    return (
      <div>
        <h1>Pregunta</h1>
        <p>No hay más preguntas.</p>
      </div>
    );
  }


  const handleAnswerClick = (answer) => {
    // Al hacer clic en una respuesta, actualiza el estado de 'selectedAnswer'
    setSelectedAnswer(answer);
    checkAnswer(answer);
  };

  const renderOptions = () => {
    
    return currentQuestion.options.map((option, index) => (
      <button
        key={index}
        onClick={() => handleAnswerClick(option)}
        disabled={selectedAnswer !== null} // Desactiva los botones después de seleccionar una respuesta
      >
        {option}
      </button>
    ));
  };

  const renderQuestion = () => {
    return (
      <div>
        <h1>Preguntas</h1>
        <h2>{currentQuestion.question}</h2>
        {renderOptions()}
        <p>Puntaje: {score}</p>
        <p>Categoría: {category}</p>
      </div>
    );
  };

  return (
    <div>
      {renderQuestion()}
    </div>
  );
};

export default Question;