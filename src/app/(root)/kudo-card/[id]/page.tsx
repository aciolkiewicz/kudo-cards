import Headings from "@/components/Atoms/Headings/Headings";
import KudoCardPresentation from "@/components/Organisms/KudoCardPresentation/KudoCardPresentation";

export default async function Home(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <>
      <Headings level={2}>
        <>Your Kudo Card</>
      </Headings>
      <KudoCardPresentation cardId={params.id} />
    </>
  );
}
