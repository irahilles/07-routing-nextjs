import { QueryClient, HydrationBoundary, dehydrate} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Notes from "./Notes.client";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

const NotesPage = async ({ params }: NotesPageProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;