import PropertyBlock from "@/blocks/property";
import { fetchProperties } from "@/services/properties";
import Head from "next/head";

import HomeLayout from "./layout";

export default function Home({
  list_1,
  list_2,
  list_3,
  list_4,
  list_5,
  list_6,
}) {
  return (
    <>
      <Head>
        <meta name="Author" content="Condomonk"></meta>
        <meta name="Email" content="info@condomonk.ca"></meta>
        <title>
          Condomonk | Pre Construction Condos in and around GTA, Canada.
        </title>
        <meta
          name="Description"
          content="Looking for Pre Construction condos near Greater Toronto Area, Canada? From 1 Bed to 4 Bed+ Condos, Condomonk offer early access to all best pre construction's available."
        ></meta>
        <link rel="canonical" href="https://condomonk.ca/" />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="og:website" />
        <meta
          property="og:title"
          content="Condomonk | Pre Construction Condos in and around GTA, Canada."
        />
        <meta
          property="og:description"
          content="Looking for Pre Construction condos near Greater Toronto Area, Canada? From 1 Bed to 4 Bed+ Condos, Condomonk offer early access to all best pre construction's available."
        />
        <meta property="og:image" content="/aeee.jpg" />
        <meta property="og:url" content="https://condomonk.ca/" />
        <meta property="og:site_name" content="Condomonk" />
      </Head>

      <HomeLayout>
        <div className="flex flex-col gap-16">
          <PropertyBlock properties={list_1?.properties} city={list_1?.city} />
          <PropertyBlock properties={list_2?.properties} city={list_2?.city} />
          <PropertyBlock properties={list_3?.properties} city={list_3?.city} />
          <PropertyBlock properties={list_4?.properties} city={list_4?.city} />
          <PropertyBlock properties={list_5?.properties} city={list_5?.city} />
          <PropertyBlock properties={list_6?.properties} city={list_6?.city} />
        </div>
      </HomeLayout>
    </>
  );
}

export async function getStaticProps() {
  const cities = [
    "Toronto",
    "Mississauga ",
    "Vaughan",
    "Calgary",
    "Edmonton",
    "Milton",
    "Vancouver",
  ];
  const city_1 = await fetchProperties(cities[0]);
  const city_2 = await fetchProperties(cities[1]);
  const city_3 = await fetchProperties(cities[2]);
  const city_4 = await fetchProperties(cities[3]);
  const city_5 = await fetchProperties(cities[4]);
  const city_6 = await fetchProperties(cities[5]);
  const city_7 = await fetchProperties(cities[6]);
  return {
    props: {
      list_1: {
        properties: city_1,
        city: cities[0],
      },
      list_2: {
        properties: city_2,
        city: cities[1],
      },
      list_3: {
        properties: city_3,
        city: cities[2],
      },
      list_4: {
        pro4erties: city_4,
        city: cities[3],
      },
      list_5: {
        properties: city_5,
        city: cities[4],
      },
      list_6: {
        properties: city_6,
        city: cities[5],
      },
      list_7: {
        properties: city_7,
        city: cities[6],
      },
    },
  };
}
