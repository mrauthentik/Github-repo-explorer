import React from "react"
import {useQuery, useMutation} from '@tanstack/react-query'

interface Post {
  id: string;
  title: string;
}

const POSTS = [
  {id: 1, title: "Post 1"},
  {id: 2, title: "Post 2"},

]

 const App: React.FC = ()=>{
 
  const allPostQuery = useQuery({
    queryKey: ['theposts'],
    queryFn: ()=> wait(1000).then(()=> [...POSTS])
  })

  const newPost = useMutation({
    mutationFn:({title}:{title:string}) => {
      return (
        wait(1000).then(()=> POSTS.push({id: crypto.randomUUID(), title}))
      )
    }
  })

if(allPostQuery.isLoading) return <h1 className="text-green-600 text-xl p-5"> Loading ....</h1>
if(allPostQuery.isError) return <h2 className="text-red-700">Error: {JSON.stringify(allPostQuery.error)}</h2>
  return(
    <div>

      <h1 className="bg-blue-500 text-center text-white"> TanStack </h1>
     <div>
      
      {
        allPostQuery.data?.map((item)=> {
        return  <div key={item.id}> {item.title} </div>
        })
      }
      </div> 
    </div>
  )
}

function wait (duration:number){
      return new Promise(resolve => setTimeout(resolve, duration))
}
export default App