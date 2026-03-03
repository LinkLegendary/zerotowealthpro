import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  content: string
  keywords?: string
  author?: string
  authorBio?: string
  readingTime?: number
}

export interface Author {
  slug: string
  title: string
  description: string
  content: string
  author?: string
  authorBio?: string
}

// Folders
const postsDirectory = path.join(process.cwd(), "content")
const authorsDirectory = path.join(process.cwd(), "content/about")




// ─── BLOG POSTS ───────────────────────────────────────────────────────────────


export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".mdx"))

  return files.map((filename) => {
    const slug = filename.replace(".mdx", "")
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 238);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      content,
      keywords: data.keywords || "",
      author: data.author || "",
      authorBio: data.authorBio || "",
       readingTime,  
    }
  })
}






export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 238)

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    content,
    keywords: data.keywords || "",
    author: data.author || "",
    authorBio: data.authorBio || "",
    readingTime,
  }
}










export function getAllAuthors(): Author[] {
  if (!fs.existsSync(authorsDirectory)) return []

  const files = fs.readdirSync(authorsDirectory).filter(f => f.endsWith(".mdx"))

  return files.map((filename) => {
    const slug = filename.replace(".mdx", "")
    const fullPath = path.join(authorsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      content,
      author: data.author || "",
      authorBio: data.authorBio || "",
    }
  })
}


export function getAuthorBySlug(slug: string): Author | null {
  const fullPath = path.join(authorsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    content,
    author: data.author || "",
    authorBio: data.authorBio || "",
  }
}






















// import fs from "fs"
// import path from "path"
// import matter from "gray-matter"

// export interface Post {
//   slug: string
//   title: string
//   description: string
//   date: string
//   content: string
//   keywords?: string      // ✅ Add this
//   author?: string        // ✅ Add this
// }

// // Folder where your MDX files are stored
// const postsDirectory = path.join(process.cwd(), "content")

// // Get all posts
// export function getAllPosts(): Post[] {
//   const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".mdx"))

//   return files.map((filename) => {
//     const slug = filename.replace(".mdx", "")
//     const fullPath = path.join(postsDirectory, filename)
//     const fileContents = fs.readFileSync(fullPath, "utf8")
//     const { data, content } = matter(fileContents)

//     return {
//       slug,
//       title: data.title || slug,
//       description: data.description || "",
//       date: data.date || "",
//       content,
//       keywords: data.keywords || "",       // ✅ Add this
//       author: data.author || "",            // ✅ Add this
//     }
//   })
// }

// // Get single post by slug
// export function getPostBySlug(slug: string): Post | null {
//   const fullPath = path.join(postsDirectory, `${slug}.mdx`)
//   if (!fs.existsSync(fullPath)) return null

//   const fileContents = fs.readFileSync(fullPath, "utf8")
//   const { data, content } = matter(fileContents)

//   return {
//     slug,
//     title: data.title || slug,
//     description: data.description || "",
//     date: data.date || "",
//     content,
//     keywords: data.keywords || "",        // ✅ Add this
//     author: data.author || "",             // ✅ Add this
//   }
// }














// import fs from "fs"
// import path from "path"
// import matter from "gray-matter"

// export interface Post {
//   slug: string
//   title: string
//   description: string
//   date: string
//   content: string
// }

// // Folder where your MDX files are stored
// const postsDirectory = path.join(process.cwd(), "content")

// // Get all posts
// export function getAllPosts(): Post[] {
//   const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith(".mdx"))

//   return files.map((filename) => {
//     const slug = filename.replace(".mdx", "")
//     const fullPath = path.join(postsDirectory, filename)
//     const fileContents = fs.readFileSync(fullPath, "utf8")
//     const { data, content } = matter(fileContents)

//     return {
//       slug,
//       title: data.title || slug,
//       description: data.description || "",
//       date: data.date || "",
//       content,
//     }
//   })
// }

// // Get single post by slug
// export function getPostBySlug(slug: string): Post | null {
//   const fullPath = path.join(postsDirectory, `${slug}.mdx`)
//   if (!fs.existsSync(fullPath)) return null

//   const fileContents = fs.readFileSync(fullPath, "utf8")
//   const { data, content } = matter(fileContents)

//   return {
//     slug,
//     title: data.title || slug,
//     description: data.description || "",
//     date: data.date || "",
//     content,
//   }
// }













// import fs from "fs"
// import path from "path"
// import matter from "gray-matter"

// const postsDirectory = path.join(process.cwd(), "content")

// export interface Post {
//   slug: string
//   title: string
//   description: string
//   date: string
// }

// export function getAllPosts(): Post[] {
//   const files = fs.readdirSync(postsDirectory, { withFileTypes: true })

// return files
//   .filter((file) => file.isFile() && file.name.endsWith(".mdx"))
//   .map((file) => {
//     const slug = file.name.replace(".mdx", "")
//     const fullPath = path.join(postsDirectory, file.name)
//     const fileContents = fs.readFileSync(fullPath, "utf8")
//     const { data } = matter(fileContents)

//       return {
//         slug,
//         title: data.title,
//         description: data.description,
//         date: data.date,
//       }
//     })
// }












// export function getPostBySlug(slug: string) {
//   const fullPath = path.join(postsDirectory, `${slug}.mdx`)

//   if (!fs.existsSync(fullPath)) return null

//   const fileContents = fs.readFileSync(fullPath, "utf8")
//   const { data, content } = matter(fileContents)

//   return {
//     slug,
//     content,
//     ...(data as {
//       title: string
//       description: string
//       date: string
//     }),
//   }
// }
