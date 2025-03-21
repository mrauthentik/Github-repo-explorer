import axios from "axios";

// Function to fetch repositories
export const fetchRepos = async (query: string, page: number = 1, sort: string = "stars", language?: string) => {
  try {
    if (!query) throw new Error("Search query is empty.");

    const url = `https://api.github.com/search/repositories?q=${query}${language ? `+language:${language}` : ""}&sort=${sort}&order=desc&per_page=5&page=${page}`;

    const repoResponse = await axios.get(url); // 🔥 Removed Authorization header

    if (!repoResponse.data.items.length) {
      throw new Error("No repositories found.");
    }

    const repos = await Promise.all(
      repoResponse.data.items.map(async (repo: any) => {
        try {
          // Fetch commits without authentication
          const commitsResponse = await axios.get(
            `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
          );

          // Check 'Link' header for commit count
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
        } catch (error: any) {
          console.log("Error fetching commits:", error.response?.data || error.message);
          return {
            ...repo,
            commitCount: "Unknown",
            latestCommitDate: "Unknown",
          };
        }
      })
    );

    return { repos, totalCount: repoResponse.data.total_count };
  } catch (error: any) {
    console.error("GitHub API Error:", error.response?.data || error.message);
    throw error;
  }
};
