import React, { useState } from 'react';
import './QuizForm.css';

const QuizForm = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({
    id: null,
    title: '',
    description: '',
    score: null,
    url: '',
    questions_answers: [],
  });

  const handleInputChange = (e) => {
    setCurrentQuiz({
      ...currentQuiz,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const questions_answers = [...currentQuiz.questions_answers];
    questions_answers[index][name] = value;
    setCurrentQuiz({
      ...currentQuiz,
      questions_answers,
    });
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const { name, value } = e.target;
    const questions_answers = [...currentQuiz.questions_answers];
    questions_answers[questionIndex].answers[answerIndex][name] = value;
    setCurrentQuiz({
      ...currentQuiz,
      questions_answers,
    });
  };

  const handleAddQuiz = () => {
    if (currentQuiz.id === null) {
      setQuizzes([...quizzes, currentQuiz]);
    } else {
      const updatedQuizzes = quizzes.map((quiz) =>
        quiz.id === currentQuiz.id ? currentQuiz : quiz
      );
      setQuizzes(updatedQuizzes);
    }
    setCurrentQuiz({
      id: null,
      title: '',
      description: '',
      score: null,
      url: '',
      questions_answers: [],
    });
  };

// const handleAddQuiz = () => {
//     const existingQuizIndex = quizzes.findIndex((quiz) => quiz.id === currentQuiz.id);
//     if (existingQuizIndex !== -1) {
//       const updatedQuizzes = [...quizzes];
//       updatedQuizzes[existingQuizIndex] = currentQuiz;
//       setQuizzes(updatedQuizzes);
//     } else {
//       setQuizzes([...quizzes, currentQuiz]);
//     }
//     setCurrentQuiz({
//       id: null,
//       title: '',
//       description: '',
//       score: null,
//       url: '',
//       questions_answers: [],
//     });
//   };

  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
  };

  const handleAddQuestion = () => {
    setCurrentQuiz({
      ...currentQuiz,
      questions_answers: [
        ...currentQuiz.questions_answers,
        {
          id: null,
          text: '',
          feedback_true: '',
          feedback_false: '',
          answers: [{ id: null, text: '', is_true: false }],
        },
      ],
    });
  };

  const handleAddAnswer = (questionIndex) => {
    const questions_answers = [...currentQuiz.questions_answers];
    questions_answers[questionIndex].answers.push({
      id: null,
      text: '',
      is_true: false,
    });
    setCurrentQuiz({
      ...currentQuiz,
      questions_answers,
    });
  };

  return (
    <div className="container">
      <h2>Create/Edit Quiz</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={currentQuiz.title}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={currentQuiz.description}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>URL:</label>
        <input
          type="text"
          name="url"
          value={currentQuiz.url}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button onClick={handleAddQuestion} className="btn btn-primary">
        Add Question
      </button>
      {currentQuiz.questions_answers.map((question, questionIndex) => (
        <div key={questionIndex}>
          <h4>Question {questionIndex + 1}</h4>
          <div className="form-group">
            <label>Question Text:</label>
            <input
              type="text"
              name="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>True Feedback:</label>
            <input
              type="text"
              name="feedback_true"
              value={question.feedback_true}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>False Feedback:</label>
            <input
              type="text"
              name="feedback_false"
              value={question.feedback_false}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
              className="form-control"
            />
          </div>
          <button
            onClick={() => handleAddAnswer(questionIndex)}
            className="btn btn-primary"
          >
            Add Answer
          </button>
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <div className="form-group">
                <label>Answer Text:</label>
                <input
                  type="text"
                  name="text"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(e, questionIndex, answerIndex)
                  }
                  className="form-control"
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  name="is_true"
                  checked={answer.is_true}
                  onChange={(e) =>
                    handleAnswerChange(e, questionIndex, answerIndex)
                  }
                  className="form-check-input"
                />
                <label className="form-check-label">Is Correct</label>
              </div>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleAddQuiz} className="btn btn-primary">
        Add Quiz
      </button>
      <h2>Existing Quizzes</h2>
      {quizzes.map((quiz, quizIndex) => (
        <div key={quizIndex}>
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
          <p>{quiz.url}</p>
          <ul>
            {quiz.questions_answers.map((question, questionIndex) => (
              <li key={questionIndex}>{question.text}</li>
            ))}
          </ul>
          <button
            onClick={() => handleEditQuiz(quiz)}
            className="btn btn-warning"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuizForm;