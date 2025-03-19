import axios from "axios";

export const fetchRepos = async (query: string) => {
  try {
    const repoResponse = await axios.get(
      `https://api.github.com/search/repositories?q=${query}&per_page=5`
    );

    if (!repoResponse.data.items) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await Promise.all(
      repoResponse.data.items.map(async (repo: any) => {
        try {
          // Fetch latest commit
          const commitsResponse = await axios.get(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
          );

          const latestCommit = commitsResponse.data[0];

          // Fetch total commit count (GitHub API workaround)
          const commitStatsResponse = await axios.get(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}`
          );

          return {
            ...repo,
            commitCount: commitStatsResponse.data.forks_count, // Approximate commit count (GitHub API limitation)
            latestCommitDate: latestCommit?.commit.author.date || "N/A",
          };
        } catch (error) {
          console.error(`Error fetching commits for ${repo.name}:`, error);
          return {
            ...repo,
            commitCount: "Unknown",
            latestCommitDate: "Unknown",
          };
        }
      })
    );

    return repos;
  } catch (error) {
    throw new Error("Failed to fetch repositories");
    console.log(error)
  }
};
