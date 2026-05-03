import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const url =
    "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10";

  const fetchVideos = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      setVideos(data?.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          YouTube Videos Listing
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">Loading videos...</p>
        )}

        {/* Grid */}
        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {videos.map((videoItem) => {
              const video = videoItem?.items;
              const snippet = video?.snippet;
              const stats = video?.statistics;

              return (
                <div
                  key={video?.id}
                  className="bg-gray-900/70 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition"
                >
                  {/* Thumbnail */}
                  <img
                    src={snippet?.thumbnails?.medium?.url}
                    alt={snippet?.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">

                    {/* Title */}
                    <h2 className="text-white font-semibold text-sm line-clamp-2">
                      {snippet?.title}
                    </h2>

                    {/* Channel */}
                    <p className="text-gray-400 text-xs mt-1">
                      {snippet?.channelTitle}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-between text-xs text-gray-400 mt-3">
                      <span>👁 {stats?.viewCount}</span>
                      <span>👍 {stats?.likeCount}</span>
                    </div>

                    {/* Tags */}
                    {snippet?.tags?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {snippet.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-[10px]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && videos.length === 0 && (
          <p className="text-center text-gray-400">No videos found</p>
        )}
      </div>
    </div>
  );
}

export default App;