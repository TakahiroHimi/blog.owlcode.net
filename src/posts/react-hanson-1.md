---
created: '2020-08-10'
updated: ''
title: Reactハンズオンラーニング
visual: ''
tags: ['react', 'book', 'tset3']
---

## １〜3 章

ほとんどが知ってる内容だったが一応目を通した。
Promise, Async/Await, カリー化の解説は他の技術書や技術記事で複数読んできたが、個人的に今まで読んだものの中で最も理解し易かった。
関数定義における function とアロー関数の違いなども分かりやすい。
おそらく全体的にサンプルソースが良いんだと思う。

## 4 章

ライブラリ
React→ ビューを構築するためのライブラリ
React-dom→React で構築されたビューをブラウザで描画するためのライブラリ

SPA はページの更新を JS で行うため、ブラウザが提供する DOM API（document.createElement、document.appendChild など）を利用する。
React は DOM API の呼び出しを一手に引き受けてくれるライブラリ
開発者が直接 DOM API を呼び出す必要は無く、React に対して「何をしたいのか」が記述された指示書（React 要素）を渡す

React 要素
最終的な DOM 要素がどのようになるかを記述したもの

```ts
const element = React.createElement('h1', { id: 'hoge' }, 'fuga') //React要素を作成("fuga"はprops)
ReactDOM.render(element, document.getElementById('root')) //DOM要素に変換
```

以下のように変換される

```html
<div id="root">
  <h1 id="hoge">fuga</h1>
</div>
```

## 5 章

`React.createElement`を一々書くのは大変 → **JSX**

```tsx
const hogeList = ['foo', 'bar', 'baz']

// createElement
const Hoge = (props: string[]) => {
  return React.createElement(
    'ul',
    null,
    props.map((item, i) => React.createElement('li', { key: i }, item))
  )
}
ReactDOM.render(React.createElement(Hoge, hogeList, null), document.getElementById('root'))

// JSX
const HogeJSX = (props: string[]) => (
  <ul>
    {props.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
)
ReactDOM.render(HogeJSX(hogeList), document.getElementById('root'))
```

JSX はそのままではブラウザで動かないので Babel でコンパイル
Babel は 2014 年の登場当初は 6to5 という名前だった（ES6→ES7 への変換）

react-script
Babel, ESLint, webpack などあらかじめ設定済みのツールが含まれている。

## 6 章

submit 時の preventDefault はやった方が良い？
context とカスタムフックの併用は初めて学んだ
使いやすそう

## 7 章

useReducer について
複雑な State 管理の文脈でしか学んだことがなかったので、以下のような記法は知らなかった

```tsx
const [checked, toggle] = useReducer((checked) => !checked, false)
```

パフォーマンスチューニングは乱用せず、パフォーマンスに問題があるコンポーネントにのみ行うべきであるという文章には共感

## 8 章

faker ライブラリを初めて知る

## 9 章

ErrorBoundary、Suspense について初めてちゃんと学ぶ

## 10 章

propsTypes について、ずっと React.VoidFunctionComponent の定義に入ってるけどこれはどう使うのだろうと思っていたが疑問が解けた
