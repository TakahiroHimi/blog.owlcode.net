---
created: '2020-10-21'
updated: ''
title: ブログにリンクカードを実装するときに便利なパッケージを作った
visual: 'npm'
tags: ['npm']
---

このブログにリンクカードを実装し、その時に使用した関数をnpmパッケージで公開したことは[先日の記事](https://blog.owlcode.net/posts/20211016-linkcard)で触れたが、この記事ではどんなものを作ったのかという詳細を書く。  
概要としてはリンクカードに必要なOGP関連の情報を指定したURLからフェッチしてくる、というもの。  
便利機能としてmdファイルを渡しただけで必要な情報をフェッチしてきてくれる関数とかも用意している。  

&nbsp;

## ogp-fetcher

作ったパッケージとソースは以下。  
<https://www.npmjs.com/package/ogp-fetcher>  
<https://github.com/TakahiroHimi/ogp-fetcher>  

&nbsp;

## 使用方法

### mdファイルを元にフェッチ

「ブログにリンクカードを埋め込む」という目的で使う場合、`fetchOgpFromMd`を使用するのが一番簡単。  
使用例は以下の通り(READMEから抜粋)。  

```ts
import { fetchOgpFromMd } from "ogp-fetcher";

const md = `
# TestMd

## GitHub
<https://github.com>  

**Facebook**
<https://facebook.com>

### npm
@https://www.npmjs.com/

`;

const fetch = async () => {
  const ogp = await fetchOgpFromMd(md);
  console.log(ogp);
};

fetch();
// console
// [
//   {
//     url: 'https://github.com',
//     'fb:app_id': '1401488693436528',
//     'og:image': 'https://github.githubassets.com/images/modules/site/social-cards/github-social.png',
//     'og:image:alt': 'GitHub is where over 65 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...',
//     'og:site_name': 'GitHub',
//     'og:type': 'object',
//     'og:title': 'GitHub: Where the world builds software',
//     'og:url': 'https://github.com/',
//     'og:description': 'GitHub is where over 65 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...',
//     'og:image:type': 'image/png',
//     'og:image:width': '1200',
//     'og:image:height': '620',
//     icon: 'https://github.githubassets.com/favicons/favicon.svg'
//   },
//   {
//     url: 'https://facebook.com',
//     'og:site_name': 'Facebook',
//     'og:url': 'https://www.facebook.com/',
//     'og:image': 'https://www.facebook.com/images/fb_icon_325x325.png',
//     'og:locale': 'ja_JP',
//     icon: 'https://static.xx.fbcdn.net/rsrc.php/yv/r/B8BxsscfVBr.ico'
//   }
// ]

const fetchCustomReg = async () => {
  const ogp = await fetchOgpFromMd(md, /^@(https:\/\/.*?) *?$/gims);
  console.log(ogp);
};

fetchCustomReg();
// console
// [
//   {
//     url: 'https://www.npmjs.com/',
//     'og:image': 'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png',
//     icon: 'https://static.npmjs.com/da3ab40fb0861d15c83854c29f5f2962.png'
//   }
// ]
```

`fetchOgpFromMd`にmdファイルのテキストを渡すと、デフォルトでは正規表現`/^<(https:\/\/.*?)> *?$/gims`に合致する文字列をリンクとして認識し、それらについてリンクカードを表示するために必要な情報（OGP関連）をフェッチして返してくれる。  
この正規表現は`<>で囲まれてるURLだけが存在する行(ただし末尾の半角スペースは許す)`という意味。  
つまり上記サンプルで`fetchOgpFromMd`渡しているmdテキストのうちgithubとfacebookのみがリンクとして認識される。  
（ちなみにZennだと<>で囲まれてる、という条件が無く単純に`URLだけが存在する行`がカードに変わる。）  

ただし、ブログによって**リンクとして認識させたい記述**は変わるはずなので、第二引数にオプションとして独自の正規表現を渡せるようにした。  
上記サンプルでは`/^@(https:\/\/.*?) *?$/gims`を渡して`@で始まるURLだけが存在する行(ただし末尾の〜)`がリンクとして認識される例を載せている。  


&nbsp;

### URLを元にフェッチ

「もうカード化したいリンクのURLは用意できてるんです」という場合`fetchOgp`を使用してフェッチできる。  
使用例は以下(READMEより)。

```ts
import { fetchOgp } from "ogp-fetcher";

const fetch = async () => {
  const ogp = await fetchOgp(["https://github.com", "https://facebook.com"]);
  console.log(ogp);
};

fetch();
//console
// [
//   {
//     url: 'https://github.com',
//     'fb:app_id': '1401488693436528',
//     'og:image': 'https://github.githubassets.com/images/modules/site/social-cards/github-social.png',
//     'og:image:alt': 'GitHub is where over 65 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...',
//     'og:site_name': 'GitHub',
//     'og:type': 'object',
//     'og:title': 'GitHub: Where the world builds software',
//     'og:url': 'https://github.com/',
//     'og:description': 'GitHub is where over 65 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, review code like a pro, track bugs and feat...',
//     'og:image:type': 'image/png',
//     'og:image:width': '1200',
//     'og:image:height': '620',
//     icon: 'https://github.githubassets.com/favicons/favicon.svg'
//   },
//   {
//     url: 'https://facebook.com',
//     'og:site_name': 'Facebook',
//     'og:url': 'https://www.facebook.com/',
//     'og:image': 'https://www.facebook.com/images/fb_icon_325x325.png',
//     'og:locale': 'ja_JP',
//     icon: 'https://static.xx.fbcdn.net/rsrc.php/yv/r/B8BxsscfVBr.ico'
//   }
// ]
```

最初はこの機能だけ公開しようとしてたが、mdファイル突っ込んだだけでフェッチしてきてくれる方が楽だなと思い前述の`fetchOgpFromMd`も作った。  
この関数の名前は本当は`fetchOgpFromUrls`なのかもしれない。  

ちなみにURL間違いやリンク切れでフェッチが失敗した場合urlだけのオブジェクトが返ってくる。  
例外は関数内で握りつぶして**SSGのビルドがコケないようにした**。  
ただもしかしたらコケる方がリンク切れに気づけるので良いかも、でも将来的に記事が多くなってくるとリンク切れ修正しないと記事の公開・修正できなくてしんどいかな…。  
書きながらオプションでどっちの動きにするか選択できるようにするのが正解っぽい気がしてきた（プルリク待ってます）。  

&nbsp;

### フェッチはしない、パースだけ

「もうリンクカードを作りたいリンク先のHTMLが手元にあるんです」という場合`parseOgp`を使用してHTMLから必要な情報をパースできる。  
使用例は以下！

```ts
import { parseOgp } from "ogp-fetcher";

const html = `
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta property="og:title" content="title" />
    <meta property="og:description" content="description" />
    <meta property="og:locale" content="locale" />
    <meta property="og:type" content="type" />
    <meta property="og:url" content="https://example.com" />
    <meta property="og:image:width" content="200" />
    <meta property="og:image:height" content="100" />
    <meta property="og:image" content="https://example.com/image.png" />
    <link rel="icon" href="/image/favicon.ico">
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
`;

const withRelativeIconPath = parseOgp([{ html: html }]);
console.log(withRelativeIconPath);
// console
// [
//   {
//     'og:title': 'title',
//     'og:description': 'description',
//     'og:locale': 'locale',
//     'og:type': 'type',
//     'og:url': 'https://example.com',
//     'og:image:width': '200',
//     'og:image:height': '100',
//     'og:image': 'https://example.com/image.png',
//     icon: '/image/favicon.ico'
//   }
// ]

const withAbsoluteIconPath = parseOgp([
  { url: "https://example.com", html: html },
]);
console.log(withAbsoluteIconPath);
// console
// [
//   {
//     'og:title': 'title',
//     'og:description': 'description',
//     'og:locale': 'locale',
//     'og:type': 'type',
//     'og:url': 'https://example.com',
//     'og:image:width': '200',
//     'og:image:height': '100',
//     'og:image': 'https://example.com/image.png',
//     icon: 'https://example.com/image/favicon.ico'
//   }
// ]

```

この関数にはhtmlは必ず渡すが**オプションでurlを渡せるようになっている**。  
urlを渡すと何が起こるかというと**faviconのパスが絶対パスに変わる**。  
faviconは相対パスで指定しているページが多いが、リンクカードにfaviconを表示する場合欲しいのは画像の絶対パスなので、基本urlも指定することになると思う。  
（faviconをカードに載せないなら不要）

&nbsp;

## End

先日の記事にも書いたがogp-fetcherは**このブログで実際に使用されているため、バグがあるとこのブログがバグる**。  
そのため少なくともこのブログが存在する限りはしっかりメンテしていく。  
自分の他にも使ってくれる人が居たらかなり嬉しい（Issueやプルリクが来たらもっと嬉しい）。  

リンクカード実装したい方は是非！
