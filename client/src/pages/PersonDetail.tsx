import { useCallback } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Users } from "lucide-react";
import { Link, useRoute } from "wouter";
import { toast } from "sonner";
import { communityApi } from "@/data/api";
import type { Room } from "@/data/models";
import { PresenceLabel } from "@/components/CommunityBits";
import { EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/ContentStates";
import { RoomCard } from "@/components/RoomCard";
import { useApiResource } from "@/lib/useApiResource";
import { useStoredIds } from "@/lib/useStoredIds";

const loadRooms = () => communityApi.listRooms();
const fallbackCover = `${import.meta.env.BASE_URL}reference-assets/Icons/Create.jpg`;

export default function PersonDetailPage() {
  const [, params] = useRoute("/people/:id");
  const id = params?.id ?? "";
  const loadProfile = useCallback(() => communityApi.getAccount(id), [id]);
  const { data: account, loading, error, retry } = useApiResource(loadProfile);
  const { data: allRooms } = useApiResource(loadRooms);
  const following = useStoredIds("recquiem:following");
  const saved = useStoredIds("recquiem:saved-rooms");

  if (loading) return <div className="page-container inner-page"><LoadingState label="Loading creator profile" /></div>;
  if (error) return <div className="page-container inner-page"><ErrorState message={error} retry={retry} /></div>;
  if (!account) return <div className="page-container inner-page"><EmptyState title="Profile not found" message="This creator's profile may be unavailable. Try searching the rest of the community." /><Link className="text-link" href="/people"><ArrowLeft size={15} />Back to people</Link></div>;

  const toggleFollow = () => {
    following.toggle(account.id);
    toast(following.has(account.id) ? `Unfollowed ${account.displayName}.` : `Following ${account.displayName}.`);
  };
  const created = allRooms?.filter((room) => room.creatorId === account.id) ?? [];
  const saveRoom = (room: Room) => { saved.toggle(room.id); toast(saved.has(room.id) ? "Removed from saved rooms." : "Saved for later."); };

  return (
    <div className="page-container inner-page">
      <Link href="/people" className="back-link"><ArrowLeft size={15} />All people</Link>
      <article className="profile-card">
        <div className="profile-cover"><img src={created[0]?.artwork ?? fallbackCover} alt="" /></div>
        <div className="profile-body">
          <div className="profile-avatar"><img src={account.avatar} alt={`${account.displayName}'s avatar`} /></div>
          <div className="profile-main-row"><div><p className="eyebrow">Community creator</p><h1>{account.displayName}</h1><p className="profile-handle">@{account.username}</p></div><div className="profile-action"><PresenceLabel account={account} /><button className={`button${following.has(account.id) ? " button-following" : " button-light"}`} aria-pressed={following.has(account.id)} onClick={toggleFollow}>{following.has(account.id) ? "Following" : "Follow creator"}</button></div></div>
          <p className="profile-bio">{account.bio}</p>
          <div className="profile-stats"><span><strong>{account.followers.toLocaleString()}</strong> followers</span><span><strong>{account.createdRooms}</strong> rooms created</span><span><CalendarDays size={14} />{account.joinedAt}</span></div>
          <div className="tag-row">{account.interests.map((interest) => <span className="tag" key={interest}>{interest}</span>)}</div>
        </div>
      </article>
      <section className="content-section"><SectionHeading eyebrow={`Made by ${account.displayName}`} title="Rooms from this creator" action={<span className="quiet-status"><Users size={14} />{created.length} in this guide</span>} />{created.length ? <div className="room-grid">{created.map((room) => <RoomCard key={room.id} room={room} saved={saved.has(room.id)} onToggleSave={saveRoom} />)}</div> : <EmptyState title="No room listings yet" message="New creations from this account will appear here." />}</section>
      <section className="profile-summary-note"><ArrowRight size={16} /><p>Account pages can connect to public profile endpoints when they are ready.</p></section>
    </div>
  );
}
