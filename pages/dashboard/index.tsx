import axios from "axios"
import React, { useState } from "react"
import { BsChevronDoubleRight } from "react-icons/bs"
import { LuLoader } from "react-icons/lu"

type PostModel = {
  id: number
  title: string
  body: string
  userId: number
}
const Dashboard = () => {
  const [posts, setPosts] = useState<PostModel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
      if (res.data) setPosts(res.data)
    } catch (error) {
      console.log(JSON.stringify(error, null, 4))
    } finally {
      setIsLoading(false)
    }
  }

  const renderData = () => {
    if (posts.length) {
      return (
        <div className="flex flex-col gap-y-8">
          {posts.map((post) => (
            <div className="text-white" key={post.id}>
              <p className="text-xs font-bold text-secondary">
                Post: {post.id} - User: {post.userId}
              </p>
              <p className="text-base font-bold text-white">{post.title}</p>
              <p className="text-sm text-white">{post.body}</p>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div>
        <p className="text-base font-bold text-white">Posts not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-primary px-32 py-3">
      <div className="mb-4">
        <button
          className="flex animate-pulse flex-row items-center gap-x-1 border-2 border-gray-light px-6 py-1 text-xs font-medium text-gray-light transition-all hover:scale-105"
          onClick={fetchData}
        >
          Get posts
          <BsChevronDoubleRight size={10} className="text-white" />
        </button>
      </div>
      {isLoading ? (
        <div className="flex flex-row justify-center">
          <LuLoader size={30} className="animate-spin text-white" />
        </div>
      ) : (
        renderData()
      )}
    </div>
  )
}

export default Dashboard
