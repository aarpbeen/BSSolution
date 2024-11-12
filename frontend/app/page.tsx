
import Banner from "./components/banner/banner";
import type { Metadata } from "next";
import Services from "./components/Services/Services";
import Testimonials from "./components/testimonials/testimonials";
import CallToAction from "./components/callToAction/CallToAction";

export const metadata: Metadata = {
  title: "Learning Management System",
  description: "A comprehensive platform for online learning, offering courses, resources, and community support to enhance your educational experience.",
};

export default function Home() {
  return (
   <>
   <Banner />
   <Services />
   <Testimonials />
   <CallToAction />
   </>
  );
}
