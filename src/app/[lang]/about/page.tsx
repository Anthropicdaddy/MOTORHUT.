export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight mb-4">About</h1>

      <div className="space-y-6 text-muted-foreground text-sm leading-relaxed">
        <p>
          Motor Hut is a used car dealership based in Los Angeles, California.
          We focus on quality pre-owned vehicles — the kind you&apos;d actually
          want to drive, not just the ones that happen to be available.
        </p>

        <p>
          Every car on our lot goes through a thorough inspection before it&apos;s
          listed. We believe in transparent pricing, honest descriptions, and
          a buying experience that doesn&apos;t feel like a chore.
        </p>

        <p>
          Whether you&apos;re looking for a reliable daily commuter, a weekend
          cruiser, or something for the family, we&apos;re here to help you
          find the right fit — at the right price.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-2xl font-semibold">500+</p>
          <p className="text-xs text-muted-foreground mt-1">Cars sold</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">4.9</p>
          <p className="text-xs text-muted-foreground mt-1">Google rating</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">10+</p>
          <p className="text-xs text-muted-foreground mt-1">Years in business</p>
        </div>
        <div>
          <p className="text-2xl font-semibold">LA</p>
          <p className="text-xs text-muted-foreground mt-1">Based locally</p>
        </div>
      </div>
    </div>
  );
}
