import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { toast } from "sonner";
import { communityApi, hasCommunityApi } from "@/data/api";
import type { Account } from "@/data/models";
import { CreatorCard } from "@/components/CreatorCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/ContentStates";
import { useApiResource } from "@/lib/useApiResource";
import { useStoredIds } from "@/lib/useStoredIds";

const loadAccounts = () => communityApi.listAccounts();

export default function PeoplePage() {
  const { data: accounts, loading, error, retry } = useApiResource(loadAccounts);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("everyone");
  const following = useStoredIds("recquiem:following");
  const visible = useMemo(() => accounts?.filter((account) => {
    const term = query.trim().toLowerCase();
    const matches = !term || [account.displayName, account.username, account.bio, ...account.interests].some((value) => value.toLowerCase().includes(term));
    return matches && (filter !== "online" || account.presence === "online");
  }) ?? [], [accounts, query, filter]);
  const toggleFollow = (account: Account) => {
    following.toggle(account.id);
    toast(following.has(account.id) ? `Unfollowed ${account.displayName}.` : `Following ${account.displayName}.`);
  };

  return (
    <div className="page-container inner-page">
      <div className="page-intro page-intro-row"><div><h1>People</h1><p className="page-lede">Account profiles appear when an accounts API is connected.</p></div><div className="page-intro-side"><span className="quiet-status"><Users size={14} />{accounts?.length ?? "—"} accounts</span></div></div>
      <div className="directory-toolbar people-toolbar"><div className="directory-search"><Search size={17} /><label className="sr-only" htmlFor="people-search">Search people</label><input id="people-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, bios, or interests" /></div><div className="segmented-control" role="group" aria-label="Filter creator presence"><button className={filter === "everyone" ? "is-selected" : ""} onClick={() => setFilter("everyone")}>Everyone</button><button className={filter === "online" ? "is-selected" : ""} onClick={() => setFilter("online")}>Online now</button></div></div>
      <div className="results-line" aria-live="polite">{loading ? "Loading people…" : error ? "People unavailable" : `${visible.length} ${visible.length === 1 ? "person" : "people"}`}</div>
      {loading && <LoadingState label="Loading people and creators" />}
      {error && <ErrorState message={error} retry={retry} />}
      {accounts && !error && (visible.length ? <div className="creator-grid creator-grid-wide">{visible.map((account) => <CreatorCard key={account.id} account={account} following={following.has(account.id)} onToggleFollow={toggleFollow} />)}</div> : <EmptyState title={hasCommunityApi ? "No accounts found" : "No player data available"} message={!hasCommunityApi ? "Connect an accounts API to display profiles." : "No accounts match this search."} />)}
    </div>
  );
}
