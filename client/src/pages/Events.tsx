import { useMemo } from "react";
import { CalendarDays, Clock3, Users } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { communityApi, hasCommunityApi } from "@/data/api";
import type { CommunityEvent } from "@/data/models";
import { EmptyState, ErrorState, LoadingState, SectionHeading } from "@/components/ContentStates";
import { useApiResource } from "@/lib/useApiResource";
import { useStoredIds } from "@/lib/useStoredIds";

const loadEvents = () => communityApi.listEvents();
const formatEventDate = (value: string) => new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));

export default function EventsPage() {
  const { data: events, loading, error, retry } = useApiResource(loadEvents);
  const going = useStoredIds("recquiem:event-rsvps");
  const upcoming = useMemo(() => events ? [...events].sort((a, b) => a.startsAt.localeCompare(b.startsAt)) : [], [events]);
  const toggleGoing = (event: CommunityEvent) => {
    going.toggle(event.id);
    toast(going.has(event.id) ? "Your RSVP was removed." : `You're on the list for ${event.title}.`);
  };

  return (
    <div className="page-container inner-page">
      <div className="page-intro"><h1>Events</h1><p className="page-lede">Community events appear when an events API is connected.</p></div>
      <section className="events-list-section"><SectionHeading title="Events" action={<span className="quiet-status"><CalendarDays size={14} />{events?.length ?? "—"} listed</span>} />
        {loading && <LoadingState label="Loading events" />}{error && <ErrorState message={error} retry={retry} />}
        {events && !error && (upcoming.length ? <div className="events-grid">{upcoming.map((event) => <article className="event-card" key={event.id}><Link href={`/rooms/${event.roomId}`} className="event-cover"><img src={event.artwork} alt={`${event.category} event artwork`} loading="lazy" /><span className="room-category">{event.category}</span></Link><div className="event-card-body"><p className="eyebrow">{formatEventDate(event.startsAt)}</p><h2><Link href={`/rooms/${event.roomId}`}>{event.title}</Link></h2><p>{event.description}</p><div className="event-meta"><span><Clock3 size={14} />{event.roomName}</span><span><Users size={14} />{event.attendees + (going.has(event.id) ? 1 : 0)} going</span></div><div className="event-card-footer"><Link href={`/people/${event.hostId}`} className="event-host">Hosted by {event.hostId}</Link><button className={`button button-small${going.has(event.id) ? " button-following" : " button-outline"}`} aria-pressed={going.has(event.id)} onClick={() => toggleGoing(event)}>{going.has(event.id) ? "Going" : "Join event"}</button></div></div></article>)}</div> : <EmptyState title={hasCommunityApi ? "No events available" : "No event data available"} message={!hasCommunityApi ? "Connect an events API to display events." : "No events have been returned by the API."} />)}
      </section>
    </div>
  );
}
