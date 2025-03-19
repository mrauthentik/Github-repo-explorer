export const fetchRepos = async (query: string) =>{
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`)

    if(!response.ok){
        throw new Error('Failed to fetch repositories')
        console.log('Failed to fetch repos')
    }

    const data = await response.json()
    const repos = data.items || []

    //This Logic Fetches commit details for each repo
    const reposWithCommits = await Promise.all(
        repos.map(async (repo: any)=> {
            try{
                const commitResponse = await fetch (
                    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`
                );
            }
        })
    )

    return response.json()
}
