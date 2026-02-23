import { SiteHeader } from "@/components/site-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      {/* Grain overlay */}
      <div className="fixed inset-0 grain-overlay z-0 pointer-events-none" aria-hidden="true" />

      <SiteHeader activePage="about" />

      {/* Content */}
      <main className="pt-40 pb-32 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Page title */}
          <h1 className="text-xs font-extralight tracking-[0.3em] text-foreground/50 mb-20 uppercase">About</h1>

          {/* Main blurb */}
          <div className="space-y-8 text-sm font-extralight leading-relaxed tracking-[0.05em] text-foreground/80">
            <p>
              I'm Arthur, currently a CS and Philosophy double major at UVA.
            </p>

            <p>
              My interests sit at the intersection of technology and the questions it raises: what we build,
              why we build it, and what it means. I'm drawn to AI and topics like superintelligence, how it might develop, how it can be to everyone's benefit, 
              and what it tells us about humanity.
            </p>

            <p>
              Outside of classes I've spent time building side projects and staying on top of the latest developments in AI.
              I also like to read about the philosophy of AI, especially around superintelligence and philosophy of mind. 
              I sometime write about topics that interest me or ideas that I just need to work through.
            </p>

            <p>
              This site is where I collect that work.
            </p>
          </div>

          {/* Organic divider */}
          <div className="my-20">
            <svg className="w-24 h-2" viewBox="0 0 120 8" aria-hidden="true">
              <path
                d="M0,4 C20,2 40,6 60,4 C80,2 100,6 120,4"
                fill="none"
                stroke="currentColor"
                className="text-earth-3"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

        </div>
      </main>
    </div>
  )
}
