import React from "react"
import {}

const POSTS = [
  {id: 1, title: "Post 1"},
  {id: 2, title: "Post 2"},

]

 const App: React.FC = ()=>{
  return(
    <h1 className="bg-blue-500 text-center text-white"> TanStack </h1>
  )
}

function wait (duration:number){
      return new Promise(resolve => setTimeout(resolve, duration))
}
export default App