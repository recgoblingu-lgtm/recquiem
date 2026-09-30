const env = import.meta.env;

export const API_BASE_URL = (env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

export const API_ENDPOINTS = {
  rooms: env.VITE_API_ROOMS_PATH ?? "/rooms",
  roomById: env.VITE_API_ROOM_PATH ?? "/rooms/:id",
  accounts: env.VITE_API_ACCOUNTS_PATH ?? "/accounts",
  accountById: env.VITE_API_ACCOUNT_PATH ?? "/accounts/:id",
  leaderboard: env.VITE_API_LEADERBOARD_PATH ?? "/leaderboard",
  activity: env.VITE_API_ACTIVITY_PATH ?? "/activity",
  events: env.VITE_API_EVENTS_PATH ?? "/events",
  search: env.VITE_API_SEARCH_PATH ?? "/search",
} as const;

export function resolvePath(template: string, id: string): string {
  return template.replace(":id", encodeURIComponent(id));
}
