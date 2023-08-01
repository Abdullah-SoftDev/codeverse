import Feed from "@/components/Feed";

type Props = {
  searchParams: { title: string };
}

export default function Home({ searchParams }: Props) {
  console.log(searchParams?.title)
  return (
    <Feed />
  )
}
