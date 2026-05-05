import { getEventByShortLinkApi } from "@/backend/firebase/db/api/events_api";
import { ResponseEventSchema } from "@/backend/models/events";
import { ResponseIndicator } from "@/backend/models/_shared";

export async function getServerSideProps(context: any) {
  const { code } = context.params;
  try {
    const [data, status] = await getEventByShortLinkApi(code);
    if (status === ResponseIndicator.SUCCESS) {
      const event = (data as ResponseEventSchema).data;
      return { redirect: { destination: `/events/${event.id}`, permanent: false } };
    }
  } catch (_) {}
  return { notFound: true };
}

export default function ShortLinkRedirect() {
  return null;
}
