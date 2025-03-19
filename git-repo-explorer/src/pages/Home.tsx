import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RepoList from "../components/RepoList";

const Home: React.FC = () => {
  const [query, setQuery] = useState("react");

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/20">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-md">
          GitHub Repo Explorer  🚀
        </h1>
        <p className="text-center text-gray-300 mt-2">
          Search and explore GitHub repositories with ease.
        </p>
        <div className="mt-6">
          <SearchBar onSearch={setQuery} />
        </div>
        <div className="mt-6">
          <RepoList query={query} />
        </div>
      </div>
    </div>
  );
};

export default Home;
