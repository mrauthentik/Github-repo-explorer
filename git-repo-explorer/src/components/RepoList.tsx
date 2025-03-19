import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "../api/githubApi";

interface RepoListProps {
  query: string;
}

const RepoList: React.FC<RepoListProps> = ({ query }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["repos", query],
    queryFn: () => fetchRepos(query),
    enabled: !!query,
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error fetching repos</p>;

  return (
    <div className="p-4">
      {data?.length ? (
        <ul>
          {data.map((repo: any) => (
            <li key={repo.id} className="border-b p-4">
                <img src={repo.owner.avatar_url} alt="repo-image" />
                
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-bold"
              >
                {repo.name}
              </a>
              <p className="text-sm">
                Repo Author: {repo.full_name} <br />
                ⭐ {repo.stargazers_count} | Forks: {repo.forks_count}
              </p>
              <p className="text-sm">
                📝 Commits: {repo.commitCount } | ⏳ Last Commit:{" "}
                {new Date(repo.latestCommitDate).toDateString()}
              </p>
              {/* <p className="text-sm">Contributors : {repo.contributors_url}</p> */}
                 
              <a
                href={repo.contributors_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-bold"
              >
                {repo.contributors_url}
              </a>
              <p className="text-sm">View : {repo.visibility}</p>
              <p className="text-sm">Built with : {repo.language}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>No Repositories found</p>
      )}
    </div>
  );
};

export default RepoList;
