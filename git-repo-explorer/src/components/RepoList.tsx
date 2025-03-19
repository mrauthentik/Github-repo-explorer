import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../api/githubApi";
import { FaStar, FaCodeBranch, FaClock, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Language options for filtering
const languages = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "PHP", "Go", "Rust"];

interface RepoListProps {
  query: string;
}

const RepoList: React.FC<RepoListProps> = ({ query }) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("stars");
  const [language, setLanguage] = useState<string | undefined>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["repos", query, page, sort, language],
    queryFn: () => fetchRepos(query, page, sort, language),
    enabled: !!query,
  });

  if (isLoading) return <p className="p-6 text-center text-lg text-gray-600">🔄 Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">❌ Error fetching repositories.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Filters & Sorting */}
    {/* Filters & Sorting Section */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-gray-50 shadow-sm rounded-md">
        {/* Sorting Dropdown */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="stars">⭐ Sort by Stars</option>
          <option value="forks">🔀 Sort by Forks</option>
          <option value="updated">⏳ Last Updated</option>
        </select>

        {/* Language Filter */}
        <select
          value={language || ""}
          onChange={(e) => setLanguage(e.target.value || undefined)}
          className="border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">🌍 All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>


      {/* Repository List */}
      {data?.repos?.length ? (
        <ul className="space-y-6">
          {data.repos.map((repo: any) => {
            const latestCommitDate = repo.latestCommitDate
              ? new Date(repo.latestCommitDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Unknown";

            return (
              <li key={repo.id} className="p-5 bg-gray-100 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={repo.owner.avatar_url}
                    alt="repo-owner"
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                      {repo.name}
                    </a>
                    <p className="text-gray-600 text-sm">{repo.full_name}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-3 flex items-center justify-between text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" /> {repo.stargazers_count}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCodeBranch className="text-green-500" /> {repo.forks_count}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-purple-500" /> {latestCommitDate}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    <strong className="text-gray-900">Language:</strong> {repo.language || "Not specified"}
                  </p>
                  <p>
                    <strong className="text-gray-900">Commits:</strong> {repo.commitCount || "Unknown"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-lg">🔍 No repositories found.</p>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 flex items-center gap-2 rounded-lg text-white ${
              page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <FaArrowLeft /> Previous
          </button>

          <span className="text-lg font-medium text-gray-700">Page {page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next <FaArrowRight />
          </button>
    </div>
    </div>
  );
};

export default RepoList;
