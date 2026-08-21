import type { ReactNode } from "react";
import styles from "./Sticky.module.css";

type Props = {
  // 付箋の見出し（例: "💬 実際に聞かれた質問"）
  label: string;
  children: ReactNode;
};

// 実際にやってみてフィードバックされた内容などを、付箋風に補足するための共通コンポーネント
export default function Sticky({ label, children }: Props) {
  return (
    <div className={styles.sticky}>
      <span className={styles.label}>{label}</span>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
