import { useCallback, useState } from "react";
import { Crown, Medal } from "lucide-react";
import { Link } from "wouter";
import { communityApi, hasCommunityApi } from "@/data/api";
import type { LeaderboardEntry } from "@/data/models";
import { Avatar } from "@/components/CommunityBits";
import { EmptyState, ErrorState, LoadingState } from "@/components/ContentStates";
import { useApiResource } from "@/lib/useApiResource";

const periods: { key: LeaderboardEntry["period"]; label: string }[] = [
  { key: "week", label: "This week" },
  { key: "month", label: "This month" },
  { key: "all-time", label: "All time" },
];
const loadAccounts = () => communityApi.listAccounts();

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<LeaderboardEntry["period"]>("week");
  const load = useCallback(() => communityApi.getLeaderboard(period), [period]);
  const { data: rows, loading, error, retry } = useApiResource(load);
  const { data: accounts } = useApiResource(loadAccounts);

  if (!hasCommunityApi) {
    return <div className="page-container inner-page"><div className="page-intro"><h1>Leaderboard</h1><p className="page-lede">Rankings are hidden until a leaderboard API is connected.</p></div><EmptyState title="No leaderboard connected" message="Connect a leaderboard API to display rankings." /></div>;
  }

  return (
    <div className="page-container inner-page">
      <div className="page-intro"><h1>Leaderboard</h1><p className="page-lede">Rankings returned by the connected API.</p></div>
      <div className="search-tabs leaderboard-tabs" role="tablist" aria-label="Leaderboard time period">{periods.map((item) => <button key={item.key} role="tab" aria-selected={period === item.key} className={period === item.key ? "is-selected" : ""} onClick={() => setPeriod(item.key)}>{item.label}</button>)}</div>
      {loading && <LoadingState label="Loading rankings" />}{error && <ErrorState message={error} retry={retry} />}
      {rows && !error && accounts && (rows.length ? <section className="leaderboard-list" aria-label={`${period} leaderboard`}>
        {rows.map((row, index) => {
          const account = accounts.find((person) => person.id === row.accountId);
          if (!account) return null;
          return <article className={`leaderboard-row${index < 3 ? " leaderboard-top-three" : ""}`} key={row.accountId}><span className="rank-number">{index === 0 ? <Crown size={18} /> : index < 3 ? <Medal size={17} /> : String(index + 1).padStart(2, "0")}</span><Avatar account={account} size="medium" /><div className="rank-person"><Link href={`/people/${account.id}`}>{account.displayName}</Link><span>@{account.username}</span></div><span className="rank-label">{row.label}</span><div className="rank-score"><strong>{row.score.toLocaleString()}</strong><span>points</span></div></article>;
        })}
      </section> : <EmptyState title="No rankings available" message="The connected API has not returned leaderboard entries." />)}
    </div>
  );
}
