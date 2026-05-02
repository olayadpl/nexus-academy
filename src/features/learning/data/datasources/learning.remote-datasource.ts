import type { LearningHomeModel } from "../models/learning.model"

export interface ILearningRemoteDataSource {
  getHomeSnapshot(): Promise<LearningHomeModel>
}

export class LearningRemoteDataSource implements ILearningRemoteDataSource {
  async getHomeSnapshot(): Promise<LearningHomeModel> {
    return {
      greetingName: "Usuario",
      stats: {
        coursesInProgress: 0,
        lessonsCompleted: 0,
        dayStreak: 0,
      },
    }
  }
}
