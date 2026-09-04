import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import Sticky from "@/components/Sticky";
import styles from "./page.module.css";

export default function Day05Lesson() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← ロードマップに戻る
      </Link>

      <h1 className={styles.title}>Day05: 画像を表示する</h1>

      <p className={styles.paragraph}>
        Day04で、<code>public/</code>{" "}
        フォルダに置いたファイルはそのままURLとして配信される、と学びました。
        今日はそこに置いた画像を、実際にページの中に表示してみます。
        普通のHTMLなら
        <code>&lt;img&gt;</code>タグを使うところですが、Next.jsには専用の
        <code>&lt;Image&gt;</code>
        コンポーネントが用意されていて、これを使うのが基本になります。
      </p>

      <h2 className={styles.heading}>
        なぜ<code>&lt;img&gt;</code>ではなく<code>&lt;Image&gt;</code>？
      </h2>
      <p className={styles.paragraph}>
        <code>next/image</code>の<code>&lt;Image&gt;</code>は、素のHTMLの
        <code>&lt;img&gt;</code>を拡張したコンポーネントです。裏側で、
        端末に合わせたサイズ・形式（WebPなど）への自動変換や、
        画面外にある画像の読み込みを遅らせる処理などを行ってくれます。
        結果として、自分で最適化コードを書かなくても、表示が速く・
        ガタつかないページになりやすい、という利点があります。
      </p>

      <h2 className={styles.heading}>基本の使い方</h2>
      <p className={styles.paragraph}>
        <code>next/image</code>から<code>Image</code>をimportし、
        <code>src</code>・<code>alt</code>・<code>width</code>・
        <code>height</code>を指定します。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`import Image from "next/image";

export default function Page() {
  return (
    <Image
      src="/next.svg"
      alt="Next.jsのロゴ"
      width={180}
      height={38}
    />
  );
}`}</code>
      </pre>
      <p className={styles.paragraph}>
        ここで使っている<code>/next.svg</code>は、<code>public/next.svg</code>
        を指しています。<code>public/</code>
        が基準の場所（ルート）になるので、パスの先頭に
        <code>public</code>は書かない点に注意してください。
      </p>

      <h2 className={styles.heading}>
        <code>alt</code>・<code>width</code>・<code>height</code>
        は省略できない
      </h2>
      <p className={styles.paragraph}>
        <code>&lt;Image&gt;</code>では、<code>alt</code>・<code>width</code>・
        <code>height</code>は基本的に必須です。それぞれ理由があります。
      </p>
      <ul className={styles.list}>
        <li>
          <code>alt</code> →{" "}
          画像が読み込めなかったときの代替テキストであり、スクリーンリーダー
          （画面を読み上げるソフト）が画像の内容を伝えるためにも使われます。
          装飾目的で意味のない画像なら、<code>alt=&quot;&quot;</code>{" "}
          のように空文字にします
        </li>
        <li>
          <code>width</code>・<code>height</code> →{" "}
          実際の表示サイズではなく、画像の「縦横比」をブラウザに
          事前に伝えるための値です。これにより、画像の読み込み中にも
          スペースがあらかじめ確保され、後から他の要素がガクッと
          ズレる「レイアウトシフト」を防げます
        </li>
      </ul>
      <p className={styles.paragraph}>
        表示サイズそのものを変えたいときは、<code>width</code>や
        <code>height</code>ではなく、<code>className</code>や
        <code>style</code>でCSSを当てて調整します。
      </p>

      <h2 className={styles.heading}>
        画面幅いっぱいに広げる（<code>fill</code>）
      </h2>
      <p className={styles.paragraph}>
        ページの一番上に表示する「ファーストビュー」の画像のように、
        画面の幅に合わせて可変に広げたい・元の画像サイズが決まっていない、
        という場合は、<code>width</code>・<code>height</code>の代わりに
        <code>fill</code>propsを使います。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`import Image from "next/image";

export default function Page() {
  return (
    <div style={{ position: "relative", width: "100%", height: "60vh" }}>
      <Image
        src="/hero.jpg"
        alt="サービスのトップ画像"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        preload
      />
    </div>
  );
}`}</code>
      </pre>
      <p className={styles.paragraph}>
        <code>fill</code>を使うときのポイントは3つです。
      </p>
      <ul className={styles.list}>
        <li>
          親要素（囲んでいる<code>&lt;div&gt;</code>）に
          <code>position: &quot;relative&quot;</code>
          と、幅・高さを指定する。<code>fill</code>
          は「親要素いっぱいに広がる」という意味なので、親の側に
          大きさが決まっていないと画像も表示されません
        </li>
        <li>
          画像を親の形にきれいに収めるため、<code>style</code>で
          <code>objectFit: &quot;cover&quot;</code>を指定する（
          はみ出す部分は切り取られ、縦横比は保たれます）
        </li>
        <li>
          <code>sizes</code>
          を指定する。これを忘れると、Next.jsは「小さめの画像で十分」
          と判断してしまい、画面幅いっぱいに引き伸ばしたときに
          画像がぼやけて表示されてしまいます。
          <code>sizes=&quot;100vw&quot;</code>{" "}
          と書くことで、「この画像は常に画面幅いっぱいに表示される」
          とNext.jsに伝わり、十分な解像度の画像が選ばれるようになります
        </li>
      </ul>
      <p className={styles.paragraph}>
        さらに、ファーストビューの画像はページを開いてまず目に入る、 いわゆる
        <strong>LCP</strong>
        （最初に表示される一番大きな要素）になりやすいものです。
        先ほど紹介した<code>preload</code>
        を付けておくと、その画像の読み込みが後回しにされず、
        より早く表示されるようになります。
      </p>

      <h2 className={styles.heading}>画像をimportして使う方法</h2>
      <p className={styles.paragraph}>
        <code>public/</code>
        のパスを文字列で指定する方法とは別に、画像ファイル自体を
        <code>import</code>する方法もあります。この場合、
        <code>width</code>と<code>height</code>
        はファイルの情報から自動で設定されるため、省略できます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`import Image from "next/image";
import logo from "@/public/next.svg";

export default function Page() {
  return <Image src={logo} alt="Next.jsのロゴ" />;
}`}</code>
      </pre>

      <h2 className={styles.heading}>外部URLの画像を使う場合</h2>
      <p className={styles.paragraph}>
        <code>src</code>には外部サイトのURLを渡すこともできます。ただし
        Next.jsはビルド時にその画像へアクセスできないため、
        <code>width</code>・<code>height</code>
        は自分で指定する必要があります。さらに、どこのドメインの
        画像なら最適化してよいかを<code>next.config.ts</code>の
        <code>images.remotePatterns</code>
        にあらかじめ登録しておく必要があります。許可していないドメインの
        画像はエラーになります（悪意のある画像を勝手に最適化させない
        ための安全対策です）。今日は<code>public/</code>
        の中の画像だけを使うので、この設定は不要です。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        pathname: "/assets/**",
      },
    ],
  },
};`}</code>
      </pre>
      <p className={styles.paragraph}>
        🏢 <strong>実務では</strong>、<strong>microCMS</strong>
        （ブログ記事などをNext.jsの外で
        管理できるヘッドレスCMS）と連携するときにこの方法を使っています。
        記事本文中の画像はmicroCMS側のサーバー（
        <code>images.microcms-assets.io</code>）に置かれていて
        <code>public/</code>には入れられないため、
        <code>remotePatterns</code>
        でそのドメインを許可し、CMSから受け取ったURLをそのまま
        <code>src</code>に渡す、という形になります。
      </p>

      <Sticky label="⚠️ 学習教材によっては情報が古いことも">
        <p>
          以前のNext.jsでは、画像を優先的に読み込ませたいときに
          <code>priority</code>というpropsを使う、という説明をよく
          見かけます。しかしこのプロジェクトが使っているバージョンの
          Next.jsでは、<code>priority</code>は非推奨（
          <strong>deprecated</strong>
          ）になっていて、代わりに<code>preload</code>
          を使うことになっています（挙動をより分かりやすい名前に
          変えるための変更です）。AIに聞いたり、ネット上の記事や
          チュートリアルを参考にしたりするときは、それが今使っている
          バージョンに合った情報かどうか、
          <code>node_modules/next/dist/docs/</code>
          の中身と照らし合わせて確認するくせをつけましょう。
        </p>
        <p>
          🏢 <strong>実務では</strong>、この教材はあえて最新のNext.js16を
          使っていますが、実際の現場のプロジェクトはNext.js14のままの
          ことも多いです。Next.js14では<code>priority</code>
          が今でも正しい書き方で、<code>preload</code>
          は存在しません。つまり「新しい書き方が常に正解」ではなく、
          <strong>そのプロジェクトが実際に使っているバージョン</strong>
          に合わせることが重要です。現場に入ったら、まず
          <code>package.json</code>の<code>next</code>のバージョンを
          確認するくせをつけましょう。
        </p>
      </Sticky>

      <h2 className={styles.heading}>まとめ</h2>
      <ul className={styles.list}>
        <li>
          画像は<code>&lt;img&gt;</code>ではなく、<code>next/image</code>の
          <code>&lt;Image&gt;</code>で表示するのが基本
        </li>
        <li>
          <code>public/</code>
          の画像は、パスの先頭に何もつけず「/ファイル名」で指定する
        </li>
        <li>
          <code>alt</code>・<code>width</code>・<code>height</code>
          は基本的に必須（importした画像は
          <code>width</code>・<code>height</code>を省略できる）
        </li>
        <li>
          表示サイズを変えたいときは<code>width</code>/<code>height</code>
          ではなくCSSで調整する
        </li>
        <li>
          サイズが決まっていない・画面幅いっぱいに広げたい画像には
          <code>fill</code>を使う。その際は親要素に
          <code>position: &quot;relative&quot;</code>と大きさを指定し、
          <code>sizes</code>
          も忘れずに指定する（忘れるとぼやける原因になる）
        </li>
      </ul>

      <div className={styles.taskBox}>
        <span className={styles.taskLabel}>本日のお題</span>
        <p className={styles.paragraph}>
          横長の写真を1枚用意して 、ページの一番上に「ファーストビュー」として
          <strong>画面幅いっぱいに</strong>
          表示するページを<code>app/practice/day-05/page.tsx</code>{" "}
          として作り、<code>http://localhost:3000/practice/day-05</code>{" "}
          で開けるようにしてみましょう。
          <strong>
            <code>fill</code>
            を使わずに
          </strong>
          実装し、
          <strong>ぼやけないこと</strong>を確認してください。
        </p>
      </div>

      <h2 className={styles.heading}>確認方法</h2>
      <ol className={styles.list}>
        <li>
          ターミナルで <code>npm run dev</code> を実行してアプリを起動する
        </li>
        <li>
          ブラウザで <code>http://localhost:3000/practice/day-05</code> を開く
        </li>
        <li>画像が画面の横幅いっぱいに表示されているか確認する</li>
        <li>
          ブラウザの表示を拡大（Cmd+/Ctrl+ +）したり、ウィンドウ幅を
          広げたりしても、画像がぼやけずにきれいに表示されていれば クリア🎉
        </li>
      </ol>

      <h2 className={styles.heading}>詰まったら</h2>
      <ul className={styles.list}>
        <li>
          <code>import Image from &quot;next/image&quot;;</code>{" "}
          を書き忘れていないか確認する（
          <code>next/image</code>と<code>next/link</code>
          は間違えやすいので注意）
        </li>
        <li>
          <code>src</code>のパスが<code>/hero.jpg</code>のように
          <code>/</code>から始まっているか確認する（
          <code>public/hero.jpg</code>のように書くと見つからない）
        </li>
        <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
      </ul>

      <CompleteLessonButton day={5} nextDay={6} />
    </>
  );
}
