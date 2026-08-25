"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, MapPin, X } from "lucide-react"

type Cell =
  | { kind: "text"; value: string; emphasis?: boolean }
  | { kind: "yes" }
  | { kind: "no" }
  | { kind: "list"; items: string[] }

type StudioKey = "studioE" | "latinRhythms" | "latinStreet" | "mayambo"

type Row = {
  feature: string
  studioE: Cell
  latinRhythms: Cell
  latinStreet: Cell
  mayambo: Cell
}

const competitors = [
  { key: "latinRhythms" as const, name: "Latin Rhythms", short: "Rhythms" },
  { key: "latinStreet" as const, name: "Latin Street", short: "Street" },
  { key: "mayambo" as const, name: "Mayambo", short: "Mayambo" },
]

const studios = [
  { key: "studioE" as const, name: "Studio E", highlight: true },
  { key: "latinRhythms" as const, name: "Latin Rhythms", highlight: false },
  { key: "latinStreet" as const, name: "Latin Street", highlight: false },
  { key: "mayambo" as const, name: "Mayambo", highlight: false },
]

const rows: Row[] = [
  {
    feature: "Teaching style",
    studioE: {
      kind: "text",
      value: "The Studio E Method — no combos or memorization",
      emphasis: true,
    },
    latinRhythms: { kind: "text", value: "Combos" },
    latinStreet: { kind: "text", value: "Combos" },
    mayambo: { kind: "text", value: "Combos" },
  },
  {
    feature: "Structure",
    studioE: {
      kind: "text",
      value: "Full studio access · modular curriculum · start any time · no locked sessions",
      emphasis: true,
    },
    latinRhythms: { kind: "text", value: "4-week session-based" },
    latinStreet: { kind: "text", value: "4-week session-based" },
    mayambo: { kind: "text", value: "4-week session-based" },
  },
  {
    feature: "Weekly 1:1 guidance",
    studioE: { kind: "yes" },
    latinRhythms: { kind: "no" },
    latinStreet: { kind: "no" },
    mayambo: { kind: "no" },
  },
  {
    feature: "Member-exclusive activities",
    studioE: {
      kind: "text",
      value: "Karaoke nights, club outings, birthday parties, game nights, y más",
      emphasis: true,
    },
    latinRhythms: { kind: "no" },
    latinStreet: { kind: "no" },
    mayambo: { kind: "no" },
  },
  {
    feature: "Socials",
    studioE: { kind: "text", value: "Included", emphasis: true },
    latinRhythms: { kind: "text", value: "$10–$30" },
    latinStreet: { kind: "text", value: "$10–$25" },
    mayambo: { kind: "text", value: "$10–$15" },
  },
  {
    feature: "Pricing",
    studioE: {
      kind: "text",
      value: "Starting at $89 for any 4 classes",
      emphasis: true,
    },
    latinRhythms: { kind: "text", value: "$100 / 4-week session of the same class" },
    latinStreet: { kind: "text", value: "$69 / 4-week session of the same class" },
    mayambo: { kind: "text", value: "$120 / 4-week session of the same class" },
  },
  {
    feature: "Privates",
    studioE: {
      kind: "text",
      value: "$75 member pricing · bring a partner at no extra cost",
      emphasis: true,
    },
    latinRhythms: { kind: "text", value: "$110 individual · $130 couple" },
    latinStreet: { kind: "text", value: "Not disclosed" },
    mayambo: { kind: "text", value: "$100 individual" },
  },
  {
    feature: "Main genres",
    studioE: {
      kind: "list",
      items: [
        "Salsa On1 & On2",
        "Bachata",
        "Cumbia",
        "Merengue",
        "Cha-cha",
        "Reggaeton",
        "Twerk",
        "Afro-Cuban",
      ],
    },
    latinRhythms: { kind: "list", items: ["Salsa", "Bachata", "Cha-cha"] },
    latinStreet: { kind: "list", items: ["Salsa", "Bachata", "Cumbia", "Cha-cha"] },
    mayambo: { kind: "list", items: ["Salsa On2"] },
  },
  {
    feature: "Location",
    studioE: { kind: "text", value: "Humboldt Park — Paseo Boricua", emphasis: true },
    latinRhythms: { kind: "text", value: "West Loop" },
    latinStreet: { kind: "text", value: "South Loop" },
    mayambo: { kind: "text", value: "Humboldt Park — North Avenue" },
  },
]

