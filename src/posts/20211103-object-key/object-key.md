---
created: '2020-11-03'
updated: ''
title: 文字列がObject型のkeyに存在してるか確認したい
visual: 'TypeScript'
tags: ['TypeScript']
---

やりたいことはこう

```ts
type User = { id: number, name: string }
const value = 'id'
```

上記のコードで`value`の値が`User`型のkeyのいずれかであるかを判定したい。  
つまり、上記の場合`id`は`User`型のkeyに存在しているので`true`になるif文を書くようなイメージ。  

&nbsp;

## 結論

あまり綺麗に書くことはできない。  
そもそもTypeScriptの型はコンパイル時だけの存在で実行時には消えるため、**型と実行時の値を比較することはできない**。  
そのため比較したい場合`User`型のkeyの情報を何らかの**値**として保持する必要がある。  

&nbsp;

### パターン１

一番愚直にやるならこんなイメージ。  

```ts
const userProperties = ['id', 'name']
type User = { id: string; name: string }

const value = 'name'
if (userProperties.includes(value)) {
  console.log('true')
}
```

わかりやすいけど`User`型に`id`と`name`があるよという情報が二重管理されていて冗長な印象を受ける。  
`userProperties`と`User`型には繋がりがないので、今後`User`型に`phone: number`を追加する場合、値と型のどちらかに追加を忘れてもエラーで検出できない可能性がある。  

&nbsp;

### パターン２

こんな書き方だともう少しスマートに見える。  

```ts
const keys = ['id', 'name'] as const
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number]
type User = {
  [k in ArrayElement<typeof keys>]: string
}

const user: User = {id: '1', name: 'hoge'}

const value = 'name'
if (keys.includes(value)) {
  console.log('true') // true
}
```

先ほどのkeyの二重管理は無くなったが、これでは`User`型のプロパティが全て同じ型になってしまうため(上記だと全て`string`)、使える場所が相当限られる。  

&nbsp;
### パターン３

keyを2回記述することは避けられないが、ここまでやると一応keyの追加漏れも**ある程度**エラーで検知できる。  

```ts
type User = { id: number; name: string }
class UserClass implements User {
  id = 0
  name = ""
}

const userProperties = Object.keys(new UserClass())
console.log(userProperties) // (2) ['id', 'name']

const value = 'name'
if (userProperties.includes(value)) {
  console.log('true') // true
}
```

もし`phone: number`の型情報を`User`のみに追加した場合、`UserClass`が`User`を満たさなくなるのでエラーとなる。  
逆に`UserClass`だけに追加した場合、`userProperties.includes('phone')`とした時にエラーとなる。  

ただ一見して何がやりたいのかよくわからないコードになるので、現実的ではないと思う。  

&nbsp;

## End

そもそもこれってできるんだっけ、っていうところから色々深掘りしてしまった。  
