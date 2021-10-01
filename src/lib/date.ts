import { getMetaDataFromAllPosts } from './posts'

export type MonthCount = { month: string; count: number }

/**
 * 全記事の作成月を集計して返却する関数
 * @returns 作成月集計結果
 */
export const getMonthCount = (): MonthCount[] => {
  const allPostsDate = getMetaDataFromAllPosts('created')

  const dateAndCount = allPostsDate.reduce((prev: MonthCount[], post) => {
    const month = post.substring(0, 7)
    if (prev.find((value) => value.month === month)) return [...prev]
    const count = allPostsDate.filter((post) => post.substring(0, 7)).length
    return [...prev, { month: month, count: count }]
  }, [])

  return dateAndCount
}
