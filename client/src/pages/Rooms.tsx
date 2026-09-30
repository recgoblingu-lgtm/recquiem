import { useMemo, useState } from "react";
import { BookmarkCheck, ListFilter, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { communityApi, hasCommunityApi } from "@/data/api";
import type { Platform, Room } from "@/data/models";
import { EmptyState, ErrorState, LoadingState } from "@/components/ContentStates";
import { RoomCard } from "@/components/RoomCard";
import { useApiResource } from "@/lib/useApiResource";
import { useStoredIds } from "@/lib/useStoredIds";

const loadRooms = () => communityApi.listRooms();
const categories = ["All rooms", "Hangout", "Competition", "Cooperation", "Creation", "Challenge"];

export default function RoomsPage() {
  const { data: rooms, loading, error, retry } = useApiResource(loadRooms);
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("All rooms");
  const [platform, setPlatform] = useState("All platforms");
  const [sort, setSort] = useState("popular");
  const [showSaved, setShowSaved] = useState(false);
  const [visible, setVisible] = useState(6);
  const saved = useStoredIds("recquiem:saved-rooms");

  const filtered = useMemo(() => {
    if (!rooms) return [];
    const normalized = term.trim().toLowerCase();
    const result = rooms.filter((room) => {
      const matchesTerm = !normalized || [room.title, room.creatorName, room.description, ...room.tags].some((value) => value.toLowerCase().includes(normalized));
      const matchesCategory = category === "All rooms" || room.category === category;
      const matchesPlatform = platform === "All platforms" || room.platforms.includes(platform as Platform);
      const matchesSaved = !showSaved || saved.has(room.id);
      return matchesTerm && matchesCategory && matchesPlatform && matchesSaved;
    });
    return [...result].sort((a, b) => sort === "players" ? b.players - a.players : sort === "recent" ? a.updatedAt.localeCompare(b.updatedAt) : b.players / b.capacity - a.players / a.capacity);
  }, [rooms, term, category, platform, sort, showSaved, saved.ids]);

  const toggleSave = (room: Room) => {
    saved.toggle(room.id);
    toast(saved.has(room.id) ? "Removed from saved rooms." : "Saved for later.");
  };

  return (
    <div className="page-container inner-page">
      <div className="page-intro page-intro-row"><div><p className="eyebrow">Find somewhere to go</p><h1>Explore rooms</h1><p className="page-lede">Player-made spaces for a quick round, a long night, and everything between.</p></div><div className="page-intro-side"><span className="quiet-status"><ListFilter size={14} />{rooms?.length ?? "—"} rooms in the guide</span></div></div>
      <section className="directory-toolbar" aria-label="Room search and filters">
        <div className="directory-search"><Search size={17} /><label className="sr-only" htmlFor="room-search">Search rooms</label><input id="room-search" value={term} onChange={(event) => { setTerm(event.target.value); setVisible(6); }} placeholder="Search by room, creator, or tag" /></div>
        <label className="select-wrap"><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="select-wrap"><span className="sr-only">Filter by platform</span><select value={platform} onChange={(event) => setPlatform(event.target.value)}>{["All platforms", "VR", "PC", "PlayStation", "iOS", "Android"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="select-wrap sort-wrap"><SlidersHorizontal size={15} /><span className="sr-only">Sort rooms</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Most active</option><option value="players">Most players</option><option value="recent">Recently updated</option></select></label>
        <button className={`button button-quiet saved-filter${showSaved ? " is-selected" : ""}`} aria-pressed={showSaved} onClick={() => setShowSaved((value) => !value)}><BookmarkCheck size={15} />Saved</button>
      </section>
      <div className="results-line" aria-live="polite">{loading ? "Loading rooms…" : error ? "Rooms unavailable" : `${filtered.length} ${filtered.length === 1 ? "room" : "rooms"}`}{(term || category !== "All rooms" || platform !== "All platforms" || showSaved) && <button onClick={() => { setTerm(""); setCategory("All rooms"); setPlatform("All platforms"); setShowSaved(false); setVisible(6); }}>Clear filters</button>}</div>
      {loading && <LoadingState label="Loading community rooms" />}
      {error && <ErrorState message={error} retry={retry} />}
      {rooms && !error && <>
        {filtered.length ? <div className="room-grid">{filtered.slice(0, visible).map((room) => <RoomCard key={room.id} room={room} saved={saved.has(room.id)} onToggleSave={toggleSave} />)}</div> : <EmptyState title={hasCommunityApi ? "No rooms found" : "No rooms available"} message={!hasCommunityApi ? "Connect a rooms API to display listings." : showSaved ? "No saved rooms match these filters." : "Try another name or remove one of the filters."} />}
        {filtered.length > visible && <div className="load-more-wrap"><button className="button button-outline" onClick={() => setVisible((count) => count + 6)}>Show more rooms</button></div>}
      </>}
    </div>
  );
}
