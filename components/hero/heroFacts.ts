import { event } from "@/lib/data";

/** Key facts shown under the main call to action. */
export const heroFacts = [
  { label: "When", value: event.dates.display },
  { label: "Where", value: event.venue.display },
  { label: "Prize pool", value: event.prizePoolDisplay },
  { label: "Team", value: event.teamSize },
];
