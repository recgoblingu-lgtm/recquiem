import { Toaster } from "sonner";
import { Route, Switch, Link } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteShell } from "./components/SiteShell";
import HomePage from "./pages/Home";
import RoomsPage from "./pages/Rooms";
import RoomDetailPage from "./pages/RoomDetail";
import PeoplePage from "./pages/People";
import PersonDetailPage from "./pages/PersonDetail";
import LeaderboardPage from "./pages/Leaderboard";
import EventsPage from "./pages/Events";
import DownloadPage from "./pages/Download";
import SearchPage from "./pages/Search";
import { CreditsPage, LoginPage, PrivacyPage, ProfilePage } from "./pages/Information";

function MissingPage() {
  return <div className="page-container inner-page missing-page"><p className="eyebrow">Nothing here yet</p><h1>That page has moved.</h1><p className="page-lede">Find your way back to the rooms and people waiting in RecQuiem.</p><Link className="button button-outline" href="/">Back home</Link></div>;
}

function CommunityRoutes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/rooms" component={RoomsPage} />
      <Route path="/rooms/:id" component={RoomDetailPage} />
      <Route path="/people" component={PeoplePage} />
      <Route path="/people/:id" component={PersonDetailPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/download" component={DownloadPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/credits" component={CreditsPage} />
      <Route component={MissingPage} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <SiteShell><CommunityRoutes /></SiteShell>
      <Toaster theme="dark" position="bottom-right" closeButton toastOptions={{ className: "recquiem-toast" }} />
    </ErrorBoundary>
  );
}
