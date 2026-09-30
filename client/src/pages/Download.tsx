import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const platformChoices = [
  { id: "ios", name: "iOS", description: "Play on iPhone and iPad.", regular: "Apple.png", selected: "SApple.png" },
  { id: "android", name: "Android", description: "Take your rooms with you.", regular: "Android.png", selected: "SAndroid.png" },
  { id: "quest", name: "Meta Quest", description: "Step into the room in VR.", regular: "Meta.png", selected: "SMeta.png" },
  { id: "playstation", name: "PlayStation", description: "Meet up on PlayStation.", regular: "PS.png", selected: "SPS.png" },
  { id: "pc", name: "PC", description: "Play on Windows desktop.", regular: "PC.png", selected: "SPC.png" },
  { id: "steam", name: "Steam", description: "Launch through Steam.", regular: "Steam.png", selected: "SSteam.png" },
];

export default function DownloadPage() {
  const [selected, setSelected] = useState("quest");
  return (
    <div className="page-container inner-page">
      <div className="page-intro"><p className="eyebrow">Pick your platform</p><h1>Play your way.</h1><p className="page-lede">Join RecQuiem on the device that feels right. The community reaches across screens and headsets.</p></div>
      <div className="platform-grid" role="group" aria-label="Select a platform">
        {platformChoices.map((platform) => {
          const active = selected === platform.id;
          return <button className={`platform-card${active ? " is-selected" : ""}`} key={platform.id} aria-pressed={active} onClick={() => setSelected(platform.id)}><span className="platform-icon-frame"><img src={`/reference-assets/Icons/Download/${active ? platform.selected : platform.regular}`} alt="" /></span><span className="platform-card-copy"><strong>{platform.name}</strong><span>{platform.description}</span></span>{active && <Check className="platform-check" size={17} />}</button>;
        })}
      </div>
      <section className="platform-detail"><div><p className="eyebrow">Selected platform</p><h2>{platformChoices.find((item) => item.id === selected)?.name}</h2><p>{platformChoices.find((item) => item.id === selected)?.description} Room destinations can be added here when the platform links are ready.</p></div><button className="button button-light" onClick={() => toast("The official platform link will appear here once it is confirmed.")}>Platform information <ArrowRight size={15} /></button></section>
    </div>
  );
}
