const SOCIAL_DONATION_URL = "https://square.link/u/UjtiuJKC"

export default function SocialDonationFaq() {
  return (
    <>
      <p>
        Friday socials ask for a <strong className="text-gray-800">$10–$25 donation at the door</strong>. Most
        attendees give $15–$25. When you donate, you can choose to support instructor pay, our current mural
        buildout, or installation of our sign.
      </p>
      <p className="mt-2">
        <strong className="text-gray-800">Where donations go:</strong> every dollar goes to help pay our instructors.
        The studio owner takes no money from donations and is forgoing any distributions from the business for the
        first year. He&apos;s building the studio from his own wallet because he wants to create a world full of
        accessible social dancing.
      </p>
      <p className="mt-4">
        <a
          href={SOCIAL_DONATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-6 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-95"
        >
          Donate to support the social
        </a>
      </p>
    </>
  )
}
