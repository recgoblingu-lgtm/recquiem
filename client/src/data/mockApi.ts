import type { CommunityApi } from "./models";

export const mockApi: CommunityApi = {
  async listRooms() { return []; },
  async getRoom() { return null; },
  async listAccounts() { return []; },
  async getAccount() { return null; },
  async getLeaderboard() { return []; },
  async listEvents() { return []; },
  async listActivity() { return []; },
  async search() { return { rooms: [], people: [] }; },
};
