import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import './index.css';
import UserForm from './components/UserForm.jsx';
import { UserProvider } from './components/UserContext';
import Question from './components/Question.jsx';
import { useEffect, useState } from 'react';
import Results from './components/Results.jsx';

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "What's your favorite hobby?",
    options: ["Reading 📚", "Sports 🏈", "Gaming 🎮", "Traveling 🚀"],
  },
  {
    question: "What's your favorite season?",
    options: ["Summer 🌞", "Winter ❄️", "Spring 🌸", "Autumn 🍃"],
  },
  {
    question: "What animal do you prefer?",
    options: ["Lion 🦁", "Snake 🐍", "Badger 🦡", "Penguin 🐧"],
  },
  {
    question: "What's your favorite vacation places?",
    options: ["City 🌆", "Beach 🏖️", "Mountains ⛰️", "Countryside 🌳"],
  },
];

const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};

const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  // Continue mapping all your possible options to a keyword

  // Hobbies
  "Reading 📚": "Fire",
  "Sports 🏈": "Water",
  "Gaming 🎮": "Earth",
  "Traveling 🚀": "Air",

  // Seasons
  "Summer 🌞": "Fire",
  "Winter ❄️": "Water",
  "Spring 🌸": "Earth",
  "Autumn 🍃": "Air",

  // Animals
  "Lion 🦁": "Fire",
  "Snake 🐍": "Water",
  "Badger 🦡": "Earth",
  "Penguin 🐧": "Air",

  // Vacation
  "City 🌆": "Fire",
  "Beach 🏖️": "Water",
  "Mountains ⛰️": "Earth",
  "Countryside 🌳": "Air",
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState(0);
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  useEffect(() => {

    const fetchArtwork = async (keyword) => {
      try {
        const request = await fetch("https://dog.ceo/api/breeds/image/random");
        const response = await request.json(); 

        const result = response.message;
        const owner = result.split('/')[5].split('.')[0];
        let imgTitle = result.split('/')[4].replace(/-/g, ' ');
        imgTitle = imgTitle.charAt(0).toUpperCase() + imgTitle.slice(1);

        const img = {
          title: imgTitle,
          primaryImage: result,
          artistDisplayName: owner
        }
        setArtwork(img);

      } catch (error) {
        console.error("Error fetching:", error);
        setArtwork(null);
      }
    }

      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    }, [currentQuestionIndex]
  );

  return (
    <>
    <UserProvider value={{ name: userName, setName: setUserName }}>
    <Header />

      <Routes>

        <Route path="/" element={<UserForm />} />

        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />

      </Routes>
    </UserProvider>
    </>
  )
}

export default App
