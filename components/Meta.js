import Head from "next/head";

export default function MetaContent({ title, description, city, length }) {
  return (
    <Head>
      <title>
        {title ? title : `Pre construction Condos in ${city || "Canada"} `}
      </title>
      <meta name="description" content=>
        {description
          ? description
          : `${length} New Pre construction Condos for sale in ${
              city || "Canada"
            }
            | Check out plans, pricing, availability for pre construction condos
            in ${city || "Canada"}`}
      </meta>
    </Head>
  );
}
