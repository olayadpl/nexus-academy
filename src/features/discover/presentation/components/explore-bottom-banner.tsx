import Link from "next/link"
import { Button } from "@/src/core/ui/components/button"
import type { DiscoverBottomBannerEntity } from "../../domain/entities/discover.entity"

interface ExploreBottomBannerProps {
  banner: DiscoverBottomBannerEntity
}

export function ExploreBottomBanner({ banner }: ExploreBottomBannerProps) {
  return (
    <div className="mx-0 block md:mx-0">
      <div className="flex flex-col items-start rounded-none bg-primary px-6 py-8 md:rounded-[32px] md:p-12">
        <div className="flex w-full flex-col items-start gap-8">
          <div className="flex flex-col">
            <div className="text-[32px] font-bold leading-10 tracking-[-0.64px] text-primary-foreground md:text-[40px] md:leading-[48px] md:tracking-[-0.8px]">
              {banner.title}
            </div>
          </div>
          <div className="flex grow flex-col justify-center gap-3 md:flex-row">
            <Button asChild variant="secondary">
              <Link href={banner.ctaHref}>
                <span className="block overflow-hidden text-ellipsis text-nowrap text-base leading-6">
                  {banner.ctaText}
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
