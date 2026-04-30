export interface AssignmentAnalysis {
  id: string
  user_id: string
  assignment_text: string
  explanation: string
  created_at: string
  tokens_used?: number
}

export interface AIExplanation {
  whatAbout: string
  whatToDo: string
  stepByStep: string
  teacherExpectations: string
  keyConcepts: string
  workflow: string[]
  essayOutline?: {
    introduction: string
    body: string[]
    conclusion: string
  }
  starterContent?: {
    sampleIntro: string
    thesisStatement: string
  }
}