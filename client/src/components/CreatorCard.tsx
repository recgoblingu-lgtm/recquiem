import { Link } from "wouter";
import { Check, Plus, Users } from "lucide-react";
import type { Account } from "@/data/models";

export function CreatorCard({ account, following, onToggleFollow }: { account: Account; following?: boolean; onToggleFollow?: (account: Account) => void }) {
  return (
    <article className="creator-card">
      <Link className="creator-profile-link" href={`/people/${account.id}`} aria-label={`Open ${account.displayName}'s profile`}>
        <span className="avatar-wrap"><img className="creator-avatar" src={account.avatar} alt="" /><i className={`presence-dot presence-${account.presence}`} aria-label={account.presence} /></span>
        <span className="creator-name-block"><strong>{account.displayName}</strong><span>@{account.username}</span></span>
      </Link>
      <p className="creator-bio">{account.bio}</p>
      <div className="creator-meta"><span><Users size={14} />{account.followers.toLocaleString()} followers</span><span>{account.createdRooms} rooms</span></div>
      <div className="creator-card-footer">
        <span>{account.interests.slice(0, 2).join(" · ")}</span>
        {onToggleFollow && <button className={`button button-small${following ? " button-following" : " button-outline"}`} aria-pressed={following} onClick={() => onToggleFollow(account)}>{following ? <Check size={14} /> : <Plus size={14} />}{following ? "Following" : "Follow"}</button>}
      </div>
    </article>
  );
}
