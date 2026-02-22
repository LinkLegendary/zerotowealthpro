// app/components/ArticleCard.tsx
import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
}

export default function ArticleCard({ slug, title, description }: ArticleCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <Link href={`/blog/${slug}`}>
        <h2 className="text-xl font-semibold hover:text-blue-600">{title}</h2>
      </Link>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
