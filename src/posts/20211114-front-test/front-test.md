---
created: '2020-11-14'
updated: ''
title: フロントエンドのテストの種類多すぎ問題を整理
visual: 'react'
tags: ['React']
---

フロントのテストについて調べていると色んなテストの名前が出てくる。  
それぞれの言葉の定義や意味について今まで雰囲気で理解してきた部分があるので一度整理してみる。  

&nbsp;

## よく見るテストの名前(俺調べ)

- ユニットテスト
- インテグレーションテスト
- E2Eテスト
- スナップショットテスト
- ビジュアルリグレッションテスト
- クロスブラウザテスト

&nbsp;

## Testing Trophy

それぞれの言葉の定義について知る前に、`react-testing-library`authorの[Kent C. Doddsのブログ](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests)にある**Testing Trophy**を頭に入れておくと理解しやすい。  

&nbsp;<img src="https://testingjavascript.com/static/trophyWithLabels@2x-4d0c19a94d88ac607cc5cbeaa8f8708d.png" alt='Testing Trophy' width="70%">

>- **End to End**: ユーザーのように振る舞うヘルパーロボットが、アプリをクリックして回り、正しく機能するかどうかを検証すること。「functional testing」や「e2e」と呼ばれることもある。
>- **Integration**: 複数のユニットが調和して動作することを検証すること。
>- **Unit**: 個々の独立した部品が期待通りに動作することを検証すること。
>- **Static**: コードを書いているときに、タイプミスや型崩れを発見する。

**Static**に関しては型システムやリンターを利用して、タイプミスやシンタックスエラーを補足するという意味合いらしく、これについてテストコードを作成したりする類のものではなさそう。  
図の意味としてはほぼ見ての通りで、Webアプリのテストを４層に分けるとこうなるよ、というもの。  
もっと層が多くなるとか少なくなるとかいろんな考え方がありそうだけど、以下この記事では**Testing Trophy**に則って整理を進める。  

&nbsp;

## 分類と手法

**Testing Trophy**を元に考えると、記事冒頭に挙げた「よく見るテストの種類」は大きく2つに分かれる。  

1. **Testing Trophy**における**分類**を意味するもの
    - ユニットテスト
    - インテグレーションテスト
    - E2Eテスト

1. 具体的な**テスト手法**を意味するもの
    - スナップショットテスト
    - ビジュアルリグレッションテスト
    - クロスブラウザテスト

更にフロントエンドの文脈では**関数に対して行うテスト**と**コンポーネントに対して行うテスト**で内容が大きく変わるので両方について考える必要がある。  
以下、それぞれの言葉の定義や意味を整理していく。  

&nbsp;

## ユニットテスト(Unit Test)

**Testing Trophy**より引用
>個々の独立した部品が期待通りに動作することを検証すること。  

テストの実装例を挙げると、関数に対するユニットテストは言うまでもないこういうやつ。  
<https://jestjs.io/ja/docs/getting-started>  

コンポーネントに対するユニットテストはいくつか種類があり、プロダクトによって採用しているものも異なる。  
React公式でもコンポーネントに対するテスト手法は二種類言及している。
<https://ja.reactjs.org/docs/testing-recipes.html>  

一つ目はよく見るやつ。コードを一部抜粋。

```js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

it("renders with or without a name", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("Hey, stranger");
  ...
```

もう一つは後述の`スナップショットテスト`。  

&nbsp;

## インテグレーションテスト(Integration Test)

**Testing Trophy**より引用
>複数のユニットが調和して動作することを検証すること。

関数の文脈だと単純に複数の関数が調和して動作することを検証する。  
テストの実装例はユニットテスト同様。  

コンポーネントの文脈だと少し複雑になる。  
React公式では以下のように言及されている。
<https://ja.reactjs.org/docs/testing.html>

>コンポーネントのテストでは、**ユニットテストとインテグレーションテストの区別は曖昧です**。フォームをテストする時、そのテストはフォーム内のボタンもテストすべきでしょうか。それともボタンコンポーネント自体が自身のテストを持つべきでしょうか。ボタンのリファクタリングはフォームのテストを壊さないべきでしょうか。  
>チームやプロダクトに応じて、答えは違ってきます。

