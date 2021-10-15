---
created: '2020-10-15'
updated: ''
title: tsconfig.jsonを学ぶ
visual: 'TypeScript'
tags: ['TypeScript']
---

初めて`tsc --init`コマンドで`tsconfig.json`を作る機会があった。  
自分はフロントのソース(React, Next)ばかり書いているため、今までは`create-react-app`, `create-next-app`コマンドが作成したものをデフォルト状態で使用し、**必要が出たら項目の追加・編集をする程度の使い方しかしてこなかった**。  
今回は全て自分で設定する必要があったため各項目について調べてみると学びが多かった。  
忘れないように（忘れても大丈夫なように）記録しておく。

&nbsp;

## tsconfig.json?
**TypeScriptのコンパイル用の設定が書かれているJSONファイル**。  
TypeScriptのプロジェクトを作る時に`tsc --init`を実行すると勝手に作られるやつ。  
その他ReactやNextのプロジェクトを作るコマンドにTypeScriptを適用させるオプションを付けて実行したときにも勝手に作られる。  
ReactとNextでは若干違う内容で作成される。  

```bash
# React+TypeScriptプロジェクト作成用コマンド
npx create-react-app myapp --template typescript
# Next+TypeScriptプロジェクト作成用コマンド
npx create-next-app myapp --ts
```

```json
// tsconfig.json from create-react-app
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

```json
// tsconfig.json from create-next-app
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

&nbsp;

`tsc --init`で作成すると設定可能な項目が全て列挙された状態で作成される。  

```json
// tsconfig.json from tsc --init
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                         /* Enable incremental compilation */
    "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                           /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    // "lib": [],                                   /* Specify library files to be included in the compilation. */
    // "allowJs": true,                             /* Allow javascript files to be compiled. */
    // "checkJs": true,                             /* Report errors in .js files. */
    // "jsx": "preserve",                           /* Specify JSX code generation: 'preserve', 'react-native', 'react', 'react-jsx' or 'react-jsxdev'. */
    // "declaration": true,                         /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                      /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                           /* Generates corresponding '.map' file. */
    // "outFile": "./",                             /* Concatenate and emit output to single file. */
    // "outDir": "./",                              /* Redirect output structure to the directory. */
    // "rootDir": "./",                             /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                           /* Enable project compilation */
    // "tsBuildInfoFile": "./",                     /* Specify file to store incremental compilation information */
    // "removeComments": true,                      /* Do not emit comments to output. */
    // "noEmit": true,                              /* Do not emit outputs. */
    // "importHelpers": true,                       /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,                  /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,                     /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                                 /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                       /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                    /* Enable strict null checks. */
    // "strictFunctionTypes": true,                 /* Enable strict checking of function types. */
    // "strictBindCallApply": true,                 /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,        /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                      /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                        /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                      /* Report errors on unused locals. */
    // "noUnusedParameters": true,                  /* Report errors on unused parameters. */
    // "noImplicitReturns": true,                   /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,          /* Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,            /* Include 'undefined' in index signature results */
    // "noPropertyAccessFromIndexSignature": true,  /* Require undeclared properties from index signatures to use element accesses. */

    /* Module Resolution Options */
    // "moduleResolution": "node",                  /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                             /* Base directory to resolve non-absolute module names. */
    // "paths": {},                                 /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                              /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                             /* List of folders to include type definitions from. */
    // "types": [],                                 /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,        /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,                    /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,                /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                            /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                               /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                     /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                       /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                           /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true        /* Disallow inconsistently-cased references to the same file. */
  }
}
```

もちろんこの項目全てを設定する必要は無いので、自分のプロジェクトに必要な項目だけ拾って設定することになる。  

&nbsp;

## JSONなのにコメント書いてる

設定項目を見ていく前に**そもそもなんでこのJSONはコメントが書いてるんだ**ということが気になった。  
しかも**VSCodeのエラーもでてない**。  
（通常jsonファイルにコメントを書いたりルール外の書き方をすると構文エラーで教えてくれる）  

&nbsp;

調べたところ`tsconfig.json`は<span style="color: red;">JSON with Comments</span>という特殊なフォーマットのようだった。  
これはその名の通り**コメントが書けるJSON**で、`tsconfig.json`をVSCodeで開き右下のファイル種類を見ると確かにそう書かれている。  
![JSONwithComments](https://raw.githubusercontent.com/TakahiroHimi/blog.owlcode.net/main/src/posts/20211015-tsconfig/JSONwithComments.png)

これに関しては以下の記事に詳しく書かれていて勉強になった。  
<https://syumai.hateblo.jp/entry/2020/03/31/024751>

&nbsp;

## 各種項目の内容について

`tsc --init`で作成した場合は各種項目の説明がファイル内に簡単に書かれている。  
公式ドキュメントには更に詳細な説明や、項目によっては設定内容によってどう変わるのかサンプルコードまで載せてくれている。  
<https://www.typescriptlang.org/ja/tsconfig>  

公式ドキュメントでいまいちピンとこない項目については以下の記事が大変参考になった。  
<https://qiita.com/ryokkkke/items/390647a7c26933940470>  
<https://gist.github.com/azu/56a0411d69e2fc333d545bfe57933d07>  

あとはやっぱり自分で色々設定変えながら`tsc`コマンドでコンパイルかけて**出力結果がどう変わるか見るのが一番理解が早かった**。  

&nbsp;

## 悩んだ項目

`target`, `lib`, `downlevelIteration`の設定内容組み合わせの正解が途中でわからなくなった。  

**target**  
コンパイルして出力するjsのバージョンを指定する(`ES5`, `ES2020` など)。  

**lib**  
`target`で指定しているバージョンのJSでは使用できない機能を使いたい時に設定する。  
例えば`target`に`ES3`を指定してるけど`Promise`(ES3には含まれていない)を使いたい場合、`"lib": ["es2015"]`とすることで使用可能になる。  

**downlevelIteration**  
`target`の設定値が`ES5` or `ES3`のとき、この項目を`true`に設定することで一部構文(`for..of`など)が使用可能になる。  

&nbsp;

これらの説明を読むうち、「`target`に`ES5`とか少し前のバージョンを指定した場合でも最近の構文を使えるようにする機能があるなら、**`target`に`ES2020`とか新しいバージョンを指定する必要は無いのでは**。コンパイル後のJSのバージョンが新しくて困ることはあっても古くて困ることは無さそう」と思った。  
ただ**この考えは間違い**で、最近の構文を指定した同じTSのコードについて`target`に`ES5`を指定した場合と`ES2020`を指定した場合では**コンパイル後のコードサイズや実行時間が変わる**(この場合`ES2020`を指定した方がより最適化される)。  
そのため例えば`Node14`なら`ES2020`をサポートしているので、**Node14以上の動作のみ保証できれば良い場合`ES2020`を指定した方が良い**。

&nbsp;

## 感想

TypeScriptの理解がかなり深まったのでもっと早く勉強しておくべきだった。  
ただ大事だけどあまり頻繁に触るファイルでは無いので、次設定する時はまたこの記事でも見て思い出しながら設定することになりそう。  
