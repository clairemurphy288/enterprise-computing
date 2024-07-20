import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const VideoPage = () => {
  const { id } = useParams();

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
      </main>
    </div>
  );
};

export default VideoPage;
