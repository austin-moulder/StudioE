/**
 * Studio E Philosophy — source of truth: Commonplace Journal PDF.
 * Do not invent, soften, or materially rewrite these beliefs.
 */

export type PrincipleBlock = {
  id: string
  title: string
  paragraphs: string[]
  pullQuote?: string
  /** When true, pull quote renders after body/bullets instead of near the title. */
  pullQuoteAfter?: boolean
  bullets?: string[]
  afterBullets?: string[]
}

export type PhilosophyGroup = {
  id: string
  label: string
  intro: string
  principles: PrincipleBlock[]
}

export const PHILOSOPHY_META = {
  title: "The Studio E Philosophy",
  description:
    "Studio E’s philosophy on learning, consent, culture, community, and what kind of dance culture we are building.",
  url: "https://www.joinstudioe.com/philosophy",
} as const

export const HERO = {
  title: "The Studio E Philosophy",
  subtitle:
    "Dance is more than movement. It is a practice in listening, humility, consent, cultural connection, and becoming comfortable being a beginner.",
  intro:
    "Studio E is building a social dance culture centered on curiosity, empathy, cultural respect, and human connection. These beliefs shape who we invite in, how we teach, and what we refuse to become.",
  label: "Studio E is not for everyone.",
} as const

export const BELIEFS_INTRO = {
  headline: "What we believe",
  body: "Our philosophy is not a list of abstract values. It is a standard for how we practice, how we treat one another, and how we understand the cultures that gave us these dances.",
  shaping:
    "These principles shape how Studio E teaches, hires, hosts, spends, partners, and builds community.",
} as const

export const SPEND_ALLOCATION = [
  { label: "Instructor Pay", pct: 20 },
  { label: "Marketing", pct: 20 },
  { label: "Occupancy", pct: 10 },
  { label: "Other Operating Expenses", pct: 10 },
  { label: "Growth and Expansion", pct: 30 },
  { label: "Retained Earnings", pct: 10 },
] as const

