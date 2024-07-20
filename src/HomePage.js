import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar'; // Import the NavBar component

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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="flex-grow p-6">
        {loading ? (
          <div className="text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    className="w-full h-64 object-cover rounded-md mb-4"
                    src={video.snippet.thumbnails.high.url} // Use 'high' resolution
                    alt={video.snippet.title}
                  />
                  <h2 className="text-xl font-semibold text-gray-900">{video.snippet.title}</h2>
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;

