---
created: '2021-10-16'
updated: ''
title: Linkカードを実装した
visual: ''
tags: ['Note']
---
## Linkカードを作った

ブログに他ページへのリンクを貼った時に押すとリンク先へ飛ぶカードが表示されるようにした。  
こんな感じ↓  

<https://zenn.dev/>  

Zennのこの機能がすごい好きだったので自分のブログにも絶対実装したいと思ってた。  
これがあるだけで記事内の画像が増えるので、読んでる側も「字ばっかり！」な印象が薄まるし、書いてる側もお世話になった記事を紹介してる感が強まるので中々重要な機能だと思う。  
ほんとはカードの最下部に表示してるサイト名の横にfaviconを表示したいと思っているが、それはまた後々やる。  

&nbsp;

実装は2日くらいかかった。  
なぜそんなにかかったかというと、URLを渡すとリンクカードに必要な情報をfetchしてくる関数を**npmで公開していたから**。  
作ったライブラリがこちら↓  

<https://www.npmjs.com/package/ogp-fetcher>  

ライブラリを公開するのは初めてで右も左もわからず状態だったので、色々調べているうちに時間が過ぎて行った。  
このへんの動機や手順はまた別の記事にしようと思ってるが、**とにかく良い体験だった**。  
パッケージのソース構成を理解したので**ライブラリのソースを読む速度が格段に上がった**。
(逆に今まではそれっぽいところを適当に探して読んでいた)。  
せっかく作ったのでちょこちょこメンテしていきたい。
