import Comment from "./Comment"

type Post = {
  title: string
  content: string
  created_at: Date
  votes: number
  comments: Comment[]
}

export default Post
