import { ContentList } from '@/components/ContentList'
import { Card, type CardProps  } from '@/components/ContentList'
import EventSignupForm from '@/components/EventSignupForm';
import { getContentBySlug } from '@/data/loaders';
import { EventProps } from '@/types';
import { notFound } from 'next/navigation';



interface ParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

async function loader(slug: string) {
  const { data } = await getContentBySlug(slug, "/api/events");
  const event = data[0];
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}
  
const EventCard = (props: Readonly<CardProps>) => <Card {...props} basePath="events" />;  

  export default async function AllEventsRoute(props : ParamsProps) {
  const searchParams = await props?.searchParams;

  const { event, blocks } = await loader("stay-in-touch");

  return (
    <div className="container">
        <div className="event-page">
        <EventSignupForm blocks={blocks} eventId={event.documentId} />
      </div>
      <ContentList
        headline="All Events"
        path="/api/events"
        query={searchParams?.query}
        page={searchParams?.page}
        showSearch
        showPagination
        component={EventCard}
      />
    </div>
  )
}
