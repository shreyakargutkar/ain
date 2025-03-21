"use client";
import React, { useState, useEffect } from "react";
import { 
  FaCamera, 
  FaPlane, 
  FaGlobeAmericas, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaComment, 
  FaShareAlt, 
  FaEllipsisH
} from "react-icons/fa";

const LiveTravelCommunity = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/api/placeholder/64/64",
      location: "Santorini, Greece",
      content: "Just arrived in Santorini! The white buildings against the blue sea are even more stunning in person. Any restaurant recommendations?",
      mediaUrl: "/api/placeholder/600/400",
      mediaType: "image/jpeg",
      timestamp: "2025-03-20T15:30:00Z",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: "Mark Chen",
      avatar: "/api/placeholder/64/64",
      location: "Tokyo, Japan",
      content: "Cherry blossom season is in full swing here in Tokyo! The parks are packed but absolutely worth visiting. Pro tip: Come early in the morning to avoid crowds.",
      mediaUrl: "/api/placeholder/600/400",
      mediaType: "image/jpeg",
      timestamp: "2025-03-19T09:15:00Z",
      likes: 42,
      comments: 12
    }
  ]);
  const [newPost, setNewPost] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("feed");

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setMediaPreview(fileURL);
    }
  };

  const handleSubmit = async () => {
    if (!newPost.trim() && !media) return;
    
    setIsLoading(true);
    
    // Simulate post submission
    setTimeout(() => {
      const newPostObj = {
        id: posts.length + 1,
        author: "You",
        avatar: "/api/placeholder/64/64",
        location: "Current Location",
        content: newPost,
        mediaUrl: mediaPreview,
        mediaType: media?.type || "",
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      
      setPosts([newPostObj, ...posts]);
      setNewPost("");
      setMedia(null);
      setMediaPreview(null);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
              <FaGlobeAmericas size={24} />
            </div>
            <h1 className="text-xl font-bold text-blue-800 hidden sm:block">Live Travel Community</h1>
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors duration-200">
              Explore
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center">
              <FaPlane className="mr-2" /> New Trip
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-20">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4">
                <div className="h-16 w-16 bg-white rounded-full mx-auto flex items-center justify-center text-blue-500 text-xl font-bold">
                  YT
                </div>
              </div>
              
              <div className="p-4 text-center">
                <h2 className="font-bold text-lg text-gray-800">Your Travels</h2>
                <p className="text-sm text-gray-500 mt-1">12 trips · 8 countries</p>
              </div>
              
              <div className="border-t border-blue-100">
                <ul>
                  {["Feed", "Explore", "My Trips", "Saved", "Notifications"].map((item, index) => (
                    <li key={index}>
                      <button 
                        className={`w-full text-left py-3 px-5 hover:bg-blue-50 transition-colors ${activeTab === item.toLowerCase().replace(' ', '_') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                        onClick={() => setActiveTab(item.toLowerCase().replace(' ', '_'))}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Post creation card */}
            <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  YT
                </div>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your travel experience or ask for recommendations..."
                  className="flex-1 ml-3 p-3 h-12 bg-blue-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 placeholder-gray-500 resize-none"
                />
              </div>

              {mediaPreview && (
                <div className="relative mb-4 rounded-xl overflow-hidden border border-blue-100">
                  <button
                    onClick={() => {
                      setMedia(null);
                      setMediaPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                  <img src={mediaPreview} alt="Preview" className="w-full h-auto max-h-96 object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between border-t border-blue-100 pt-4 mt-2">
                <div className="flex space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaChange}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                      <FaCamera className="mr-2" /> Photo
                    </button>
                  </div>
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <FaMapMarkerAlt className="mr-2" /> Location
                  </button>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors duration-200 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Posting...
                    </>
                  ) : (
                    <>
                      <FaPlane className="mr-2" /> Share
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Segmented control */}
            <div className="flex bg-white rounded-xl shadow-sm mb-6 p-1">
              <button 
                className={`flex-1 py-3 rounded-lg text-center font-medium transition-all ${activeTab === "feed" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setActiveTab("feed")}
              >
                Latest Updates
              </button>
              <button 
                className={`flex-1 py-3 rounded-lg text-center font-medium transition-all ${activeTab === "trending" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setActiveTab("trending")}
              >
                Trending
              </button>
              <button 
                className={`flex-1 py-3 rounded-lg text-center font-medium transition-all ${activeTab === "following" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-600"}`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
            </div>

            {/* Posts feed */}
            {posts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <div className="text-blue-300 mb-3">
                  <FaGlobeAmericas size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No travel updates yet</h3>
                <p className="text-gray-500 mb-4">Be the first to share your travel experiences!</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                  Create Post
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <img 
                            src={post.avatar} 
                            alt={post.author} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                          />
                          <div className="ml-3">
                            <h3 className="font-medium text-gray-800">{post.author}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <FaMapMarkerAlt className="text-red-500 text-xs mr-1" />
                              <span>{post.location}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEllipsisH />
                        </button>
                      </div>

                      <p className="text-gray-700 mb-4">{post.content}</p>

                      {post.mediaUrl && (
                        <div className="rounded-lg overflow-hidden mb-4 border border-blue-50">
                          <img src={post.mediaUrl} alt="" className="w-full h-auto" />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-blue-50">
                        <div className="flex space-x-5">
                          <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                            <FaHeart className="mr-1" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-blue-500 transition-colors">
                            <FaComment className="mr-1" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                        <button className="text-gray-500 hover:text-blue-500 transition-colors">
                          <FaShareAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="w-full py-3 bg-white border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium">
                  Load More Updates
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveTravelCommunity;
