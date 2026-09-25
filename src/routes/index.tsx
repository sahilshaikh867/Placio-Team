import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/components/team-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leadership & Team | PlacioBridge Technologies LLP" },
      {
        name: "description",
        content:
          "Meet the leadership and technical teams behind PlacioBridge Technologies LLP — turning shared vision into meaningful impact across campus placements, AI tech, and industry training.",
      },
      { property: "og:title", content: "Leadership & Team | PlacioBridge Technologies LLP" },
      {
        property: "og:description",
        content: "Empowering Students & Institutions with Industry-Ready Skills and Intelligent Tech.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <TeamPage />;
}
