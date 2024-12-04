import type { EventProps } from "@/types";
import { ContentList } from "@/components/ContentList";
import { Card, type CardProps } from "@/components/ContentList";
import { getContentBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import EventSignupForm from "@/components/EventSignupForm";

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/events");
  const event = data[0];
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}

interface ParamsProps {
  params: {
    slug: string;
  };
}

const EventCard = (props: Readonly<CardProps>) => (
  <Card {...props} basePath="events" />
);

  export default async function SingleEventRoute(props: ParamsProps) {
  const params = await props?.params;
  const { slug } = params;
  const { event, blocks } = await loader(slug);

  return (
    <div className="container">
      <div className="event-page">
        <EventSignupForm blocks={blocks} eventId={event.documentId} />
      </div>
      <ContentList
        headline="Featured Events"
        path="/api/events"
        component={EventCard}
        featured={true}
      />
    </div>
  );
}
