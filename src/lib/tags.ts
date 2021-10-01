import { getMetaDataFromAllPosts } from './posts'

export type TagData = { tag: string; count: number }

/**
 * 全記事のタグを集計して返却する関数
 * @returns タグ集計結果
 */
export const getAllTags = (): TagData[] => {
  const allPostsTags = getMetaDataFromAllPosts('tags')

  const tagsAndCount = [...new Set(allPostsTags.flat())].reduce((prev: TagData[], tag) => {
    const count = allPostsTags.flat().filter((value) => value === tag).length
    return [...prev, { tag: tag, count: count }]
  }, [])

  return tagsAndCount
}
