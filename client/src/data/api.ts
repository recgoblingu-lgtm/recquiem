import { API_BASE_URL } from "./endpoints";
import { createHttpApi } from "./httpApi";
import { mockApi } from "./mockApi";

export const communityApi = API_BASE_URL ? createHttpApi(API_BASE_URL) : mockApi;
export const hasCommunityApi = Boolean(API_BASE_URL);
