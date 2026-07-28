import type { Metadata } from "next"
import CareerAcceleratorClient from "./CareerAcceleratorClient"

export const metadata: Metadata = {
  title: "Career Accelerator | Studio E 8-Week Career Bootcamp",
  description:
    "Studio E’s 8-week Career Accelerator in Humboldt Park, Chicago. Learn real marketing, operations, sales, and recruiting skills inside a live business—and position yourself for real opportunities.",
  openGraph: {
    title: "Career Accelerator – 8-Week Career Bootcamp at Studio E",
    description:
      "Learn real marketing, ops, sales, and recruiting skills in a live, hands-on environment at Studio E HQ.",
    url: "https://www.joinstudioe.com/career-accelerator",
    type: "website",
  },
}

export default function CareerAcceleratorPage() {
  return <CareerAcceleratorClient />
}
