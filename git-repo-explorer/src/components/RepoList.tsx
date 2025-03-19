import React from "react"
import {useQuery} from '@tanstack/react-query'
import { fetchRepos } from "@/api/githubApi"

interface RepoListProps {
    query: string
}

