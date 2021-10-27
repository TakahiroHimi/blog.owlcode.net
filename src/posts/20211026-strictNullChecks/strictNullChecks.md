---
created: '2020-10-26'
updated: ''
title: tsconfigのstrictNullChecksでハマった話
visual: 'TypeScript'
tags: ['TypeScript']
---

先日とあるパッケージのソースの中で以下のようなコードがあった。  

```ts
type Foo<T> = T extends string ? string : never

const foo: Foo<string> = 'foo'
```

(極限まで簡略化している)

上記のソースは何もおかしくないが、`Foo`を以下のように使用してもエラーにならなかった。

```ts
type Foo<T> = T extends string ? string : never

const foo: Foo<null> = 'foo' // never型に文字列を入れようとしてるので怒られたい
```

## strictNullChecks

このような挙動になる原因は**tsconfig.jsonに`strictNullChecks: true`が設定されていなかったため**。  

<https://www.typescriptlang.org/tsconfig#strictNullChecks>

※前提として`strict: true`が設定されていればこの項目はデフォルトで`true`になるが、今回のソースは`strict: false`で設定されていた。  

このオプションが設定されていない場合、`null`や`undefined`がどんな型にも代入できてしまう。

```ts
const hoge: string = null // OK
```

これによってConditionalTypesの`T extends string`の判定の挙動も変わる。  
具体的には**Tが`null`や`undefined`だった場合も`true`になる**。  

```ts
// strictNullChecks未設定時の挙動
type Foo<T> = T extends string ? string : never // `null extends string` がtrueなので、Foo<null>はstringになる

const foo: Foo<null> = 'foo'　// OK
```

## End

正確にはパッケージのリポジトリの中に動作確認用のソースがあり、その中の設定で`strictNullChecks`が設定されていなかった。  
実際にはもっと複雑な型定義だったため自分が読み間違いしていると思い込んでしまい、`null`を設定しても怒られない原因が`tsconfig.json`にあると気づくまでに結構時間がかかってしまった。  
ソースを読む際の視野が広がったのでヨシ。  
