import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import Sticky from "@/components/Sticky";
import styles from "./page.module.css";

export default function Day04Lesson() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← ロードマップに戻る
      </Link>

      <h1 className={styles.title}>Day04: ディレクトリ構成について</h1>

      <p className={styles.paragraph}>
        Day01では「フォルダ＝URL」というルールを、Day03では それが
        <strong>App Router</strong>{" "}
        というNext.js独自の仕組みだということを学びました。今日は
        <code>app</code>{" "}
        フォルダの中だけでなく、このリポジトリ全体のフォルダ構成に
        ズームインして、それぞれの場所が何のためにあるのかを 整理します。
      </p>

      <h2 className={styles.heading}>トップレベルのフォルダ構成</h2>
      <p className={styles.paragraph}>
        このリポジトリを開くと、いくつかのフォルダが並んでいます。
        それぞれ役割が決まっています。
      </p>
      <ul className={styles.list}>
        <li>
          <code>app/</code> → ページそのもの（ルーティング）を置く場所。App
          Routerの ルールに従い、フォルダとURLが対応する
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
          <code>app/page.tsx</code> → トップページ（
          <code>http://localhost:3000/</code>
          ）の中身
        </li>
        <li>
          <code>app/globals.css</code> → アプリ全体で共通のスタイル（
          <code>--background</code>や<code>--foreground</code>
          といった色の変数など）
        </li>
        <li>
          <code>app/lessons/day-XX/</code> →{" "}
          今あなたが読んでいる、この解説ページたち
        </li>
        <li>
          <code>app/practice/day-XX/</code> →{" "}
          これまでの「本日のお題」で、あなた自身が作ってきた 練習ページたち
        </li>
      </ul>

      <h2 className={styles.heading}>
        ファイル名に意味がある（予約されたファイル名）
      </h2>
      <p className={styles.paragraph}>
        App Routerでは、<code>page.tsx</code>や<code>layout.tsx</code>
        のように、決められた名前のファイルだけが特別な役割を 持ちます。これを
        <strong>予約されたファイル名</strong>
        と呼びます。他にも<code>loading.tsx</code>や<code>error.tsx</code>{" "}
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

      <h2 className={styles.heading}>
        コンポーネントが増えてきたときの整理の仕方
      </h2>
      <p className={styles.paragraph}>
        今の<code>components/</code>{" "}
        はファイルが数個だけなので、フォルダを分けずに並べておくだけで
        十分です。ですが、アプリが育ってきてファイルが数十個に
        なってくると、「どこに何を置くか」というルールが欲しくなります。
        代表的な考え方に、大きく2つの流派があります。
        どちらが正解というものではなく、アプリの性質やチームの好みで
        選ぶものです。
      </p>

      <h2 className={styles.heading}>
        ① Atomic Design（見た目の大きさで分ける）
      </h2>
      <p className={styles.paragraph}>
        <strong>Atomic Design</strong>{" "}
        は、UIパーツを「化学の原子・分子」のように、
        <strong>組み合わさっている大きさ（粒度）</strong>
        で分類する考え方です。小さいものが集まって、
        より大きなものになっていくイメージです。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`components/
  atoms/        ← 最小単位。それ以上分解できないパーツ
    Button.tsx
    Input.tsx
  molecules/    ← atomsを組み合わせた、小さなまとまり
    SearchForm.tsx   (Input + Button)
  organisms/    ← moleculesやatomsを組み合わせた、大きな部品
    Header.tsx       (Logo + SearchForm + Nav)
  templates/    ← organismsを配置した、ページの骨格（データは空）
    ArticleTemplate.tsx`}</code>
      </pre>
      <p className={styles.paragraph}>
        ボタンや入力欄のような<strong>見た目の部品（UI）</strong>
        をどこに置くかがはっきりするため、デザインシステムのように
        「同じパーツを様々なページで再利用する」場合に強みが
        あります。一方で、「ログイン機能」のような
        <strong>機能（業務ロジック）</strong> はUI部品と別の場所（後述の
        <code>lib/</code>や<code>hooks/</code>など）に分かれてしまうため、
        「ある機能に関わるファイル一式」を探すのに複数の
        フォルダを見て回る必要があります。
      </p>
      <p className={styles.paragraph}>
        🏢 <strong>実務では</strong>、<code>atoms/</code>・
        <code>molecules/</code>・<code>pages/</code>
        の3段階だけで運用しています。
        <code>organisms</code>と<code>templates</code>を省略し、
        「moleculesを組み合わせた先はもうページそのもの」
        という形にすることで、段階を増やしすぎて迷子になるのを 防いでいます。
      </p>

      <h2 className={styles.heading}>
        ② Feature構造（機能・ドメインで分ける）
      </h2>
      <p className={styles.paragraph}>
        <strong>Feature構造</strong>（機能別構成）は、見た目の
        大きさではなく、<strong>「何の機能に関するものか」</strong>
        でフォルダを分ける考え方です。1つの機能に関わる
        コンポーネント・状態管理・API呼び出しなどを、
        すべて同じフォルダの下にまとめて置きます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`features/
  auth/               ← 「認証」機能に関するものを1か所に集約
    components/
      LoginForm.tsx
    hooks/
      useAuth.ts
    api/
      login.ts
  cart/               ← 「カート」機能に関するものを1か所に集約
    components/
      CartItem.tsx
    hooks/
      useCart.ts`}</code>
      </pre>
      <p className={styles.paragraph}>
        「カート機能を直したい」というときに、
        <code>features/cart/</code>{" "}
        の中だけを見れば関連ファイルが揃っているため、機能の
        追加・変更・削除がしやすいのが利点です。一方で、
        複数の機能で共通して使うボタンや入力欄のようなUI部品は、
        <code>features/</code> の外に別の共通フォルダ（例：
        <code>components/ui/</code>） を用意して切り出す必要があります。
      </p>
      <p className={styles.paragraph}>
        🏢 <strong>実務では</strong>、現在
        <strong>ENM管理画面</strong>にこのFeature構造を 適用しています。今後は
        <strong>マイページ系</strong>
        の機能にも同じ構造を追加していく予定です。
        このように、アプリ全体を一度に作り直すのではなく、
        画面・機能ごとに範囲を決めて段階的に導入していくのも、
        現実的な進め方の一つです。
      </p>

      <Sticky label="💬 よくある誤解">
        <p>
          <strong>「Atomic Designの方が正しい・モダンなやり方」</strong> →
          優劣ではなく<strong>目的の違い</strong>
          です。UI部品の再利用を重視するならAtomic Design、
          機能ごとの見つけやすさを重視するならFeature構造が
          向いています。実際には2つを組み合わせて、 「共通UI部品はAtomic
          Design風、機能特有のものは
          Feature構造」のように併用するプロジェクトも多いです。
        </p>
        <p>
          <strong>「小さいアプリでも最初からきっちり分けるべき」</strong> →{" "}
          このアプリの<code>components/</code>
          のように、ファイルが少ないうちはフォルダを分けずに
          フラットに置いておく方が、むしろ探しやすいです。
          ファイルが増えて「探しにくい」と感じてから分け始めても
          遅くありません。
        </p>
      </Sticky>

      <h2 className={styles.heading}>まとめ</h2>
      <ul className={styles.list}>
        <li>
          <code>app/</code> = ページ（URL） / <code>components/</code> =
          共通UI部品 / <code>lib/</code> = 補助ロジック / <code>public/</code>{" "}
          = 静的ファイル
        </li>
        <li>
          予約されたファイル名（<code>page.tsx</code>、<code>layout.tsx</code>
          など）だけが、Next.jsにとって 特別な意味を持つ
        </li>
        <li>
          コンポーネントが増えてきたら、
          <strong>Atomic Design</strong>
          （見た目の大きさで分ける）か
          <strong>Feature構造</strong>
          （機能で分ける）のどちらか、あるいは両方の 組み合わせで整理する
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
          フォルダが見当たらない場合は、プロジェクトの一番上の階層 （
          <code>app/</code>と同じ階層）を確認する
        </li>
        <li>
          <code>&lt;ul&gt;</code>の中に書けるのは<code>&lt;li&gt;</code>
          タグだけ、というルールを守っているか確認する
        </li>
        <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
      </ul>

      <CompleteLessonButton day={4} nextDay={5} />
    </>
  );
}
