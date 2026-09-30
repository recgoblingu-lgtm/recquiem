export type Platform = "VR" | "PC" | "PlayStation" | "iOS" | "Android";
export type RoomAccess = "open" | "friends" | "invite";
export type Presence = "online" | "away" | "offline";

export interface Room {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  artwork: string;
  gallery?: string[];
  description: string;
  players: number;
  capacity: number;
  platforms: Platform[];
  tags: string[];
  category: string;
  access: RoomAccess;
  updatedAt: string;
  featured: boolean;
}

export interface Account {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  presence: Presence;
  followers: number;
  createdRooms: number;
  interests: string[];
  joinedAt: string;
}

export interface LeaderboardEntry {
  accountId: string;
  score: number;
  label: string;
  period: "week" | "month" | "all-time";
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  roomId: string;
  roomName: string;
  hostId: string;
  attendees: number;
  category: string;
  artwork: string;
}

export interface ActivityItem {
  id: string;
  accountId: string;
  kind: "published" | "playing" | "event";
  roomId?: string;
  message: string;
  occurredAt: string;
}

export type SearchScope = "all" | "rooms" | "people";

export interface SearchResults {
  rooms: Room[];
  people: Account[];
}

export interface CommunityApi {
  listRooms(): Promise<Room[]>;
  getRoom(id: string): Promise<Room | null>;
  listAccounts(): Promise<Account[]>;
  getAccount(id: string): Promise<Account | null>;
  getLeaderboard(period?: LeaderboardEntry["period"]): Promise<LeaderboardEntry[]>;
  listEvents(): Promise<CommunityEvent[]>;
  listActivity(): Promise<ActivityItem[]>;
  search(query: string, scope?: SearchScope): Promise<SearchResults>;
}
