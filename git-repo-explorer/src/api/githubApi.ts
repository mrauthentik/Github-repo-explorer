import axios from "axios";

export const fetchRepos = async (query: string, page: number = 1, sort: string = "stars", language?: string) => {
  try {
    // Limit to 10 repositories per page to reduce API requests
    let url = `https://api.github.com/search/repositories?q=${query}${language ? `+language:${language}` : ""}&sort=${sort}&order=desc&per_page=10&page=${page}`;

    const repoResponse = await axios.get(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (!repoResponse.data || !repoResponse.data.items || repoResponse.data.items.length === 0) {
      throw new Error("No repositories found.");
    }

    // Only fetch commit details for the first 5 repos to save requests
    const repos = await Promise.all(
      repoResponse.data.items.map(async (repo: any, index: number) => {
        if (index >= 5) {
          return {
            ...repo,
            commitCount: "Not fetched",
            latestCommitDate: "Not fetched",
          };
        }

        try {
          const commitsResponse = await axios.get(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
            { headers: { Accept: "application/vnd.github.v3+json" } }
          );

          const latestCommit = commitsResponse.data[0];

          return {
            ...repo,
            commitCount: commitsResponse.data.length || "Unknown",
            latestCommitDate: latestCommit?.commit?.author?.date || "Unknown",
          };
        } catch (error) {
          console.log("Error fetching commits:", error);
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
    console.error("Error fetching repositories:", error);
    throw error;
  }
};
