import Link from "next/link";
import Sticky from "@/components/Sticky";
import styles from "./page.module.css";

export default function GithubGuidePart2() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← トップに戻る
        </Link>

        <h1 className={styles.title}>
          GitHubの運用ルール：変更を記録してGitHubに送る（Part2）
        </h1>

        <p className={styles.paragraph}>
          <Link href="/github/part1" className={styles.hintLink}>
            Part1：作業ブランチの作り方
          </Link>{" "}
          で作った作業ブランチの上でファイルを編集したら、その変更をGitに記録し、
          GitHub上にも反映させます。この一連の流れが <code>git add</code> →{" "}
          <code>git commit</code> → <code>git push</code> の3ステップです。
        </p>

        <h2 className={styles.heading}>そもそも「ステージング」とは何か</h2>
        <p className={styles.paragraph}>
          Gitでは、ファイルを編集しただけではまだ「記録」されていません。編集内容は
          一度<strong>ステージングエリア</strong>（<code>インデックス</code>
          と呼ばれることもあります）という場所に置いてから、記録（コミット）します。
          ステージングは、「次のコミットに入れたいファイルだけを選んで、カゴに
          入れておく」ようなイメージです。
        </p>
        <p className={styles.paragraph}>
          たとえば5つのファイルを編集していても、そのうち3つだけをステージングして
          先にコミットし、残り2つは後で別のコミットに分ける、ということができます。
          こうすることで、「1つのコミット＝1つのまとまった変更」という分かりやすい
          履歴を作ることができます。
        </p>

        <pre className={styles.diagram}>
          <code>{`作業ディレクトリ          ステージングエリア          ローカル履歴            GitHub(origin)
(編集したファイル)  --add-->  (コミット待ちの変更)  --commit-->  (確定した変更)  --push-->  (みんなが見える場所)`}</code>
        </pre>

        <ul className={styles.list}>
          <li>
            <strong>作業ディレクトリ</strong>：今あなたが手元で編集しているファイル
            そのもの。まだGitには何も記録されていない状態。
          </li>
          <li>
            <strong>ステージングエリア</strong>：<code>git add</code> したファイルが
            一時的に置かれる場所。「次のコミットに含めるものリスト」のようなもの。
          </li>
          <li>
            <strong>ローカル履歴</strong>：<code>git commit</code> することで、
            ステージングされた内容が「1つの記録」として確定した状態。まだ自分の
            手元にしかない。
          </li>
          <li>
            <strong>GitHub（origin）</strong>：<code>git push</code> することで、
            ローカルの記録がGitHub上にアップロードされ、他の人にも見えるように
            なった状態。
          </li>
        </ul>

        <h2 className={styles.heading}>① git add：ステージングに追加する</h2>
        <p className={styles.paragraph}>
          編集したファイルの中から、次のコミットに含めたいものをステージング
          エリアに追加します。ファイルを指定する方法と、変更したファイルをまとめて
          追加する方法があります。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`git add ファイル名
git add .`}</code>
        </pre>
        <Sticky>
          <p>
            <code>git add ファイル名</code>
            <br />→ 指定した1つのファイルだけをステージングする
          </p>
          <p>
            <code>git add .</code>
            <br />→ 今のフォルダ以下の、変更したファイルをすべてステージングする
            （一番よく使う）
          </p>
          <p>
            <code>git status</code>
            <br />→ 今どのファイルがステージングされているか（緑色）、まだされて
            いないか（赤色）を確認できる
          </p>
        </Sticky>

        <h2 className={styles.heading}>② git commit：記録として確定する</h2>
        <p className={styles.paragraph}>
          ステージングした内容を、「1つの記録（コミット）」として確定させます。
          <code>-m</code> の後に、何を変更したのかを説明する短いメッセージ
          （コミットメッセージ）を付けます。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`git commit -m "コミットメッセージ"`}</code>
        </pre>
        <p className={styles.paragraph}>
          コミットメッセージは、後から履歴を見た人（未来の自分も含む）が「何をした
          コミットか」がひと目で分かるように書きます。例：
          <code>git commit -m "ログイン画面のバリデーションを追加"</code>
        </p>

        <h2 className={styles.heading}>③ git push：GitHubに送る</h2>
        <p className={styles.paragraph}>
          コミットは、まだあなたの手元（ローカル）にしか存在していません。
          <code>push</code> することで、GitHub上の自分の作業ブランチにコミットを
          アップロードし、他の人からも見えるようにします。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`git push origin feature/NAME-01`}</code>
        </pre>
        <p className={styles.paragraph}>
          初めてそのブランチをpushするときは、GitHub側にまだ同名のブランチが
          存在しないため、<code>-u</code> オプションを付けて紐づけておくと、次回
          以降は <code>git push</code> だけで済むようになります。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`git push -u origin feature/NAME-01`}</code>
        </pre>

        <div className={styles.warningBox}>
          <span className={styles.warningLabel}>注意</span>
          <p className={styles.paragraph}>
            <code>git add .</code> は今のフォルダ以下の変更をすべてステージングして
            しまうため、意図していないファイル（動作確認用に変更した設定ファイル
            など）まで一緒にコミットしてしまうことがあります。<code>git add</code>
            の前後に <code>git status</code> で対象を確認する習慣をつけましょう。
          </p>
          <p className={styles.paragraph}>
            コミットメッセージを空のまま、または「修正」「wip」のような分かりにくい
            内容にすると、後から履歴を追うのが大変になります。何を・なぜ変更したの
            かが分かる一文を書きましょう。
          </p>
        </div>

        <h2 className={styles.heading}>確認方法</h2>
        <p className={styles.paragraph}>
          今どのファイルがステージングされているか、どのファイルがまだ変更された
          だけの状態かは、次のコマンドで確認できます。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`git status`}</code>
        </pre>
        <p className={styles.paragraph}>
          これまでのコミットの履歴は、次のコマンドで確認できます。
        </p>
        <pre className={styles.codeBlock}>
          <code>{`git log --oneline`}</code>
        </pre>

        <p className={styles.hint}>
          pushまでできたら、トップページに戻って「本日のお題」に進みましょう。
        </p>
      </main>
    </div>
  );
}
