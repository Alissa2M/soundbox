import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import styles from "./page.module.css";

export default function Day01Lesson() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← ロードマップに戻る
      </Link>

      <h1 className={styles.title}>Day01: page.tsxって何？</h1>

      <p className={styles.paragraph}>
        このアプリ（Next.js）では、「あるフォルダの中に <code>page.tsx</code>{" "}
        というファイルを置くと、そのフォルダの名前が URLになって、
        <code>page.tsx</code>{" "}
        の中身がブラウザの画面に表示される」というルールがあります。
      </p>

      <h2 className={styles.heading}>フォルダとURLの対応</h2>
      <ul className={styles.list}>
        <li>
          <code>app/page.tsx</code> → トップページ（
          <code>http://localhost:3000/</code>）
        </li>
        <li>
          <code>app/practice/day-01/page.tsx</code> → 練習ページ（
          <code>http://localhost:3000/practice/day-01</code>）
        </li>
      </ul>
      <p className={styles.paragraph}>
        つまり、まだ存在しない <code>app/practice/day-01/</code> という
        フォルダと <code>page.tsx</code> というファイルを自分の手で作ると、
        それだけで新しいページが生まれます。
      </p>

      <h2 className={styles.heading}>page.tsx の中身の読み方</h2>
      <p className={styles.paragraph}>
        page.tsx の中身は、だいたいこんな形をしています。1行ずつ、
        省略せずにちゃんと見ていきます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`export default function Day01Page() {
  return (
    <h1>Hello World</h1>
  );
}`}</code>
      </pre>

      <h2 className={styles.heading}>
        関数とコンポーネント（<code>function Day01Page()</code>）
      </h2>
      <p className={styles.paragraph}>
        <code>function</code>{" "}
        はJavaScript/TypeScriptの命令で、「ひとまとまりの処理に
        名前をつける」ためのものです。<code>Day01Page</code> がその名前で、
        後ろの <code>()</code>{" "}
        は「この処理に渡す材料（引数）」を書く場所です。今回は
        材料が何もないので空になっています。
      </p>
      <p className={styles.paragraph}>
        Reactでは、「画面の見た目を返す関数」のことを特に
        <strong>コンポーネント</strong>と呼びます。この関数は、呼び出されると
        「画面にはこれを表示してね」という情報（JSX）を返す、という役割を持っています。
      </p>
      <p className={styles.paragraph}>
        ここで1つ、地味だけど重要なルールがあります。Reactのコンポーネントは
        必ず<strong>大文字</strong>で名前を始める、というルールです（
        <code>Day01Page</code> のように）。もし小文字で <code>day01Page</code>{" "}
        と書いてしまうと、Reactはそれを「コンポーネント」ではなく「普通のHTMLタグ」
        だと勘違いしてしまいます。これはReactが名前の大文字・小文字だけを見て
        「コンポーネントかタグか」を区別しているためです。
      </p>

      <h2 className={styles.heading}>
        <code>export default</code> の意味
      </h2>
      <p className={styles.paragraph}>
        <code>export</code>{" "}
        は「このファイルの外からも使えるようにする」という命令です。
        JavaScriptのファイルは基本的にそれぞれ独立していて、他のファイルの中身を
        勝手には見られません。<code>export</code>{" "}
        を付けることで、初めて「他のファイルから
        呼び出してもいいですよ」という許可を出せます。
      </p>
      <p className={styles.paragraph}>
        <code>default</code>{" "}
        は「このファイルの代表選手はこれです」という意味です。 1つのファイルに{" "}
        <code>export</code> できるものは複数あってもいいですが、
        <code>export default</code> は1ファイルに1つだけ。Next.jsは
        <code>page.tsx</code> を見つけると、その中の
        <code>export default</code>{" "}
        された関数を「このページの中身を作る担当」として
        自動的に見つけ出し、呼び出します。
      </p>
      <p className={styles.paragraph}>
        つまり <code>Day01Page()</code> という関数は、あなた自身が
        呼び出すコードをどこにも書いていません。にもかかわらず画面に表示されるのは、
        Next.jsが裏側で「ファイルの場所」を見て、勝手に呼び出してくれているからです
        （これを<strong>ファイルベースルーティング</strong>
        と呼びます。詳しくは後述）。
      </p>

      <h2 className={styles.heading}>
        <code>return ( ... )</code> とJSXの正体
      </h2>
      <p className={styles.paragraph}>
        <code>return</code>{" "}
        は「この関数の結果として、これを返します」という命令です。
        <code>Day01Page()</code> という関数は、呼び出されると
        <code>{"<h1>Hello World</h1>"}</code>{" "}
        という値を返す、という意味になります。
      </p>
      <p className={styles.paragraph}>
        この <code>{"<h1>Hello World</h1>"}</code> のような書き方を
        <strong>JSX</strong>{" "}
        と呼びます。HTMLにそっくりですが、正体はHTMLではなく
        JavaScriptです。ブラウザは本来このJSXをそのままでは理解できません。
        Next.jsが裏側で、次のような普通のJavaScriptのコードに変換（コンパイル）してから
        実行しています。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`// <h1>Hello World</h1> は、裏側ではこう変換されている
React.createElement("h1", null, "Hello World");`}</code>
      </pre>
      <p className={styles.paragraph}>
        つまり <code>{"<h1>Hello World</h1>"}</code> は、「
        <code>h1</code> というタグを1つ作って、中身は
        <code>&quot;Hello World&quot;</code>{" "}
        という文字列にしてね」という指示を表す
        JavaScriptの値です。見た目はHTML、正体はJavaScript。この二重性がJSXの
        いちばん分かりにくいところですが、今日はこの事実だけ知っておけば十分です。
        （Day07で、この<code>{"{}"}</code>
        を使って変数をJSXに埋め込む方法を扱います。）
      </p>
      <p className={styles.paragraph}>
        <code>&lt;h1&gt;</code> はHTMLタグと呼ばれるもので、ホームページの
        見た目を作る部品です。<code>&lt;h1&gt;</code> は「大きな見出し」
        という意味です。
      </p>

      <h2 className={styles.heading}>
        ファイルの拡張子が <code>.tsx</code> な理由
      </h2>
      <p className={styles.paragraph}>
        <code>.tsx</code> は「TypeScript + JSX」を組み合わせた拡張子です。
        TypeScriptとは、JavaScriptに<strong>型</strong>
        という仕組みを追加した言語です。
        型とは、「この値は文字列（テキスト）」「この値は数字」というように、
        値の種類をあらかじめ決めておくルールのことです。型を決めておくと、
        間違った種類の値を渡してしまったときに、実行する前にエラーとして
        教えてもらえるようになります。
      </p>
      <p className={styles.paragraph}>
        今日のコードにはまだ型を自分で書く場面はありませんが、今後
        コンポーネントに情報を渡す仕組み（Day12の props）を学ぶときに、
        「この情報は文字列であるべき」といった型を指定できるようになります。
        今日は「JSXを書きつつ型のチェックもできるファイルが <code>.tsx</code>
        」と 覚えておけば十分です。
      </p>

      <h2 className={styles.heading}>
        誰がこの関数を呼び出しているのか（ファイルベースルーティング）
      </h2>
      <p className={styles.paragraph}>
        普通のJavaScriptでは、関数は自分で <code>Day01Page()</code> のように
        書いて呼び出さない限り、実行されません。しかしNext.jsのアプリでは、
        <code>app/practice/day-01/page.tsx</code> のように 「特定の場所に{" "}
        <code>page.tsx</code> というファイルを置き、そこに
        <code>export default</code> された関数を用意しておく」だけで、
        誰かがそのURL（<code>/practice/day-01</code>
        ）にアクセスしたタイミングで
        Next.jsが自動的にその関数を呼び出してくれます。
      </p>
      <p className={styles.paragraph}>
        そして、関数が <code>return</code> したJSXを実際のHTMLに変換して、
        ブラウザに送り届けるところまで、Next.jsが裏側でやってくれています。
        あなたが書くのは「フォルダの場所」と「その中の
        <code>export default function</code>」だけ、というのがこの仕組みの
        ポイントです。
      </p>

      <div className={styles.taskBox}>
        <span className={styles.taskLabel}>本日のお題</span>
        <p className={styles.paragraph}>
          「Hello World」をあなたの好きな挨拶に書き換えたページを、
          <code>app/practice/day-01/page.tsx</code> として作り、
          <code>http://localhost:3000/practice/day-01</code>{" "}
          で開けるようにしてみましょう。
        </p>
      </div>

      <h2 className={styles.heading}>確認方法</h2>
      <ol className={styles.list}>
        <li>
          ターミナルで <code>npm run dev</code> を実行してアプリを起動する
        </li>
        <li>
          ブラウザで <code>http://localhost:3000/practice/day-01</code> を開く
        </li>
        <li>書き換えた文字が画面に表示されていればクリア🎉</li>
      </ol>

      <h2 className={styles.heading}>詰まったら</h2>
      <ul className={styles.list}>
        <li>フォルダ名・ファイル名のスペルを確認する（すべて半角）</li>
        <li>
          ファイル名は必ず <code>page.tsx</code>（拡張子まで正確に）
        </li>
        <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
        <li>
          保存すると自動で画面が更新されます。タグの <code>&lt;</code>{" "}
          <code>&gt;</code> を消してしまっていないかも確認しましょう
        </li>
      </ul>

      <CompleteLessonButton day={1} nextDay={2} />
    </>
  );
}
