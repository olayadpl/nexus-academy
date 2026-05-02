import { SearchScreen } from "@/src/features/search/presentation/screens/search.screen"

type SearchPageProps = {
  searchParams?: Promise<{ q?: string; search?: string; sort?: string; featured?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = searchParams ? await searchParams : undefined
  return <SearchScreen searchParams={params} />
}
