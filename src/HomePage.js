import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your YouTube Data API key

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularVideos = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 10,
            key: API_KEY,
          },
        });
        setVideos(response.data.items);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch videos');
        setLoading(false);
      }
    };

    fetchPopularVideos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-teal-400 to-green-500 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Popular YouTube Videos</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-white p-4 rounded-lg shadow-lg">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-full h-48 object-cover rounded"
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />
                <h2 className="mt-2 text-xl font-semibold text-gray-800">{video.snippet.title}</h2>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

