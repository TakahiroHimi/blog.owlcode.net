---
created: '2020-11-07'
updated: ''
title: 「文字列がObject型のkeyに存在してるか確認したい」件を深掘り
visual: 'TypeScript'
tags: ['TypeScript']
---

ありがたいことに[先日書いた記事](/posts/20211103-object-key)の内容についてTwitterで数件アドバイスをもらったので、この記事にまとめておく。

&nbsp;

## やりたいこと

先日の記事より再掲

> やりたいことはこう
>
> ```ts
> type User = { id: number, name: string }
> const value = 'id'
> ```
>
> 上記のコードで`value`の値が`User`型のkeyのいずれかであるかを判定したい。  
> つまり、上記の場合`id`は`User`型のkeyに存在しているので`true`になるif文を書くようなイメージ。  

&nbsp;

もう少し具体的に書くと以下のような処理を書きたかった。

```ts
const userProperties = ['id', 'name']
type User = { id: number; name: string }

// User型のkeyであることを保証するための型ガード
const isUserKey = (value: unknown): value is keyof User => {
  return typeof value === 'string' && userProperties.includes(value)
}

const func = (user: User, value: string) => {
  console.log(user[value]) // valueはUser型のkeyである保証が無いためerror

  if (isUserKey(value)) {
    console.log(user[value]) // OK!
  }
}

const user: User = { id: 1, name: 'foo' }
func(user, 'id')
```

&nbsp;

## その１

[たぐちさん](https://twitter.com/tagucch)と[Nobuyukiさん](https://twitter.com/JkxKYtL3hJ2Idyw)から  
「keyof使うと良さそう」のリプ  

<https://twitter.com/tagucch/status/1456930357643599877>
<https://twitter.com/JkxKYtL3hJ2Idyw/status/1457230817688649731>

以下Nobuyukiさんからいただいたコードを参考に、少しこちらで手を加えたもの  

```ts
type User = {id: number, name: string}
type UserKey = keyof User
const userObj: User = {id: 0, name: 'name'}

if ((Object.keys(userObj) as UserKey[]).includes('id')) {
  console.log('id ha arimaaasu!!!')
}
```

これでも`User`と`userObj`どちらか一方のみに変更があった場合エラーで検出できる。  
先日のブログではこれをやるためにClass作ったりしてたけど、そんなことしなくても普通に実現できた。  

&nbsp;

## その２

[Junさん](https://twitter.com/JJ_1123_I)からいただいたコード(転載許可いただきました)  

<https://twitter.com/JJ_1123_I/status/1457227037395980288>

```ts
type User = {id:number, name:string};

const arrayOfAll = <T　extends {}>() => <U extends T[]>(
  array: U & ([T] extends [U[number]] ? unknown : 'Invalid')
) => array;
const arrayOfAllUser = arrayOfAll<keyof User>();

const userProperties =  arrayOfAllUser(['id', 'name']); 

const value = 'name'
if (userProperties.includes(value)) {
  console.log('true')
}
```

`User`と`userProperties`どちらか一方のみに変更があった場合ちゃんとエラーになってくれる。  
`arrayOfAll`の定義がクールすぎて理解するのに少し時間がかかってしまった。  
自分がこの問題について悩んでいた当時書こうとしていたコードはこれな気がする(自分では書けなかった)。  
こういうのスラスラ書いたり読んだりできるようになりたいなあと思う。  

全然関係無いけどこのブログのレイアウトは[Junさんのブログ](https://ji23-dev.com/blogs)(とZenn)をかなり参考にしてる。  
確かOGP自動生成について調べてる時にJunさんの記事に辿り着いて、「このブログすご！」ってなって参考にしだした気がする。  
<https://ji23-dev.com/blogs/nextjs-ogp>

&nbsp;

## End

勉強になるリプをもらうと「ブログ作って良かったなぁ」と思える。
