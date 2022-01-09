---
created: '2021-11-18'
updated: ''
title: enumから特定のkeyを削除した型を作りたい
visual: 'TypeScript'
tags: ['TypeScript']
---

やりたいことはこう

```ts
enum Hoge {
  foo = 'Foo',
  bar = 'Bar',
  baz = 'Baz'
}

type NewHoge = Hoge.bar | Hoge.baz // HogeからHoge.fooを削除したこの型を良い感じに作りたい
```

そもそも`enum`使うなって言うのはそれはそうなんだけど、どうしても逃げられない状況に出くわした。  
`enum`はほぼ扱ったこと無かったので少し悩んだ。  

&nbsp;

## 結論

`enum`にも`Exclude`が効くので以下で解決する。  

```ts
enum Hoge {
  foo = 'Foo',
  bar = 'Bar',
  baz = 'Baz'
}

type NewHoge = Exclude<Hoge, Hoge.foo>
const newHoge: NewHoge = Hoge.foo // Error!
```

`Exclude`って`enum`にも効くの知らなかった。  
ちなみにTypeScriptドキュメント上の`Exclude`の定義はこんな感じ。  
<https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion>
>`Exclude<Type, ExcludedUnion>`  
>ExcludedUnionに割り当て可能なすべてのユニオンメンバーをTypeから除外して型を構築します。  

この定義からすると**enumのメンバーはユニオンメンバーとして扱われる**っぽい。  

ちなみにTypeScriptドキュメント上の`enum`の定義はこんな感じ。
<https://www.typescriptlang.org/docs/handbook/enums.html>

&nbsp;

## End

`Exclude`ってユニオン型にだけ使うものって思ってたけど`enum`にも使えた。  