export const GROUPS: PhilosophyGroup[] = [
  {
    id: "how-we-learn",
    label: "How We Learn",
    intro:
      "We treat dancing as an infinite practice. The point is not to arrive — it is to keep becoming more capable of creating, connecting, and learning.",
    principles: [
      {
        id: "not-for-everyone",
        title: "We Are Not for Everyone",
        paragraphs: [
          "Studio E is not for everyone.",
          "We are a social space for people who adopt a beginner’s mindset, consistently practice quieting their ego, and see dancing as an infinite game.",
          "We don't believe the point of dancing is simply to get good enough to get the girl, win the competition, or become the best dancer in the room. There is no final level of dancing to reach. There is always another layer of musicality, connection, humility, curiosity, and understanding.",
          "We want people who are willing to keep learning.",
        ],
      },
      {
        id: "useful-models",
        title: "We Believe in Useful Models, Not Absolute Truths",
        pullQuote: "All models are wrong, but some are useful.",
        paragraphs: [
          "Dance instruction is full of models: counts, patterns, labels, techniques, frameworks, and rules. These are useful insofar as they help us understand and navigate movement. But the model is not the dance itself.",
          "We believe memorizing combinations is an inferior approach to learning.",
          "Instead, we teach fundamental steps, principles, timing, musicality, connection, and improvisation—and then encourage dancers to build from those foundations.",
          "The goal isn't to remember more choreography. The goal is to become more capable of creating.",
          "Teachers should remain students.",
          "And advanced dancers have a responsibility to make beginners feel capable rather than inadequate. Expertise should create generosity, not hierarchy.",
        ],
      },
      {
        id: "cross-training",
        title: "We Believe in Cross-Training",
        paragraphs: [
          "Students should cross-train genres and studios.",
          "No teacher sees everything. Every instructor has blind spots. Every studio develops its own assumptions, habits, and biases.",
          "We want our students to encounter different teachers, different bodies, different styles, different pedagogies, and different perspectives.",
          "That means checking their own blind spots—and checking ours.",
          "While we believe Studio E is the best place for beginners to build a foundation, we will readily refer students to other studios for specialized training when another teacher or institution can better serve their goals.",
          "And when exceptional talent exists elsewhere, we would rather bring that talent into Studio E than pretend we have nothing left to learn.",
          "We don't need to be the only studio in someone's life to be an important one.",
        ],
      },
      {
        id: "social-first",
        title: "Social Dancing Comes First",
        pullQuote: "A trophy is not more important than the person standing in front of you.",
        pullQuoteAfter: true,
        paragraphs: [
          "Social dancing was not designed to live primarily in the ballroom, on a stage, or at Jack and Jill competitions.",
          "Competition isn't bad. It can be healthy, motivating, and fun.",
          "But competition should never become the priority or the identity of a dancer.",
          "Social dancing exists fundamentally for social connection and historical and cultural connection.",
          "Those should always remain our priority.",
        ],
      },
    ],
  },
  {
    id: "how-we-treat",
    label: "How We Treat One Another",
    intro:
      "The dance floor is a place where power, bodies, and care meet. How we lead, follow, ask, and refuse is part of the culture we are building.",
    principles: [
      {
        id: "empathy",
        title: "Dance Is Empathy Made Physical",
        pullQuote: "Leading is not domination. Following is not submission.",
        paragraphs: [
          "We believe in role switching.",
          "We do this partly to deconstruct machismo in the dance space and to affirm LGBTQ+ identities. But more fundamentally, we do it to build our capacity for empathy.",
          "You cannot fully understand what it means to be led without experiencing what it feels like to follow. You cannot become a strong leader without learning how to listen, receive, adapt, and respond.",
          "Both are active skills. Both require awareness. Both require trust.",
          "We want dancers who understand that every partner is a different person with a different body, history, experience level, and way of communicating.",
        ],
      },
      {
        id: "consent",
        title: "Consent Is Non-Negotiable",
        pullQuote: "A dance is an invitation, not an entitlement.",
        paragraphs: [
          "Nobody is entitled to dance with anyone.",
          "Consent must be received before a dance, and explicit consent is always better than implicit consent.",
          "Being attracted to someone does not entitle you to their body. Being an experienced dancer does not entitle you to someone's time. Having danced with someone before does not mean you are entitled to dance with them again.",
          "We want a culture where “no” is easy, respected, and unremarkable.",
        ],
      },
      {
        id: "body-aware",
        title: "We Are Body Aware, Not Body Blind",
        paragraphs: [
          "Dance does not conform to a specific body type or image.",
          "We believe anyone can dance, but we don't pretend that every body moves in exactly the same way.",
          "Bodies differ. Height, weight, strength, mobility, flexibility, age, ability, injury, and physical experience all affect how two people move together.",
          "We acknowledge those differences so that we can adjust our dancing to different bodies.",
          "We are not body blind. We are body aware in a way that empowers us to become more intentional and inclusive dancers.",
          "We believe accessibility is part of dance.",
          "Even someone in a wheelchair can participate, because music lives in the heart, not in the legs.",
        ],
      },
    ],
  },
  {
    id: "how-we-honor",
    label: "How We Honor Culture",
    intro:
      "These dances come from somewhere. Learning them without their histories is incomplete — and pretending to own them is worse.",
    principles: [
      {
        id: "where-from",
        title: "We Honor Where the Dance Comes From",
        paragraphs: [
          "The dance forms we teach are products of diaspora.",
          "We acknowledge that their movement, music, rhythm, and social traditions are deeply rooted in the histories of enslaved Africans and the African diaspora.",
          "Salsa and bachata can be traced to traditions with roots in the African continent, and the diasporic histories of these dances should be acknowledged rather than erased.",
          "We believe cultural history is part of learning the dance.",
          "You cannot fully understand a movement without understanding something about the people, places, religions, migrations, and histories that produced it.",
        ],
      },
      {
        id: "preserved-practice",
        title: "Culture Should Be Preserved Through Practice",
        paragraphs: [
          "Afro-Cuban movement is strongly rooted in religiosity.",
          "We respect and acknowledge those religious origins. But we do not believe that someone must actively practice the religion in order to execute a movement that emerged from it.",
          "That level of exclusion could contribute to the eventual erasure of the movement itself, particularly in the face of the competing forces of social media, commercialization, and fusion.",
          "We must acknowledge first.",
          "We should know where the movement comes from, respect the traditions from which it emerged, and avoid stripping it of its history.",
          "But ultimately, an Orisha movement is not beholden exclusively to religious practice.",
          "Cultural preservation sometimes requires allowing traditions to move beyond their original communities while continuing to honor and teach their origins.",
        ],
      },
      {
        id: "feel-latino",
        title: "Latin Dance Should Feel Latino",
        pullQuote:
          "We believe people should be able to participate in a culture without pretending to own it.",
        paragraphs: [
          "Latin social dancing is not exclusively for Latinos.",
          "Anyone should be able to participate.",
          "But the experience should feel authentically Latino.",
          "That means representation matters—not as decoration, but as part of the substance of the experience.",
          "We want Latino representation:",
        ],
        bullets: [
          "at the front of the classroom",
          "in the music being played",
          "among the artists we hire",
          "in the spaces we build",
          "in the histories we teach",
          "and in the communities with whom we collaborate",
        ],
      },
    ],
  },
  {
    id: "about-the-world",
    label: "What We Believe About the World",
    intro:
      "A dance studio is not separate from the world. Borders, bodies, freedom, and resources shape who gets to create culture — and who gets erased from it.",
    principles: [
      {
        id: "no-borders",
        title: "Dance Has No Borders",
        pullQuote: "Culture moves because people move.",
        paragraphs: [
          "We believe immigrants make the world a better place.",
          "Music, dance, language, food, religion, and art cross borders because human beings cross borders.",
          "We welcome immigration.",
          "We also believe borders are a means of excluding and separating people.",
          "Dance does not have borders.",
          "A person's nationality, citizenship, or immigration status should not determine whether they belong on our dance floor.",
        ],
      },
      {
        id: "bodily-autonomy",
        title: "We Believe in Bodily Autonomy",
        pullQuote: "Nobody is entitled to another person's body.",
        paragraphs: [
          "Nobody is entitled to another person's body.",
          "This applies on the dance floor, in relationships, and in society.",
          "We believe people should have agency over their own bodies and reproductive lives.",
          "We support the right to make decisions about pregnancy without coercion, shame, or the denial of bodily autonomy.",
          "The principle is simple:",
          "Nobody is entitled to another person's body.",
        ],
      },
      {
        id: "palestine",
        title: "We Believe Palestinians Have the Right to Exist, Flourish, and Be Free",
        paragraphs: [
          "We believe that when a clearly more dominant occupying power is killing the people of a lesser power en masse, that is genocide.",
          "Free Palestine.",
          "We believe Palestinians have the right to preserve, express, and celebrate their culture, history, music, food, language, and identity.",
          "Palestinian culture is not disposable. Palestinian lives are not disposable.",
          "We believe cultural preservation and human freedom are inseparable.",
        ],
      },
      {
        id: "tax-wealth",
        title: "We Believe Wealth Should Be Taxed, Not Work",
        paragraphs: [
          "We believe society should tax wealth rather than relying disproportionately on taxing labor.",
          "We believe this would leave more resources available to invest in artists, cultural institutions, and dance studios that preserve and affirm cultural practices.",
          "Culture requires resources.",
          "If we want artists to create, teachers to teach, and traditions to survive, we have to build an economic system capable of supporting them.",
        ],
      },
    ],
  },
  {
    id: "how-we-build",
    label: "How We Build Studio E",
    intro:
      "Money is a tool for culture. How we spend it should serve the people who teach, learn, and steward these dances.",
    principles: [
      {
        id: "spends-money",
        title: "How Studio E Spends Money",
        paragraphs: [
          "Our financial decisions should serve our fundamental goal:",
          "Build a global network of Latin cultural hubs where everyday people become confident dancers, better humans, and proud stewards of the culture.",
          "Our current allocation reflects that goal.",
        ],
        afterBullets: [
          "The remaining resources are allocated as needed across operating expenses and other business needs.",
        ],
      },
      {
        id: "instructor-pay",
        title: "Instructor Pay",
        paragraphs: [
          "We keep instructor pay at approximately 20% of total earnings so that Studio E can remain financially viable and continue to grow.",
          "But our investment in instructors goes beyond compensation.",
          "We heavily invest in the education and development of our instructors, including:",
        ],
        bullets: [
          "dance training",
          "teaching development",
          "professional development",
          "entrepreneurial training",
          "business education",
        ],
        afterBullets: [
          "We want instructors who are not only better dancers, but better teachers, professionals, and leaders.",
          "Growth gives us the ability to invest more deeply in the people and culture that make Studio E possible.",
        ],
      },
    ],
  },
]

/** Closing principle — full text lives here as the emotional conclusion. */
export const CLOSING = {
  id: "ultimately",
  title: "Ultimately, We Believe in People",
  /** Also belongs thematically with How We Treat One Another. */
  groupNote: "How We Treat One Another",
  lines: [
    "We believe dancing is more than movement.",
    "It is a practice in listening.",
    "It is a practice in humility.",
    "It is a practice in consent.",
    "It is a practice in adapting to another person's body.",
    "It is a practice in confronting our assumptions.",
    "It is a practice in cultural connection.",
    "It is a practice in learning how to lead without dominating and follow without disappearing.",
    "It is a practice in becoming comfortable being a beginner.",
    "And it is a practice in remembering that the person in front of us is not an obstacle, an achievement, a conquest, or a prop.",
    "They are another human being.",
  ],
  emphasis: "That’s what Studio E is here to practice.",
  quietLink: {
    href: "/classes",
    label: "Explore classes at Studio E.",
  },
} as const

export const NAV_ITEMS = [
  ...GROUPS.map((g) => ({ id: g.id, label: g.label })),
  { id: CLOSING.id, label: "Ultimately" },
] as const
