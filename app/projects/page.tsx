import type { Metadata } from "next";
import ProjectsListing from "@/components/ProjectsListing";

export const metadata: Metadata = {
  title: "כל הפרויקטים — בונה הירדן המערבי",
  description:
    "ארכיון מלא של פרויקטים: למכירה, בבנייה, להשכרה ופרויקטים שנמכרו.",
};

export default function ProjectsPage() {
  return <ProjectsListing />;
}
