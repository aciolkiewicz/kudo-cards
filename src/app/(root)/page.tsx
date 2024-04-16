import Headings from "@/components/Atoms/Headings/Headings";
import CardsBoard from "@/components/Organisms/CardsBoard/CardsBoard";

export default function Home() {
  return (
    <>
      <Headings level={2}>
        <>Board</>
      </Headings>
      <CardsBoard />
    </>
  );
}
