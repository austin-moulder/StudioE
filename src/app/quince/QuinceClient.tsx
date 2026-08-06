"use client"

import { useState } from "react"
import Image from "next/image"
import ChoreoLeadForm from "@/components/forms/ChoreoLeadForm"
import { Check, Heart, Music2, Sparkles, Users } from "lucide-react"

type Lang = "en" | "es"

const TIMING = {
  en: "Minimum 4–6 weeks before the celebration. For larger courts or multiple numbers, we can start up to 6 months in advance.",
  es: "Mínimo 4–6 semanas antes de la celebración. Para cortes grandes o varios números, podemos empezar hasta con 6 meses de anticipación.",
}

const copy = {
  en: {
    langToggle: "Español",
    badge: "Quinceañera Choreography",
    heroTitle: "Make Her Quince Unforgettable",
    heroSub:
      "Custom vals, court dances, father-daughter moments, and surprise numbers—choreographed for Chicago’s most meaningful celebrations.",
    heroCta: "Request a Consultation",
    introBadge: "Signature Moments",
    introTitle: "Dances that define the night",
    introBody:
      "Studio E designs full quinceañera dance packages—or à la carte moments—so every entrance and every song feels intentional.",
    introTiming: TIMING.en,
    offeringsTitle: "Everything we can create for your quince",
    offerings: [
      {
        icon: Heart,
        title: "Vals / Waltz",
        body: "The signature quince waltz—elegant, emotional, and built around her style and song.",
      },
      {
        icon: Users,
        title: "Court choreography",
        body: "Chambelanes and damas trained together with clean formations, timing, and stage presence.",
      },
      {
        icon: Sparkles,
        title: "Surprise dance",
        body: "A high-energy reveal number guests never forget—Latin, hip hop, or a custom mashup.",
      },
      {
        icon: Music2,
        title: "Father–daughter & family dances",
        body: "Intimate moments choreographed so they feel natural on the floor, not rehearsed stiff.",
      },
    ],
    packageTitle: "Built around her celebration",
    packageBody:
      "Whether you need one polished vals or a full evening of choreography, we match the package to her vision, her court, and her timeline.",
    packageItems: [
      "Private lessons for the quinceañera and her partner",
      "Group rehearsals for the full court",
      "Practice videos so everyone can rehearse at home",
      "Song selection and musicality coaching",
      "Timeline planning so dances fit the reception flow",
      "Studio E HQ rehearsals in Humboldt Park, Chicago",
    ],
    familyTitle: "Moments the family will remember",
    familyBody:
      "From the father–daughter dance to the surprise number, we choreograph for emotion first—so it looks beautiful on camera and feels natural in the room.",
    processTitle: "How it works",
    processSub: "From first call to the big night—we stay with your family every step.",
    steps: [
      {
        title: "Consultation",
        body: "We learn her vision, songs, court size, experience level, and celebration date.",
      },
      {
        title: "Custom choreography",
        body: "We build routines that match the music, her personality, and the energy of the night.",
      },
      {
        title: "Rehearse & shine",
        body: "Weekly practices, video homework, and polish until the court feels confident.",
      },
    ],
    faqTitle: "FAQs",
    faqs: [
      {
        q: "How far in advance should we start?",
        a: TIMING.en,
      },
      {
        q: "What if some of the court has never danced?",
        a: "That’s normal. We choreograph for beginners and build confidence week by week.",
      },
      {
        q: "Can we mix styles?",
        a: "Yes—vals, salsa, bachata, cumbia, hip hop, and surprise numbers can all live in one package.",
      },
      {
        q: "Where do rehearsals happen?",
        a: "Usually at Studio E HQ (2657 W Division St, Humboldt Park). Off-site rehearsals are available.",
      },
    ],
    ctaTitle: "Ready to plan her quince dances?",
    ctaSub:
      "Tell us the date, songs, and what you need. A Studio E team member will reach out soon.",
  },
  es: {
    langToggle: "English",
    badge: "Coreografía para Quinceañera",
    heroTitle: "Haz que su quince sea inolvidable",
    heroSub:
      "Vals personalizado, bailes de la corte, el baile con papá y números sorpresa—coreografiados para las celebraciones más importantes en Chicago.",
    heroCta: "Solicitar una consulta",
    introBadge: "Momentos especiales",
    introTitle: "Bailes que definen la noche",
    introBody:
      "Studio E diseña paquetes completos de baile para quinceañera—o momentos sueltos—para que cada entrada y cada canción se sienta especial.",
    introTiming: TIMING.es,
    offeringsTitle: "Todo lo que podemos crear para tu quince",
    offerings: [
      {
        icon: Heart,
        title: "Vals",
        body: "El vals emblemático del quince—elegante, emotivo y creado a su estilo y canción.",
      },
      {
        icon: Users,
        title: "Coreografía de la corte",
        body: "Chambelanes y damas ensayando juntos con formaciones claras, timing y presencia.",
      },
      {
        icon: Sparkles,
        title: "Baile sorpresa",
        body: "Un número con energía que nadie olvida—latino, hip hop o un mashup a tu gusto.",
      },
      {
        icon: Music2,
        title: "Baile padre–hija y familiares",
        body: "Momentos íntimos coreografiados para que se sientan naturales en la pista.",
      },
    ],
    packageTitle: "Diseñado para su celebración",
    packageBody:
      "Ya sea un vals pulido o una noche completa de coreografía, adaptamos el paquete a su visión, su corte y su tiempo.",
    packageItems: [
      "Clases privadas para la quinceañera y su pareja",
      "Ensayos grupales para toda la corte",
      "Videos de práctica para ensayar en casa",
      "Selección de canciones y musicalidad",
      "Planeación del tiempo para que los bailes fluyan en la recepción",
      "Ensayos en Studio E HQ en Humboldt Park, Chicago",
    ],
    familyTitle: "Momentos que la familia recordará",
    familyBody:
      "Desde el baile padre–hija hasta el número sorpresa, coreografiamos primero la emoción—para que se vea hermoso en cámara y se sienta natural en el salón.",
    processTitle: "Cómo funciona",
    processSub: "Desde la primera llamada hasta la gran noche—acompañamos a tu familia en cada paso.",
    steps: [
      {
        title: "Consulta",
        body: "Conocemos su visión, canciones, tamaño de la corte, nivel y fecha de la celebración.",
      },
      {
        title: "Coreografía a la medida",
        body: "Creamos rutinas que combinan con la música, su personalidad y la energía de la noche.",
      },
      {
        title: "Ensayar y brillar",
        body: "Ensayos semanales, tarea en video y pulido hasta que la corte se sienta segura.",
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Con cuánta anticipación debemos empezar?",
        a: TIMING.es,
      },
      {
        q: "¿Y si algunos de la corte nunca han bailado?",
        a: "Es muy común. Coreografiamos para principiantes y construimos confianza semana a semana.",
      },
      {
        q: "¿Podemos mezclar estilos?",
        a: "Sí—vals, salsa, bachata, cumbia, hip hop y números sorpresa pueden ir en un mismo paquete.",
      },
      {
        q: "¿Dónde son los ensayos?",
        a: "Normalmente en Studio E HQ (2657 W Division St, Humboldt Park). También hay ensayos fuera del estudio.",
      },
    ],
    ctaTitle: "¿Lista para planear los bailes de su quince?",
    ctaSub:
      "Cuéntanos la fecha, las canciones y lo que necesitas. Alguien de Studio E te contactará pronto.",
  },
} as const

