import type { CommunityApi, LeaderboardEntry, SearchScope } from "./models";
import { API_ENDPOINTS, resolvePath } from "./endpoints";

function createHttpApi(baseUrl: string): CommunityApi {
  async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Request failed (${response.status}). Please try again.`);
    }
    return (await response.json()) as T;
  }

  const queryString = (values: Record<string, string>) => {
    const search = new URLSearchParams(values).toString();
    return search ? `?${search}` : "";
  };

  return {
    listRooms: () => request(API_ENDPOINTS.rooms),
    getRoom: (id) => request<Awaited<ReturnType<CommunityApi["getRoom"]>>>(resolvePath(API_ENDPOINTS.roomById, id)),
    listAccounts: () => request(API_ENDPOINTS.accounts),
    getAccount: (id) => request<Awaited<ReturnType<CommunityApi["getAccount"]>>>(resolvePath(API_ENDPOINTS.accountById, id)),
    getLeaderboard: (period: LeaderboardEntry["period"] = "week") =>
      request(`${API_ENDPOINTS.leaderboard}${queryString({ period })}`),
    listEvents: () => request(API_ENDPOINTS.events),
    listActivity: () => request(API_ENDPOINTS.activity),
    search: (query: string, scope: SearchScope = "all") =>
      request(`${API_ENDPOINTS.search}${queryString({ q: query, scope })}`),
  };
}

export { createHttpApi };
