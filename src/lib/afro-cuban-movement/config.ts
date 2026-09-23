import {
  AFRO_CUBAN_POPUP_THEME,
  CANT_MAKE_THIS_WEEK_FAQ,
  CANT_MAKE_THIS_WEEK_FAQ_ES,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

/**
 * Wire the FastPay (or GHL) checkout URL when ready.
 * CTAs currently navigate here — replace before running ads.
 */
export const AFRO_CUBAN_CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/PENDING_AFRO_CUBAN" as const

export const AFRO_CUBAN_CONFIG: PopupClassLandingConfig = {
  id: "afro-cuban-movement",
  checkoutUrl: AFRO_CUBAN_CHECKOUT_URL,
  spotsStorageKey: "studioe_afro_cuban_spots_left_v1",
  theme: AFRO_CUBAN_POPUP_THEME,
  bannerStripe: "pan-african",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "afro_cuban_movement",
  },
  event: {
    name: "Afro-Cuban Movement",
    format: "Fundamentals + rotating Orisha practice",
    startHour: 19,
    startMinute: 30,
    timeZone: "America/Chicago",
    weekday: 3,
    durationLabel: "7:30 PM to 8:30 PM",
    price: 25,
    capacity: 20,
    venueName: "Studio E",
    addressLine: "2657 W Division St",
    cityLine: "Chicago, IL",
    neighborhood: "In the heart of Humboldt Park",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=2657+W+Division+St,+Chicago,+IL+60622&output=embed",
  },
  assets: {
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Afro_Cuban_Movement_Flyer.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Afro_Cuban_vid.mp4",
  },
  copy: {
    accentLabel: "Afro-Cuban Movement",
    heroHeadline: "Move With the Orishas. Feel the Afro-Cuban Pulse.",
    heroSubheadline:
      "A beginner-friendly Wednesday class for body, rhythm, and spirit—no previous salsa experience needed. Learn fundamental movement and rotate through a living practice of 8 Orishas.",
    primaryCta: "Reserve My Spot for $25",
    secondaryCta: "Bring My Friend",
    capacityNote:
      "Only 20 tickets available so the instructor can give real attention and everyone has room to move.",
    videoHeadline: "Come for the Movement. Leave Connected to the Rhythm.",
    offerHeadline: "Your $25 Gets You In",
    friendHeadline: "Bring Your Best Friend Free",
    friendBody:
      "Your ticket includes one free spot for a friend who is new to the studio. Learn together, move together, and build the practice side by side.",
    priceFriendLine: "$25 · Bring a friend free",
    limitedHeadline: "Only 20 Tickets Available",
    limitedBody:
      "We keep the room small so you can feel the music, get coached on your body mechanics, and dance with intention.",
    communityHeadline: "Cuban Roots. Pan-African Spirit.",
    communityBody:
      "This class blends foundational Afro-Cuban movement—muelleo, ondulation, and rumba—with a rotating cycle of 8 Orishas. It’s open, grounded, and built for anyone ready to connect body and culture. No salsa background required.",
    communityBadge: "Open to all · No salsa experience needed",
    finalHeadline: "Your Wednesday Night Plans Are Set.",
    finalBody:
      "Grab your ticket, bring a friend or come solo, and step into Afro-Cuban movement at Studio E.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Afro-Cuban Movement class flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Afro-Cuban Movement class energy at Studio E",
  },
  offerBullets: [
    "60-minute Afro-Cuban movement class",
    "Fundamentals: muelleo, ondulation, and rumba",
    "Rotating practice of 8 Orishas",
    "No previous salsa experience necessary",
    "Come alone or bring one friend free (new to the studio)",
    "Personalized instruction in a capped 20-person class",
  ],
  offerTerms: [
    "The paying customer and free friend must attend together.",
    "The free friend must be new to the studio.",
    "One free friend per paid ticket.",
    "Only 20 total tickets available.",
  ],
  faqs: [
    {
      question: "Do I need salsa experience?",
      answer:
        "No. No previous salsa experience is necessary. We start from fundamental Afro-Cuban movement so beginners can feel confident.",
    },
    {
      question: "What will we practice?",
      answer:
        "Foundational movement—muelleo, ondulation, and rumba—plus a rotating list of 8 Orishas that we work through over time.",
    },
    {
      question: "What are the Orishas in this class?",
      answer:
        "We practice a rotating cycle of 8 Orishas as part of the class curriculum—so you build vocabulary across weeks, not just one night’s choreography.",
    },
    {
      question: "What does my ticket include?",
      answer: "One spot in the 60-minute Afro-Cuban Movement class at Studio E.",
    },
    {
      question: "Can I come alone?",
      answer: "Yes. Come alone or bring a friend. The room is welcoming either way.",
    },
    {
      question: "Can I bring a friend?",
      answer:
        "Yes. Each paid ticket includes one free friend who is new to the studio. You must attend together.",
    },
    {
      question: "Is this open to everyone?",
      answer: "Yes. This class is open to all.",
    },
    {
      question: "Where is the class?",
      answer: "Studio E, 2657 W Division St, Chicago, IL, in Humboldt Park.",
    },
    {
      question: "How many spots are available?",
      answer:
        "Only 20 spots are available so instruction stays personal and everyone has room to move.",
    },
    {
      question: "What time should I arrive?",
      answer: "We recommend arriving 10 to 15 minutes early for check-in.",
    },
    CANT_MAKE_THIS_WEEK_FAQ,
  ],
  spanish: {
    durationLabel: "7:30 PM a 8:30 PM",
    copy: {
      accentLabel: "Movimiento Afro-Cubano",
      heroHeadline: "Muévete con los Orishas. Siente el pulso afro-cubano.",
      heroSubheadline:
        "Una clase de miércoles amigable para principiantes—cuerpo, ritmo y espíritu. No necesitas experiencia previa en salsa. Aprende movimiento fundamental y rota por una práctica viva de 8 Orishas.",
      primaryCta: "Reservar mi lugar por $25",
      secondaryCta: "Traer a mi amigo/a",
      capacityNote:
        "Solo 20 boletos para que el instructor pueda dar atención real y todos tengan espacio para moverse.",
      videoHeadline: "Ven por el movimiento. Sal conectado/a al ritmo.",
      offerHeadline: "Tus $25 te dan acceso",
      friendHeadline: "Trae a tu mejor amigo/a gratis",
      friendBody:
        "Tu boleto incluye un lugar gratis para un amigo/a nuevo/a en el estudio. Aprendan juntos, muévanse juntos, y construyan la práctica lado a lado.",
      priceFriendLine: "$25 · Trae un amigo/a gratis",
      limitedHeadline: "Solo 20 boletos disponibles",
      limitedBody:
        "Mantenemos el salón pequeño para que sientas la música, recibas corrección en tu mecánica corporal, y bailes con intención.",
      communityHeadline: "Raíces cubanas. Espíritu panafricano.",
      communityBody:
        "Esta clase combina movimiento afro-cubano fundamental—muelleo, ondulación y rumba—con un ciclo rotativo de 8 Orishas. Es abierta, con los pies en la tierra, y hecha para cualquiera listo/a a conectar cuerpo y cultura. No se requiere experiencia en salsa.",
      communityBadge: "Abierto a todos · Sin experiencia en salsa",
      finalHeadline: "Tu miércoles ya está listo.",
      finalBody:
        "Asegura tu boleto, trae un amigo/a o ven solo/a, y entra al movimiento afro-cubano en Studio E.",
      countdownEnded: "La clase está por empezar.",
      stickyCta: "Reservar mi lugar — $25",
      flyerAlt: "Flyer de Afro-Cuban Movement en Studio E — trae un amigo gratis, $25",
      videoAriaLabel: "Energía de la clase Afro-Cuban Movement en Studio E",
    },
    offerBullets: [
      "Clase de movimiento afro-cubano de 60 minutos",
      "Fundamentos: muelleo, ondulación y rumba",
      "Práctica rotativa de 8 Orishas",
      "No se necesita experiencia previa en salsa",
      "Ven solo/a o trae un amigo/a gratis (nuevo/a en el estudio)",
      "Instrucción personalizada en un grupo máximo de 20",
    ],
    offerTerms: [
      "El cliente que paga y el amigo/a gratis deben asistir juntos.",
      "El amigo/a gratis debe ser nuevo/a en el estudio.",
      "Un amigo/a gratis por boleto pagado.",
      "Solo 20 boletos en total.",
    ],
    faqs: [
      {
        question: "¿Necesito experiencia en salsa?",
        answer:
          "No. No se necesita experiencia previa en salsa. Empezamos desde el movimiento afro-cubano fundamental para que los principiantes se sientan seguros.",
      },
      {
        question: "¿Qué vamos a practicar?",
        answer:
          "Movimiento fundamental—muelleo, ondulación y rumba—más una lista rotativa de 8 Orishas que trabajamos con el tiempo.",
      },
      {
        question: "¿Qué son los Orishas en esta clase?",
        answer:
          "Practicamos un ciclo rotativo de 8 Orishas como parte del currículo—así construyes vocabulario a lo largo de las semanas, no solo la coreografía de una noche.",
      },
      {
        question: "¿Qué incluye mi boleto?",
        answer: "Un lugar en la clase de Afro-Cuban Movement de 60 minutos en Studio E.",
      },
      {
        question: "¿Puedo ir solo/a?",
        answer: "Sí. Ven solo/a o trae un amigo/a. El espacio te recibe de cualquier forma.",
      },
      {
        question: "¿Puedo traer un amigo/a?",
        answer:
          "Sí. Cada boleto pagado incluye un amigo/a gratis que sea nuevo/a en el estudio. Deben asistir juntos.",
      },
      {
        question: "¿Está abierto para todos?",
        answer: "Sí. Esta clase está abierta a todos.",
      },
      {
        question: "¿Dónde es la clase?",
        answer: "Studio E, 2657 W Division St, Chicago, IL, en Humboldt Park.",
      },
      {
        question: "¿Cuántos lugares hay?",
        answer:
          "Solo 20 lugares para que la instrucción sea personal y todos tengan espacio para moverse.",
      },
      {
        question: "¿A qué hora debo llegar?",
        answer: "Te recomendamos llegar 10 a 15 minutos antes para el check-in.",
      },
      CANT_MAKE_THIS_WEEK_FAQ_ES,
    ],
    ui: {
      startsIn: "Empieza en",
      locationHeadline: "Dónde bailamos",
      faqHeadline: "Preguntas frecuentes",
      limitedTo: "Limitado a {n} personas",
      spotsLeftOne: "{n} lugar disponible",
      spotsLeftMany: "{n} lugares disponibles",
      capOf: "Máximo de {n} boletos",
      ticketsLeftOne: "Solo {n} boleto · Máximo {capacity}",
      ticketsLeftMany: "Solo {n} boletos · Máximo {capacity}",
      reserveSpot: "Reserva tu lugar",
      checkoutHelper: "Completa el pago abajo. {priceLine}.",
      loadingDate: "Cargando fecha…",
      openCheckoutNewTab: "abrir el pago en una pestaña nueva",
      countdownDays: "Días",
      countdownHrs: "Hrs",
      countdownMin: "Min",
      countdownSec: "Seg",
      langToggle: "English",
    },
  },
}