const PHOTOS = {
  hero: {
    src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Quince/Dance_Ads-66.png",
    alt: "Quinceañera dance choreography",
  },
  intro: {
    src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Quince/Dance_Ads-68.png",
    alt: "Quinceañera court dance",
  },
  package: {
    src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Quince/Dance_Ads-70.png",
    alt: "Quinceañera celebration dance",
  },
  family: {
    src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Quince/Dance_Ads-72.png",
    alt: "Father and quinceañera dancing",
  },
}

export default function QuinceClient() {
  const [lang, setLang] = useState<Lang>("en")
  const t = copy[lang]

  return (
    <div className="flex flex-col bg-white">
      <section className="relative min-h-[78vh] overflow-hidden">
        <Image
          src={PHOTOS.hero.src}
          alt={PHOTOS.hero.alt}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5C0A1F]/70 via-[#8B1538]/45 to-[#9933CC]/40" />

        <div className="container relative z-10 flex min-h-[78vh] flex-col items-center justify-center px-4 py-20 text-center text-white">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="mb-6 rounded-md border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {t.langToggle}
          </button>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
            {t.badge}
          </p>
          <h1 className="max-w-4xl font-montserrat text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/95 md:text-xl">{t.heroSub}</p>
          <a
            href="#inquire"
            className="mt-10 inline-flex rounded-xl bg-[#FF3366] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FF3366]/30 transition-opacity hover:opacity-95"
          >
            {t.heroCta}
          </a>
        </div>
      </section>

      {/* Intro: image + copy (wedding-dance pattern) */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image
                src={PHOTOS.intro.src}
                alt={PHOTOS.intro.alt}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center rounded-md bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                  {t.introBadge}
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.introTitle}</h2>
              <p className="mt-4 text-lg text-gray-500">{t.introBody}</p>
              <p className="mt-4 text-gray-500">{t.introTiming}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings grid — text only */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-center font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
            {t.offeringsTitle}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {t.offerings.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#FF3366]/10">
                    <Icon className="h-5 w-5 text-[#FF3366]" aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone-600">{item.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Package: copy left + image right */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {t.packageTitle}
              </h2>
              <p className="mb-6 text-lg text-gray-500">{t.packageBody}</p>
              <ul className="space-y-3">
                {t.packageItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366]/15 text-[#FF3366]">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-lg shadow-xl md:order-2 md:aspect-[4/3]">
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#FF3366]/20 to-transparent" />
              <Image
                src={PHOTOS.package.src}
                alt={PHOTOS.package.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Family: image left + copy right */}
      <section className="bg-gradient-to-r from-[#FF7A5A]/10 via-[#FF3366]/10 to-[#9933CC]/10 py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl md:aspect-square">
              <Image
                src={PHOTOS.family.src}
                alt={PHOTOS.family.alt}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.familyTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{t.familyBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              {t.processTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-600">{t.processSub}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {t.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-stone-200 bg-gray-50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-xl font-black text-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-stone-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
            {t.faqTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {t.faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-stone-900">{faq.q}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="inquire"
        className="scroll-mt-24 bg-gradient-to-br from-[#5C0A1F] via-[#8B1538] to-[#9933CC] px-4 py-16 text-white md:py-20"
      >
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="font-montserrat text-3xl font-black md:text-4xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{t.ctaSub}</p>
          </div>
          <ChoreoLeadForm iframeId="inline-quince-choreo-form" title="Quinceañera Inquiry" />
        </div>
      </section>
    </div>
  )
}
