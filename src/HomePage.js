import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';

const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your YouTube Data API key

const regionOptions = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  // Add more region options as needed
];

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('US'); // Default to United States
  const [selectedVideoId, setSelectedVideoId] = useState(null); // State for selected video

  useEffect(() => {
    const fetchPopularVideos = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 10,
            key: API_KEY,
            regionCode: selectedRegion, // Filter by selected region
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
  }, [selectedRegion]); // Re-fetch videos when region changes

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />
      <main className="flex-grow p-6">
        <div className="mb-4">
          <label htmlFor="region-select" className="mr-2 text-lg font-semibold text-gray-900">Select Region:</label>
          <select
            id="region-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-white border border-gray-300 rounded-md shadow-sm p-2"
          >
            {regionOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex">
          {/* Video Player */}
          {selectedVideoId && (
            <div className="flex-grow mb-6">
              <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/${selectedVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
        {loading ? (
          <div className="text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedVideoId(video.id)}
              >
                <img
                  className="w-full h-64 object-cover rounded-md mb-4"
                  src={video.snippet.thumbnails.high.url} // Use 'high' resolution
                  alt={video.snippet.title}
                />
                <h2 className="text-xl font-semibold text-gray-900">{video.snippet.title}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;



