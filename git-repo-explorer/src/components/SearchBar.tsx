import React, { useState } from "react"

interface SearchBarProps {
    onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("")

    const handleSearch = ()=>{
        if(query.trim()){
            onSearch(query)
        }
    }

    return (
        <div className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="Search GitHub Repos... "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded cursor-pointer">
        Search
      </button>
    </div>
    )
}

export default SearchBar