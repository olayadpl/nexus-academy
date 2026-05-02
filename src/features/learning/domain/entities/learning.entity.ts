export interface LearnerStatsEntity {
  coursesInProgress: number
  lessonsCompleted: number
  dayStreak: number
}

export interface LearningHomeEntity {
  greetingName: string
  stats: LearnerStatsEntity
}
