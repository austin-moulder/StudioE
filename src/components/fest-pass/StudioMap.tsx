import { STUDIO_ADDRESS, STUDIO_MAP_EMBED_URL } from "@/lib/fest-pass/constants"

export default function StudioMap() {
  return (
    <section className="border-t border-gray-100 bg-gray-50 py-14 md:py-16">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Find us</p>
            <h2 className="mt-3 text-2xl font-black text-gray-900 md:text-3xl">{STUDIO_ADDRESS}</h2>
            <p className="mt-3 text-gray-600">Humboldt Park · Paseo Boricua</p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <iframe
              src={STUDIO_MAP_EMBED_URL}
              title={`Studio E map at ${STUDIO_ADDRESS}`}
              className="h-[320px] w-full sm:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
