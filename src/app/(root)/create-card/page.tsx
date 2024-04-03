import Headings from "@/components/Atoms/Headings/Headings";
import FormCreateCard from "@/components/Organisms/FormCreateCard/FormCreateCard";

export default function Home() {
  return (
    <>
      <Headings level={2}>
        <>Create Card</>
      </Headings>
      <FormCreateCard />
    </>
  );
}
