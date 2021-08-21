import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'
import { MetaData } from 'utils/types'

const postsDir = path.join(process.cwd(), 'src/posts')

/**
 * 記事ファイルを取得する関数
 * ディレクトリ内にある最初に見つけた.mdファイルを記事ファイルとする
 */
const getPostFile = (id: string) => {
  const postDirEntry = fs.readdirSync(path.join(postsDir, id), {
    withFileTypes: true,
  })
  return postDirEntry.find((e) => e.name.substr(-3) === '.md')
}

export function getSortedPostsData() {
  // /posts 配下のディレクトリ、ファイル名を取得する
  const dirEntry = fs.readdirSync(postsDir, { withFileTypes: true })

  const allPostsData = dirEntry.reduce((prev: MetaData[], entry) => {
    // ディレクトリ以外はreturn
    if (!entry.isDirectory()) return prev

    const id = entry.name
    const postFile = getPostFile(id)

    // mdファイルが無い場合return
    if (postFile === undefined) return prev

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDir, entry.name, postFile.name)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return [
      ...prev,
      {
        id,
        ...(matterResult.data as Omit<MetaData, 'id'>),
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

export function getAllPostIds() {
  const dirEntry = fs.readdirSync(postsDir, { withFileTypes: true })

  const allPostIds = dirEntry.reduce((prev: string[], entry) => {
    if (!entry.isDirectory) return prev

    return [...prev, entry.name]
  }, [])

  return allPostIds
}

export async function getPostData(id: string) {
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
