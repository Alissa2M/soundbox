import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import styles from "./page.module.css";

export default function Day04Lesson() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← ロードマップに戻る
        </Link>

        <h1 className={styles.title}>Day04: ディレクトリ構成について</h1>

        <p className={styles.paragraph}>
          Day01では「フォルダ＝URL」というルールを、Day03では
          それが<strong>App Router</strong>{" "}
          というNext.js独自の仕組みだということを学びました。今日は
          <code>app</code>{" "}
          フォルダの中だけでなく、このリポジトリ全体のフォルダ構成に
          ズームインして、それぞれの場所が何のためにあるのかを
          整理します。
        </p>

        <h2 className={styles.heading}>トップレベルのフォルダ構成</h2>
        <p className={styles.paragraph}>
          このリポジトリを開くと、いくつかのフォルダが並んでいます。
          それぞれ役割が決まっています。
        </p>
        <ul className={styles.list}>
          <li>
            <code>app/</code> →{" "}
            ページそのもの（ルーティング）を置く場所。App Routerの
            ルールに従い、フォルダとURLが対応する
          </li>
          <li>
            <code>components/</code> →{" "}
            複数のページで使い回す共通のUI部品を置く場所（例：
            <code>CompleteLessonButton</code>）
          </li>
          <li>
            <code>lib/</code> →{" "}
            見た目（UI）そのものではない、補助的な処理を置く場所（例：
            進捗をブラウザに保存する<code>lib/progress.ts</code>）
          </li>
          <li>
            <code>public/</code> →{" "}
            画像などの静的ファイルを置く場所。ここに置いたファイルは、
            そのままURLとして配信される（Day05の画像表示で実際に使います）
          </li>
        </ul>

        <h2 className={styles.heading}>
          <code>app/</code>フォルダの中身
        </h2>
        <p className={styles.paragraph}>
          <code>app/</code> フォルダの中にも、いくつか役割の違う
          ファイル・フォルダがあります。
        </p>
        <ul className={styles.list}>
          <li>
            <code>app/layout.tsx</code> →{" "}
            すべてのページを共通で包む「ルートレイアウト」。
            フォントの設定などをここでまとめて行っている（自分で
            レイアウトを作る方法はDay25で扱います）
          </li>
          <li>
            <code>app/page.tsx</code> →{" "}
            トップページ（<code>http://localhost:3000/</code>
            ）の中身
          </li>
          <li>
            <code>app/globals.css</code> →{" "}
            アプリ全体で共通のスタイル（<code>--background</code>や
            <code>--foreground</code>といった色の変数など）
          </li>
          <li>
            <code>app/lessons/day-XX/</code> →{" "}
            今あなたが読んでいる、この解説ページたち
          </li>
          <li>
            <code>app/practice/day-XX/</code> →{" "}
            これまでの「本日のお題」で、あなた自身が作ってきた
            練習ページたち
          </li>
        </ul>

        <h2 className={styles.heading}>ファイル名に意味がある（予約されたファイル名）</h2>
        <p className={styles.paragraph}>
          App Routerでは、<code>page.tsx</code>や<code>layout.tsx</code>
          のように、決められた名前のファイルだけが特別な役割を
          持ちます。これを<strong>予約されたファイル名</strong>
          と呼びます。他にも<code>loading.tsx</code>や
          <code>error.tsx</code>{" "}
          のような予約名がありますが、これらは今日は名前を知る
          だけで十分です（使い方は後日扱います）。
        </p>
        <p className={styles.paragraph}>
          反対に、<code>page.module.css</code>や
          <code>CompleteLessonButton.tsx</code>{" "}
          のようなファイル名は、Next.jsにとって特別な意味を持ちません。
          好きな名前を付けてよく、<code>page.tsx</code>の中から
          <code>import</code>して初めて使われる、ふつうのファイルです。
        </p>

        <h2 className={styles.heading}>まとめ</h2>
        <ul className={styles.list}>
          <li>
            <code>app/</code> = ページ（URL） / <code>components/</code> =
            共通UI部品 / <code>lib/</code> = 補助ロジック /{" "}
            <code>public/</code> = 静的ファイル
          </li>
          <li>
            予約されたファイル名（<code>page.tsx</code>、
            <code>layout.tsx</code>など）だけが、Next.jsにとって
            特別な意味を持つ
          </li>
        </ul>

        <div className={styles.taskBox}>
          <span className={styles.taskLabel}>本日のお題</span>
          <p className={styles.paragraph}>
            <code>components/</code>と<code>lib/</code>
            フォルダの中を覗いて見つけたファイル名を
            <code>&lt;ul&gt;</code>でリストアップしたページを
            <code>app/practice/day-04/page.tsx</code> として作り、
            <code>http://localhost:3000/practice/day-04</code>{" "}
            で開けるようにしてみましょう。
          </p>
        </div>

        <h2 className={styles.heading}>確認方法</h2>
        <ol className={styles.list}>
          <li>
            ターミナルで <code>npm run dev</code> を実行してアプリを起動する
          </li>
          <li>
            ブラウザで <code>http://localhost:3000/practice/day-04</code> を開く
          </li>
          <li>
            <code>components/</code>と<code>lib/</code>
            の中にあったファイル名が、リストとして表示されていればクリア🎉
          </li>
        </ol>

        <h2 className={styles.heading}>詰まったら</h2>
        <ul className={styles.list}>
          <li>
            <code>components/</code>や<code>lib/</code>
            フォルダが見当たらない場合は、プロジェクトの一番上の階層
            （<code>app/</code>と同じ階層）を確認する
          </li>
          <li>
            <code>&lt;ul&gt;</code>の中に書けるのは<code>&lt;li&gt;</code>
            タグだけ、というルールを守っているか確認する
          </li>
          <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
        </ul>

        <CompleteLessonButton day={4} nextDay={5} />
      </main>
    </div>
  );
}
