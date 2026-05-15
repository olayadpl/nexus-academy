import Link from "next/link"
import Image from "next/image"
import { Button } from "@/src/core/ui/components/button"
import type { DiscoverBannerEntity } from "../../domain/entities/discover.entity"

interface ExploreMarketingBannerProps {
  banner: DiscoverBannerEntity
}

export function ExploreMarketingBanner({ banner }: ExploreMarketingBannerProps) {
  return (
    <div className="relative flex w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-violet-600 to-indigo-600 md:min-h-[22rem] md:rounded-[2rem] md:items-center md:justify-center">
      <section className="relative z-10 flex flex-col items-start justify-start px-5 py-10 md:min-h-[22rem] md:w-full md:max-w-7xl md:py-14 md:pl-12 md:pr-[26rem]">
        <h1 className="max-w-[18ch] text-[1.625rem] font-bold leading-8 tracking-[-0.03rem] text-white md:mb-3 md:max-w-none md:text-[2rem] md:leading-10 md:tracking-[-0.04rem]">
          {banner.title}
        </h1>
        <p className="mt-2 max-w-[34ch] text-sm leading-6 text-white/80 md:mt-0 md:text-base md:leading-[26px]">
          {banner.description}
        </p>
        <div className="mt-6 flex gap-2.5">
          <Button asChild variant="secondary">
            <Link href={banner.ctaHref} className="inline-block text-black">{banner.ctaText}</Link>
          </Button>
        </div>
      </section>
      <div className="absolute right-0 top-0 z-20 hidden h-full w-[23rem] max-w-full shrink-0 md:block">
        <Image src={banner.imageUrl} alt="marketing-banner" fill className="object-cover" />
      </div>
    </div>
  )
}
