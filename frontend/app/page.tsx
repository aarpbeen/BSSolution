
import Banner from "./components/banner/banner";
import type { Metadata } from "next";
import Services from "./components/Services/Services";
import Testimonials from "./components/testimonials/testimonials";
import CallToAction from "./components/callToAction/CallToAction";
import OurProcess from "./components/ourprocess/Ourprocess";
import Statistics from "./components/statistics/statistics";

export const metadata: Metadata = {
  title: "BS Global Business and Finance Research Pvt Ltd",
  description: "BS Global Business and Finance Research Pvt. Ltd. delivers expert financial insights, consulting services, and research solutions to drive business growth and innovation.",
};

export default function Home() {
  return (
   <>
   <Banner />
   <Services />
   <OurProcess />
   <Statistics />
   <Testimonials />
   <CallToAction />
   </>
  );
}
