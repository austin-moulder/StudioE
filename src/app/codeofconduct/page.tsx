import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "Studio E Code of Conduct for students, instructors, and community members.",
}

const REPORT_FORM_URL = "https://forms.gle/6Vn7FdYrh8FfFGvK7"

export default function CodeOfConductPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center font-montserrat text-3xl font-bold">Studio E Code of Conduct</h1>

      <div className="prose prose-lg max-w-none">
        <div className="not-prose mb-10 rounded-2xl border border-[#FF3366]/20 bg-gradient-to-br from-[#FF3366]/5 via-white to-[#9933CC]/5 p-6 md:p-8">
          <p className="text-lg leading-relaxed text-gray-800">
            <strong className="text-gray-900">Studio E&apos;s vision:</strong> Build a global network of Latin
            cultural hubs where everyday people become confident dancers, better humans, and proud stewards of the
            culture.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-800">
            <strong className="text-gray-900">Studio E&apos;s mission:</strong> Unlock creativity, confidence, and
            technical mastery for all.
          </p>
        </div>

        <p>
          This Code of Conduct applies to everyone who participates in Studio E—in classes, privates, socials,
          events, online communities, and anywhere we represent the studio. We expect the same standards of respect,
          safety, and integrity from students, instructors, staff, and guests.
        </p>

        <p>
          The Studio E Method expands beyond our curriculum. It is a philosophy that asks us to manage our emotions,
          manage our egos, adopt beginner&apos;s mindsets whenever possible, and work diligently on what is within our
          control. The way we handle conflict will be part of our legacy.
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-bold">For Students</h2>

        <h3 className="mb-3 mt-6 text-xl font-bold">Respect, Boundaries &amp; Communication</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Treat instructors, staff, and fellow students with kindness and professionalism.</li>
          <li>Honor personal boundaries—verbal, physical, and emotional—at all times.</li>
          <li>
            <strong>No repeated unsolicited texts or messages.</strong> If someone does not respond or asks you to
            stop, respect that immediately.
          </li>
          <li>
            <strong>Mind each other&apos;s space.</strong> Avoid hovering over other students, crowding the floor
            during rotations, or standing too close when it is not necessary for the exercise.
          </li>
          <li>
            Not every personality meshes perfectly. If tension is building with another student, address it early
            and directly so it does not fester. It is better to find a way to coexist peacefully than to let the room
            feel uncomfortable for learning.
          </li>
          <li>
            <strong>Do not talk poorly about other students at the studio.</strong> We are all on our own journey.
            Focus on what is within your control—your technique, your attitude, and your growth.
          </li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-bold">Partner Dance Etiquette</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Ask before making close-embrace adjustments or initiating contact beyond what the class requires.</li>
          <li>Accept &ldquo;no&rdquo; graciously. Anyone may decline a dance, a rotation, or additional contact.</li>
          <li>Practice good hygiene and wear appropriate dance shoes and attire so partners feel comfortable.</li>
          <li>Participate in rotations and class structure unless you have a safety or medical reason not to.</li>
          <li>Give constructive feedback only when invited, and receive correction with openness.</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-bold">Safety &amp; Accountability</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Arrive on time, follow studio rules, and communicate injuries or limitations to your instructor.</li>
          <li>Do not attend class or socials while intoxicated or impaired.</li>
          <li>Ask before photographing or posting images or video of others.</li>
          <li>
            Report harassment, unsafe behavior, or concerns to Studio E leadership promptly. You may use our{" "}
            <a
              href={REPORT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#FF3366] hover:underline"
            >
              confidential report form
            </a>
            .
          </li>
        </ul>

        <h2 className="mb-4 mt-10 text-2xl font-bold">For Employees &amp; Instructors</h2>

        <h3 className="mb-3 mt-6 text-xl font-bold">Professional Standards</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Model the culture we want to build: patient, precise, inclusive, and technically excellent.</li>
          <li>Start and end classes on time. Communicate clearly about expectations, level, and rotation structure.</li>
          <li>
            <strong>Do not speak disparagingly about other studios or instructors.</strong> Critique ideas and
            methods when needed for improvement, but avoid direct put-downs of peer organizations. Our goal is to grow
            the scene and help more people become proficient in dance—we benefit from more studios and artists, not
            fewer.
          </li>
          <li>Engage in continuing education on teaching ethics, inclusion, partner-dance safety, and body awareness.</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-bold">Partner Dance &amp; Physical Safety</h3>
        <p>
          Partner dance has built-in power dynamics. We are serious about safety. As an instructor, you will:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Obtain active consent before any physical adjustment or hands-on correction.</li>
          <li>Model respectful touch and clear communication in every class and social you lead.</li>
          <li>
            Immediately address unsafe or inappropriate behavior in class or at socials, and inform Studio E
            leadership.
          </li>
          <li>Never use your role to pressure students into dances, contact, or situations they have declined.</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-bold">Serious Misconduct</h3>
        <p>
          The following behaviors have no place at Studio E. When they occur, we address them promptly and
          directly:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>Sexual harassment or exploitation of any kind.</li>
          <li>Retaliation against students or staff who raise concerns in good faith.</li>
          <li>Teaching while intoxicated or otherwise impaired.</li>
          <li>Discrimination, bullying, or abusive behavior toward any community member.</li>
        </ul>
        <p>
          We would rather lose a talented teacher than protect someone who makes the room unsafe—but our default
          approach is to give people a fair chance to correct course before asking them to leave.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-bold">Teacher–Student Romantic Relationships</h3>
        <p>
          As a safety precaution, instructors may not maintain a teacher–student relationship when there is an active
          romantic or sexual relationship between them.
        </p>
        <p>If a romantic relationship develops with a Studio E student:</p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>You must inform Studio E leadership promptly.</li>
          <li>
            You must stop teaching that person in any formal capacity within Studio E—no group classes where you are
            the primary instructor, and no privates together at Studio E.
          </li>
          <li>You are free to continue the relationship outside the studio if both parties choose.</li>
          <li>
            Studio E will help reassign the student to a different instructor or class so the teacher–student power
            dynamic is removed from our space.
          </li>
        </ul>
        <p>
          We understand that relationships emerge in social dance. Our job is to eliminate risky teacher–student power
          dynamics inside Studio E, not police your personal life outside of it. We have also found that when dance
          fundamentals are established outside of a romantic framing, a student&apos;s dance life tends to last longer—it
          becomes more resilient and grounded in technique rather than persona.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-bold">Inside Studio E</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>We talk to each other, not about each other.</strong>
          </li>
          <li>
            Concerns about other instructors, students, or leadership are raised directly and privately first whenever
            it is safe and appropriate to do so.
          </li>
          <li>Escalate to Studio E leadership when a concern affects safety, fairness, or the student experience.</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-bold">Outside Studio E</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            We do not publicly attack other studios or artists. We respond to criticism with facts and respect, not
            pile-ons.
          </li>
          <li>
            Represent Studio E with integrity online and in the broader dance community. We are building something
            bigger than any one person.
          </li>
        </ul>

        <h2 className="mb-4 mt-10 text-2xl font-bold">For Everyone</h2>
        <p>We are committed to a harassment-free experience for everyone, regardless of:</p>
        <ul className="mb-4 list-disc space-y-1 pl-6">
          <li>Dance ability or background</li>
          <li>Gender identity or expression</li>
          <li>Sexual orientation</li>
          <li>Disability or neurodivergence</li>
          <li>Physical appearance or body size</li>
          <li>Race, ethnicity, or nationality</li>
          <li>Age</li>
          <li>Religion or belief system</li>
          <li>Any other protected status</li>
        </ul>

        <h2 className="mb-4 mt-8 text-2xl font-bold">Reporting &amp; Enforcement</h2>
        <p>If you witness or experience behavior that compromises safety or well-being:</p>
        <ul className="mb-4 list-disc space-y-2 pl-6">
          <li>
            <strong>In person:</strong> Notify Studio E leadership or a designated Care Team member at events.
          </li>
          <li>
            <strong>Online:</strong> Submit a report through our{" "}
            <a
              href={REPORT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#FF3366] hover:underline"
            >
              confidential report form
            </a>
            .
          </li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-bold">How We Handle Escalations</h3>
        <p>
          For most conduct issues involving students or employees, we follow a three-strike approach:
        </p>
        <ol className="mb-4 list-decimal space-y-2 pl-6">
          <li>
            <strong>First time:</strong> We address the issue directly with the person involved.
          </li>
          <li>
            <strong>Second time:</strong> Final warning.
          </li>
          <li>
            <strong>Third time:</strong> We ask the employee or student to leave the studio.
          </li>
        </ol>
        <p>
          We reserve the right to skip this process and remove someone immediately when the case warrants it—for
          example, when safety is at immediate risk or the behavior is severe.
        </p>
        <p>
          Reports are handled with care, discretion, and confidentiality. Studio E may investigate and take corrective
          action as needed.
        </p>

        <p className="mt-8 font-semibold">
          By participating in Studio E in any capacity, you agree to abide by this Code of Conduct. Let&apos;s keep our
          dance spaces vibrant, joyful, and safe.
        </p>

        <p className="mt-12 text-center text-sm text-gray-500">
          Questions? Contact{" "}
          <a href="mailto:studioelatindance@gmail.com" className="text-[#FF3366] hover:underline">
            studioelatindance@gmail.com
          </a>
        </p>

        <p className="mt-4 text-center text-sm text-gray-500">
          © Studio E 2023-{new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
