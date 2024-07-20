import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import he from 'he';
import NavBar from './NavBar';

const VideoPage = () => {
  const { id } = useParams();
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
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
  }, [transcript, currentIndex]);

  const getCombinedText = (startIndex, transcript) => {
    // Combine text from three consecutive entries
    return transcript.slice(startIndex, startIndex + 3).map(entry => entry.text).join(' ');
  };

  const getDurationForNextIndex = (index, transcript) => {
    // Combine duration for three consecutive entries
    const endIndex = Math.min(index + 3, transcript.length); // Avoid out-of-bounds
    return transcript.slice(index, endIndex).reduce((total, entry) => total + (entry.duration || 1), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col">
      <NavBar />
      <main className="flex-grow p-6">
        <div className="flex justify-center mb-6">
          <iframe
            ref={videoRef}
            width="80%"
            height="400"
            src={`https://www.youtube.com/embed/${id}?enablejsapi=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transcript:</h2>
          <p className="text-lg text-gray-700">{currentText || 'Loading...'}</p>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;









