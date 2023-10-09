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
    return currentQuestion.options.map((option, index) => {
      const isSelectedAnswer = selectedAnswer === option;
      const isCorrectAnswer = currentQuestion.correctAnswer === option;

      let buttonClassName = '';
      if (answered && isSelectedAnswer) {
        buttonClassName = isCorrectAnswer ? 'correctAnswer' : 'incorrectAnswer';
      }

      return (
        <button
          key={index}
          onClick={() => handleAnswerClick(option)}
          disabled={answered}
          className={'btnRtas ' + buttonClassName}
        >
          {option}
        </button>
      );
    });
  };

  const renderQuestion = () => {
    if (currentQuestionIndex >= questions.length-1) {
      // Mostrar el mensaje de felicitación cuando se hayan respondido todas las preguntas
      return (
        <div>
          <h1>¡Felicidades!</h1>
          <p>Has completado la trivia.</p>
          <p>Tu puntaje es: {score} puntos</p>
          {/*<p>Categoría: {category}</p>*/}
        </div>
      );
    } else if (!currentQuestion) {
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
        <div className='rtas'>
          {renderOptions()}
        </div>
        {answered && showNextQuestion && (
          <button onClick={handleNextQuestion}>Siguiente</button>
        )}
        <p>Puntaje: {score}</p>
        {/*<p>Categoría: {category}</p>*/}
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