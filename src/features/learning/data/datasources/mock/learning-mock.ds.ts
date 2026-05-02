import type { ILearningRemoteDataSource } from "../learning.remote-datasource"
import type { LearningHomeModel } from "../../models/learning.model"

const LEARNING_HOME_FIXTURE: LearningHomeModel = {
  greetingName: "Usuario",
  stats: {
    coursesInProgress: 3,
    lessonsCompleted: 47,
    dayStreak: 12,
  },
}

export class LearningMockDataSource implements ILearningRemoteDataSource {
  async getHomeSnapshot(): Promise<LearningHomeModel> {
    return LEARNING_HOME_FIXTURE
  }
}
