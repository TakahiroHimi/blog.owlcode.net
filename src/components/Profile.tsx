import { css } from '@emotion/react'
import Image from 'next/image'
import React, { FC } from 'react'
import Card from './Card'
import GitHubLinkIcon from './LinkIcons/GitHubLinkIcon'
import TwitterLinkIcon from './LinkIcons/TwitterLinkIcon'
import ZennLinkIcon from './LinkIcons/ZennLinkIcon'
import profileIcon from './Profile.icon.jpg'

const Profile: FC = () => {
  return (
    <Card>
      <div css={container}>
        <div css={profileInfoContainer}>
          <Image src={profileIcon} alt="プロフィール画像" width={60} height={60} />
          <div>
            <p css={name}>Taka</p>
            <div css={iconsContainer}>
              <TwitterLinkIcon />
              <GitHubLinkIcon />
              <ZennLinkIcon />
            </div>
          </div>
        </div>

        <p css={desc}>
          札幌在住のフロントエンドエンジニア。キャンプが好きです。ReactとNext.jsも好きです。
        </p>
      </div>
    </Card>
  )
}

export default Profile

const container = css`
  width: 100%;
`

const profileInfoContainer = css`
  display: flex;
  gap: 12px;
`

const iconsContainer = css`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`

const name = css`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 8px;
`

const desc = css`
  margin-top: 16px;
  line-height: 1.3;
`
