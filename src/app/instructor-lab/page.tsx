import type { Metadata } from "next"
import InstructorLabClient from "./InstructorLabClient"

export const metadata: Metadata = {
  title: "LDIC Program | Studio E Latin Dance Instructor Certification",
  description:
    "Studio E’s 8-week Latin Dance Instructor Certification (LDIC) Program in Humboldt Park, Chicago. Learn the Studio E method, teach real students, and earn your spot on the paid instructor team.",
  openGraph: {
    title: "Studio E LDIC – Latin Dance Instructor Certification Program",
    description:
      "Turn your love for Salsa, Bachata, and Cumbia into a leadership role at Chicago’s fastest growing Latin dance studio.",
    url: "https://www.joinstudioe.com/instructor-lab",
    type: "website",
  },
}

export default function InstructorLabPage() {
  return <InstructorLabClient />
}
