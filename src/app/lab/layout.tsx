import {
  Alex_Brush,
  Arizonia,
  Birthstone,
  Clicker_Script,
  Cookie,
  Courgette,
  Dancing_Script,
  Dynalight,
  Eagle_Lake,
  Ephesis,
  Felipa,
  Great_Vibes,
  IBM_Plex_Mono,
  Imperial_Script,
  Inspiration,
  Jim_Nightshade,
  Kaushan_Script,
  Luxurious_Script,
  Marck_Script,
  Miss_Fajardose,
  Monsieur_La_Doulaise,
  Mr_Dafoe,
  Mrs_Saint_Delafield,
  Niconne,
  Norican,
  Parisienne,
  Petit_Formal_Script,
  Pinyon_Script,
  Playball,
  Qwigley,
  Rouge_Script,
  Sacramento,
  Satisfy,
  Seaweed_Script,
  Stalemate,
  Style_Script,
  Tangerine,
  Updock,
  Whisper,
  WindSong,
  Yellowtail,
} from "next/font/google";

const labMono = IBM_Plex_Mono({
  variable: "--font-lab-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** Lab gallery primaries (also used as compare anchors). */
const labGreatVibes = Great_Vibes({
  variable: "--font-lab-great-vibes",
  subsets: ["latin"],
  weight: "400",
});
const labPinyon = Pinyon_Script({
  variable: "--font-lab-pinyon",
  subsets: ["latin"],
  weight: "400",
});
const labTangerine = Tangerine({
  variable: "--font-lab-tangerine",
  subsets: ["latin"],
  weight: "400",
});
const labAlexBrush = Alex_Brush({
  variable: "--font-lab-alex-brush",
  subsets: ["latin"],
  weight: "400",
});
const labSacramento = Sacramento({
  variable: "--font-lab-sacramento",
  subsets: ["latin"],
  weight: "400",
});
const labRouge = Rouge_Script({
  variable: "--font-lab-rouge",
  subsets: ["latin"],
  weight: "400",
});
const labMrDafoe = Mr_Dafoe({
  variable: "--font-lab-mr-dafoe",
  subsets: ["latin"],
  weight: "400",
});

/** Three eye-inspection variants per primary specimen. */
const labParisienne = Parisienne({
  variable: "--font-lab-parisienne",
  subsets: ["latin"],
  weight: "400",
});
const labNorican = Norican({
  variable: "--font-lab-norican",
  subsets: ["latin"],
  weight: "400",
});
const labArizonia = Arizonia({
  variable: "--font-lab-arizonia",
  subsets: ["latin"],
  weight: "400",
});
const labNiconne = Niconne({
  variable: "--font-lab-niconne",
  subsets: ["latin"],
  weight: "400",
});
const labPetitFormal = Petit_Formal_Script({
  variable: "--font-lab-petit-formal",
  subsets: ["latin"],
  weight: "400",
});
const labClicker = Clicker_Script({
  variable: "--font-lab-clicker",
  subsets: ["latin"],
  weight: "400",
});
const labEphesis = Ephesis({
  variable: "--font-lab-ephesis",
  subsets: ["latin"],
  weight: "400",
});
const labPlayball = Playball({
  variable: "--font-lab-playball",
  subsets: ["latin"],
  weight: "400",
});
const labStyleScript = Style_Script({
  variable: "--font-lab-style-script",
  subsets: ["latin"],
  weight: "400",
});
const labWindSong = WindSong({
  variable: "--font-lab-windsong",
  subsets: ["latin"],
  weight: "400",
});
const labBirthstone = Birthstone({
  variable: "--font-lab-birthstone",
  subsets: ["latin"],
  weight: "400",
});
const labInspiration = Inspiration({
  variable: "--font-lab-inspiration",
  subsets: ["latin"],
  weight: "400",
});
const labCourgette = Courgette({
  variable: "--font-lab-courgette",
  subsets: ["latin"],
  weight: "400",
});
const labSatisfy = Satisfy({
  variable: "--font-lab-satisfy",
  subsets: ["latin"],
  weight: "400",
});
const labCookie = Cookie({
  variable: "--font-lab-cookie",
  subsets: ["latin"],
  weight: "400",
});
const labYellowtail = Yellowtail({
  variable: "--font-lab-yellowtail",
  subsets: ["latin"],
  weight: "400",
});
const labKaushan = Kaushan_Script({
  variable: "--font-lab-kaushan",
  subsets: ["latin"],
  weight: "400",
});
const labMarck = Marck_Script({
  variable: "--font-lab-marck",
  subsets: ["latin"],
  weight: "400",
});
const labSeaweed = Seaweed_Script({
  variable: "--font-lab-seaweed",
  subsets: ["latin"],
  weight: "400",
});
const labDynalight = Dynalight({
  variable: "--font-lab-dynalight",
  subsets: ["latin"],
  weight: "400",
});
const labQwigley = Qwigley({
  variable: "--font-lab-qwigley",
  subsets: ["latin"],
  weight: "400",
});
const labDancing = Dancing_Script({
  variable: "--font-lab-dancing",
  subsets: ["latin"],
  weight: "400",
});
const labStalemate = Stalemate({
  variable: "--font-lab-stalemate",
  subsets: ["latin"],
  weight: "400",
});
const labWhispers = Whisper({
  variable: "--font-lab-whispers",
  subsets: ["latin"],
  weight: "400",
});
const labLuxurious = Luxurious_Script({
  variable: "--font-lab-luxurious",
  subsets: ["latin"],
  weight: "400",
});
const labImperial = Imperial_Script({
  variable: "--font-lab-imperial",
  subsets: ["latin"],
  weight: "400",
});
const labUpdock = Updock({
  variable: "--font-lab-updock",
  subsets: ["latin"],
  weight: "400",
});
const labMonsieur = Monsieur_La_Doulaise({
  variable: "--font-lab-monsieur",
  subsets: ["latin"],
  weight: "400",
});
const labMrsSaint = Mrs_Saint_Delafield({
  variable: "--font-lab-mrs-saint",
  subsets: ["latin"],
  weight: "400",
});
const labMissFajardos = Miss_Fajardose({
  variable: "--font-lab-miss-fajardos",
  subsets: ["latin"],
  weight: "400",
});
const labEagleLake = Eagle_Lake({
  variable: "--font-lab-eagle-lake",
  subsets: ["latin"],
  weight: "400",
});
const labFelipa = Felipa({
  variable: "--font-lab-felipa",
  subsets: ["latin"],
  weight: "400",
});
const labJimNightshade = Jim_Nightshade({
  variable: "--font-lab-jim-nightshade",
  subsets: ["latin"],
  weight: "400",
});

const labFontVars = [
  labMono.variable,
  labGreatVibes.variable,
  labPinyon.variable,
  labTangerine.variable,
  labAlexBrush.variable,
  labSacramento.variable,
  labRouge.variable,
  labMrDafoe.variable,
  labParisienne.variable,
  labNorican.variable,
  labArizonia.variable,
  labNiconne.variable,
  labPetitFormal.variable,
  labClicker.variable,
  labEphesis.variable,
  labPlayball.variable,
  labStyleScript.variable,
  labWindSong.variable,
  labBirthstone.variable,
  labInspiration.variable,
  labCourgette.variable,
  labSatisfy.variable,
  labCookie.variable,
  labYellowtail.variable,
  labKaushan.variable,
  labMarck.variable,
  labSeaweed.variable,
  labDynalight.variable,
  labQwigley.variable,
  labDancing.variable,
  labStalemate.variable,
  labWhispers.variable,
  labLuxurious.variable,
  labImperial.variable,
  labUpdock.variable,
  labMonsieur.variable,
  labMrsSaint.variable,
  labMissFajardos.variable,
  labEagleLake.variable,
  labFelipa.variable,
  labJimNightshade.variable,
].join(" ");

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  return <div className={`lab-shell ${labFontVars}`}>{children}</div>;
}
