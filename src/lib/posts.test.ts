import {
  getAllPostIds,
  getMetaData,
  getMetaDataFromAllPosts,
  getPostData,
  getPostFile,
  getSortedPostsData,
  isMetaDataType,
} from './posts'

describe('utils/postsAnalysis/isMetaDataType', () => {
  test('"created"はMetaDataと判定される', () => {
    expect(isMetaDataType('created')).toBe(true)
  })
  test('"tags"はMetaDataと判定される', () => {
    expect(isMetaDataType('tags')).toBe(true)
  })
  test('"title"はMetaDataと判定される', () => {
    expect(isMetaDataType('title')).toBe(true)
  })
  test('"updated"はMetaDataと判定される', () => {
    expect(isMetaDataType('updated')).toBe(true)
  })
  test('"visual"はMetaDataと判定される', () => {
    expect(isMetaDataType('visual')).toBe(true)
  })
  test('"id"はMetaDataと判定されない', () => {
    expect(isMetaDataType('id')).toBe(false)
  })
})

describe('utils/postsAnalysis/getMetaDataFromAllPosts', () => {
  test('"created"を正しく取得できる', () => {
    expect(getMetaDataFromAllPosts('created')).toStrictEqual([
      '2021-08-10',
      '2021-08-11',
      '2021-09-01',
    ])
  })

  test('"tag"を正しく取得できる', () => {
    expect(getMetaDataFromAllPosts('tags')).toStrictEqual([
      ['test1', 'test2', 'test3'],
      ['test1'],
      ['test1'],
    ])
  })
})

describe('utils/postsAnalysis/getPostFile', () => {
  test('記事を正しく取得できる', () => {
    const file = getPostFile('20210810-testPost1')

    expect(file?.name).toBe('testPost1.md')
  })
})

describe('utils/postsAnalysis/getMetaData', () => {
  test('metaデータを正しく取得できる', () => {
    expect(getMetaData('20210810-testPost1')).toStrictEqual({
      created: '2021-08-10',
      tags: ['test1', 'test2', 'test3'],
      title: 'テスト用記事１',
      updated: '2021-08-11',
      visual: '',
    })
  })
})

describe('utils/postsAnalysis/getSortedPostsData', () => {
  test('metaデータを正しく取得できる', () => {
    expect(getSortedPostsData()).toStrictEqual([
      {
        created: '2021-09-01',
        id: '20210901-testPost3',
        tags: ['test1'],
        title: 'テスト用記事3',
        updated: '',
        visual: '',
      },
      {
        created: '2021-08-11',
        id: '20210811-testPost2',
        tags: ['test1'],
        title: 'テスト用記事２🦉',
        updated: '',
        visual: '',
      },
      {
        created: '2021-08-10',
        id: '20210810-testPost1',
        tags: ['test1', 'test2', 'test3'],
        title: 'テスト用記事１',
        updated: '2021-08-11',
        visual: '',
      },
    ])
  })
})

describe('utils/postsAnalysis/getAllPostIds', () => {
  test('記事idを正しく取得できる', () => {
    expect(getAllPostIds()).toStrictEqual([
      '20210810-testPost1',
      '20210811-testPost2',
      '20210901-testPost3',
    ])
  })
})

describe('utils/postsAnalysis/getPostData', () => {
  test('記事情報を正しく取得できる', () => {
    expect(getPostData('20210810-testPost1')).resolves.toStrictEqual({
      created: '2021-08-10',
      id: '20210810-testPost1',
      mdBody: `

# サンプル記事 h1

サンプル

## サンプル記事 h2

サンプル

### サンプル記事 h3

サンプル

#### サンプル記事 h4

サンプル

##### サンプル記事 h5

サンプル
`,
      tags: ['test1', 'test2', 'test3'],
      title: 'テスト用記事１',
      updated: '2021-08-11',
      visual: '',
    })
  })
})