ただしKent C. Doddsのブログでは明確に区別しており、サンプルコードも載せている。  
<https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests>
サンプルコードはルートの`<App>`から扱っているので明らかにインテグレーションテストって感じだけど、説明にも書かれてる通り実際はアプリ全体をレンダリングしたりはしないので、そうなってくるとReact公式の通り定義がどんどん曖昧になってくると思う。  

この辺はプロジェクト内で共通認識ができていれば良いと思うので、変に言葉の定義にこだわらない方が良さそう。  

&nbsp;

## E2Eテスト(End to End Test)

**Testing Trophy**より引用
> ユーザーのように振る舞うヘルパーロボットが、アプリをクリックして回り、正しく機能するかどうかを検証すること。「functional testing」や「e2e」と呼ばれることもある。  

**Testing Trophy**の定義上は一見コンポーネントに対するテストっぽいが、クリックした結果実行される関数の検証も行うことになるため、関数に対するテストでもあると認識している。  
ツールを用いることが多くcypressが有名。
<https://www.cypress.io/>

&nbsp;

## スナップショットテスト(Snapshot Test)

**手法の一つであり、コンポーネントに対してのみ行うテスト**。  
React公式による簡単な説明。
<https://ja.reactjs.org/docs/testing-recipes.html>
>Jest のようなフレームワークでは、toMatchSnapshot / toMatchInlineSnapshot を使ってデータの「スナップショット」を保存することができます。これを使うことで、レンダーされたコンポーネントの出力を「セーブ」しておき、変更がスナップショットへの変更として明示的にコミットされるよう保証できます。

分類としてはユニットテストもしくはインテグレーションテストになる。

&nbsp;

## ビジュアルリグレッションテスト(Visual Regression Test)

**手法の一つであり、コンポーネントに対してのみ行うテスト**。  
`Storybook`のGIFがわかりやすい。  
<https://storybook.js.org/docs/react/workflows/visual-testing>

言葉の定義は`BrowserStack`のページがわかりやすい。  
<https://www.browserstack.com/guide/visual-regression-testing>
>コードを変更しても、ソフトウェアの視覚的なインターフェースが壊れないかどうかをチェックします。  
>ビジュアルリグレッションテストでは、コードの変更前と変更後のスクリーンショットを比較することで、コードの変更が実行された後にユーザーに何が見えるかをチェックします。このため、ビジュアルリグレッションテストは、ビジュアルスナップショットテストとも呼ばれます。

分類としてはユニットテストもしくはインテグレーションテストになる。

&nbsp;

## クロスブラウザテスト(Browser Test)

**手法の一つであり、関数に対してもコンポーネントに対しても行うテスト**。  
ざっくり言うとブラウザ・OSの組み合わせを変えたとしてもちゃんと動きますか？の検証をする。  

`BrowserStack`のページがわかりやすい。  
<https://www.browserstack.com/cross-browser-testing>
>クロスブラウザテストとは、非機能テストの一種であり、Webサイトにアクセスした際に、意図した通りに動作するかどうかを確認するものです。  
>例えば、Firefox、Chrome、Edge、Safariなどの一般的なブラウザと、Windows、macOS、iOS、Androidなどの一般的なOSの組み合わせ。  
>さまざまなデバイス：スマートフォン、タブレット、デスクトップ、ラップトップなどの一般的なデバイスで、ユーザーがウェブサイトを表示し、操作することができます。  

ツールは色々あるがcypressでも機能として備わっている。
<https://docs.cypress.io/guides/guides/cross-browser-testing#Continuous-Integration-Strategies>

自分が業務で使用しているDatadogの[ブラウザテスト](https://docs.datadoghq.com/ja/synthetics/browser_tests/?tab=%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3)は録画したブラウザ操作が複数のブラウザで正常に動作するか検証できる。  

分類としてはE2Eテストになる。

&nbsp;

## End

総じて関数のテストに比べてコンポーネントのテストは難しい。  
そういう意味ではフロントエンドは高度なテストスキルが求められると言えるのかもしれない。