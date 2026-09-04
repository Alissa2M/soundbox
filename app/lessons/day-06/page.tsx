import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import Sticky from "@/components/Sticky";
import styles from "./page.module.css";

export default function Day06Lesson() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← ロードマップに戻る
      </Link>

      <h1 className={styles.title}>
        Day06: レスポンシブ対応（コンテンツ幅とブレイクポイント）
      </h1>

      <p className={styles.paragraph}>
        リスト表示はDay02〜Day05の中ですでに何度も出てきているので、
        今日のテーマは「レスポンシブ対応」に変更します。
        スマホでもPCでもきれいに見えるページを作るための、
        <strong>コンテンツ幅</strong>と<strong>メディアクエリ</strong>
        の基本を学びます。
      </p>

      <h2 className={styles.heading}>「コンテンツ幅」とは何か</h2>
      <p className={styles.paragraph}>
        ブラウザのウィンドウをフルスクリーンにして大きなモニターで
        見てみると分かりますが、多くのWebサイトは画面の端から端まで
        文字や画像を敷き詰めてはいません。
        横幅の広い画面では、文章の1行が長くなりすぎて逆に読みにくくなるため、
        コンテンツの幅に上限（<code>max-width</code>）を設けて中央に
        寄せる、という作り方が一般的です。この上限の幅のことを
        「コンテンツ幅」と呼びます。
      </p>

      <div className={styles.diagramRow}>
        <div className={styles.diagramCard}>
          <svg
            viewBox="0 0 400 90"
            className={styles.diagramSvg}
            role="img"
            aria-label="コンテンツ幅を決めていない例。文字が画面の端から端まで広がっている"
          >
            <rect
              x="1"
              y="1"
              width="398"
              height="88"
              rx="6"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="20"
              x2="399"
              y2="20"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="10.5"
              r="3"
              fill="currentColor"
              fillOpacity="0.35"
            />
            <circle
              cx="24"
              cy="10.5"
              r="3"
              fill="currentColor"
              fillOpacity="0.35"
            />
            <circle
              cx="36"
              cy="10.5"
              r="3"
              fill="currentColor"
              fillOpacity="0.35"
            />
            {[34, 48, 62, 76].map((y, i) => (
              <rect
                key={y}
                x="14"
                y={y}
                width={i === 3 ? 260 : 372}
                height="7"
                rx="3.5"
                fill="currentColor"
                fillOpacity="0.6"
              />
            ))}
          </svg>
          <p className={styles.diagramCaption}>
            ❌ <code>max-width</code>なし
            <br />
            画面いっぱいに文字が広がり、1行が長くて読みにくい
          </p>
        </div>

        <div className={styles.diagramCard}>
          <svg
            viewBox="0 0 400 90"
            className={styles.diagramSvg}
            role="img"
            aria-label="max-widthを指定した例。文字が中央の一定幅に収まり、左右に余白がある"
          >
            <rect
              x="1"
              y="1"
              width="398"
              height="88"
              rx="6"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="20"
              x2="399"
              y2="20"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="10.5"
              r="3"
              fill="currentColor"
              fillOpacity="0.35"
            />
            <circle
              cx="24"
              cy="10.5"
              r="3"
              fill="currentColor"
              fillOpacity="0.35"
            />
            <circle
              cx="36"
              cy="10.5"
              r="3"
              fill="currentColor"
              fillOpacity="0.35"
            />
            {/* コンテンツ幅を表す破線の枠（中央寄せ） */}
            <rect
              x="90"
              y="28"
              width="220"
              height="55"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {[38, 52, 66].map((y, i) => (
              <rect
                key={y}
                x="100"
                y={y}
                width={i === 2 ? 130 : 200}
                height="7"
                rx="3.5"
                fill="currentColor"
                fillOpacity="0.6"
              />
            ))}
            {/* 左右のmargin: autoを示す矢印 */}
            <line
              x1="14"
              y1="55"
              x2="86"
              y2="55"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <line
              x1="314"
              y1="55"
              x2="386"
              y2="55"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          </svg>
          <p className={styles.diagramCaption}>
            ⭕ <code>max-width</code> + <code>margin: 0 auto</code>
            <br />
            コンテンツ幅を制限して中央寄せ。左右の矢印が余白部分
          </p>
        </div>
      </div>

      <p className={styles.paragraph}>
        実はこのロードマップのトップページ（
        <code>app/page.module.css</code>）でも、
        <code>.main</code>に<code>max-width: 48rem</code>
        が設定されていて、すでにこの考え方が使われています。
      </p>

      <h2 className={styles.heading}>一般的なコンテンツ幅の目安</h2>
      <p className={styles.paragraph}>
        「正解の値」が決まっているわけではありませんが、
        現場やフレームワークでよく見かける値には傾向があります。
      </p>
      <ul className={styles.list}>
        <li>
          <strong>960px 〜 1024px</strong> →{" "}
          記事・ブログ・LP（ランディングページ）などでよく使われる、
          比較的コンパクトな幅
        </li>
        <li>
          <strong>1140px 〜 1200px</strong> → Bootstrapのコンテナ（
          <code>.container</code>）が
          大画面で使う幅。管理画面やコーポレートサイトなどでよく見る
        </li>
        <li>
          <strong>1280px 〜 1440px</strong> →{" "}
          ダッシュボードや情報量の多いサービスサイトなど、
          やや広めに使いたい場合
        </li>
      </ul>
      <p className={styles.paragraph}>
        🏢 <strong>実務では</strong>、コンテンツ幅を
        <code>1024px</code>にしています。さらに、幅がそれより
        狭い画面では単純に画面いっぱいに広げるのではなく、
        <code>padding: 0 16px;</code>
        を左右（両端）に付けています。これにより、画面が小さくなっても
        文字が画面の端にピッタリくっつかず、常に一定の余白が
        保たれるようになっています。
      </p>
      <p className={styles.paragraph}>
        ここで1つ注意点があります。<code>max-width</code>と<code>padding</code>
        を同じ要素に書いてしまうと、
        <code>padding</code>の分だけ本来の1024pxより
        コンテンツが狭くなってしまいます。これを避けるため、
        実務では役割の異なる2つの要素に分けています。
      </p>
      <ul className={styles.list}>
        <li>
          外側の<strong>container</strong> → 画面幅いっぱいに広がる要素。
          <code>padding</code>
          と（必要なら）背景色を担当する
        </li>
        <li>
          内側の<strong>content</strong> → <code>max-width</code>と
          <code>margin: 0 auto</code>
          を担当する。コンテンツ本体はこの中に入れる
        </li>
      </ul>
      <pre className={styles.codeBlock}>
        <code>{`/* 外側：画面いっぱいに広がる。左右の最低限の余白と背景色を担当 */
.container {
  padding: 0 16px;
  background-color: #f5f5f5;
}

/* 内側：コンテンツ本体の幅を1024pxに制限し、中央に寄せる */
.content {
  max-width: 1024px;
  margin: 0 auto;
}`}</code>
      </pre>
      <pre className={styles.codeBlock}>
        <code>{`<div className={styles.container}>
  <div className={styles.content}>
    {/* 実際の中身はここに入れる */}
  </div>
</div>`}</code>
      </pre>
      <p className={styles.paragraph}>
        こう分けておくと、<code>container</code>
        は画面幅いっぱいに広がるので、背景色をつければ画面の端から端まで
        色が敷き詰められます（ヘッダーやセクションの背景色でよく使う
        テクニックです）。一方<code>content</code>は<code>padding</code>
        の影響を受けないので、画面が十分広ければ
        正確に1024px幅になります。画面が1024pxより狭くなったときは、
        <code>content</code>自体の幅が縮んでいき、
        <code>container</code>側の<code>padding</code>が
        そのまま左右の余白として効き続けます。
      </p>

      <h2 className={styles.heading}>メディアクエリの基本</h2>
      <p className={styles.paragraph}>
        画面の幅によってCSSを切り替える仕組みが
        <strong>メディアクエリ</strong>（<code>@media</code>）です。
        書き方には大きく2つの方向があります。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`/* ① モバイルファースト：狭い画面用のCSSを基本にして、
   広い画面になったら上書きする（min-widthを使う） */
.box {
  font-size: 14px; /* スマホ向けの基本サイズ */
}

@media (min-width: 768px) {
  .box {
    font-size: 16px; /* 768px以上（タブレット・PC）ではここが効く */
  }
}

/* ② デスクトップファースト：広い画面用のCSSを基本にして、
   狭い画面になったら上書きする（max-widthを使う） */
.box {
  font-size: 16px; /* PC向けの基本サイズ */
}

@media (max-width: 767px) {
  .box {
    font-size: 14px; /* 767px以下（タブレット・スマホ）ではここが効く */
  }
}`}</code>
      </pre>
      <p className={styles.paragraph}>
        実は<code>app/page.module.css</code>の<code>.roadmapList</code>にも
        <code>@media (min-width: 640px)</code>
        が使われていて、640px未満は1列・640px以上は2列に
        なるようになっています。近年は
        <strong>①のモバイルファースト</strong>
        （まずスマホの見た目を作り、画面が広くなるにつれて
        レイアウトを足していく）の方が主流です。
      </p>

      <h2 className={styles.heading}>ブレイクポイントとは</h2>
      <p className={styles.paragraph}>
        メディアクエリで「切り替えの境目」に使う画面幅の値を
        <strong>ブレイクポイント</strong>と呼びます。
        これも「正解」は決まっていませんが、
        フレームワークごとにだいたいの目安があります。
      </p>
      <div className={styles.codeBlock} style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>目安</th>
              <th>Tailwind CSS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>スマホ〜</td>
              <td>（初期値・指定なし）</td>
            </tr>
            <tr>
              <td>小さめタブレット</td>
              <td>
                <code>sm</code>: 640px
              </td>
            </tr>
            <tr>
              <td>タブレット</td>
              <td>
                <code>md</code>: 768px
              </td>
            </tr>
            <tr>
              <td>小さめPC</td>
              <td>
                <code>lg</code>: 1024px
              </td>
            </tr>
            <tr>
              <td>PC</td>
              <td>
                <code>xl</code>: 1280px
              </td>
            </tr>
            <tr>
              <td>大画面</td>
              <td>
                <code>2xl</code>: 1536px
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={styles.paragraph}>
        🏢 <strong>実務では</strong>、ブレイクポイントを
        <code>768px</code>と<code>430px</code>
        の2つだけに絞っています。
      </p>
      <ul className={styles.list}>
        <li>
          <code>768px</code> →{" "}
          「PC・タブレット横向き」と「スマホ・タブレット縦向き」の
          境目。多くのフレームワークでも<code>md</code>
          として採用されている、定番の値
        </li>
        <li>
          <code>430px</code> → 「スマホの中でも大きめの機種」を基準にした値。
          iPhoneシリーズの大きい画面（Pro Maxなど）の横幅が
          およそ430pxで、これより広ければタブレット~PC、
          狭ければスマホ、という区切りとして使っている
        </li>
      </ul>
      <p className={styles.paragraph}>
        ブレイクポイントの数は多ければ良いというものではありません。
        種類が増えるほど確認・調整するパターンも増えて大変になるため、
        「PC」「タブレット」「スマホ」
        くらいのシンプルな分け方にしておくチームも多いです。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`.container {
  /* paddingは画面幅が変わっても16pxのまま固定 */
  padding: 0 16px;
}

.content {
  /* max-widthと中央寄せも、ブレイクポイントが変わっても
     この2行のまま変えなくてよい */
  max-width: 1024px;
  margin: 0 auto;
}

.heading {
  font-size: 2rem;
}

/* タブレット・スマホ向け：文字サイズだけ調整する */
@media (max-width: 768px) {
  .heading {
    font-size: 1.5rem;
  }
}

/* 小さめのスマホ向け：文字サイズだけ調整する */
@media (max-width: 430px) {
  .heading {
    font-size: 1.25rem;
  }
}`}</code>
      </pre>
      <p className={styles.paragraph}>
        このように、<code>padding</code>自体は変えず、 その中にある文字サイズ（
        <code>font-size</code>）や
        レイアウトの方が、ブレイクポイントごとに調整の対象になる
        ことが多いです。
      </p>

      <h2 className={styles.heading}>
        実際にデザインを作るときの幅（デザイナー向け）
      </h2>
      <p className={styles.paragraph}>
        コーディングする側の話が続きましたが、そもそもデザイナーが
        Figmaなどでデザインカンプ（完成見本）を作る段階で、
        どの幅のアートボードを用意すればよいかも決めておく必要が
        あります。ここでは、実装のブレイクポイント（
        <code>768px</code>・<code>430px</code>）に
        そろえるのではなく、次の2サイズだけを用意してもらうのが おすすめです。
      </p>
      <ul className={styles.list}>
        <li>
          <strong>PC：1024px（または1440pxなど、それより広い幅）</strong> →{" "}
          コンテンツ自体は<code>max-width: 1024px</code>
          で頭打ちになるので、実質1024px幅で作れば足ります。
          ヘッダーの背景色など、コンテンツの外側まで色や画像を
          敷き詰めたい部分がある場合は、1440pxなど少し広めの
          アートボードを使い、その中央に1024px幅のコンテンツを
          置く形で作ると、実装後の見え方に近くなります
        </li>
        <li>
          <strong>スマホ：360px（スマホの最小幅）</strong> →{" "}
          Android端末を含めた「実際に使われている中で一番狭い」
          幅の目安。ブレイクポイントである430pxではなく、
          あえてそれより狭い360pxで用意してもらいます
        </li>
      </ul>
      <p className={styles.paragraph}>
        ポイントは、<strong>スマホは一番せまい幅を基準にする</strong>
        ということです。レスポンシブデザインが崩れるのは、
        たいてい「画面が狭くなって要素がはみ出す・重なる」という
        方向で起きます。逆に、狭い画面用に作ったデザインを
        広げていく分には、余白が少し増えるくらいで大きく崩れることは
        あまりありません。ですので、ブレイクポイントの値 （<code>430px</code>
        ）ぴったりでデザインするよりも、 さらに一段階狭い
        <strong>最悪のケース（360px）</strong>
        で崩れないことを確認しておいた方が安全、という考え方です。
      </p>
      <p className={styles.paragraph}>
        <code>360px</code>〜<code>1024px</code>
        の間、そして実装側の<code>@media</code>で使っている
        <code>768px</code>・<code>430px</code>
        という具体的な値については、個別のデザインを用意しない代わりに、
        コーディング側が「文字が折り返す」「余白が少し縮む」
        といった自然な変化で吸収します。そのため、
        デザインを作る際は、要素の幅を固定ピクセルで
        ガチガチに決めるのではなく、
        <strong>360pxまで縮んでも崩れない余白・文字量</strong>
        を意識しておくと、実装側で無理な調整をせずに済みます。
      </p>

      <Sticky label="⚠️ 「px」以外の単位で書かれることも">
        <p>
          メディアクエリのブレイクポイントは、教材や現場によって
          <code>px</code>ではなく<code>em</code>で書かれていることも
          あります（例：<code>@media (min-width: 48em)</code>）。
          ブラウザの文字サイズ設定に応じて境目が変わるという利点が
          ありますが、考え方自体は今日学んだ内容と同じです。まずは
          <code>px</code>で「画面幅で切り替わる」という感覚を 掴むのが優先です。
        </p>
      </Sticky>

      <h2 className={styles.heading}>まとめ</h2>
      <ul className={styles.list}>
        <li>
          大画面で文字や画像が広がりすぎないよう、
          <code>max-width</code>でコンテンツ幅の上限を決め、
          <code>margin: 0 auto</code>で中央に寄せるのが基本
        </li>
        <li>
          <code>max-width</code>と<code>padding</code>
          を同じ要素に書くと、paddingの分だけコンテンツが狭くなって しまう。
          <code>padding</code>と背景色を担当する外側の
          <strong>container</strong>と、<code>max-width</code>・
          <code>margin: 0 auto</code>を担当する内側の
          <strong>content</strong>に要素を分けるとよい
        </li>
        <li>
          画面幅でCSSを切り替えるのが<code>@media</code>
          （メディアクエリ）。近年は狭い画面を基準にする
          <strong>モバイルファースト（min-width）</strong>
          が主流
        </li>
        <li>
          切り替えの境目の値が<strong>ブレイクポイント</strong>。
          フレームワークごとに目安はあるが、実務では
          <code>768px</code>・<code>430px</code>
          のようにプロジェクトに合わせて決めてよい
        </li>
        <li>
          デザインはPC（<code>1024px</code>）とスマホの最小幅（
          <code>360px</code>）の2つがあれば十分。狭い画面用の
          デザインを広げる方が、広い画面用のデザインを縮めるより
          崩れにくいため、あえて一番せまい幅を基準にする
        </li>
      </ul>

      <div className={styles.taskBox}>
        <span className={styles.taskLabel}>本日のお題</span>
        <p className={styles.paragraph}>
          今日は新しく仮のページを作るのではなく、
          <strong>このリポジトリ自体をレスポンシブ対応</strong>
          させてみましょう。
        </p>
        <ol className={styles.list}>
          <li>
            画面全体に両端に<code>16px</code>の余白を追加する
          </li>
          <li>
            コンテンツ幅を すべて<code>1024px</code>に統一する
          </li>
          <li>ブレイクポイントを768pxに統一する</li>
          <li>
            デベロッパーツールなどでブラウザの幅を
            <code>360px</code>程度からとても広い幅まで少しずつ 変えながら、
            <strong>すべてのページ</strong>
            で、文字や画像がはみ出す・重なるといった崩れがないか確認する
          </li>
        </ol>
      </div>

      <h2 className={styles.heading}>確認方法</h2>
      <ol className={styles.list}>
        <li>
          ターミナルで <code>npm run dev</code> を実行してアプリを起動する
        </li>
        <li>
          <code>http://localhost:3000/</code>（トップページ）、
          <code>/github/part1</code>・<code>/github/part2</code>、
          <code>/lessons/day-01</code>〜<code>/lessons/day-06</code>
          を、順番にブラウザで開く
        </li>
        <li>
          それぞれのページで、デベロッパーツールの端末表示モードなどを 使い、
          <code>360px</code>付近・<code>768px</code>付近・
          <code>1200px</code>以上の広い画面、の3パターンを確認する
        </li>
        <li>
          どのページも、コンテンツが1024pxより広がらず中央に留まり、
          768px以下になっても文字や要素がはみ出さずに 表示されていれば クリア🎉
        </li>
      </ol>

      <h2 className={styles.heading}>詰まったら</h2>
      <ul className={styles.list}>
        <li>
          <code>margin: 0 auto</code>が効かないときは、その要素に
          <code>width</code>や<code>max-width</code>
          が指定されているか確認する（幅が「auto」のままだと
          中央寄せは起こらない）
        </li>
        <li>
          メディアクエリが効かないときは、<code>@media</code>
          のブロックが同じCSS Modulesファイルの中に、対象の
          クラスと同じセレクタ名で書かれているか確認する
        </li>
        <li>
          変更したはずのページが変わらないときは、編集した
          <code>page.module.css</code>が対象のDayのフォルダで
          合っているか（別のDayのファイルを直していないか）確認する
        </li>
        <li>
          <code>rem</code>で統一したい場合は、
          <code>1024px = 64rem</code>
          （ブラウザの初期設定でroot文字サイズが16pxの場合）で 変換できます
        </li>
        <li>
          今回の<code>.main</code>は<code>max-width</code>と<code>padding</code>
          を同じ要素に書いたままでも構いません。
          より正確に1024px幅を保ちたい場合は、 上で学んだ
          <strong>container／content</strong>
          に分ける方法にも挑戦してみましょう（発展）
        </li>
        <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
      </ul>

      <CompleteLessonButton day={6} nextDay={7} />
    </>
  );
}
