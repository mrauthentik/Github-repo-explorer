export const fetchRepos = async (query: string) =>{
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`)

    if(!response.ok){
        throw new Error('Failed to fetch repositories')
        console.log('Failed to fetch repos')
    }
    return response.json()
}