function CellContent({
  cell,
  highlight,
  compact = false,
}: {
  cell: Cell
  highlight: boolean
  compact?: boolean
}) {
  if (cell.kind === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
        </span>
        Yes
      </span>
    )
  }

  if (cell.kind === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-stone-400">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100">
          <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
        </span>
        No
      </span>
    )
  }

  if (cell.kind === "list") {
    return (
      <ul className={compact ? "space-y-1" : "space-y-1.5"}>
        {cell.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-snug">
            <span
              className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                highlight ? "bg-[#FF3366]" : "bg-stone-300"
              }`}
            />
            <span className={highlight ? "font-medium text-stone-800" : "text-stone-600"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p
      className={`leading-relaxed ${compact ? "text-[13px]" : "text-sm"} ${
        highlight && cell.emphasis
          ? "font-semibold text-stone-900"
          : highlight
            ? "text-stone-800"
            : "text-stone-600"
      }`}
    >
      {cell.value}
    </p>
  )
}

function MobileCompare() {
  const [selected, setSelected] = useState<(typeof competitors)[number]["key"]>("latinRhythms")
  const competitor = competitors.find((c) => c.key === selected)!

  return (
    <div className="lg:hidden">
      <p className="mb-3 text-sm font-semibold text-stone-600">Compare Studio E with:</p>
      <div
        className="mb-5 grid grid-cols-3 gap-2 rounded-2xl bg-stone-100 p-1.5"
        role="tablist"
        aria-label="Choose a studio to compare"
      >
        {competitors.map((studio) => {
          const active = selected === studio.key
          return (
            <button
              key={studio.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelected(studio.key)}
              className={`rounded-xl px-2 py-2.5 text-center text-xs font-bold transition sm:text-sm ${
                active
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              <span className="sm:hidden">{studio.short}</span>
              <span className="hidden sm:inline">{studio.name}</span>
            </button>
          )
        })}
      </div>

      <div className="mb-4 overflow-hidden rounded-2xl border border-[#FF3366]/25 bg-gradient-to-r from-[#FF3366]/10 to-[#9933CC]/10 px-3 py-3">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <span className="mb-1 inline-block rounded-full bg-[#FF3366] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Best overall
            </span>
            <p className="font-montserrat text-base font-black text-[#FF3366]">Studio E</p>
          </div>
          <div className="flex flex-col items-center justify-end">
            <p className="font-montserrat text-base font-bold text-stone-700">{competitor.name}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <article
            key={row.feature}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <div className="border-b border-stone-100 bg-stone-50 px-4 py-2.5">
              <h3 className="font-montserrat text-sm font-bold text-stone-800">{row.feature}</h3>
            </div>
            <div className="grid grid-cols-2 divide-x divide-stone-100">
              <div className="bg-[#FF3366]/[0.04] px-3 py-3">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-[#FF3366]">
                  Studio E
                </p>
                <CellContent cell={row.studioE} highlight compact />
              </div>
              <div className="px-3 py-3">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-stone-400">
                  {competitor.short}
                </p>
                <CellContent cell={row[selected as StudioKey]} highlight={false} compact />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function DesktopTable() {
  return (
    <div className="hidden overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-[0_20px_60px_-30px_rgba(255,51,102,0.35)] lg:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 w-44 bg-stone-50 px-5 py-5 text-xs font-bold uppercase tracking-wider text-stone-500 md:w-52">
                Feature
              </th>
              {studios.map((studio) => (
                <th
                  key={studio.key}
                  className={`px-5 py-5 align-bottom ${
                    studio.highlight
                      ? "bg-gradient-to-b from-[#FF3366]/12 to-[#FF3366]/5"
                      : "bg-stone-50"
                  }`}
                >
                  {studio.highlight ? (
                    <div className="inline-flex flex-col gap-2">
                      <span className="w-fit rounded-full bg-[#FF3366] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        Best overall
                      </span>
                      <span className="font-montserrat text-xl font-black text-[#FF3366]">
                        {studio.name}
                      </span>
                    </div>
                  ) : (
                    <span className="font-montserrat text-lg font-bold text-stone-700">
                      {studio.name}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.feature} className={index % 2 === 0 ? "bg-white" : "bg-stone-50/70"}>
                <th className="sticky left-0 z-10 border-t border-stone-100 bg-inherit px-5 py-5 align-top font-montserrat text-sm font-bold text-stone-800">
                  <span className="block max-w-[10rem] leading-snug">{row.feature}</span>
                </th>
                {studios.map((studio) => (
                  <td
                    key={studio.key}
                    className={`border-t border-stone-100 px-5 py-5 align-top ${
                      studio.highlight ? "bg-[#FF3366]/[0.04]" : ""
                    }`}
                  >
                    <CellContent cell={row[studio.key]} highlight={studio.highlight} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ComparePlansClient() {
  return (
    <div className="min-h-screen bg-[#faf7f5]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="container relative px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
              <MapPin className="h-4 w-4" aria-hidden />
              Chicago Latin dance studios
            </div>
            <h1 className="font-montserrat text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Studio E vs. other studios
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl">
              A clear look at how Chicago&apos;s Latin dance options stack up on flexibility,
              community, teaching method, and real value.
            </p>
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:py-16">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF3366]">Side-by-side</p>
          <h2 className="mt-1 font-montserrat text-2xl font-black text-stone-900 md:text-3xl">
            Compare plans & offerings
          </h2>
        </div>

        <MobileCompare />
        <DesktopTable />

        <p className="mt-4 text-center text-xs text-stone-400">
          Competitor information based on publicly available offerings and may change. Confirm
          details directly with each studio.
        </p>
      </section>

      <section className="border-y border-stone-200 bg-white py-16 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-montserrat text-3xl font-black text-stone-900 md:text-4xl">
              Where Studio E pulls ahead
            </h2>
            <p className="mt-3 text-stone-600">
              The differences that matter most when you&apos;re choosing where to train.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              {
                title: "Method over memorization",
                body: "Learn skills you can use on any social floor—not combos that disappear after class.",
              },
              {
                title: "Flexibility built in",
                body: "Start any time, take any classes, and skip rigid 4-week session lock-ins.",
              },
              {
                title: "Community included",
                body: "Included socials, weekly 1:1 guidance, and member-only hangouts that keep you connected.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-200 bg-[#faf7f5] p-6"
              >
                <h3 className="font-montserrat text-lg font-bold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-8 py-12 text-center text-white shadow-xl md:px-12">
            <h2 className="font-montserrat text-3xl font-black md:text-4xl">
              Ready to feel the difference?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Join Studio E in Humboldt Park and train with a method, community, and membership
              built for real progress.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/membership"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#FF3366] transition hover:bg-white/95"
              >
                View membership plans
              </Link>
              <a
                href="https://app.acuityscheduling.com/schedule/76f316b6/?template=class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                See the class schedule
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
