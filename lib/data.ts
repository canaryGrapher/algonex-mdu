import contactsJson from "@/data/contacts.json";
import eventJson from "@/data/event.json";
import faqJson from "@/data/faq.json";
import judgingJson from "@/data/judging.json";
import perksJson from "@/data/perks.json";
import prizesJson from "@/data/prizes.json";
import siteJson from "@/data/site.json";
import sponsorsJson from "@/data/sponsors.json";
import timelineJson from "@/data/timeline.json";
import tracksJson from "@/data/tracks.json";
import type {
  Contact,
  FaqItem,
  JudgingStage,
  NavItem,
  Partner,
  Perk,
  PodiumPrize,
  SpecialAward,
  SponsorTier,
  Stat,
  TimelineItem,
  Track,
} from "./types";

/** Single typed entry point for every JSON file in /data. */
export const event = eventJson;
export const site = {
  ...siteJson,
  nav: siteJson.nav as NavItem[],
  stats: siteJson.stats as Stat[],
};
export const prizes = {
  ...prizesJson,
  podium: prizesJson.podium as PodiumPrize[],
  specialAwards: prizesJson.specialAwards as SpecialAward[],
};
export const timeline = timelineJson.items as TimelineItem[];
export const judging = {
  ...judgingJson,
  stages: judgingJson.stages as JudgingStage[],
};
export const tracks = { ...tracksJson, items: tracksJson.items as Track[] };
export const perks = {
  ...perksJson,
  welcomeKit: perksJson.welcomeKit as Perk[],
  takeHome: perksJson.takeHome as Perk[],
  onGround: perksJson.onGround as Perk[],
};
export const contacts = {
  ...contactsJson,
  people: contactsJson.people as Contact[],
};
export const sponsors = {
  ...sponsorsJson,
  partners: sponsorsJson.partners as Partner[],
  pitch: {
    ...sponsorsJson.pitch,
    tiers: sponsorsJson.pitch.tiers as SponsorTier[],
  },
};
export const faq = faqJson.items as FaqItem[];
