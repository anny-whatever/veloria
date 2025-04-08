import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { SeoHead, PAGE_SEO, getOrganizationSchema } from "../../components/SEO";
import Header from "../../components/Header/Header";
import LoadingSpinner from "../../components/LoadingSpinner";

// Lazy load non-critical components to improve initial render time
const Services = lazy(() => import("../../components/Services/Services"));
const Portfolio = lazy(() => import("../../components/Portfolio/Portfolio"));
const About = lazy(() => import("../../components/About/About"));
const Contact = lazy(() => import("../../components/Contact/Contact"));

// Loading component for Suspense
const SectionLoader = () => (
  <div className="py-20">
    <LoadingSpinner />
  </div>
);

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Veloria - Digital Portfolio & Services</title>
        <meta
          name="description"
          content="Modern portfolio showcasing digital services and projects."
        />
      </Helmet>
      <SeoHead
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        pathname="/"
        structuredData={getOrganizationSchema()}
      />
      <Header />
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
};

export default Home;
