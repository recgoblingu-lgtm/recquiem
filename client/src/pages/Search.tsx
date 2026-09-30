import { useCallback, useState } from "react";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { Link, useLocation, useSearch } from "wouter";
import { communityApi } from "@/data/api";
import type { Account, Room, SearchScope } from "@/data/models";
import { CreatorCard } from "@/components/CreatorCard";
import { EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/ContentStates";
import { RoomCard } from "@/components/RoomCard";
import { useApiResource } from "@/lib/useApiResource";
import { useStoredIds } from "@/lib/useStoredIds";
import { toast } from "sonner";

export default function SearchPage() {
  const [location, navigate] = useLocation();
  const search = useSearch();
  const query = new URLSearchParams(search).get("q") ?? "";
  const loadSearch = useCallback(() => communityApi.search(query, "all"), [query]);
  const { data, loading, error, retry } = useApiResource(loadSearch);
  const [scope, setScope] = useState<SearchScope>("all");
  const saved = useStoredIds("recquiem:saved-rooms");
  const following = useStoredIds("recquiem:following");
  const rooms = data?.rooms.filter((room) => scope !== "people") ?? [];
  const people = data?.people.filter((account) => scope !== "rooms") ?? [];
  const save = (room: Room) => { saved.toggle(room.id); toast(saved.has(room.id) ? "Removed from saved rooms." : "Saved for later."); };
  const follow = (account: Account) => { following.toggle(account.id); toast(following.has(account.id) ? `Unfollowed ${account.displayName}.` : `Following ${account.displayName}.`); };

  return (
    <div className="page-container inner-page">
      <div className="page-intro"><p className="eyebrow">Search the community</p><h1>Find something.</h1><p className="page-lede">Look across rooms and people to find the right place to start.</p></div>
      <form className="page-search" onSubmit={(event) => { event.preventDefault(); const input = new FormData(event.currentTarget).get("q")?.toString().trim(); if (input) navigate(`/search?q=${encodeURIComponent(input)}`); }}>
        <SearchIcon size={18} /><label className="sr-only" htmlFor="search-all">Search rooms and people</label><input id="search-all" name="q" key={query} defaultValue={query} placeholder="Try a room, creator, or activity" /><button className="button button-light" type="submit">Search <ArrowRight size={15} /></button>
      </form>
      <div className="search-tabs" role="tablist" aria-label="Search result type">{(["all", "rooms", "people"] as SearchScope[]).map((value) => <button key={value} role="tab" aria-selected={scope === value} className={scope === value ? "is-selected" : ""} onClick={() => setScope(value)}>{value === "all" ? "All results" : value === "rooms" ? "Rooms" : "People"}</button>)}</div>
      {loading && <LoadingState label="Searching rooms and people" />}
      {error && <ErrorState message={error} retry={retry} />}
      {data && !error && query.trim() && <>
        {rooms.length > 0 && <section className="content-section"><SectionHeading eyebrow="Places to play" title={`${rooms.length} ${rooms.length === 1 ? "room" : "rooms"}`} /><div className="room-grid">{rooms.map((room) => <RoomCard key={room.id} room={room} saved={saved.has(room.id)} onToggleSave={save} />)}</div></section>}
        {people.length > 0 && <section className="content-section"><SectionHeading eyebrow="Players and creators" title={`${people.length} ${people.length === 1 ? "person" : "people"}`} /><div className="creator-grid">{people.map((account) => <CreatorCard key={account.id} account={account} following={following.has(account.id)} onToggleFollow={follow} />)}</div></section>}
        {!rooms.length && !people.length && <EmptyState title={`No results for “${query}”`} message="Check the spelling or try another room, player, or tag." />}
      </>}
      {data && !query.trim() && <EmptyState title="What are you looking for?" message="Try a room name, a creator, or something you like to do." />}
      <div className="search-help"><Link className="text-link" href="/rooms">Browse rooms <ArrowRight size={14} /></Link><Link className="text-link" href="/people">Find people <ArrowRight size={14} /></Link></div>
    </div>
  );
}
