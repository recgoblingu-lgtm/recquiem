import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Bookmark, Clock3, Users } from "lucide-react";
import { Link, useRoute } from "wouter";
import { toast } from "sonner";
import { communityApi } from "@/data/api";
import type { Room } from "@/data/models";
import { AccessLabel } from "@/components/CommunityBits";
import { EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/ContentStates";
import { RoomCard } from "@/components/RoomCard";
import { useApiResource } from "@/lib/useApiResource";
import { siteAssets } from "@/lib/assets";
import { useStoredIds } from "@/lib/useStoredIds";

const loadRooms = () => communityApi.listRooms();

export default function RoomDetailPage() {
  const [, params] = useRoute("/rooms/:id");
  const id = params?.id ?? "";
  const load = useMemo(() => () => communityApi.getRoom(id), [id]);
  const { data: room, loading, error, retry } = useApiResource(load);
  const { data: rooms } = useApiResource(loadRooms);
  const saved = useStoredIds("recquiem:saved-rooms");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (loading) return <div className="page-container inner-page"><LoadingState label="Loading room details" /></div>;
  if (error) return <div className="page-container inner-page"><ErrorState message={error} retry={retry} /></div>;
  if (!room) return <div className="page-container inner-page"><EmptyState title="That room could not be found" message="It may have been removed or renamed. Explore the rest of the community instead." /><Link href="/rooms" className="text-link"><ArrowLeft size={15} />Back to rooms</Link></div>;

  const toggleSave = (item: Room) => {
    saved.toggle(item.id);
    toast(saved.has(item.id) ? "Removed from saved rooms." : "Saved for later.");
  };
  const related = rooms?.filter((item) => item.id !== room.id && (item.category === room.category || item.tags.some((tag) => room.tags.includes(tag)))).slice(0, 3) ?? [];
  const gallery = room.gallery?.length ? room.gallery : [room.artwork, siteAssets.features.create, siteAssets.features.crossPlatform];
  const activeImage = gallery[Math.min(activeImageIndex, gallery.length - 1)] ?? room.artwork;

  return (
    <div className="page-container inner-page">
      <Link href="/rooms" className="back-link"><ArrowLeft size={15} />All rooms</Link>
      <article className="room-detail">
        <div className="room-detail-art"><img src={activeImage} alt={`${room.title} artwork, image ${Math.min(activeImageIndex, gallery.length - 1) + 1} of ${gallery.length}`} /><span className="room-category">{room.category}</span><div className="room-gallery-picker" role="group" aria-label="Room artwork">{gallery.map((image, index) => <button type="button" key={image} className={activeImageIndex === index ? "is-active" : ""} aria-label={`Show room image ${index + 1}`} aria-pressed={activeImageIndex === index} onClick={() => setActiveImageIndex(index)}><img src={image} alt="" /></button>)}</div><span className="room-detail-count"><Users size={15} />{room.players} playing</span></div>
        <div className="room-detail-content">
          <div className="room-detail-heading"><div><p className="eyebrow">Community room</p><h1>{room.title}</h1><p className="room-detail-byline">Created by <Link href={`/people/${room.creatorId}`}>{room.creatorName}</Link></p></div><button className={`button button-outline${saved.has(room.id) ? " is-selected" : ""}`} aria-pressed={saved.has(room.id)} onClick={() => toggleSave(room)}><Bookmark size={15} fill={saved.has(room.id) ? "currentColor" : "none"} />{saved.has(room.id) ? "Saved" : "Save room"}</button></div>
          <p className="room-detail-description">{room.description}</p>
          <div className="detail-badges"><AccessLabel access={room.access} /><span className="quiet-status"><Users size={14} />{room.players} / {room.capacity} players</span><span className="quiet-status"><Clock3 size={14} />{room.updatedAt}</span></div>
          <div className="detail-block"><h2>About this room</h2><p>Come by for {room.category.toLowerCase()} with the community. Bring a friend, find your place, and see where the session takes you.</p><div className="tag-row">{room.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
          <div className="detail-block"><h2>Platforms</h2><div className="tag-row">{room.platforms.map((value) => <span className="tag tag-platform" key={value}>{value}</span>)}</div></div>
          <div className="room-detail-actions"><button className="button button-light" onClick={() => toast("Room destinations will appear here when play links are connected.")}>Visit room <ArrowRight size={15} /></button><span>Play with friends across platforms</span></div>
        </div>
      </article>
      {related.length > 0 && <section className="content-section"><SectionHeading eyebrow="More like this" title="Keep exploring" action={<Link className="text-link" href="/rooms">All rooms <ArrowRight size={15} /></Link>} /><div className="room-grid room-grid-featured">{related.map((item) => <RoomCard key={item.id} room={item} saved={saved.has(item.id)} onToggleSave={toggleSave} />)}</div></section>}
    </div>
  );
}
