import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RepoList from "../components/RepoList";


const Home: React.FC = () => {
    const [query, setQuery] = useState("react");
  
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold text-center">GitHub Repo Explorer</h1>
        <SearchBar onSearch={setQuery} />
        <RepoList query={query} />
      </div>
    );
  };
  
  export default Home;