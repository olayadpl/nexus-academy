import Link from "next/link"
import Image from "next/image"
import { Button } from "@/src/core/ui/components/button"
import type { DiscoverBannerEntity } from "../../domain/entities/discover.entity"

interface ExploreMarketingBannerProps {
  banner: DiscoverBannerEntity
}

export function ExploreMarketingBanner({ banner }: ExploreMarketingBannerProps) {
  return (
    <section className="relative flex flex-col items-start justify-center overflow-hidden rounded-[1.75rem] bg-muted px-5 py-8 md:rounded-[2rem] md:py-12 md:pl-12 md:pr-[26rem]">
      <h1 className="max-w-[18ch] text-[1.625rem] font-bold leading-8 tracking-[-0.03rem] md:mb-3 md:max-w-none md:text-[2rem] md:leading-10 md:tracking-[-0.04rem]">
        {banner.title}
      </h1>
      <p className="mt-2 max-w-[34ch] text-sm leading-6 text-muted-foreground md:mt-0 md:text-base md:leading-[26px]">
        {banner.description}
      </p>
      <div className="mt-6 flex gap-2.5">
        <Button asChild>
          <Link href={banner.ctaHref} className="inline-block text-white">{banner.ctaText}</Link>
        </Button>
      </div>
      <div className="absolute right-0 top-0 hidden h-full w-[23rem] max-w-full shrink-0 md:block">
        <Image src={banner.imageUrl} alt="marketing-banner" fill className="object-cover" />
      </div>
    </section>
  )
}
