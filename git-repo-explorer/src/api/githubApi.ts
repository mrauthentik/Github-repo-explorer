import axios from "axios";

export const fetchRepos = async (query: string, page: number = 1, sort: string = "stars", language?: string) => {
  try {
    let url = `https://api.github.com/search/repositories?q=${query}&sort=${sort}&order=desc&per_page=5&page=${page}`;
    
    if (language) {
      url += `+language:${language}`;
    }

    const repoResponse = await axios.get(url);
    
    if (!repoResponse.data.items) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await Promise.all(
      repoResponse.data.items.map(async (repo: any) => {
        try {
          // Fetch commit history (get total commit count)
          const commitsResponse = await axios.get(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
          );

          // Check if there's a 'Link' header to determine total commits
          const linkHeader = commitsResponse.headers["link"];
          let totalCommits = commitsResponse.data.length;

          if (linkHeader) {
            const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
            if (lastPageMatch) {
              totalCommits = parseInt(lastPageMatch[1], 10);
            }
          }

          const latestCommit = commitsResponse.data[0];

          return {
            ...repo,
            commitCount: totalCommits,
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
