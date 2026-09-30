import { LockKeyhole, Bookmark, Users } from "lucide-react";
import { Link } from "wouter";
import type { Room } from "@/data/models";

export function RoomCard({ room, saved, onToggleSave }: { room: Room; saved?: boolean; onToggleSave?: (room: Room) => void }) {
  return (
    <article className="room-card">
      <Link href={`/rooms/${room.id}`} className="room-card-cover-link" aria-label={`View ${room.title}`}>
        <div className="room-card-cover">
          <img src={room.artwork} alt={`${room.title} room artwork`} loading="lazy" />
          <span className="room-category">{room.category}</span>
          <span className={`room-access${room.access !== "open" ? " access-private" : ""}`} title={room.access === "open" ? "Open room" : "Access by invitation or friends"}>
            {room.access === "open" ? "Open" : <><LockKeyhole size={12} /> {room.access === "friends" ? "Friends" : "Invite"}</>}
          </span>
        </div>
      </Link>
      <div className="room-card-body">
        <div className="room-card-title-row">
          <div className="room-card-title-wrap">
            <Link href={`/rooms/${room.id}`} className="room-title">{room.title}</Link>
            <Link href={`/people/${room.creatorId}`} className="room-creator">by {room.creatorName}</Link>
          </div>
          {onToggleSave && (
            <button className={`icon-button save-button${saved ? " is-saved" : ""}`} onClick={() => onToggleSave(room)} aria-label={saved ? `Remove ${room.title} from saved rooms` : `Save ${room.title}`} aria-pressed={saved}>
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
            </button>
          )}
        </div>
        <p className="room-description">{room.description}</p>
        <div className="room-card-meta">
          <span><Users size={14} />{room.players} / {room.capacity}</span>
          <span>{room.platforms.length} platforms</span>
          <span>{room.updatedAt}</span>
        </div>
        <div className="tag-row">{room.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}
