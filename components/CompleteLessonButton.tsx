"use client";

import Link from "next/link";
import { setDayCompleted, useCompletedDays } from "@/lib/progress";
import styles from "./CompleteLessonButton.module.css";

function dayPath(day: number) {
  return `/lessons/day-${String(day).padStart(2, "0")}`;
}

type Props = {
  day: number;
  // 次のDayが存在しない場合（最終日など）は省略する
  nextDay?: number;
};

export default function CompleteLessonButton({ day, nextDay }: Props) {
  const completedDays = useCompletedDays();
  const completed = completedDays.includes(day);

  function handleToggle() {
    setDayCompleted(day, !completed);
  }

  return (
    <div className={styles.box}>
      <button
        type="button"
        onClick={handleToggle}
        className={
          completed
            ? `${styles.button} ${styles.buttonCompleted}`
            : styles.button
        }
      >
        <span className={styles.checkIcon}>{completed ? "✓" : "○"}</span>
        {completed ? "完了済み" : "このレッスンを完了する"}
      </button>

      {completed ? (
        <>
          <p className={styles.message}>
            🎉 お疲れさまでした！
            {nextDay
              ? "次のレッスンに進めます。"
              : "これで全レッスン完了です。"}
          </p>
          {nextDay ? (
            <Link href={dayPath(nextDay)} className={styles.nextLink}>
              次のレッスンへ →
            </Link>
          ) : null}
        </>
      ) : (
        <p className={styles.message}>
          お題が終わったら、上のボタンを押してチェックしましょう。
        </p>
      )}
    </div>
  );
}
