export type Plan = "EMBER" | "CINDER" | "OBSIDIA";

export type VerificationStatus = "pending_review" | "pending" | "live" | "rejected" | "expired";

export interface CatalogItem {
  id: string;
  name: string;
  material: string;
  price: string;
  image: string;
}

export interface Brand {
  slug: string;
  name: string;
  legalName: string;
  domain: string;
  country: string;
  plan: Plan;
  category: string;
  tagline: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  heroImage: string;
  revealImage: string;
  catalog: CatalogItem[];
  verified: boolean;
  score: number;
  status: VerificationStatus;
  followers: number;
  offerHeadline: string;
  offerCopy: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
}
