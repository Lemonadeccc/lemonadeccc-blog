import PostsListClient from './PostsListClient'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-static'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <PostsListClient
      posts={posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        type: post.type,
        project: post.project,
        label: dateFormatter.format(new Date(post.date)),
      }))}
    />
  )
}
