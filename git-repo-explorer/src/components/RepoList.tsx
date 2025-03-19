import React from "react"
import {useQuery} from '@tanstack/react-query'
import { fetchRepos } from "@/api/githubApi"

interface RepoListProps {
    query: string
}

const RepoList: React.FC<RepoListProps> = ({query}) =>{
  const {data, error, isLoading} = useQuery({
    queryKey: ['repos', query],
    queryFn: ()=> fetchRepos(query),
    enabled: !!query
  })

  if(isLoading) return <p className="p-4" > Loading...</p>
  if(error) return <p className="p-4 text-red-500">Error fetching repos</p>

  return (
    <div className="p-4">
        {data.items?.length? (
            <ul>
                {data.items.map((repo: any) => (
                    <li key={repo.id} className="border-b p-2">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {repo.name}
              </a>
              <p className="text-sm">⭐ {repo.stargazers_count} | Forks: {repo.forks_count}</p>
                    </li>
                ))}
            </ul>
        ):(
            <p> No Repositories found</p>
        )

        }
    </div>
  )

}

export default RepoList