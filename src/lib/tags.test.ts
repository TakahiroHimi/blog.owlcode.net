import { getTagCount } from './tags'

describe('utils/postsAnalysis/getTagCount', () => {
  test('タグを正しく集計できる', () => {
    expect(getTagCount()).toStrictEqual([
      {
        count: 3,
        tag: 'test1',
      },
      {
        count: 1,
        tag: 'test3',
      },
      {
        count: 1,
        tag: 'test2',
      },
    ])
  })
})
