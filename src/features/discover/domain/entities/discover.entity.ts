export interface DiscoverBannerEntity {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  imageUrl: string
}

export interface DiscoverSubjectEntity {
  id: string
  title: string
  description: string
  href: string
}

export interface DiscoverFaqEntity {
  id: string
  question: string
  answer: string
}

export interface DiscoverBottomBannerEntity {
  title: string
  ctaText: string
  ctaHref: string
}

export interface DiscoverEntity {
  id: string
  exploreTitle: string
  exploreSubtitle: string
  marketingBanner: DiscoverBannerEntity
  subjects: DiscoverSubjectEntity[]
  faq: DiscoverFaqEntity[]
  bottomBanner: DiscoverBottomBannerEntity
}
