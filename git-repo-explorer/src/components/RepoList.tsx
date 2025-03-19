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
}

export default RepoList