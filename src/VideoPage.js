import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios';

const VideoPage = () => {
  const { id } = useParams();
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/transcript/${id}`);
        console.log(response)
        setTranscript(response.data);
      } catch (err) {
        setError('Failed to fetch transcript');
        console.error(err);
      }
    };

    fetchTranscript();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="flex-grow p-6">
        <div className="flex justify-center mb-6">
          <iframe
            width="100%"
            height="480"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Transcript:</h2>
          {transcript.length > 0 ? (
            <ul>
              {transcript.map((entry, index) => (
                <li key={index}>
                  {entry.start} - {entry.dur}: {entry.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>{error ? error : 'No transcript available'}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default VideoPage;

