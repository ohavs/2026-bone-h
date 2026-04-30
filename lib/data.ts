export type ProjectStatus = "active" | "construction" | "rent" | "sold";

export type Project = {
  id: string;
  title: string;
  city: string;
  type: string;
  status: ProjectStatus;
  year: string;
  image: string;
  description: string;
  units?: string;
};

export const ACTIVE_LABELS: Record<ProjectStatus, string> = {
  active: "למכירה",
  construction: "בבנייה",
  rent: "להשכרה",
  sold: "נמכר",
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "מעון הירדן",
    city: "ירדן עליון",
    type: "מגורי יוקרה",
    status: "active",
    year: "2025",
    units: "12 דירות",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
    description:
      "פרויקט בוטיק שקט ושלוו על שפת הירדן. תכנון מודרני נקי, חלונות גבוהים וגינות פרטיות.",
  },
  {
    id: "p2",
    title: "אקווה ‏רידג'",
    city: "מעלה גלבוע",
    type: "וילות פרטיות",
    status: "construction",
    year: "2026",
    units: "8 וילות",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80",
    description:
      "שמונה וילות עצמאיות, כל אחת בנוף פתוח לעמק. שילוב של אבן מקומית ועץ חם.",
  },
  {
    id: "p3",
    title: "בית הים השקט",
    city: "כינרת מערב",
    type: "פנטהאוז",
    status: "rent",
    year: "2024",
    units: "3 יחידות",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80",
    description:
      "פנטהאוז עם גג פרטי וברכה. השכרה ארוכת טווח לדיירים מבקשי שקט.",
  },
  {
    id: "p4",
    title: "מצפה אקווה",
    city: "בקעת הירדן",
    type: "מתחם מגורים",
    status: "sold",
    year: "2022",
    units: "24 דירות",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
    description:
      "מתחם מגורים שתוכנן סביב חצרות פנימיות. נמכר במלואו תוך תשעה חודשים.",
  },
  {
    id: "p5",
    title: "בית האבן",
    city: "מעלה גלבוע",
    type: "בית פרטי",
    status: "sold",
    year: "2021",
    units: "1 יחידה",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
    description:
      "בית פרטי בודד מאבן מקומית — תכנון ייחודי שעוטף נוף הרים פתוח.",
  },
  {
    id: "p6",
    title: "המרפסת הלבנה",
    city: "טבריה",
    type: "מיני־פנטהאוז",
    status: "active",
    year: "2025",
    units: "6 דירות",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=80",
    description:
      "שש מיני־פנטהאוזים עם מרפסות גג רחבות. חומרים נקיים, פרופורציות שקטות.",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "תהליך נקי, מדויק ומלא כבוד. הבית שקיבלנו מרגיש כאילו תוכנן לחיים שלנו ספציפית.",
    name: "ש. רוזנברג",
    role: "רוכשת — מעון הירדן",
  },
  {
    id: "t2",
    quote:
      "השקט שבעבודה איתם הוא נדיר. כל פגישה הסתיימה עם תחושה של בהירות, לא של עומס.",
    name: "א. דהן",
    role: "משקיע — אקווה רידג'",
  },
  {
    id: "t3",
    quote:
      "בשלוש דקות הם ידעו לזקק מה אנחנו רוצים מהבית. שלוש שנים אחרי, הבחירה עדיין מרגישה נכונה.",
    name: "ל. כהן",
    role: "רוכשת — בית האבן",
  },
];

export const stats = [
  { value: "27", suffix: "שנים", label: "של עבודה רציפה" },
  { value: "1.2k+", suffix: "", label: "יחידות שנמסרו" },
  { value: "14", suffix: "ערים", label: "לאורך הירדן המערבי" },
];
