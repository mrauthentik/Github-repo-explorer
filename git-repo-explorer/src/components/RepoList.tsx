import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../api/githubApi";
import { FaStar, FaCodeBranch, FaClock, FaEye } from "react-icons/fa";

// Function to map languages to colors (GitHub-like)
const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-green-500",
  Java: "bg-red-500",
  HTML: "bg-orange-500",
  CSS: "bg-indigo-500",
  C: "bg-gray-500",
  "C++": "bg-purple-500",
  "C#": "bg-teal-500",
  Go: "bg-blue-600",
  Rust: "bg-orange-600",
  PHP: "bg-purple-600",
};

interface RepoListProps {
  query: string;
}

const RepoList: React.FC<RepoListProps> = ({ query }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["repos", query],
    queryFn: () => fetchRepos(query),
    enabled: !!query,
  });

  if (isLoading) return <p className="p-6 text-center text-lg text-gray-600">🔄 Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">❌ Error fetching repositories.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      {data?.length ? (
        <ul className="space-y-6">
          {data.map((repo: any) => {
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
                {/* Repo Header */}
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

                {/* Repo Stats */}
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
                    <strong className="text-gray-900">Language:</strong>{" "}
                    <span className={`inline-block px-2 py-1 text-white text-xs font-semibold rounded-full ${
                      languageColors[repo.language] || "bg-gray-500"
                    }`}>
                      {repo.language || "Not specified"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEye className="text-blue-500" />
                    <strong className="text-gray-900">Visibility:</strong> {repo.visibility || "Unknown"}
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
    </div>
  );
};

export default RepoList;
