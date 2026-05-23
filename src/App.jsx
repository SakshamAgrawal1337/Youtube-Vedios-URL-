import { useEffect, useState } from "react";
import { PlaySquare, Eye, ThumbsUp, Play } from "lucide-react";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const url =
    "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10";

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();

      console.log(data);

      setVideos(data?.data?.data || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Unable to fetch videos right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-xl shadow-lg">
              <PlaySquare size={30} className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                YouTube
              </h1>

              <p className="text-xs text-gray-400">
                Video Explorer
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={fetchVideos}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Refresh
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold">
            Trending Tech Videos
          </h2>

          <p className="text-gray-400 mt-2">
            Explore React, Next.js, AI, Flutter, Cloud and more.
          </p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-red-500">
              {error}
            </h2>

            <p className="text-gray-400 mt-2">
              Please try again later.
            </p>
          </div>
        )}

        {/* Videos Grid */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {videos.map((videoItem) => {
              const video = videoItem?.items;
              const snippet = video?.snippet;
              const stats = video?.statistics;

              const videoUrl = `https://www.youtube.com/watch?v=${video?.id}`;

              return (
                <a
                  key={video?.id}
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#181818] border border-gray-800 rounded-2xl overflow-hidden hover:border-red-500/40 hover:-translate-y-2 transition-all duration-300 shadow-lg"
                >
                  
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        snippet?.thumbnails?.high?.url ||
                        snippet?.thumbnails?.medium?.url
                      }
                      alt={snippet?.title}
                      className="w-full aspect-video object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <div className="bg-red-600 p-4 rounded-full shadow-2xl">
                        <Play
                          size={28}
                          fill="white"
                          className="text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-1">

                    {/* Title */}
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-red-400 transition">
                      {snippet?.title}
                    </h3>

                    {/* Channel */}
                    <p className="text-gray-400 text-sm mt-2">
                      {snippet?.channelTitle}
                    </p>

                    {/* Published Date */}
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(
                        snippet?.publishedAt
                      ).toLocaleDateString()}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                      
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{stats?.viewCount}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <ThumbsUp size={16} />
                        <span>{stats?.likeCount}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {snippet?.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {snippet.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && videos.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No Videos Found
            </h2>

            <p className="text-gray-400 mt-2">
              Try refreshing the page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;