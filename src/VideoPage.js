import React, { useEffect, useState, useRef } from 'react';
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
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
            <div
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </div>
        <div className="p-6 rounded-lg w-full max-w-4xl mt-6">
          <p className="text-2xl font-semibold text-gray-800">{currentText || 'Loading...'}</p>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;













