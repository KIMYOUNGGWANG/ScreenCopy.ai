import type { Metadata } from "next";
import StudioClientPage from "./studio-client-page";

export const metadata: Metadata = {
  title: "Studio | Screenshot Copy Generator",
  description: "Upload a screenshot, describe your app, and generate compelling marketing copy in seconds.",
};

export default function StudioPage() {
  return <StudioClientPage />;
}