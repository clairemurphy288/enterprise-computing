import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const API_KEY = process.env.REACT_APP_API_KEY; // Replace with your YouTube Data API key

const regionOptions = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'MX', name: 'Mexico' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'RU', name: 'Russia' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CL', name: 'Chile' },
  { code: 'PH', name: 'Philippines' },
  { code: 'SG', name: 'Singapore' },
  // Add more regions as needed
];

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('US'); // Default to United States
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularVideos = async () => {
      setLoading(true);
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
  }, [selectedRegion]); // Re-fetch popular videos when region changes

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        setLoading(true);
        try {
          const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              part: 'snippet',
              maxResults: 10,
              key: API_KEY,
              q: searchTerm, // Add search query
              type: 'video', // Only fetch videos
            },
          });
          setVideos(response.data.items);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch videos');
          setLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [searchTerm]); // Re-fetch search results when searchTerm changes

  const handleVideoSelect = (videoId) => {
    // console.log(videoId)
    navigate(`/video/${videoId}`);
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery.trim()); // Set search term to trigger search
  };

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
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos..."
            className="bg-white border border-gray-300 rounded-md shadow-sm p-2 mr-2 flex-grow"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-md p-2"
          >
            Search
          </button>
        </div>
        {loading ? (
          <div className="text-gray-700">Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id.videoId}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleVideoSelect(video.id)}
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






