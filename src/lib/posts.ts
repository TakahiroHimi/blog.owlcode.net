import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import { getMetaData, getPostFile, postsDir } from 'utils/postsAnalysis'
import { MetaData } from 'utils/types'

/**
 * 全ての記事のmedaデータを取得後日付順にソートして返却する関数
 */
export const getSortedPostsData = () => {
  // /posts 配下のディレクトリ、ファイル名を取得する
  const dirEntry = fs.readdirSync(postsDir, { withFileTypes: true })

  const allPostsData = dirEntry.reduce((prev: MetaData[], entry) => {
    // ディレクトリ以外はreturn
    if (!entry.isDirectory()) return prev

    const id = entry.name

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const metaData = getMetaData(id)
    if (metaData === undefined) return prev

    // データを id と合わせる
    return [
      ...prev,
      {
        id,
        ...metaData,
      },
    ]
  }, [])

  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.created < b.created) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = () => {
  const dirEntry = fs.readdirSync(postsDir, { withFileTypes: true })

  const allPostIds = dirEntry.reduce((prev: string[], entry) => {
    if (!entry.isDirectory) return prev

    return [...prev, entry.name]
  }, [])

  return allPostIds
}

/**
 * 引数で指定されたidの記事内容をHTMLで返却する関数
 */
export const getPostData = async (id: string) => {
  const postFile = getPostFile(id)
  if (postFile === undefined) return

  const fullPath = path.join(postsDir, id, postFile.name)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents)

  // remarkを使ってマークダウンをHTMLに変換する
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // データを id と組み合わせる
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  }
}
