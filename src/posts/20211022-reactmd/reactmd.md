---
created: '2020-10-24'
updated: ''
title: mdで書いた記事をブログに表示したい、けどCSSはサボりたい
visual: 'react'
tags: ['React']
---

このブログを作る時「**mdで書いた記事を綺麗にスタイル整ったページとして表示するのめんどいな〜HTMLにパースした後記事中全部のタグにスタイルあてるとか無理〜〜**」と思って**楽してできるやり方を頑張って探した**。  
結論として以下二つの神パッケージを使うことでかなり楽できた。  

**react-markdown**
<https://github.com/remarkjs/react-markdown>  

**github-markdown-css**
<https://github.com/sindresorhus/github-markdown-css>  

&nbsp;

## 要件  

1. mdで書いた記事をHTMLにパースする。`# Title`　→　`<h1>Title</h1>`みたいなイメージ。
1. パースした後のHTMLには当然スタイルをあてるが**全部のタグに対してCSSなんて書きたくない**。
1. ブラウザごとに見え方変わるのは嫌なので**reset.cssは絶対に入れたい**。
1. ページのスタイリングはサボりたいけど**シンタックスハイライトのスタイルにはこだわりたい**。

&nbsp;

## react-markdown

md形式のテキストをHTMLに変換してくれるパッケージ。  
似たようなものとして`remark`があり、Next.jsのチュートリアル（実際にNext.jsでブログを作るやつ）では`remark`が採用されている。  

<https://github.com/remarkjs/remark>  

このブログはNext.jsのチュートリアルで作成したブログを魔改造して作ったものなので当初`remark`を使用していたが、`react-markdown`の方が**シンタックスハイライトをあてるのが楽そう**だったため乗り換えた。  
「スタイルあてるの無理〜〜」とか言っておきながらシンタックスハイライトにはこだわりたい。  
HTMLに変換するだけなら正直どっちでも良い気がする。強いて言えば`react-markdown`なら`dangerouslySetInnerHTML`を書かなくて良いので精神衛生上良いかもしれない。  

使い方はかなり簡単

```tsx
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import 'reset-css'

const Hello: VFC = () => {
  const md = `
# Title

## SubTitle

hoge**hoge**

- foo
- bar
- baz

\`\`\`ts
const hoge = () => console.log('hoge')
hoge()
\`\`\`
`

  return <ReactMarkdown>{md}</ReactMarkdown>
}

export default Hello

```

上記の場合以下のHTMLに変換される。  

```html
<h1>Title</h1>
<h2>SubTitle</h2>
<p>hoge<strong>hoge</strong></p>
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
<pre>
  <code class="language-ts">
    const hoge = () =&gt; console.log(&#x27;hoge&#x27;)
    hoge()
  </code>
</pre>
```

しれっと`reset.css`もimportしてるので、この時点では以下のような状態。

![no-style](https://raw.githubusercontent.com/TakahiroHimi/blog.owlcode.net/main/src/posts/20211022-reactmd/no-style.png)  

とりあえずここまでで要件の1と3は満たした。

&nbsp;

## github-markdown-css

<span style="font-size: 1.2rem">**神パッケージ**</span>  
パッケージというか、ただのCSS。  
これをimportしてクラス名`markdown-body`をつけるだけで、**GitHubでIssueやプルリクのコメントをmdで書いてプレビューした時と同じスタイルがあたる**。  
つまり**これだけでCSSを一切書かかなくても勝手にスタイルが整う**。  

先程のコードに実際に入れてみる。

```ts
import 'github-markdown-css'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import 'reset-css'

const Hello: VFC = () => {
  const md = `
# Title

## SubTitle

hoge**hoge**

- foo
- bar
- baz

\`\`\`ts
const hoge = () => console.log('hoge')
hoge()
\`\`\`
`

  return (
    <div className="markdown-body">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  )
}

export default Hello
```

この時点で以下のような状態になる。

![styled](https://raw.githubusercontent.com/TakahiroHimi/blog.owlcode.net/main/src/posts/20211022-reactmd/styled.png)

これで**CSSは書きたく無いがスタイルは整えたい**という要件2を満たした。  
ただし`reset.css`の影響で`list-style`など一部プロパティが表示されないため、必要に応じて自分でスタイルを書く必要はある。  
このブログでは（現時点では）スタイリングライブラリに`emotion`を使用しているため、`_app.tsx`でGlobalなスタイルを定義をする際に`markdown-body`へのスタイルのカスタマイズを書いている。  
（前述のlist-styleの追加やline-heightの調整など）

<https://github.com/TakahiroHimi/blog.owlcode.net/blob/main/src/pages/_app.tsx>

このパッケージはそもそもただのCSSなので、中身を書き換えてプロジェクトのソースの一部として管理してしまっても良いかもしれない。  
ライセンス云々は調べてないのでやる方は自己責任で。  

&nbsp;

## シンタックスハイライトを実装する

現時点ではコードが非常に見づらいのでシンタックスハイライトを実装する。  
これについては**実装方法がreact-markdownのリポジトリのREADMEに記載されている**。  
記載されているものをそのまま実装すると自分の環境ではESLintのエラー等で怒られたので、諸々修正すると以下のようなコードになった。  

```ts
import 'github-markdown-css'
import React, { VFC } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import 'reset-css'

const Hello: VFC = () => {
  const md = `
# Title

## SubTitle

hoge**hoge**

- foo
- bar
- baz

\`\`\`ts
const hoge = () => console.log('hoge')
hoge()
\`\`\`
`

  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  )
}

export default Hello
```

(実際には`component`propsに渡す内容は[別ファイルに分けている](https://github.com/TakahiroHimi/blog.owlcode.net/blob/main/src/components/md/CodeBlock.tsx))  

表示するとこう

![syntax-highlight](https://raw.githubusercontent.com/TakahiroHimi/blog.owlcode.net/main/src/posts/20211022-reactmd/syntax-highlight.png)

`SyntaxHighlighter`コンポーネントの`style`propsの内容を変えることでシンタックスハイライトの色を変更することができる。  
色のサンプルは[こちら](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/)から確認可能だが、設定可能な全ての色が掲載されているわけでは無い模様。  
かなり種類が多いので好みのものを選ぶ。  
`component`propsに渡す内容をゴリゴリカスタマイズすることで**コードブロック左上にファイル名やパスを表示**したり、**コード差分を表示**することもできるっぽい。  

<https://goodlife.tech/posts/react-markdown-code-highlight.html>

これがあると一気に読みやすくなるのでそのうちやりたいな〜と思っている。  
ということで要件4もクリアできた。  

&nbsp;

## End

自分の中では相当楽できたと思ってるけど、ブログ自作した人たちってこの辺どうしてるのか知りたい。  
シンタックスハイライトは無理だとしても、その他の記事部分は「自作ブログなんだから当然スタイルも全部自分であてるでしょ！」的な考えで全部あててるのかな。  
「**スタイルあてるのとことんサボりたい〜〜**」って人にはこの記事で紹介した実装がオススメです。  
もしくはもっと楽できる方法があれば知りたい。  
