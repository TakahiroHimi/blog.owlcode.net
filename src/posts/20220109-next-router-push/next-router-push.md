---
created: '2022-01-09'
updated: ''
title: next/routerで遷移先ページへURLパラメータを渡す
visual: 'Nextjs'
tags: ['Next.js', 'React']
---

## やりたいこと

`Next.js`で作成したアプリにおいて、`/foo`から`/foo/bar`へ遷移する時にURLパラメータを渡して遷移先で使用したい。  
つまりURLは`/foo/bar?hoge=fuga`として遷移して、`/foo/bar`では`hoge`に設定された値(`fuga`)を使いたい。  

&nbsp;

## 結論

`Next.js`では`next/router`にルーティング関連の機能を持つHooksである`useRouter`が用意されているので、それを使用する。  
<https://nextjs.org/docs/api-reference/next/router>

```tsx
// /fooから/foo/barへURLパラメータ付きで遷移する
import { useRouter } from 'next/router'

const Foo = () => {
  const router = useRouter()
  
  router.push({
    pathname: '/foo/bar',
    query: { hoge: 'fuga' }
  })
}
```

```tsx
// /foo/barでURLパラメータを取り出す
import { useRouter } from 'next/router'

const Bar = () => {
  const router = useRouter()
  
  console.log(router.query.hoge) // fuga
}
```

&nbsp;

## ハマったとこ

query無しで遷移する場合、単純に`router.push`の第一引数に文字列で遷移先のURLを指定して終わりだが、それと同様のURL指定をしてしまうと**遷移先でパラメータを取り出すことができない**。  
具体的には、`/foo/bar`へ遷移するときに以下のソースのようにしてしまうと、URL的には`/foo/bar?hoge=fuga`へ遷移できるが、遷移先で`router.query.hoge`の値が`undefined`になり`fuga`を取り出せない。  
ただこの場合も`router`を使わずに`new URL(location.href)`を使うおなじみの書き方であれば取れる。

```tsx
// /fooから/foo/barへURLパラメータ付きで遷移する誤った例
import { useRouter } from 'next/router'

const Foo = () => {
  const router = useRouter()
  
  router.push('/foo/bar', { query: { hoge: 'fuga' } }) // 遷移先のURLを第一引数に設定し、pathnameを設定していない
}
```

```tsx
// /foo/barでURLパラメータを取り出す
import { useRouter } from 'next/router'

const Bar = () => {
  // 取り出せない
  const router = useRouter()

  console.log(router.query.hoge) // undefined


  // これは取れる
  const { searchParams } = new URL(location.href)
  const hoge = searchParams.get('hoge')
  
  console.log(hoge) // fuga
}
```

&nbsp;

## End

しょうもない内容だけどまたやりかねないので記事にしておく。
