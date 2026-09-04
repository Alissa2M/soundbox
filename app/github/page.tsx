import Link from "next/link";
import styles from "./page.module.css";

export default function GithubGuideIndex() {
  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← トップに戻る
      </Link>

      <h1 className={styles.title}>GitHubの運用ルール</h1>
      <p className={styles.paragraph}>
        GitHubを使った作業の流れを、2つのパートに分けて説明します。まず
        Part1でブランチを作り、Part2で変更を記録してGitHubに送ります。
      </p>

      <Link href="/github/part1" className={styles.card}>
        <span className={styles.cardLabel}>Part1</span>
        <span className={styles.cardTitle}>作業ブランチの作り方</span>
        <p className={styles.cardDesc}>
          main / develop / feature ブランチの役割と、作業ブランチを作るまでの
          手順を説明します。
        </p>
      </Link>

      <Link href="/github/part2" className={styles.card}>
        <span className={styles.cardLabel}>Part2</span>
        <span className={styles.cardTitle}>
          変更を記録してGitHubに送る（add / commit / push）
        </span>
        <p className={styles.cardDesc}>
          ステージングの考え方と、add → commit → push の手順を説明します。
        </p>
      </Link>
    </>
  );
}
