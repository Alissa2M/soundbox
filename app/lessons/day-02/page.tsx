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

        <h1 className={styles.title}>
          Day02: JSXでテキストを表示する＋スタイルを付ける
        </h1>

        <p className={styles.paragraph}>
          Day01では、<code>{"<h1>Hello World</h1>"}</code>{" "}
          というJSXを書いて、画面に文字を表示しました。今日はその
          「タグの中に文字を書くと、画面にそのまま表示される」という
          JSXの基本ルールをもう少し深く見たあと、複数のタグをまとめる
          方法と、見た目にスタイルを付ける方法まで進みます。
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

        <h2 className={styles.heading}>
          JSXには「ルート要素は1つだけ」というルールがある（
          <code>&lt;div&gt;</code>でまとめる）
        </h2>
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
          「JSXは根っこ（ルート）が1つの木のような形をしている」
          というのがこのルールの正体です。複数のタグを組み合わせたい
          ときは、それらをまとめて包む<strong>1つのタグ</strong>を
          外側に用意してあげれば解決します。そのために使われる、最も
          よく使われるタグが <code>&lt;div&gt;</code> です。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`// ✅ 1つの<div>でまとめれば、複数のタグを一度に返せる
export default function Day02Page() {
  return (
    <div>
      <h1>こんにちは</h1>
      <p>今日もコーディングを練習します。</p>
    </div>
  );
}`}</code>
        </pre>
        <p className={styles.paragraph}>
          <code>&lt;div&gt;</code> は「division（区分け）」の意味で、
          <code>&lt;h1&gt;</code>や<code>&lt;p&gt;</code>と違って、
          それ自体には見た目上の意味が何もありません。ただの
          「箱」です。この「意味を持たない箱」という性質のおかげで、
          複数のタグをひとまとめにしたいときのラッパー（包むための
          タグ）として、いちばんよく使われます。
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

        <h2 className={styles.heading}>
          見た目にスタイルを付ける（CSS Modules）
        </h2>
        <p className={styles.paragraph}>
          タグには、<code>className</code>{" "}
          という特別な属性を付けることができます。ここに好きな名前を
          指定すると、その名前に対応するCSSのルールがタグに適用され、
          色や太さなどの見た目を変えられます。
        </p>
        <p className={styles.paragraph}>
          このアプリでは、CSSを<strong>CSS Modules</strong>
          という仕組みで書いています。実は、今あなたが読んでいる
          このレッスンページ自体も、同じフォルダにある
          <code>page.module.css</code> というファイルを使って
          スタイル付けされています。ファイルの先頭にある
          <code>{`import styles from "./page.module.css";`}</code>{" "}
          という行が、その読み込みです。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`/* page.module.css に書いたクラス */
.highlight {
  color: royalblue;
  font-weight: 600;
}`}</code>
        </pre>
        <pre className={styles.codeBlock}>
          <code>{`// page.tsx 側で使うとき
import styles from "./page.module.css";

<p className={styles.highlight}>ここが青色になります</p>`}</code>
        </pre>
        <p className={styles.paragraph}>
          ポイントは、<code>styles.highlight</code>{" "}
          のように、CSSに書いたクラス名（<code>.highlight</code>）を
          JavaScriptの値として読み出して使う、という点です。CSS
          Modulesはファイルごとにクラス名を自動でユニークな名前に
          変換してくれるので、別のページで同じ<code>.highlight</code>
          という名前を使っても、お互いに影響しません（クラス名の
          衝突が起きない）。
        </p>

        <div className={styles.taskBox}>
          <span className={styles.taskLabel}>本日のお題</span>
          <p className={styles.paragraph}>
            見出しと複数行の自己紹介を1つの<code>&lt;div&gt;</code>
            にまとめ、名前の部分だけCSS Modulesで色を付けたページを、
            <code>app/practice/day-02/page.tsx</code>（と
            <code>page.module.css</code>）として作り、
            <code>http://localhost:3000/practice/day-02</code>{" "}
            で開けるようにしてみましょう。文中のどこかに、エンティティを
            使って <code>&lt;</code> か <code>&gt;</code> も1つ入れてみてください。
          </p>
        </div>

        <h2 className={styles.heading}>確認方法</h2>
        <ol className={styles.list}>
          <li>
            ターミナルで <code>npm run dev</code> を実行してアプリを起動する
          </li>
          <li>
            ブラウザで <code>http://localhost:3000/practice/day-02</code> を開く
          </li>
          <li>
            見出しと複数行の自己紹介が1つの<code>&lt;div&gt;</code>
            の中に表示され、名前の部分だけ色が変わっていればクリア🎉
          </li>
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
          <li>
            <code>page.tsx</code> と同じフォルダに{" "}
            <code>page.module.css</code> というファイル名で作ったか確認する
            （拡張子・スペルまで正確に）
          </li>
          <li>
            <code>{`import styles from "./page.module.css";`}</code>{" "}
            を書き忘れていないか確認する
          </li>
          <li>
            <code>className={"{styles.name}"}</code>{" "}
            のように、波かっこ<code>{"{}"}</code>
            とドット記法で書けているか確認する（クラス名を文字列として
            <code>{`className="name"`}</code>{" "}
            のように書いてしまうと、CSS Modulesでは反映されません）
          </li>
          <li>
            CSSファイルの中のクラス名と、<code>styles.</code>
            の後ろに書いた名前のスペルが一致しているか確認する
          </li>
          <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
        </ul>

        <CompleteLessonButton day={2} nextDay={3} />
      </main>
    </div>
  );
}
