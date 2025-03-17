import React from "react"
import {useQuery, useMutation} from '@tanstack/react-query'
import { error } from "console"

const POSTS = [
  {id: 1, title: "Post 1"},
  {id: 2, title: "Post 2"},

]

 const App: React.FC = ()=>{
 
  const allPostQuery = useQuery({
    queryKey: ['theposts'],
    queryFn: ()=> wait(1000).then(()=> [...POSTS])
  })

if(allPostQuery.isLoading) return <h1 className="text-green-600 text-xl p-5"> Loading ....</h1>
if(allPostQuery.isError) return <h2 className="text-red-700">Error: {JSON.stringify(allPostQuery.error)}</h2>
  return(
    <h1 className="bg-blue-500 text-center text-white"> TanStack </h1>
  )
}

function wait (duration:number){
      return new Promise(resolve => setTimeout(resolve, duration))
}
export default App