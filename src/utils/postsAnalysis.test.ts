import { getMetaDataFromAllPosts, isMetaDataType } from './postsAnalysis'

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
    expect(getMetaDataFromAllPosts('created')).toStrictEqual(['2020-08-10', '2020-08-11'])
  })
})
