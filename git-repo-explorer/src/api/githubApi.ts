import axios from "axios";

export const fetchRepos = async (query: string) => {
  const repoResponse = await axios.get(
    `https://api.github.com/search/repositories?q=${query}&per_page=5`
  );

  if (!repoResponse.data.items) {
    throw new Error("Failed to fetch repositories");
  }

  const repos = await Promise.all(
    repoResponse.data.items.map(async (repo: any) => {
      try {
        // Fetch commit history
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
        );

        const latestCommit = commitsResponse.data[0];
        return {
          ...repo,
          commitCount: commitsResponse.data.length, // Only gives 1 page unless paginated
          latestCommitDate: latestCommit?.commit.author.date || "N/A",
        };
      } catch (error) {
        console.log(error)
        return {
          ...repo,
          commitCount: "Unknown",
          latestCommitDate: "Unknown",
         
        };
      }
    })
  );

  return repos;
};
