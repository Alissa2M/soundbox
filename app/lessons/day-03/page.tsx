import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import Sticky from "@/components/Sticky";
import styles from "./page.module.css";

export default function Day03Lesson() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← ロードマップに戻る
        </Link>

        <h1 className={styles.title}>
          Day03: JS・TS・React・JSXの整理＋Next.jsの立ち位置
        </h1>

        <p className={styles.paragraph}>
          Day01・Day02では、<code>page.tsx</code>{" "}
          の中でJSXやコンポーネントの書き方を学んできました。今日は
          まず、これまで説明なしに使ってきた「JavaScript」
          「TypeScript」「React」「JSX」「TSX」という言葉を
          いったん整理して比べます。そのあと少しズームアウトして、
          「React」と「Next.js」がそれぞれ何をしているのか、
          このアプリの土台になっている仕組みまで整理します。
        </p>

        <h2 className={styles.heading}>
          JavaScript・TypeScript・React・JSX・TSXの整理
        </h2>
        <p className={styles.paragraph}>
          この5つの言葉は、実は2つのグループに分かれています。
          ここを区別すると、全部がつながって見えてきます。
        </p>
        <ul className={styles.list}>
          <li>
            <strong>JavaScript</strong>と<strong>TypeScript</strong> →
            プログラミング<strong>言語</strong>そのもの
          </li>
          <li>
            <strong>React</strong> →
            その言語（主にJavaScript）で書かれた、画面を組み立てる
            ための<strong>ライブラリ</strong>（次の見出しで詳しく
            説明します）
          </li>
          <li>
            <strong>JSX</strong>と<strong>TSX</strong> →
            Reactのコードを書くための特別な
            <strong>書き方（構文）</strong>。JSXはJavaScript用、
            TSXはTypeScript用です
          </li>
        </ul>
        <p className={styles.paragraph}>
          一言でまとめると、
          <strong>「TSX ＝ TypeScriptでReactを書くときの書き方」</strong>
          です。今あなたが書いている<code>page.tsx</code>{" "}
          は、まさにこの4つ（TypeScript・React・JSX・TSX）が
          全部重なった場所にいます。
        </p>

        <h2 className={styles.heading}>
          JavaScriptとTypeScriptの違い（型があるかどうか）
        </h2>
        <p className={styles.paragraph}>
          Day01で「<code>.tsx</code> は TypeScript ＋ JSX の意味」
          と説明しましたが、TypeScriptがJavaScriptと何が違うのか、
          実際のコードで比べてみます。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`// JavaScript（型なし）
function greet(name) {
  return "Hello, " + name;
}
greet(42); // 数字を渡してもエラーにならない（実行するまで気づかない）`}</code>
        </pre>
        <pre className={styles.codeBlock}>
          <code>{`// TypeScript（型あり）
function greet(name: string): string {
  return "Hello, " + name;
}
greet(42); // 保存した瞬間に赤い波線でエラーが出る（stringじゃないとダメ）`}</code>
        </pre>
        <p className={styles.paragraph}>
          <code>name: string</code>{" "}
          の部分が「型」です。「この値は文字列であるべき」という
          ルールをあらかじめ書いておくことで、間違った種類の値を
          渡してしまったミスに、実行する前（保存した瞬間）に
          気づけるようになります。これがTypeScriptがJavaScriptに
          追加している、いちばん大きな機能です。
        </p>

        <h2 className={styles.heading}>ReactとJSX・TSXの関係</h2>
        <p className={styles.paragraph}>
          同じ考え方を、Reactのコンポーネントに当てはめてみます。
          JSX（JavaScript）で書いた場合と、TSX（TypeScript）で
          書いた場合を比べてみましょう。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`// JSX（.jsxファイル・JavaScriptでReactを書く）
function Hello(props) {
  return <h1>Hello, {props.name}</h1>;
}
<Hello name={42} /> // ← 数字を渡してもエラーにならない`}</code>
        </pre>
        <pre className={styles.codeBlock}>
          <code>{`// TSX（.tsxファイル・TypeScriptでReactを書く）
type Props = { name: string };

function Hello({ name }: Props) {
  return <h1>Hello, {name}</h1>;
}
<Hello name={42} /> // ← 保存した瞬間にエラーが出る（nameはstringのはず）`}</code>
        </pre>
        <p className={styles.paragraph}>
          見た目はほとんど同じですが、TSXの方は<code>Props</code>
          という型を決めているため、間違った値を渡すとすぐに
          気づけます。「JSXに型チェックを追加したものがTSX」と
          考えると分かりやすいです。
        </p>

        <Sticky label="💬 よくある誤解">
          <p>
            <strong>「React.jsという言語がある」</strong> →{" "}
            Reactは言語ではなく<strong>ライブラリ</strong>です。
            使う言語はJavaScriptかTypeScript。
          </p>
          <p>
            <strong>「JSXとTSXは全然別の書き方」</strong> →{" "}
            見た目はほぼ同じです。TSXは「JSXに型チェックが
            付いただけ」。
          </p>
          <p>
            <strong>「TypeScriptを使えばReactは要らない」</strong>{" "}
            → 役割が違うので両方必要です。TypeScriptは
            「言語の安全性」、Reactは「画面の組み立て方」を
            担当しています。
          </p>
        </Sticky>

        <h2 className={styles.heading}>ReactとNext.jsの違い</h2>
        <p className={styles.paragraph}>
          <strong>React</strong>{" "}
          は、「画面の見た目をコンポーネント（関数）として組み立てる」
          ためのライブラリです。JSXを書いたり、<code>useState</code>
          で状態を持ったりする仕組みはReactが提供していますが、
          React単体には「どのURLでどの画面を表示するか」を決める
          ルーティングや、サーバー側でHTMLを組み立てる仕組みは
          含まれていません。
        </p>
        <p className={styles.paragraph}>
          <strong>Next.js</strong>{" "}
          は、そのReactの上に構築された「フレームワーク」です。
          ルーティング・ビルド・画像や文字（フォント）の最適化など、
          「アプリを実際に動かすために必要なもの一式」をまとめて
          提供してくれます。イメージとしては、Reactが「材料と道具」、
          Next.jsが「その道具を使ってすでに骨組みができている家」
          のようなものです。
        </p>

        <h2 className={styles.heading}>App Routerとは</h2>
        <p className={styles.paragraph}>
          Day01で学んだ「<code>app</code>{" "}
          フォルダの中にフォルダを作り、その中に
          <code>page.tsx</code>{" "}
          を置くとURLになる」というルールそのものが、Next.js独自の
          機能で、<strong>App Router</strong>{" "}
          と呼ばれています。少し古いNext.jsのアプリでは
          <code>pages</code>{" "}
          フォルダを使う別の方式（Pages Router）が使われていましたが、
          このアプリは<code>app</code>{" "}
          フォルダを使う新しい方式（App Router）で作られています。
          今後は「App Router」という名前だけ覚えておけば十分です。
        </p>

        <h2 className={styles.heading}>ファイルベースルーティングの整理</h2>
        <p className={styles.paragraph}>
          Day01で「フォルダの中に<code>page.tsx</code>{" "}
          を置くと、そのフォルダ名がURLになる」というルールを学びました。
          App Routerの立場から、このルールをもう少し正確に言うと、
          「特別な名前を持つファイルだけが特別な役割を持つ」という
          ことです。<code>page.tsx</code>{" "}
          という名前のファイルだけがURLとして表示されるページになり、
          同じフォルダの中に置いた<code>page.module.css</code>
          （Day02で学んだCSS Modulesのファイル）のような他のファイルは、
          URLにはなりません。あくまで<code>page.tsx</code>
          から読み込んで使うための、脇役のファイルです。
        </p>

        <h2 className={styles.heading}>Server Componentsについて（少しだけ）</h2>
        <p className={styles.paragraph}>
          App Routerでは、コンポーネントは基本的に
          <strong>サーバー側</strong>{" "}
          で実行されます。これを<strong>Server Component</strong>
          と呼びます。ボタンをクリックしたときに動きを変えたい、
          といった「画面上での対話的な機能」（<code>useState</code>や
          <code>onClick</code>など）が必要になったときだけ、ファイルの
          先頭に<code>&quot;use client&quot;</code>{" "}
          という1行を書いて、「このコンポーネントはブラウザ側でも
          動かしてください」と宣言します。
        </p>
        <p className={styles.paragraph}>
          実は、このレッスンページの下に表示されている
          「完了にする」ボタンのコンポーネント（
          <code>components/CompleteLessonButton.tsx</code>）が、まさに
          その例です。クリックすると見た目が変わる必要があるため、
          ファイルの先頭に<code>&quot;use client&quot;</code>{" "}
          と書かれています。今日は「そういう区別がある」ということだけ
          知っておけば十分です。詳しい使い方はDay13〜14
          （イベント処理・useState）で実際に体験します。
        </p>

        <div className={styles.taskBox}>
          <span className={styles.taskLabel}>本日のお題</span>
          <p className={styles.paragraph}>
            <code>components/CompleteLessonButton.tsx</code> を開いて
            <code>&quot;use client&quot;</code>の記述を確認したうえで、
            今日学んだことを3つ、自分の言葉で<code>&lt;ul&gt;</code>
            にまとめたページを<code>app/practice/day-03/page.tsx</code>{" "}
            として作り、<code>http://localhost:3000/practice/day-03</code>{" "}
            で開けるようにしてみましょう。
          </p>
        </div>

        <h2 className={styles.heading}>確認方法</h2>
        <ol className={styles.list}>
          <li>
            ターミナルで <code>npm run dev</code> を実行してアプリを起動する
          </li>
          <li>
            ブラウザで <code>http://localhost:3000/practice/day-03</code> を開く
          </li>
          <li>今日学んだことのリストが3項目以上表示されていればクリア🎉</li>
        </ol>

        <h2 className={styles.heading}>詰まったら</h2>
        <ul className={styles.list}>
          <li>
            <code>&lt;ul&gt;</code>の中に書けるのは<code>&lt;li&gt;</code>
            タグだけ、というルールを守っているか確認する
          </li>
          <li>
            <code>&lt;li&gt;</code>ごとに開きタグと閉じタグが
            それぞれ1つずつあるか確認する
          </li>
          <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
        </ul>

        <CompleteLessonButton day={3} nextDay={4} />
      </main>
    </div>
  );
}
