import User from "./User"
import Post from "./Post"

type SubReddit = {
  name: string
  description: string
  created_at: Date
  posts: Post[]
  members: User[]
}

export default SubReddit
