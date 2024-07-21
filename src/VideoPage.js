import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import he from 'he';
import NavBar from './NavBar';

const Flashcard = ({ flashcard, onAddToDeck }) => (
  <div className="bg-white p-4 border border-gray-300 shadow-lg rounded-lg w-80"> {/* Rounded corners */}
    <h3 className="font-semibold text-xl mb-2">Flashcard</h3>
    <p className="mb-1"><strong>Front:</strong> {flashcard.front}</p>
    <p className="mb-1"><strong>Back:</strong> {flashcard.back}</p>
    <p className="mb-2"><strong>Example:</strong> {flashcard.example}</p>
    <button 
      className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
      onClick={() => onAddToDeck(flashcard)}
    >
      Add to Deck
    </button>
  </div>
);

const VideoPage = () => {
  const { id } = useParams();
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flashcard, setFlashcard] = useState(null); // State for the flashcard
  const [deck, setDeck] = useState([]); // State for the flashcard deck
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/transcript/${id}`);
        const decodedTranscript = response.data.map(entry => ({
          ...entry,
          text: he.decode(he.decode(entry.text)),
        }));
        setTranscript(decodedTranscript);
        if (decodedTranscript.length > 0) {
          setCurrentText(getCombinedText(0, decodedTranscript));
        }
      } catch (err) {
        setError('Failed to fetch transcript');
        console.error(err);
      }
    };

    fetchTranscript();
  }, [id]);

  useEffect(() => {
    if (transcript.length === 0) return;

    const interval = setInterval(() => {
      if (!isPlaying) return; // Skip updates if video is paused

      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 3; // Move by 3 entries
        if (nextIndex < transcript.length) {
          setCurrentText(getCombinedText(nextIndex, transcript));
          return nextIndex;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, getDurationForNextIndex(currentIndex, transcript) * 500); // Duration in milliseconds

    return () => clearInterval(interval);
  }, [transcript, currentIndex, isPlaying]);

  useEffect(() => {
    if (window.YT) {
      const onPlayerReady = (event) => {
        setPlayer(event.target);
        event.target.addEventListener('onStateChange', onPlayerStateChange);
      };

      const onPlayerStateChange = (event) => {
        setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
      };

      new window.YT.Player(videoRef.current, {
        videoId: id,
        events: {
          'onReady': onPlayerReady,
        },
      });
    }
  }, [id]);

  const getCombinedText = (startIndex, transcript) => {
    // Combine text from three consecutive entries
    return transcript.slice(startIndex, startIndex + 3).map(entry => entry.text).join(' ');
  };

  const getDurationForNextIndex = (index, transcript) => {
    // Combine duration for three consecutive entries
    const endIndex = Math.min(index + 3, transcript.length); // Avoid out-of-bounds
    return transcript.slice(index, endIndex).reduce((total, entry) => total + (entry.duration || 1), 0);
  };

  const renderTextWithSpaces = (text) => {
    // Render text while preserving spaces between words
    return text.split(/(\s+)/).map((chunk, index) => (
      chunk.trim() === ''
        ? <span key={index}>&nbsp;</span> // Render spaces as non-breaking spaces
        : <span
            key={index}
            className="inline-block cursor-pointer hover:bg-gray-200"
            style={{ userSelect: 'text' }}
            onClick={() => createFlashcard(chunk)} // Call function to create flashcard
          >
            {chunk}
          </span>
    ));
  };

  const createFlashcard = async (text) => {
    try {
      const response = await axios.post('http://localhost:4000/create-flashcard', { text });
      const jsonResponse = JSON.parse(response.data.response.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim());
      setFlashcard(jsonResponse);
    } catch (error) {
      console.error('Error creating flashcard:', error);
    }
  };

  const handleAddToDeck = (flashcard) => {
    setDeck([...deck, flashcard]);
    setFlashcard(null); // Hide the flashcard after adding to deck
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-6"> {/* Center main content */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
            <div
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
          <div className="p-4 text-center"> {/* Centered caption below the video */}
            <p className="text-2xl font-semibold text-gray-800">
              {renderTextWithSpaces(currentText) || 'Loading...'}
            </p>
          </div>
        </div>
        {flashcard && (
          <div className="ml-6"> {/* Margin to the left */}
            <Flashcard flashcard={flashcard} onAddToDeck={handleAddToDeck} />
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoPage;


















