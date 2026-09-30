import { useEffect, useState } from "react";

function readStoredIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useStoredIds(key: string) {
  const [ids, setIds] = useState<string[]>(() => readStoredIds(key));
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(ids));
    } catch {
      return;
    }
  }, [ids, key]);

  const toggle = (id: string) => {
    setIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  };
  return { ids, has: (id: string) => ids.includes(id), toggle };
}
