"use client";

import Link from "next/link";
import { useCompletedDays } from "@/lib/progress";
import styles from "./page.module.css";

// 30日分のロードマップ（テーマ一覧）。詳細な説明ページは日々 app/lessons/day-XX/ に追加していきます。
const ROADMAP = [
  { day: 1, title: "page.tsxって何？画面に表示される仕組みを知る" },
  { day: 2, title: "JSXの基本：テキストを表示する＋スタイルを付ける" },
  { day: 3, title: "Next.js特有の概要（Reactとの違い・App Router）" },
  { day: 4, title: "ディレクトリ構成について" },
  { day: 5, title: "画像を表示する" },
  { day: 6, title: "リストを表示する（ul/li）" },
  { day: 7, title: "変数をJSXに埋め込む（{}の使い方）" },
  { day: 8, title: "条件分岐で表示を変える（三項演算子）" },
  { day: 9, title: "配列とmapでリスト表示" },
  { day: 10, title: "自分の関数コンポーネントを作る" },
  { day: 11, title: "コンポーネントを分割する（親子関係）" },
  { day: 12, title: "propsで情報を渡す" },
  { day: 13, title: "イベント処理（onClickボタン）" },
  { day: 14, title: "useStateでカウンターを作る" },
  { day: 15, title: "フォーム入力を受け取る（controlled input）" },
  { day: 16, title: "TODOリストに追加する機能" },
  { day: 17, title: "TODOリストを削除する機能" },
  { day: 18, title: "TODOの完了チェック機能" },
  { day: 19, title: "useEffectの基本" },
  { day: 20, title: "fetchで外部データを取得する" },
  { day: 21, title: "ローディング・エラー表示" },
  { day: 22, title: "複数ページを作る（ルーティング）" },
  { day: 23, title: "ページ間のリンク（Linkコンポーネント）" },
  { day: 24, title: "動的ルート（[id]）" },
  { day: 25, title: "共通レイアウト（layout.tsx）" },
  { day: 26, title: "フォーム送信（Route Handler / API）" },
  { day: 27, title: "簡易メモアプリ（データの保存）" },
  { day: 28, title: "スタイル仕上げ（レスポンシブ対応）" },
  { day: 29, title: "総合演習1（小さなアプリ作り）" },
  { day: 30, title: "総合演習2・完成披露" },
];

function dayPath(day: number) {
  return `/lessons/day-${String(day).padStart(2, "0")}`;
}

export default function Home() {
  const completedDays = useCompletedDays();

  // 「今日のお題」＝まだ完了していない最初のDay（全部完了していたら最終日）
  const currentDay =
    ROADMAP.find((item) => !completedDays.includes(item.day))?.day ??
    ROADMAP[ROADMAP.length - 1].day;
  const today = ROADMAP.find((item) => item.day === currentDay);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Hello World</h1>

        <section className={styles.todayCard}>
          <h2 className={styles.sectionTitle}>GitHub</h2>
          <p className={styles.todayDesc}>
            お題に取り組む前に、作業ブランチの作り方を確認しましょう。
          </p>
          <Link href="/github" className={styles.ctaButton}>
            ブランチの作り方を見る →
          </Link>
        </section>

        <section className={styles.todayCard}>
          <h2 className={styles.sectionTitle}>
            今のお題（Day{String(currentDay).padStart(2, "0")}）
          </h2>
          <p className={styles.todayDesc}>{today?.title}</p>
          <Link href={dayPath(currentDay)} className={styles.ctaButton}>
            説明を見る →
          </Link>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>進捗一覧（ロードマップ）</h2>
          <ol className={styles.roadmapList}>
            {ROADMAP.map((item) => {
              const isCompleted = completedDays.includes(item.day);
              const isCurrent = item.day === currentDay;
              // Day01は常に開放。それ以降は、前のDayを完了ボタンでチェックしたら開放される
              const hasLesson =
                item.day === 1 || completedDays.includes(item.day - 1);
              const itemClassName = isCurrent
                ? `${styles.roadmapItem} ${styles.roadmapItemCurrent}`
                : styles.roadmapItem;

              return (
                <li key={item.day} className={itemClassName}>
                  {hasLesson ? (
                    <Link
                      href={dayPath(item.day)}
                      className={styles.roadmapLink}
                    >
                      <span className={styles.roadmapDay}>
                        {isCompleted ? "✓" : ""}Day
                        {String(item.day).padStart(2, "0")}
                      </span>
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <span className={styles.roadmapDay}>
                        Day{String(item.day).padStart(2, "0")}
                      </span>
                      {item.title}
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </main>
    </div>
  );
}
