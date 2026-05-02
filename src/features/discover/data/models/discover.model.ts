import type { DiscoverEntity } from "../../domain/entities/discover.entity"

export interface DiscoverModel {
  id: string
  exploreTitle: string
  exploreSubtitle: string
  marketingBanner: {
    title: string
    description: string
    ctaText: string
    ctaHref: string
    imageUrl: string
  }
  subjects: {
    id: string
    title: string
    description: string
    href: string
  }[]
  faq: {
    id: string
    question: string
    answer: string
  }[]
  bottomBanner: {
    title: string
    ctaText: string
    ctaHref: string
  }
}

export function toEntity(model: DiscoverModel): DiscoverEntity {
  return {
    id: model.id,
    exploreTitle: model.exploreTitle,
    exploreSubtitle: model.exploreSubtitle,
    marketingBanner: model.marketingBanner,
    subjects: model.subjects,
    faq: model.faq,
    bottomBanner: model.bottomBanner,
  }
}

export function fromEntity(entity: DiscoverEntity): DiscoverModel {
  return {
    id: entity.id,
    exploreTitle: entity.exploreTitle,
    exploreSubtitle: entity.exploreSubtitle,
    marketingBanner: entity.marketingBanner,
    subjects: entity.subjects,
    faq: entity.faq,
    bottomBanner: entity.bottomBanner,
  }
}
