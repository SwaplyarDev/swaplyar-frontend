import Image from 'next/image';

const BlogPostCard: React.FC<{
  title: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
}> = ({ title, content, imageUrl, publishedAt }) => {
  return (
    <div className="transform overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg transition-transform hover:scale-105">
      <Image src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-gray-700">{content}</p>
        <p className="mt-2 text-sm text-gray-500">{new Date(publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
export default BlogPostCard;
