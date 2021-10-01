import { getMonthCount } from './date'

describe('utils/postsAnalysis/isMetaDataType', () => {
  test('月毎の記事作成数を正しく取得できる', () => {
    expect(getMonthCount()).toStrictEqual([
      { month: '2021-09', count: 1 },
      { month: '2021-08', count: 2 },
    ])
  })
})
