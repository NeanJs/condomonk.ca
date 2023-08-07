import PropertyBlock from "@/blocks/property";
import HomeLayout from "./layout";


export default function Home() {
  const cities = ["Mississauage", "Toronto", "Milton", "Vancouver"];
  return (
    <>
      <HomeLayout>
        <div className="flex flex-col gap-16">
          {cities?.map((defaultCity, id) => (
            <PropertyBlock key={defaultCity + id} city={defaultCity} />
          ))}
        </div>
      </HomeLayout>
    </>
  );
}
