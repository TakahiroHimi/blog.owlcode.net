import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { MetaData } from './types'

export const postsDir = path.join(process.cwd(), process.env.POSTS_DIRECTORY ?? 'src/posts')

type Return<T extends keyof MetaData> = T extends Exclude<keyof MetaData, 'tags'>
  ? string[]
  : string[][]

/**
 * 全ての記事から指定したmetaデータを取得して返却する関数
 * @param meta 取得するmetaデータ
 * @returns 全記事から取得したmetaデータ
 */
export const getMetaDataFromAllPosts = <T extends keyof MetaData>(meta: T): Return<T> => {
  const dirEntry = fs.readdirSync(postsDir, { withFileTypes: true })

  // idのみファイル内に記述が無いため別処理
  if (meta === 'id') {
    const allPostIds = dirEntry.reduce((prev: string[], entry) => {
      if (!entry.isDirectory) return prev

      return [...prev, entry.name]
    }, [])

    return allPostIds as Return<T>
  }

  const metaDatas = dirEntry.reduce((prev: Return<T>, entry) => {
    // ディレクトリ以外はreturn
    if (!entry.isDirectory()) return prev

    const id = entry.name
    const metaData = getMetaData(id)

    if (metaData !== undefined && isMetaDataType(meta)) {
      return [...prev, metaData[meta]] as Return<T>
    }

    return prev
  }, [])

  return metaDatas as Return<T>
}

/**
 * valueがmetaデータのid以外のいずれかであることを保証するための型ガード関数
 * @param value チェック対象の変数
 * @returns 型チェック結果
 */
export const isMetaDataType = (value: keyof MetaData): value is keyof Omit<MetaData, 'id'> => {
  return typeof value === 'string' && value !== 'id'
}

/**
 * 記事ファイルを取得する関数
 * ディレクトリ内にある最初に見つけた.mdファイルを記事ファイルとする
 * @param id 取得する記事のid
 * @returns 記事ファイル
 */
export const getPostFile = (id: string) => {
  const postDirEntry = fs.readdirSync(path.join(postsDir, id), {
    withFileTypes: true,
  })
  return postDirEntry.find((e) => e.name.substr(-3) === '.md')
}

/**
 * 指定したidの記事のmetaデータを返却する関数
 * @param id metaデータを取得する記事のid
 * @returns metaデータ
 */
export const getMetaData = (id: string) => {
  const postFile = getPostFile(id)

  // mdファイルが無い場合return
  if (postFile === undefined) return

  // マークダウンファイルを文字列として読み取る
  const fullPath = path.join(postsDir, id, postFile.name)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 投稿のメタデータ部分を解析するために gray-matter を使う
  const matterResult = matter(fileContents)

  return matterResult.data as Omit<MetaData, 'id'>
}
