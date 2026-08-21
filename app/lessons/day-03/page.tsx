import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import styles from "./page.module.css";

export default function Day03Lesson() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← ロードマップに戻る
        </Link>

        <h1 className={styles.title}>Day03: Next.js特有の概要</h1>

        <p className={styles.paragraph}>
          Day01・Day02では、<code>page.tsx</code>{" "}
          の中でJSXやコンポーネントの書き方を学んできました。ここまでの
          話は、実は<strong>React</strong>そのものの話がほとんどです。
          今日は少しズームアウトして、「React」と「Next.js」が
          それぞれ何をしているのか、このアプリの土台になっている
          仕組みを整理します。
        </p>

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
