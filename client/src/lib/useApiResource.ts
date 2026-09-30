import { useCallback, useEffect, useState } from "react";

type ResourceState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
};

export function useApiResource<T>(load: () => Promise<T>): ResourceState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    load().then(
      (value) => {
        if (!active) return;
        setData(value);
        setLoading(false);
      },
      (reason: unknown) => {
        if (!active) return;
        setError(reason instanceof Error ? reason.message : "Something went wrong. Please try again.");
        setLoading(false);
      },
    );
    return () => {
      active = false;
    };
  }, [attempt, load]);

  return { data, loading, error, retry };
}
