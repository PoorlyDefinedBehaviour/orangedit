import User from "../../Infra/Database/Entities/User"

type Comment = {
  author: User
  created_at: Date
  points: number
  content: string
  replies: Comment[]
}

export default Comment
