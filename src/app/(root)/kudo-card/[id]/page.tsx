import Headings from "@/components/Atoms/Headings/Headings";
import KudoCardPresentation from "@/components/Organisms/KudoCardPresentation/KudoCardPresentation";

export default function Home({ params }: { params: { id: string } }) {
  return (
    <>
      <Headings level={2}>
        <>Your Kudo Card</>
      </Headings>
      <KudoCardPresentation cardId={params.id} />
    </>
  );
}
