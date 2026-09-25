import {
  CANT_MAKE_THIS_WEEK_FAQ,
  CANT_MAKE_THIS_WEEK_FAQ_ES,
  MEXICAN_POPUP_THEME,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const CUMBIA_WEPA_CHECKOUT_URL =
  "https://studioe-danceclassestraining.com/wepa-checkout" as const

export const CUMBIA_WEPA_CONFIG: PopupClassLandingConfig = {
  id: "cumbia-wepa",
  checkoutUrl: CUMBIA_WEPA_CHECKOUT_URL,
  embedCheckout: true,
  spotsStorageKey: "studioe_cumbia_wepa_spots_left_v1",
  theme: MEXICAN_POPUP_THEME,
  bannerStripe: "mexican",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "cumbia_wepa",
  },
  event: {
    name: "Cumbia Wepa Workshop",
    format: "Wepa footwork · street-style cumbia",
    startHour: 18,
    startMinute: 30,
    timeZone: "America/Chicago",
    weekday: 4,
    durationLabel: "6:30 PM to 7:30 PM",
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
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Cumba_Wepa_Workshop.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Wepa_Vid.mp4",
  },
  copy: {
    accentLabel: "¡Wepa!",
    heroHeadline: "Cumbia Wepa: Street-Style Footwork in Humboldt Park",
    heroSubheadline:
      "Learn Mexican wepa footwork in a friendly beginner workshop. Come alone or bring a friend free—and leave with moves you can take to any cumbia night.",
    primaryCta: "Reserve My Spot for $25",
    secondaryCta: "Bring My Friend",
    capacityNote:
      "Only 20 tickets available for personalized instruction and enough floor space to really move.",
    videoHeadline: "Come for the Wepa. Leave Ready for the Dance Floor.",
    educationHeadline: "What Is Wepa?",
    educationBody:
      "Wepa is Mexican street-style cumbia footwork—bouncy, playful steps you’ll hear yelled on the dance floor when the energy jumps. Think quick weight shifts, syncopated patterns, and freestyle moves made for parties and socials. No partner required; if you can feel a beat, you can learn wepa.",
    offerHeadline: "Your $25 Gets You In",
    friendHeadline: "Bring Your Best Friend Free",
    friendBody:
      "Your ticket includes one free spot for a friend who is new to the studio. Show up together, learn the footwork together, and take the night from there.",
    priceFriendLine: "$25 · Bring a friend free",
    limitedHeadline: "Only 20 Tickets Available",
    limitedBody:
      "We keep the room small so the instructor can coach your steps and everyone has room to groove.",
    communityHeadline: "Mexican Street Cumbia, Chicago Style",
    communityBody:
      "Wepa is high-energy street-style cumbia footwork—fast, playful, and made for the social floor. This workshop is beginner-friendly, open to all, and built for anyone who wants that Mexican party energy in Humboldt Park.",
    communityBadge: "Open to all · Beginner-friendly",
    finalHeadline: "Your Thursday Night Plans Are Set.",
    finalBody:
      "Grab your ticket, bring a friend or come solo, learn wepa footwork, and keep the Mexican cumbia vibe going.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Cumbia Wepa Workshop flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Cumbia Wepa class energy at Studio E",
  },
  offerBullets: [
    "60-minute beginner-friendly wepa footwork workshop",
    "Street-style Mexican cumbia you can use on any social floor",
    "Come alone or bring one friend free (new to the studio)",
    "High-energy Thursday night at Studio E in Humboldt Park",
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
      question: "Do I need dance experience?",
      answer:
        "No. This workshop is beginner-friendly. We break down wepa footwork so you can follow along and start improvising.",
    },
    {
      question: "What is wepa / street-style cumbia?",
      answer:
        "Wepa is energetic Mexican street-style cumbia footwork—bouncy, playful steps people use at parties and socials. You’ll learn patterns you can take straight to the floor.",
    },
    {
      question: "What does my ticket include?",
      answer: "One spot in the 60-minute Cumbia Wepa Workshop at Studio E.",
    },
    {
      question: "Can I come alone?",
      answer: "Yes. Come alone or bring a friend. The room is built to be welcoming either way.",
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
    durationLabel: "6:30 PM a 7:30 PM",
    copy: {
      accentLabel: "¡Wepa!",
      heroHeadline: "Cumbia Wepa: Footwork estilo callejero en Humboldt Park",
      heroSubheadline:
        "Aprende wepa mexicano en un taller amigable para principiantes. Ven solo/a o trae un amigo gratis—y sal con pasos listos para cualquier noche de cumbia.",
      primaryCta: "Reservar mi lugar por $25",
      secondaryCta: "Traer a mi amigo/a",
      capacityNote:
        "Solo 20 boletos para instrucción personalizada y espacio suficiente para moverte de verdad.",
      videoHeadline: "Ven por el wepa. Sal listo/a para la pista.",
      educationHeadline: "¿Qué es el wepa?",
      educationBody:
        "El wepa es footwork de cumbia callejera mexicana—pasos vivos y jugetones que se gritan en la pista cuando sube la energía. Piensa en cambios de peso rápidos, patrones sincopados y movimientos de freestyle para fiestas y sociales. No necesitas pareja; si sientes el ritmo, puedes aprender wepa.",
      offerHeadline: "Tus $25 te dan acceso",
      friendHeadline: "Trae a tu mejor amigo/a gratis",
      friendBody:
        "Tu boleto incluye un lugar gratis para un amigo/a nuevo/a en el estudio. Lleguen juntos, aprendan el footwork juntos, y sigan la noche desde ahí.",
      priceFriendLine: "$25 · Trae un amigo/a gratis",
      limitedHeadline: "Solo 20 boletos disponibles",
      limitedBody:
        "Mantenemos el salón pequeño para que el instructor pueda corregir tus pasos y todos tengan espacio para gozar.",
      communityHeadline: "Cumbia mexicana de calle, estilo Chicago",
      communityBody:
        "El wepa es footwork de cumbia callejera mexicana—rápido, jugetón y hecho para la pista social. Este taller es para principiantes, abierto a todos, y pensado para quien quiere esa energía de fiesta mexicana en Humboldt Park.",
      communityBadge: "Abierto a todos · Ideal para principiantes",
      finalHeadline: "Tu jueves ya está listo.",
      finalBody:
        "Asegura tu boleto, trae un amigo/a o ven solo/a, aprende wepa, y sigue con la vibra de cumbia mexicana.",
      countdownEnded: "La clase está por empezar.",
      stickyCta: "Reservar mi lugar — $25",
      flyerAlt: "Flyer del taller Cumbia Wepa en Studio E — trae un amigo gratis, $25",
      videoAriaLabel: "Energía de la clase Cumbia Wepa en Studio E",
    },
    offerBullets: [
      "Taller de wepa de 60 minutos, ideal para principiantes",
      "Cumbia mexicana estilo callejero para cualquier pista social",
      "Ven solo/a o trae un amigo/a gratis (nuevo/a en el estudio)",
      "Jueves con mucha energía en Studio E, Humboldt Park",
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
        question: "¿Necesito experiencia bailando?",
        answer:
          "No. Este taller es para principiantes. Desglosamos el wepa para que puedas seguir y empezar a improvisar.",
      },
      {
        question: "¿Qué es wepa / cumbia estilo callejero?",
        answer:
          "El wepa es footwork energético de cumbia callejera mexicana—pasos vivos y divertidos que se usan en fiestas y sociales. Aprenderás patrones listos para la pista.",
      },
      {
        question: "¿Qué incluye mi boleto?",
        answer: "Un lugar en el taller de Cumbia Wepa de 60 minutos en Studio E.",
      },
      {
        question: "¿Puedo ir solo/a?",
        answer: "Sí. Ven solo/a o trae un amigo/a. El espacio está pensado para recibirte de cualquier forma.",
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
      moreWorkshops: "Más talleres próximos",
      viewWorkshop: "Ver clase",
    },
  },
}
