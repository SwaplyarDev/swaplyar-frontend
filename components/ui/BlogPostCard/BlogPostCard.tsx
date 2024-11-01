import Image from 'next/image';

const BlogPostCard: React.FC<{ title: string; content: string; imageUrl: string; publishedAt: string }> = ({ title, content, imageUrl, publishedAt }) => {
    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
        <Image src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-700 mb-4">{content}</p>
          <p className="text-sm text-gray-500 mt-2">{new Date(publishedAt).toLocaleDateString()}</p>
        </div>
      </div>
    );
};
export default BlogPostCard;