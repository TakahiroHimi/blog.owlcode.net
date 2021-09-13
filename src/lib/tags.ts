import { getMetaDataFromAllPosts } from 'utils/postsAnalysis'

export type TagData = { tag: string; count: number }

export const getAllTags = (): TagData[] => {
  const allPostsTags = getMetaDataFromAllPosts('tags')

  const tagsAndCount = [...new Set(allPostsTags.flat())].reduce((prev: TagData[], tag) => {
    const count = allPostsTags.flat().filter((value) => value === tag).length
    return [...prev, { tag: tag, count: count }]
  }, [])

  return tagsAndCount
}
