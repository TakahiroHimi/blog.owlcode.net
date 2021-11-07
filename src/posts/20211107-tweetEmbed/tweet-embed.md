---
created: '2020-11-07'
updated: ''
title: Tweet埋め込み機能を実装した
visual: ''
tags: ['Note']
---

「いつか実装しよ〜」って思ってた機能だけど、ついにTweetを埋め込む記事を書きたくなったので実装した。  
こんな感じ  

<https://twitter.com/vercel/status/1453035480954462212>

&nbsp;

## 実装

こちらのパッケージを使用することでかなり簡単に実装できた。  
<https://github.com/capaj/react-tweet-embed>

READMEに書いてる通り以下で簡単に埋め込みできる。  

```ts
import TweetEmbed from 'react-tweet-embed'
<TweetEmbed id="692527862369357824" />
```

ただしブラウザでJS実行して埋め込んでる感じの実装で、ページ描画からTweet表示まで時間がかかっていてパフォーマンスが微妙なので、できれば**SSGのビルド時点で埋め込んだ状態にしたい**。  
こちらの記事がその造りで実装していた。  
<https://hyper-text.org/archives/2020/12/static_tweets_to_next_app.shtml>

Tweetが消された場合のケアを考えなくてはいけないが、パフォーマンスはこっちの方が圧倒的に良いはず。  
今後の課題にする。  

## End

SSGのビルド時にTweet埋め込みする処理はライブラリ化できたら面白そう。  
