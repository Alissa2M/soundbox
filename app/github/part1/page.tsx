import Link from "next/link";
import Sticky from "@/components/Sticky";
import styles from "./page.module.css";

export default function GithubGuidePart1() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← トップに戻る
      </Link>

      <h1 className={styles.title}>
        GitHubの運用ルール：作業ブランチの作り方
      </h1>

      <p className={styles.paragraph}>
        このプロジェクトでは、<code>main</code> ブランチを直接編集しません。
        お題に取り組む前に、必ず決まった手順でブランチを作ってから作業します。
        このページでは、そのルールと理由を説明します。
      </p>

      <h2 className={styles.heading}>そもそも「ブランチ」とは何か</h2>
      <p className={styles.paragraph}>
        Gitでは、作業の履歴（コミット）が枝分かれして進んでいく仕組みがあります。
        この枝のことを<strong>ブランチ</strong>と呼びます。1本の道（歴史）を
        みんなで共有するのではなく、それぞれが自分専用の枝の上で作業して、
        後からその枝を合流（マージ）させる、という考え方です。こうすることで、
        誰かの作業中のコードが、他の人や本番環境に影響を与えないようにできます。
      </p>

      <h2 className={styles.heading}>3つのブランチの役割</h2>
      <table className={styles.branchTable}>
        <thead>
          <tr>
            <th>ブランチ名</th>
            <th>役割</th>
            <th>誰が触るか</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>main</code>
            </td>
            <td>本番環境。世の中に公開されているバージョン</td>
            <td>直接は触らない（developから定期的に取り込むだけ）</td>
          </tr>
          <tr>
            <td>
              <code>develop</code>
            </td>
            <td>
              みんなの作業を集める、最新の共同作業環境。常に完成品とは限らない
            </td>
            <td>各自のfeatureブランチがここに合流してくる</td>
          </tr>
          <tr>
            <td>
              <code>feature/NAME-01</code>
            </td>
            <td>自分専用の作業ブランチ。ここで実際にコードを書く</td>
            <td>自分だけ</td>
          </tr>
        </tbody>
      </table>

      <pre className={styles.diagram}>
        <code>{`main
  └─ develop         ← 他の人の作業も合流してくる場所
       └─ feature/NAME-01   ← あなたが今日作業する場所`}</code>
      </pre>

      <h2 className={styles.heading}>なぜ3段階に分けるのか</h2>
      <ul className={styles.list}>
        <li>
          <code>main</code> に直接コミットしてしまうと、確認前のコードが
          いきなり本番に反映されてしまう危険があります。
        </li>
        <li>
          <code>develop</code> には他の人の変更も次々に合流してくるので、
          あなたが最後に見たときより先に進んでいることがよくあります。
          そのため、作業を始める前は必ず最新の状態に更新（
          <code>pull</code>）してから、そこを起点に自分のブランチを作る
          必要があります。
        </li>
        <li>
          <code>feature/NAME-01</code> は自分だけの作業スペースなので、
          試行錯誤したり、一時的にコードが壊れたりしても、他の人や本番には
          一切影響しません。
        </li>
      </ul>

      <h2 className={styles.heading}>手順（実際に打つコマンド）</h2>
      <p className={styles.paragraph}>
        <code>main</code> をclone（複製）してきた直後は、あなたの手元は{" "}
        <code>main</code> ブランチの状態になっています。ここから
        <code>develop</code> を経由して、自分の作業ブランチを作ります。
      </p>

      <div className={styles.paragraph}>
        <strong>1. developブランチに切り替える</strong>
        <p>
          手元にまだ <code>develop</code> がない場合は、GitHub（
          <code>origin</code>）上の <code>develop</code>
          を元にローカルにも作ります。
          <code>origin</code> とは、GitHub上に置かれているこのリポジトリの
          本体（クラウド側）のことで、手元のコピーとは別に存在しています。
        </p>
        <Sticky>
          <p>
            <code>git checkout &lt;ブランチ名&gt;</code>
            <br />→ すでにあるブランチに切り替える（例:{" "}
            <code>git checkout develop</code>）
          </p>
          <p>
            <code>git checkout -b &lt;新しいブランチ名&gt;</code>
            <br />→ 新しいブランチを作って、そのまま切り替える（
            <code>-b</code> は branch の意味）
          </p>
          <p>
            <code>
              git checkout -b &lt;新しいブランチ名&gt;
              &lt;origin/元ブランチ名&gt;
            </code>
            <br />→ リモートから新しいブランチを作って、そのまま切り替える（
            <code>origin</code> は リモート の意味）
          </p>
        </Sticky>
      </div>
      <pre className={styles.codeBlock}>
        <code>{`git checkout -b develop origin/develop`}</code>
      </pre>
      <p className={styles.paragraph}>
        すでに手元に <code>develop</code> がある場合は、切り替えるだけです。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`git checkout develop`}</code>
      </pre>

      <p className={styles.paragraph}>
        <strong>2. developを最新の状態に更新する（pull）</strong>
        <br />
        <code>pull</code> は「<code>origin</code>（GitHub側）にある最新の
        変更を、自分の手元にも反映する」という命令です。他の人の作業が
        進んでいるかもしれないので、作業を始める前に必ず実行します。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`git pull origin develop`}</code>
      </pre>

      <p className={styles.paragraph}>
        <strong>3. developから自分の作業ブランチを作る</strong>
        <br />
        最新化した <code>develop</code> を起点にして、自分専用のブランチを
        作ります。<code>-b</code> は「新しいブランチを作って、そのまま
        切り替える」という意味のオプションです。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`git checkout -b feature/NAME-01`}</code>
      </pre>

      <h2 className={styles.heading}>ブランチ名のルール</h2>
      <p className={styles.paragraph}>
        <code>feature/NAME-01</code> の <code>NAME</code> と <code>01</code>{" "}
        は、それぞれ次のように置き換えてください。
      </p>
      <ul className={styles.list}>
        <li>
          <code>NAME</code>：自分の名前やGitHubのユーザー名（ローマ字、 例:{" "}
          <code>mirena</code>）
        </li>
        <li>
          <code>01</code>：今取り組んでいるお題の番号（Day1なら
          <code>01</code>、Day2なら<code>02</code>）
        </li>
      </ul>
      <p className={styles.paragraph}>
        例えば <code>mirena</code> さんがDay1に取り組む場合、ブランチ名は{" "}
        <code>feature/mirena-01</code> になります。
      </p>

      <div className={styles.warningBox}>
        <span className={styles.warningLabel}>注意</span>
        <p className={styles.paragraph}>
          <code>main</code> と <code>develop</code> の上で直接コードを
          書いてコミットするのは禁止です。必ず
          <code>feature/NAME-01</code> のようなブランチを作ってから
          作業してください。
        </p>
        <p className={styles.paragraph}>
          また、<code>develop</code> は他の人の変更もどんどん合流してくる
          場所なので、新しい作業ブランチを作る前には毎回
          <code>git pull origin develop</code> を実行して、最新の状態に
          してから作業を始める習慣をつけましょう。古い状態のまま作業すると、
          後で自分の変更と他の人の変更がぶつかる「コンフリクト（衝突）」が
          起きやすくなります。
        </p>
      </div>

      <h2 className={styles.heading}>確認方法</h2>
      <p className={styles.paragraph}>
        今どのブランチにいるかは、次のコマンドで確認できます。
        <code>*</code> が付いているものが今のブランチです。
      </p>
      <pre className={styles.codeBlock}>
        <code>{`git branch`}</code>
      </pre>

      <p className={styles.hint}>
        ブランチができたら、次は{" "}
        <Link href="/github/part2" className={styles.hintLink}>
          Part2：変更を記録してGitHubに送る
        </Link>{" "}
        に進みましょう。
      </p>
    </>
  );
}
