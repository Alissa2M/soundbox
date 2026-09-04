import Link from "next/link";
import CompleteLessonButton from "@/components/CompleteLessonButton";
import Sticky from "@/components/Sticky";
import styles from "./page.module.css";

export default function Day07Lesson() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← ロードマップに戻る
      </Link>

      <h1 className={styles.title}>
        Day07: 変数をJSXに埋め込む（{"{}"}の使い方）
      </h1>

      <p className={styles.paragraph}>
        これまでのDayでは、<code>&lt;h1&gt;Hello World&lt;/h1&gt;</code>{" "}
        のように、タグの中に文字をそのまま書いてきました。
        でも実際のアプリでは、「ログインしているユーザーの名前を表示する」
        「計算した合計金額を表示する」のように、
        <strong>JavaScriptの値をそのまま画面に出したい</strong>
        場面がほとんどです。そこで使うのが、波かっこ
        <code>{"{}"}</code>です。今日はこの<code>{"{}"}</code>
        の使い方をしっかり押さえます。
      </p>

      <h2 className={styles.heading}>
        <code>{"{}"}</code>は「ここからJavaScriptですよ」の合図
      </h2>
      <p className={styles.paragraph}>
        JSXの中に<code>{"{}"}</code>を書くと、その中身はHTMLの文字列 ではなく
        <strong>JavaScriptの式</strong>として扱われます。
        つまりJSXは、「タグを書いているとき」と 「<code>{"{}"}</code>
        の中でJavaScriptを書いているとき」の
        2つのモードを行き来している、とイメージすると分かりやすいです。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`export default function Day07Page() {
  const name = "太郎";

  return <h1>こんにちは、{name}さん</h1>;
}
// 画面には「こんにちは、太郎さん」と表示される`}</code>
      </pre>
      <p className={styles.paragraph}>
        <code>{"{name}"}</code>の部分で、変数<code>name</code>
        の中身（文字列<code>&quot;太郎&quot;</code>）が
        そのまま画面に差し込まれています。<code>{"{}"}</code>
        を付けずに<code>{`<h1>こんにちは、name さん</h1>`}</code>{" "}
        と書いてしまうと、<code>name</code>という4文字が
        そのまま表示されてしまう点に注意してください。
      </p>

      <h2 className={styles.heading}>数値や計算結果も埋め込める</h2>
      <p className={styles.paragraph}>
        <code>{"{}"}</code>の中には、変数だけでなく、計算式や 関数の戻り値など、
        <strong>「値を1つ返すJavaScript」</strong>
        であれば何でも書けます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`const price = 1200;
const taxRate = 0.1;

return (
  <p>
    税込価格：{price * (1 + taxRate)}円
  </p>
);
// 画面には「税込価格：1320円」と表示される`}</code>
      </pre>

      <h2 className={styles.heading}>書けるのは「式」だけ。「文」は書けない</h2>
      <p className={styles.paragraph}>
        ここが今日いちばん重要なポイントです。<code>{"{}"}</code>
        の中に書けるのは<strong>式（expression）</strong>
        ——「評価すると1つの値になるもの」だけです。
        <code>if</code>文や<code>for</code>文のような
        <strong>文（statement）</strong>は、値を返すものではないため、
        <code>{"{}"}</code>の中には書けません。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`// ❌ これはエラーになる（if文は「式」ではない）
return (
  <p>
    {if (isLoggedIn) {
      "ログイン中"
    }}
  </p>
);`}</code>
      </pre>
      <p className={styles.paragraph}>
        代わりに、<code>if</code>文と同じ「条件によって結果を変える」
        ことを式1つでできる、<strong>三項演算子</strong>（
        <code>{"条件 ? Aの場合 : Bの場合"}</code>）を使います。
        こちらは「評価すると1つの値になる」式なので、
        <code>{"{}"}</code>の中に書けます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`const isLoggedIn = true;

// ✅ 三項演算子は「式」なので{}の中に書ける
return <p>{isLoggedIn ? "ログイン中" : "未ログイン"}</p>;
// 画面には「ログイン中」と表示される`}</code>
      </pre>
      <p className={styles.paragraph}>
        条件分岐の書き方そのものは、Day12でもう少し詳しく扱います。 今日は「
        <code>{"{}"}</code>の中には式しか書けない」という
        ルールだけ覚えておけば十分です。
      </p>

      <h2 className={styles.heading}>タグの属性にも埋め込める</h2>
      <p className={styles.paragraph}>
        <code>{"{}"}</code>が使えるのは、タグに挟まれた文字の部分
        だけではありません。<code>className</code>や<code>src</code>
        のような<strong>属性（props）の値</strong>としても、 同じように
        <code>{"{}"}</code>で変数を渡せます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`import Image from "next/image";

const iconSrc = "/icon.png";
const size = 64;

return (
  <Image src={iconSrc} alt="アイコン" width={size} height={size} />
);`}</code>
      </pre>
      <p className={styles.paragraph}>
        Day05で書いた<code>width={"{180}"}</code>や、Day02で出てきた
        <code>className={"{styles.highlight}"}</code>も、実は
        すべて同じ仕組みです。属性値として文字列をそのまま書きたい ときは
        <code>{`src="/icon.png"`}</code>のようにクォート だけで書けますが、
        <strong>
          変数を渡したいときは必ず
          <code>{"{}"}</code>で囲む
        </strong>
        、と覚えておきましょう。
      </p>

      <h2 className={styles.heading}>テンプレートリテラルと組み合わせる</h2>
      <p className={styles.paragraph}>
        文字列の一部分だけを変数にしたいときは、バッククォート （
        <code>{"`"}</code>）で文字列全体を囲む
        <strong>テンプレートリテラル</strong>を使い、その中で
        <code>{"${変数名}"}</code>という書き方をします。 これを
        <code>{"{}"}</code>の中に書くことで、
        「文章の途中に変数を挟み込む」ことができます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`const userName = "太郎";
const itemCount = 3;

return (
  <p>{\`\${userName}さんのカートには\${itemCount}点の商品があります\`}</p>
);
// 画面には「太郎さんのカートには3点の商品があります」と表示される`}</code>
      </pre>
      <p className={styles.paragraph}>
        今回のように文章の前後をJSXのテキストとして書ける場合は、
        <code>{`<p>{userName}さんのカートには{itemCount}点の商品があります</p>`}</code>{" "}
        のように<code>{"{}"}</code>を分けて書いても同じ結果になります。
        テンプレートリテラルは、文字列として1つの変数にまとめておきたい
        場合や、後述の属性値に渡す場合などに便利です。
      </p>

      <h2 className={styles.heading}>オブジェクトはそのまま埋め込めない</h2>
      <p className={styles.paragraph}>
        <code>{"{}"}</code>の中に書けるのは「画面に表示できる値」
        （文字列・数値・真偽値・JSXなど）です。
        <strong>オブジェクト</strong>をそのまま渡すと、
        「これは1つの値に見えない」とReactに判断されて エラーになります。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`const user = { name: "太郎", age: 20 };

// ❌ エラーになる（Objects are not valid as a React child）
return <p>{user}</p>;

// ✅ 表示したいプロパティを指定すればOK
return <p>{user.name}</p>;`}</code>
      </pre>
      <p className={styles.paragraph}>
        <code>Objects are not valid as a React child</code>
        （オブジェクトはReactの子要素として使えません）というエラーは、
        初心者のうちに一度は見ることになるほど定番のエラーです。
        見かけたら「オブジェクトをそのまま<code>{"{}"}</code>に
        渡していないか」を疑ってみてください。
      </p>

      <Sticky label="💬 じゃあ配列はどうなる？">
        <p>
          オブジェクトと違い、配列を<code>{"{}"}</code>に渡すと、
          エラーにはならず、要素が順番にそのまま並べて表示されます。
          これは実は、配列の中に複数のJSX（
          <code>&lt;li&gt;...&lt;/li&gt;</code>など）を並べて
          リスト表示する、というよく使うテクニックの土台になっています。
          この使い方はDay13の「配列とmapでリスト表示」で詳しく
          扱うので、今日は「配列は表示できる」ということだけ
          知っておけば十分です。
        </p>
      </Sticky>

      <h2 className={styles.heading}>
        <code>null</code>・<code>undefined</code>・真偽値は表示されない
      </h2>
      <p className={styles.paragraph}>
        <code>{"{}"}</code>の中身が<code>null</code>・<code>undefined</code>・
        <code>true</code>・<code>false</code>
        のときは、Reactは何も表示しません（エラーにもなりません）。
        これは一見不便に思えるかもしれませんが、
        「条件によって何も表示しない」という状況をそのまま書ける、
        という意味で理にかなった挙動です。この性質を利用した
        条件付き表示のテクニックも、Day12で扱います。
      </p>

      <h2 className={styles.heading}>補足：TypeScriptで書くと何が嬉しいか</h2>
      <p className={styles.paragraph}>
        このアプリのファイルは、すべて<code>.tsx</code>
        という拡張子になっています。これはJSXが使える
        <strong>TypeScript</strong>のファイル、という意味です
        （JavaScriptだけなら<code>.jsx</code>）。TypeScriptは 「JavaScriptに
        <strong>型（type）</strong>の仕組みを
        追加した言語」で、書いたコードは最終的に
        普通のJavaScriptに変換されてから実行されます。
        <code>{"{}"}</code>にJavaScriptの式を書けるという今日の
        内容は、TypeScriptでもまったく同じです。
      </p>
      <p className={styles.paragraph}>
        「型」とは、ざっくり言うと
        <strong>
          「この変数には文字列しか入らない」 「この関数は数値しか受け取らない」
        </strong>
        といった、値の種類についての決まりごとです。
        JavaScriptにはこの決まりごとがないため、
        「本当は数値を渡すつもりだったのに、うっかり文字列を渡して
        しまった」というようなミスがあっても、実際にその行が
        実行されるまで気づけません。TypeScriptは、この決まりごとを コードを
        <strong>実行する前</strong>にチェックしてくれます。
      </p>
      <p className={styles.paragraph}>
        たとえば、今日紹介した「オブジェクトをそのまま
        <code>{"{}"}</code>に渡すとエラーになる」という例も、
        TypeScriptならエディタ上で赤い波線が引かれ、実行する前に 気づけます。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`const user = { name: "太郎", age: 20 };

// TypeScriptなら、保存する前・実行する前の時点で
// エディタが「Object is possibly...」のようなエラーを表示してくれる
return <p>{user}</p>;`}</code>
      </pre>
      <p className={styles.paragraph}>
        素のJavaScriptだと、このミスはブラウザで実際に画面を開いて
        エラーを見るまで気づけません。TypeScriptを使うと、
        コードを書いている最中・保存した瞬間に気づけるため、
        <strong>バグを実行前に潰せる</strong>のが大きな利点です。
        あわせて、変数や関数にどんな値が入るかがエディタに
        伝わるので、途中まで打つと候補が出てくる
        <strong>自動補完</strong>も効きやすくなります。
      </p>
      <p className={styles.paragraph}>
        では実際にどう書くかというと、変数の後ろに
        <code>: 型名</code>を付けるのが基本の書き方です。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`const name: string = "太郎"; // 文字列
const age: number = 20;      // 数値
const isStudent: boolean = true; // 真偽値`}</code>
      </pre>
      <p className={styles.paragraph}>
        ただし、これまでのDayで書いてきたコードにも、実は
        <code>: string</code>のような型注釈は一度も出てきていません。
        これは書き忘れていたわけではなく、TypeScriptには
        <strong>型推論</strong>という機能があり、
        <code>{`const name = "太郎";`}</code>
        のように右辺の値を見るだけで、TypeScript側が
        「これは文字列だな」と自動的に型を判断してくれるためです。
        そのため、ローカルの変数はほとんどの場合、型注釈を
        省略してもTypeScriptの恩恵をそのまま受けられます。
      </p>
      <p className={styles.paragraph}>
        一方で、<strong>関数の引数</strong>のように
        「外からどんな値が渡されるか、その場では決まらない」
        ものについては、型推論が効かないため、型注釈を 書くのが基本になります。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`// nameの型を明示しておくと…
function greet(name: string) {
  return <p>こんにちは、{name}さん</p>;
}

greet("太郎");  // ✅ OK
greet(20);      // ❌ 実行する前に「numberはstringに割り当てられません」
                //    というエラーがエディタ上で分かる`}</code>
      </pre>
      <p className={styles.paragraph}>
        コンポーネントに渡す<strong>props</strong>
        （親から子へ渡す値）も、この「外から渡される値」に
        当たります。propsに型を付ける方法は、Day10で あらためて扱います。
      </p>
      <p className={styles.paragraph}>
        🏢 <strong>実務では</strong>、TypeScriptを使わないNext.js
        プロジェクトはほとんど見かけません。特に複数人で
        同じコードを触るチーム開発では、「この関数に何を渡せば
        いいか」「このオブジェクトにどんなプロパティがあるか」が
        コードを読まなくてもエディタの補完で分かる、という点が
        非常に大きな効率化につながります。最初のうちは型注釈を
        意識しすぎなくても大丈夫です。まずは今日のように
        <code>{"{}"}</code>へ値を埋め込みながら、赤い波線が出たら
        「TypeScriptが何か教えてくれている」と気づけるようになる
        ところから慣れていきましょう。
      </p>

      <h2 className={styles.heading}>まとめ</h2>
      <ul className={styles.list}>
        <li>
          JSXの中で<code>{"{}"}</code>を書くと、その中身はHTMLの 文字列ではなく
          <strong>JavaScriptの式</strong>として 扱われる
        </li>
        <li>
          変数・計算式・関数の戻り値など、
          <strong>「評価すると1つの値になるもの（式）」</strong>
          であれば<code>{"{}"}</code>の中に書ける
        </li>
        <li>
          <code>if</code>文・<code>for</code>文のような
          <strong>文（statement）</strong>は<code>{"{}"}</code>
          の中に書けない。条件によって値を変えたいときは 三項演算子を使う
        </li>
        <li>
          タグに挟まれた文字だけでなく、
          <code>className</code>や<code>src</code>のような
          <strong>属性の値</strong>にも<code>{"{}"}</code>で 変数を渡せる
        </li>
        <li>
          オブジェクトをそのまま<code>{"{}"}</code>に渡すとエラーに
          なる。表示したいプロパティを<code>user.name</code>
          のように指定する
        </li>
        <li>
          <code>null</code>・<code>undefined</code>・真偽値は
          <code>{"{}"}</code>の中に書いても何も表示されない
        </li>
        <li>
          このアプリは<strong>TypeScript</strong>（<code>.tsx</code>
          ）で書かれている。型があることで、
          「オブジェクトを渡してしまった」のようなミスを
          実行前・保存した時点でエディタが教えてくれる。
          ローカル変数は型推論で自動的に型が決まるため、
          型注釈は関数の引数など「外から渡される値」に 付けるのが基本
        </li>
      </ul>

      <div className={styles.taskBox}>
        <span className={styles.taskLabel}>本日のお題</span>
        <p className={styles.paragraph}>
          <code>app/practice/day-07/page.tsx</code>{" "}
          を作り、次の2つを満たすページを作ってみましょう。
        </p>
        <ol className={styles.list}>
          <li>
            自分の名前を入れた文字列の変数を1つ用意し、
            <code>{"{}"}</code>を使って「こんにちは、〇〇さん」
            のように画面に表示する
          </li>
          <li>
            2つの数値の変数を用意し、<code>{"{}"}</code>
            の中で計算した合計を表示する
          </li>
        </ol>
        <p className={styles.hint}>
          <code>http://localhost:3000/practice/day-07</code>{" "}
          で開けるようにしてください。
        </p>
      </div>

      <h2 className={styles.heading}>確認方法</h2>
      <ol className={styles.list}>
        <li>
          ターミナルで <code>npm run dev</code> を実行してアプリを起動する
        </li>
        <li>
          ブラウザで <code>http://localhost:3000/practice/day-07</code> を開く
        </li>
        <li>
          名前・合計・「学生です／社会人です」の3つが、 変数名や
          <code>{"{}"}</code>そのものではなく、
          <strong>変数の中身の値</strong>として表示されていれば クリア🎉
        </li>
      </ol>

      <h2 className={styles.heading}>詰まったら</h2>
      <ul className={styles.list}>
        <li>
          画面に<code>name</code>のような変数名がそのまま
          文字として表示されているときは、<code>{"{}"}</code>
          で囲むのを忘れている可能性が高いです
        </li>
        <li>
          「Objects are not valid as a React child」というエラーが
          出たときは、オブジェクトをそのまま<code>{"{}"}</code>
          に渡していないか確認し、<code>.プロパティ名</code>
          で値を取り出してから渡す
        </li>
        <li>保存を忘れていないか確認する（Cmd+S / Ctrl+S）</li>
      </ul>

      <CompleteLessonButton day={7} nextDay={8} />
    </>
  );
}
