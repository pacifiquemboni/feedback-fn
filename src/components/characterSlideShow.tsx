import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  name: string;
}

const CharacterSlideshow = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState([
    "Hello Dear!",
    "Welcome to Rental booking platform!",
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const userName = decodedToken.name;
      setSentences([
        `Hello ${userName}!`,
        "Welcome to Rental booking platform!",
      ]);
    }
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= sentences[currentSentenceIndex].length) {
        setDisplayedText(sentences[currentSentenceIndex].substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentSentenceIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        }, 3000); // Delay before switching to the next sentence
      }
    }, 90); // Typing speed (adjust as needed)

    return () => clearInterval(typingInterval); // Clean up interval on component unmount
  }, [currentSentenceIndex, sentences]);

  return (
    <div className="text-center mt-5 overflow-hidden">
      <h1 className="text-white text-4xl font-teko rounded-md max-w-2xl mx-auto lg:h-12 leading-snug md:text-3xl sm:text-sm">
        {displayedText}
      </h1>
    </div>
  );
};

export default CharacterSlideshow;