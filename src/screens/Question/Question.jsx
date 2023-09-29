// Question.jsx

import React, { useState } from 'react';
import { useTrivia } from '../../TriviaContext/TriviaContext';

const Question = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [buttonClass, setButtonClass] = useState('');
  const { questions, currentQuestionIndex, score, category, checkAnswer, moveToNextQuestion } = useTrivia();

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    if (!answered) {
      setSelectedAnswer(answer);
      const isCorrect = checkAnswer(answer);
      setAnswered(true);
      setShowNextQuestion(true);

      // Aquí puedes realizar un seguimiento de si la respuesta es correcta o incorrecta
      // y usar eso para asignar las clases "correctAnswer" e "incorrectAnswer"
      const buttonClass = isCorrect ? 'correctAnswer' : 'incorrectAnswer';
      setButtonClass(buttonClass);
    }
  };

  const handleNextQuestion = () => {
    moveToNextQuestion();
    setSelectedAnswer(null);
    setAnswered(false);
    setShowNextQuestion(false);
    setButtonClass(''); // Limpiar la clase al avanzar a la siguiente pregunta
  };

  const renderOptions = () => {
    const isAnswered = answered && showNextQuestion;
    
    return currentQuestion.options.map((option, index) => {
      const isSelectedAnswer = selectedAnswer === option;
      const isCorrectAnswer = currentQuestion.correctAnswer === option;

      let buttonClassName = '';
      if (answered && isSelectedAnswer) {
        buttonClassName = isCorrectAnswer ? 'correctAnswer' : 'incorrectAnswer';
      }
//actualiza?
      return (
        <button
          key={index}
          onClick={() => handleAnswerClick(option)}
          disabled={answered}
          className={buttonClassName}
        >
          {option}
        </button>
      );
    });
  };

  const renderQuestion = () => {
    if (!currentQuestion) {
      return (
        <div>
          <h1>Pregunta</h1>
          <p>No hay más preguntas.</p>
        </div>
      );
    }

    return (
      <div>
        <h1>Preguntas</h1>
        <h2>{currentQuestion.question}</h2>
        {renderOptions()}
        {answered && showNextQuestion && (
          <button onClick={handleNextQuestion}>Siguiente</button>
        )}
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
