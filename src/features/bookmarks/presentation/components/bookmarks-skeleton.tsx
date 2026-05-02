import { Card } from "@/src/core/ui/components/card"
import { Skeleton } from "@/src/core/ui/components/skeleton"

function CollectionCardSkeleton() {
  return (
    <Card className="relative overflow-hidden border-2 border-transparent">
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-1 items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="aspect-square rounded-lg" />
        </div>

        <div className="flex items-center justify-end">
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </Card>
  )
}

export function BookmarksPageSkeleton() {
  return (
    <div className="max-w-[1144px] px-4 py-14 md:px-8">
      <div className="mb-8">
        <Skeleton className="mb-2 h-9 w-48" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CollectionCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export function CollectionDetailSkeleton() {
  return (
    <div className="max-w-[1144px] px-4 py-14 md:px-8">
      <div className="mb-8">
        <Skeleton className="mb-4 h-9 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-4">
              <Skeleton className="mb-3 h-5 w-72" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
