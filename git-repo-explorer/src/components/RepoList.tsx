import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../api/githubApi";
import { FaStar, FaCodeBranch, FaClock } from "react-icons/fa";

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
          {data.map((repo: any) => (
            <li key={repo.id} className="p-5 bg-gray-100 rounded-lg shadow-md transition-all hover:shadow-lg">
              {/* Repo Header */}
              <div className="flex items-center gap-4">
                <img src={repo.owner.avatar_url} alt="repo-owner" className="w-12 h-12 rounded-full border-2 border-blue-500" />
                <div>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
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
                  <FaClock className="text-purple-500" /> {new Date(repo.latestCommitDate).toDateString()}
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-3 text-sm text-gray-600">
                <p><strong className="text-gray-900">Language:</strong> {repo.language || "Not specified"}</p>
                <p><strong className="text-gray-900">Visibility:</strong> {repo.visibility}</p>
                <p><strong className="text-gray-900">Commits:</strong> {repo.commitCount}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 text-lg">🔍 No repositories found.</p>
      )}
    </div>
  );
};

export default RepoList;
