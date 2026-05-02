import type { NavigationHistoryEntity } from "../../domain/entities/navigation-history.entity"
import type { SearchHistoryEntity } from "../../domain/entities/search-history.entity"
import type { NavigationHistoryModel, SearchHistoryModel } from "../models/history.model"

export function toNavigationHistoryEntity(model: NavigationHistoryModel): NavigationHistoryEntity {
  return {
    id: model.id,
    userId: model.userId,
    url: model.url,
    title: model.title,
    type: model.type,
    visitedAt: model.visitedAt,
  }
}

export function toNavigationHistoryModel(entity: NavigationHistoryEntity): NavigationHistoryModel {
  return {
    id: entity.id,
    userId: entity.userId,
    url: entity.url,
    title: entity.title,
    type: entity.type,
    visitedAt: entity.visitedAt,
  }
}

export function toSearchHistoryEntity(model: SearchHistoryModel): SearchHistoryEntity {
  return {
    id: model.id,
    userId: model.userId,
    query: model.query,
    searchedAt: model.searchedAt,
  }
}

export function toSearchHistoryModel(entity: SearchHistoryEntity): SearchHistoryModel {
  return {
    id: entity.id,
    userId: entity.userId,
    query: entity.query,
    searchedAt: entity.searchedAt,
  }
}