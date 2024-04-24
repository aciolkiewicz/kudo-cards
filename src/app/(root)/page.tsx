import Headings from "@/components/Atoms/Headings/Headings";
import CardsBoard from "@/components/Organisms/CardsBoard/CardsBoard";

export default function Home() {
  return (
    <>
      <Headings level={2}>
        <>Last month&apos;s Kudo Cards</>
      </Headings>
      <CardsBoard />
    </>
  );
}
