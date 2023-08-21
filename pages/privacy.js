import Image from "next/legacy/image";
import Head from "next/head";

import HomeLayout from "./layout";

export default function Privacy() {
  return (
    <HomeLayout hideFilter>
      <Head>
        <meta name="Author" content="Condomonk"></meta>
        <meta name="Email" content="info@condomonk.ca"></meta>
        <title>Condomonk - Privacy Policy</title>
        <meta
          name="Description"
          content="Condomonk is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information."
        ></meta>
        <link rel="canonical" href="https://condomonk.ca/contact-us" />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:type" content="og:website" />
        <meta property="og:title" content="Condomonk - Privacy Policy" />
        <meta
          property="og:description"
          content="Condomonk is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information."
        />
        <meta property="og:image" content="https://condomonk.ca/contact.png" />
        <meta property="og:url" content="https://condomonk.ca/contact-us" />
        <meta property="og:site_name" content="Condomonk" />
      </Head>

      <div className="container w-4/5 mx-auto mt-[10vh]">
        <h1 className="font-bold">PRIVACY POLICY</h1>
        Condomonk Inc. (condomonk.ca) respects the privacy of every individual
        who visits our website, sales office or contacts us by telephone,
        e-mail, or FAX. This Privacy Policy outlines the information The
        Condomonk Inc may collect and how we may use that information. By
        submitting, filling out or answering questions on our website, you
        acknowledge that you have read, understand and agree with our Privacy
        Policy summarized below. If you wish to read our full Privacy Policy,
        you may obtain it from the administrator at this sales office.
        <br />
        <br />
        <h2 className="font-bold">PERSONAL DATA</h2>
        Condomonk Inc. or condomonk.ca will not collect any personally
        identifiable information about you (for example, your name, address,
        telephone number or email address (“personal data”) without your express
        permission. The information about you is sent to us only when you
        voluntarily submit via contact forms on our website. If you do not want
        your personal data collected, please do not submit it to us. When you do
        provide us with personal data, we may use that information in the
        following ways, unless stated otherwise: we may store and process that
        information to better understand your needs and how we can improve our
        products and services; we may use that information to contact you.
        <br />
        <br />
        By submitting the forms on our website ( https://www.condomonk.ca) you
        are opting in to receive updates, follow ups, and marketing contents. We
        may share your info to our referral partners such as licensed realtors,
        builders or brokerages to help you with your questions or connect them
        to you. Condomonk Inc. does not in anyway get involved in any
        transaction You can unsubscribe at any time by emailing us to
        mailto:info@condomonk.ca.
        <br />
        <br />
        Condomonk is a referral company and we may be compensated by referral
        and advertisement partners for referrals we provide them or by
        connecting website visitors to our referral and advertisement partners.
        We may also receive information via phone calls or emails form
        prospecting buyers. By providing us the information voluntarily you have
        consented us to connect you with our referral and advertising partners.
        <br />
        <br />
        <h2 className="font-bold">Terms & Conditions</h2>
        The Site and the Services are provided solely as an online search engine
        to present information to the public. Condomonk does not provide any
        real estate, brokerage, appraisal, or any other related real estate or
        real property services, and does not hold itself out as being
        registered, licensed, or otherwise authorized to perform any such
        services.
        <br />
        <br />
        Condomonk does not (a) broker, sell, lease, or offer to broker, sell, or
        lease, or own any properties directly and is not a party to any
        transaction between developers, builders, or sellers (including, as
        applicable, agents or brokers of the foregoing) and buyers or their
        brokers or agents, (b) guarantee or ensure any property or any
        transaction between Users, (c) conduct background screening of any Users
        or facilitate the execution of any documentation on behalf of any User
        or collect payment on behalf of any User, or (d) act as an agent,
        broker, payment processor, money transmitter, payment manager, debt
        collector, or credit reporting agency, and does not guarantee any
        results from using the Services.
        <br />
        <br />
        You should use Your own judgment regarding the merits of any individual,
        entity, or information that You find on or through the Site, and You are
        strongly encouraged to personally inspect any listing prior to signing
        any documentation, providing personal information, or wiring or
        otherwise sending money for any deposit, payment, or other fee.
        Condomonk cannot and does not represent or warrant that any real estate
        agent, broker, brokerage, or other service provider who offers services
        in connection with the information provided on or through the Site is
        registered, licensed, qualified, or otherwise authorized or capable of
        performing any such service. Condomonk does not make any
        representations, warranties, or assurances as to the timeliness,
        completeness, or accuracy of information provided by any real estate
        agent, broker, brokerage, appraiser, or other service provider on or
        through the Site, including without limitation any real property
        evaluation or other related services.
        <br />
        <br />
        By using the Site, You acknowledge that published prices and
        availabilities are subject to change at the sole discretion of the
        property owner or listing agent at any time and without any prior
        notice. IF YOU RELY ON ANY SERVICE, INFORMATION, OR OTHER CONTENT
        AVAILABLE ON THE SITE OR THROUGH THE SERVICES, YOU EXPRESSLY AGREE THAT
        YOU DO SO SOLELY AT YOUR OWN RISK. YOU UNDERSTAND THAT YOU ARE SOLELY
        RESPONSIBLE FOR ANY DAMAGE OR LOSS YOU MAY INCUR RELATING TO YOUR USE OF
        ANY SERVICE, INFORMATION, OR OTHER CONTENT AVAILABLE ON THE SITE OR
        THROUGH THE SERVICES.
        <br />
        <br />
        The listings such as assignment for sale listings, resale listings or
        preconstruction project listings & description of the related pages are
        uploaded by Real estate agents. Condomonk does not verify the
        correctness of the data uploaded on its platform. Please contact the
        listing agent to verify the information. E&OE expected.
        <br />
        <br />
        <h2 className="font-bold">Who are Condomonk Verified Partners?</h2>
        When real estate agents or brokerages collaborate with Condomonk for
        marketing, advertisement and lead generation purposes, we require them
        to provide proof of their license. In addition, we conduct social media
        and brand checks to confirm that these partners are actively engaged in
        the real estate market and maintain a strong presence on social media
        channels. We make an effort to periodically verify our partners'
        credibility to ensure that they meet the highest standards. This
        includes assessing their level of social media activity, number of
        listings, response time to our queries, and their understanding of the
        market.
      </div>
    </HomeLayout>
  );
}
