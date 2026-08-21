import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import styles from "./page.module.css";

export default function Day02Lesson() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← ロードマップに戻る
        </Link>

        <h1 className={styles.title}>Day02: JSXでテキストを表示する</h1>

        <p className={styles.paragraph}>
          Day01では、<code>{"<h1>Hello World</h1>"}</code>{" "}
          というJSXを書いて、画面に文字を表示しました。今日はその
          「タグの中に文字を書くと、画面にそのまま表示される」という
          JSXの基本ルールを、もう少し深く見ていきます。
        </p>

        <h2 className={styles.heading}>タグの中に書いた文字は、そのまま表示される</h2>
        <p className={styles.paragraph}>
          JSXでは、タグの<strong>開きタグと閉じタグの間</strong>
          に文字を書くと、その文字がそのまま画面に表示されます。これを
          <strong>テキストノード</strong>と呼びます。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`<p>これはただの文章です。</p>`}</code>
        </pre>
        <p className={styles.paragraph}>
          <code>&lt;p&gt;</code> は「段落（paragraph）」を表すタグです。
          <code>&lt;h1&gt;</code>{" "}
          が「大きな見出し」だったのに対して、<code>&lt;p&gt;</code>{" "}
          は「ふつうの文章」を表すときに使います。中に書いた文字を
          そのまま表示する、という点では<code>&lt;h1&gt;</code>と
          同じです。
        </p>

        <h2 className={styles.heading}>JSXには「ルート要素は1つだけ」というルールがある</h2>
        <p className={styles.paragraph}>
          <code>return ( ... )</code>{" "}
          で返せるJSXは、必ず<strong>1つのタグ</strong>
          でなければいけません。たとえば、次のように2つのタグを
          並べて書くと、エラーになります。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`// ❌ これはエラーになる（隣り合った2つのタグを一度に返せない）
export default function Day02Page() {
  return (
    <h1>こんにちは</h1>
    <p>今日もコーディングを練習します。</p>
  );
}`}</code>
        </pre>
        <p className={styles.paragraph}>
          今日はまだ1つのタグしか使わないので、このルールを意識する
          場面はありませんが、「JSXは根っこ（ルート）が1つの木の
          ような形をしている」ということだけ覚えておいてください。
          複数のタグを組み合わせたいときにどうすればいいかは、
          Day03で扱います。
        </p>

        <h2 className={styles.heading}>特殊な文字を書きたいとき（HTMLエンティティ）</h2>
        <p className={styles.paragraph}>
          JSXの中では、<code>&lt;</code> と <code>&gt;</code>{" "}
          という記号は「タグの開始・終了」として特別な意味を持っています。
          そのため、この記号自体を文字として画面に表示したいときは、
          そのまま書くことができません。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`// ❌ タグの一部だと誤解されてしまう
<p>1 < 2 は正しい</p>

// ✅ 代わりにエンティティという特別な書き方を使う
<p>1 &lt; 2 は正しい</p>`}</code>
        </pre>
        <p className={styles.paragraph}>
          このような「記号の代わりに使う特別な書き方」を
          <strong>HTMLエンティティ</strong>と呼びます。よく使うものを
          いくつか紹介します。
        </p>
        <ul className={styles.list}>
          <li>
            <code>&amp;lt;</code> → <code>&lt;</code>（小なり記号）
          </li>
          <li>
            <code>&amp;gt;</code> → <code>&gt;</code>（大なり記号）
          </li>
          <li>
            <code>&amp;amp;</code> → <code>&amp;</code>（アンパサンド）
          </li>
          <li>
            <code>&amp;quot;</code> → <code>&quot;</code>（ダブルクォート）
          </li>
        </ul>

        <h2 className={styles.heading}>
          改行したいとき（<code>&lt;br /&gt;</code> という自己終了タグ）
        </h2>
        <p className={styles.paragraph}>
          <code>&lt;p&gt;</code>{" "}
          の中で文章を途中で改行したいとき、そのまま文字を
          複数行に分けて書いても、画面上では改行されません
          （半角スペース1つ分に詰められてしまいます）。改行したい
          場所には、<code>&lt;br /&gt;</code> というタグを入れます。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`<p>
  1行目です。
  <br />
  2行目です。
</p>`}</code>
        </pre>
        <p className={styles.paragraph}>
          <code>&lt;br /&gt;</code>{" "}
          は「改行」を表すタグですが、これまで出てきた
          <code>&lt;h1&gt;...&lt;/h1&gt;</code> や
          <code>&lt;p&gt;...&lt;/p&gt;</code>{" "}
          と違って、中に文字を入れる必要がありません。
          このような「開きタグと閉じタグをまとめて1つに書くタグ」を
          <strong>自己終了タグ</strong>と呼び、
          最後に必ず<code>{" /"}</code>を付けます（HTMLでは省略できますが、
          JSXでは省略するとエラーになります）。
        </p>

        <div className={styles.taskBox}>
          <span className={styles.taskLabel}>本日のお題</span>
          <p className={styles.paragraph}>
            自分の自己紹介を、複数行の文章として表示してみましょう。
          </p>
          <ol className={styles.list}>
            <li>
              <code>app/practice</code> フォルダの中に <code>day-02</code>{" "}
              というフォルダを作る
            </li>
            <li>
              その中に <code>page.tsx</code> というファイルを新しく作る
            </li>
            <li>
              次のコードを参考に、<code>&lt;p&gt;</code>タグ1つの中に、
              <code>&lt;br /&gt;</code>で改行しながら3行以上の
              自己紹介を書く（名前・好きなもの・今日の目標など、
              自由に決めてOK）
            </li>
          </ol>
          <pre className={styles.codeBlock}>
            <code>{`export default function Day02Page() {
  return (
    <p>
      名前：太郎
      <br />
      好きなもの：ラーメン
      <br />
      今日の目標：JSXに慣れる
    </p>
  );
}`}</code>
          </pre>
          <p className={styles.paragraph}>
            書けたら、文中のどこかに <code>&lt;</code> や{" "}
            <code>&gt;</code>{" "}
            という記号を（エンティティを使って）1つ入れてみましょう。
            例：
          </p>
          <pre className={styles.codeBlock}>
            <code>{`<br />
今日の学習時間：30分 &lt; 1時間`}</code>
          </pre>
        </div>

        <h2 className={styles.heading}>確認方法</h2>
        <ol className={styles.list}>
          <li>
            ターミナルで <code>npm run dev</code> を実行してアプリを起動する
          </li>
          <li>
            ブラウザで <code>http://localhost:3000/practice/day-02</code> を開く
          </li>
          <li>自己紹介が複数行に分かれて表示されていればクリア🎉</li>
        </ol>

        <h2 className={styles.heading}>詰まったら</h2>
        <ul className={styles.list}>
          <li>
            <code>&lt;br /&gt;</code> の <code>{" /"}</code>{" "}
            を書き忘れていないか確認する（JSXでは必須です）
          </li>
          <li>
            <code>&lt;</code> や <code>&gt;</code>{" "}
            をそのまま文章の中に書いていないか確認する（エンティティを
            使う）
          </li>
          <li>
            <code>&lt;p&gt;</code> と <code>&lt;/p&gt;</code>{" "}
            がそれぞれ1つずつあるか確認する
          </li>
          <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
        </ul>

        <CompleteLessonButton day={2} nextDay={3} />
      </main>
    </div>
  );
}
