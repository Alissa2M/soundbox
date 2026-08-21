// 学習の進捗（完了したDay）をブラウザのlocalStorageに保存するための小さな外部ストア。
// 「何日目まで進んだか」ではなく「どのDayを完了ボタンで完了にしたか」で管理する。
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "soundbox:completedDays";
const EMPTY: number[] = [];

type Listener = () => void;
const listeners = new Set<Listener>();

let cachedRaw: string | null = null;
let cachedSnapshot: number[] = EMPTY;

function computeSnapshot(): number[] {
  if (typeof window === "undefined") return EMPTY;

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }

  // 前回と同じ内容ならキャッシュを返す（useSyncExternalStoreの無限ループ防止）
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;

  try {
    const parsed = raw ? JSON.parse(raw) : [];
    cachedSnapshot = Array.isArray(parsed)
      ? parsed.filter((value): value is number => typeof value === "number")
      : EMPTY;
  } catch {
    cachedSnapshot = EMPTY;
  }

  return cachedSnapshot;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getServerSnapshot() {
  return EMPTY;
}

// 完了済みのDay番号一覧を、状態が変わるたびに再取得するReactフック
export function useCompletedDays(): number[] {
  return useSyncExternalStore(subscribe, computeSnapshot, getServerSnapshot);
}

export function isDayCompleted(day: number): boolean {
  return computeSnapshot().includes(day);
}

// 指定したDayの完了状態を切り替えて、保存後の一覧を返す
export function setDayCompleted(day: number, completed: boolean): number[] {
  const current = computeSnapshot();
  const next = completed
    ? Array.from(new Set([...current, day])).sort((a, b) => a - b)
    : current.filter((d) => d !== day);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  cachedRaw = JSON.stringify(next);
  cachedSnapshot = next;
  notifyListeners();

  return next;
}
