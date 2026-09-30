import courses from "@/data/courses.json";
import workshops from "@/data/workshops.json";

export type NavProgram = {
  slug: string;
  title: string;
  duration: string;
  placementRate: string;
};

export type NavWorkshop = {
  slug: string;
  title: string;
  date: string;
  timeFrom: string;
  mode: string;
  price: string;
};

export type NavData = {
  programs: NavProgram[];
  workshops: NavWorkshop[];
};

export function getNavData(): NavData {
  return {
    programs: courses.map((c) => ({
      slug: c.slug,
      title: c.title,
      duration: c.duration,
      placementRate: c.placementRate,
    })),
    workshops: workshops
      .filter((w) => w.is_active)
      .map((w) => ({
        slug: w.slug,
        title: w.title,
        date: w.event_date,
        timeFrom: w.event_time_from,
        mode: w.mode,
        price: w.price,
      })),
  };
}
