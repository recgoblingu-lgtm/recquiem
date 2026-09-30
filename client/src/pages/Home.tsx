import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { communityApi } from "@/data/api";
import type { Room } from "@/data/models";
import { EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/ContentStates";
import { RoomCard } from "@/components/RoomCard";
import { siteAssets } from "@/lib/assets";
import { useApiResource } from "@/lib/useApiResource";
import { useStoredIds } from "@/lib/useStoredIds";

const loadRooms = async () => communityApi.listRooms();

const featurePanels = [
  { title: "Cross-platform", text: "Join from VR, PC, PlayStation, or mobile.", image: siteAssets.features.crossPlatform, alt: "Rec Room players on different platforms" },
  { title: "Create", text: "Browse player-made spaces or build a room of your own.", image: siteAssets.features.create, alt: "Rec Room creation tools" },
  { title: "Compete", text: "Find paintball, team battles, and player-made challenges.", image: siteAssets.features.compete, alt: "Rec Room competitive play" },
  { title: "Cooperate", text: "Join a party for quests and cooperative rooms.", image: siteAssets.features.cooperate, alt: "Rec Room cooperative play" },
];

export default function HomePage() {
  const { data, loading, error, retry } = useApiResource(loadRooms);
  const saved = useStoredIds("recquiem:saved-rooms");
  const rooms = data ?? [];
  const featuredRooms = useMemo(() => rooms.filter((room) => room.featured).slice(0, 3), [rooms]);

  const handleSave = (room: Room) => {
    saved.toggle(room.id);
    toast(saved.has(room.id) ? "Removed from saved rooms." : "Saved for later.");
  };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src={siteAssets.hero} alt="RecQuiem community banner" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="hero-brand">
            <img src={siteAssets.face} alt="" aria-hidden="true" />
            <h1 id="hero-title">RecQuiem</h1>
          </div>
          <div className="hero-actions">
            <Link className="button button-light" href="/rooms">Explore rooms <ArrowRight size={16} /></Link>
            <Link className="hero-secondary-link" href="/people">People</Link>
          </div>
        </div>
      </section>

      <div className="page-container home-container">
        <section className="feature-section" aria-label="Rec Room features">
          {featurePanels.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-image"><img src={feature.image} alt={feature.alt} loading="lazy" /><span className="feature-number">0{index + 1}</span></div>
              <div className="feature-copy"><h2>{feature.title}</h2><p>{feature.text}</p></div>
            </article>
          ))}
        </section>

        {loading && <LoadingState label="Loading rooms" />}
        {error && <ErrorState message={error} retry={retry} />}
        {data && !error && (
          <section className="content-section">
            <SectionHeading title="Featured rooms" action={<Link href="/rooms" className="text-link">Browse all rooms <ArrowRight size={15} /></Link>} />
            {featuredRooms.length ? <div className="room-grid room-grid-featured">{featuredRooms.map((room) => <RoomCard key={room.id} room={room} saved={saved.has(room.id)} onToggleSave={handleSave} />)}</div> : <EmptyState title="No rooms available" message="Connect a rooms API to display listings." />}
          </section>
        )}
      </div>
    </>
  );
}
