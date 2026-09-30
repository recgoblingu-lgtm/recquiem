import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export function LoginPage() {
  return <div className="page-container inner-page info-page"><Link href="/" className="back-link"><ArrowLeft size={15} />Back home</Link><div className="info-panel"><p className="eyebrow">Your RecQuiem account</p><h1>Welcome back.</h1><p className="page-lede">Sign-in for your account is handled by RecQuiem. Continue to the current account page to sign in securely.</p><a className="button button-light" href="https://recquiem.net/Login.html" target="_blank" rel="noreferrer">Continue to RecQuiem <ExternalLink size={15} /></a><p className="info-note">Your password is never entered on this community preview.</p></div></div>;
}

export function ProfilePage() {
  return <div className="page-container inner-page info-page"><Link href="/" className="back-link"><ArrowLeft size={15} />Back home</Link><div className="info-panel"><p className="eyebrow">Your profile</p><h1>Your RecQuiem account.</h1><p className="page-lede">Follow creators, keep your favorite rooms close, and pick up where you left off on the current RecQuiem account site.</p><a className="button button-light" href="https://recquiem.net/Profile.html" target="_blank" rel="noreferrer">Open your profile <ExternalLink size={15} /></a><p className="info-note">Saved rooms and follows on this preview stay in this browser.</p></div><div className="profile-summary-note"><Link className="text-link" href="/people">Find creators <ArrowRight size={14} /></Link></div></div>;
}

export function PrivacyPage() {
  return <div className="page-container inner-page info-page"><div className="page-intro"><p className="eyebrow">Community information</p><h1>Privacy policy</h1><p className="page-lede">The official policy is maintained on the RecQuiem website. Please use that current page for the full details.</p></div><a className="button button-outline" href="https://recquiem.net/PrivacyPolicy.html" target="_blank" rel="noreferrer">Read the official policy <ExternalLink size={15} /></a><p className="info-note">This companion site is using preview data and does not collect account credentials.</p></div>;
}

export function CreditsPage() {
  return <div className="page-container inner-page info-page"><Link href="/" className="back-link"><ArrowLeft size={15} />Back home</Link><div className="page-intro"><p className="eyebrow">People behind the community</p><h1>Credits</h1><p className="page-lede">RecQuiem is built around the people who play, create, and keep the rooms going.</p></div><div className="credits-panel"><h2>Published RecQuiem team credits</h2><dl><div><dt>Game owner</dt><dd>Holt · _jesusislord_holt_</dd></div><div><dt>Website developer</dt><dd>BlueMan · blueman_yt</dd></div><div><dt>Main game developer</dt><dd>Holt · _jesusislord_holt_</dd></div><div><dt>Game developers</dt><dd>Many other community contributors</dd></div></dl><p>Original brand images and site artwork are reused from the owner-provided RecQuiem reference.</p><a className="text-link" href="https://recquiem.net/Credit.html" target="_blank" rel="noreferrer">See original credits <ArrowRight size={14} /></a></div></div>;
}
