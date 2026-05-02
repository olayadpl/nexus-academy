import type { BriefModel } from "../models/brief.model"

export interface IBriefRemoteDataSource {
  create(model: BriefModel): Promise<BriefModel>
  update(id: string, model: Partial<BriefModel>): Promise<BriefModel>
  getById(id: string): Promise<BriefModel | null>
  getAll(): Promise<BriefModel[]>
  deleteById(id: string): Promise<void>
}
