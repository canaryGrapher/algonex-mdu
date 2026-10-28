export type NavItem = { label: string; href: string };

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type TimelineItem = {
  id: string;
  tag: string;
  title: string;
  time: string;
  description: string;
};

export type PodiumPrize = {
  rank: number;
  position: string;
  title: string;
  amount: number;
};

export type SpecialAward = {
  id: string;
  title: string;
  focus: string;
  amount: number;
};

export type Criterion = { name: string; weight: number };

export type JudgingStage = {
  id: string;
  name: string;
  subtitle: string;
  criteria: Criterion[];
};

export type Track = { id: string; code: string; title: string; blurb: string };

export type Perk = { id: string; title: string; detail: string };

export type Contact = {
  id: string;
  initials: string;
  name: string;
  role: string;
  phone: string;
  email: string;
};

export type Partner = { name: string; role: string; logo: string; wide?: boolean };

export type SponsorTier = { name: string; amount: number; highlight: string };

export type FaqItem = { q: string; a: string };
