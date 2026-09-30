import { LockKeyhole, Radio } from "lucide-react";
import { siteAssets } from "@/lib/assets";
import type { Account, RoomAccess } from "@/data/models";

export function Avatar({ account, size = "medium" }: { account?: Account; size?: "small" | "medium" | "large" }) {
  return (
    <span className={`avatar avatar-${size}`}>
      <img src={account?.avatar ?? siteAssets.face} alt={account ? `${account.displayName}'s avatar` : "Community avatar"} />
    </span>
  );
}

export function PresenceLabel({ account }: { account: Account }) {
  return <span className={`presence-label presence-label-${account.presence}`}><i />{account.presence}</span>;
}

export function AccessLabel({ access }: { access: RoomAccess }) {
  return access === "open" ? <span className="quiet-status"><Radio size={14} />Open to join</span> : <span className="quiet-status"><LockKeyhole size={14} />{access === "friends" ? "Friends only" : "Invite only"}</span>;
}
