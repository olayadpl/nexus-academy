import Link from "next/link"
import { Badge } from "@/src/core/ui/components/badge"
import { Button } from "@/src/core/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/core/ui/components/card"
import type { AssessmentEntity } from "../../domain/entities/assessment.entity"

interface AssessmentCardProps {
  assessment: AssessmentEntity
}

export function AssessmentCard({ assessment }: AssessmentCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{assessment.title}</CardTitle>
        <CardDescription>
          Puntaje: {assessment.score}/{assessment.passingScore}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Badge variant={assessment.status === "passed" ? "default" : "secondary"}>{assessment.status}</Badge>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm">
          <Link href={`/resource/${assessment.courseId}`}>Ir al curso</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
