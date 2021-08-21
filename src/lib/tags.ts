import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const postsDir: string = path.join(process.cwd(), 'src/posts')
const dirents: fs.Dirent[] = fs.readdirSync(postsDir, { withFileTypes: true })
const dirNames: string[] = dirents.flatMap((dirent) => (dirent.isDirectory() ? dirent.name : []))

export type TagsAndCounts = { tagName: string; count: number }[]

export const getAllTagsAndCount = (): TagsAndCounts => {
  const allTags: string[] = dirNames
    .flatMap((dirName) => {
      const fileNames = fs.readdirSync(`${postsDir}/${dirName}`)
      return fileNames.map((fileName) => {
        const fullPath = path.join(`${postsDir}/${dirName}`, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        return matterResult.data.tags
      })
    })
    .flat()
  const tagsAndCounts = [...new Set(allTags)].reduce((acc: TagsAndCounts, currentValue: string) => {
    const count = allTags.filter((tag) => currentValue === tag).length
    return [
      ...acc,
      {
        tagName: currentValue,
        count,
      },
    ]
  }, [] as TagsAndCounts)

  return tagsAndCounts
}

export const getAllTags = (): { params: { tag: string } }[] => {
  // console.log(postsDir)
  // console.log(dirents)
  // console.log(dirNames)
  console.log(fs.readdirSync(postsDir))

  const allTags: string[] = dirNames
    .flatMap((dirName) => {
      const fileNames = fs.readdirSync(`${postsDir}/${dirName}`)
      return fileNames.map((fileName) => {
        const fullPath = path.join(`${postsDir}/${dirName}`, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        return matterResult.data.tags
      })
    })
    .flat()
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.map((tag) => {
    return {
      params: { tag },
    }
  })
}
