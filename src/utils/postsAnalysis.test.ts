import { isMetaDataType } from './postsAnalysis'

describe('utils/convertToHttps', () => {
  test('"created"はMetaDataと判定される', () => {
    expect(isMetaDataType('created')).toBe(true)
  })
})
