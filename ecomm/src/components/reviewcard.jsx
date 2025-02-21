import { Star } from "lucide-react";

export default function ReviewCard({ text, author, image }) {
  return (
    <div className="grid space-y-12 bg-white shadow-md rounded-xl p-6 text-center border">
      {/* Star Ratings */}
      <div className="flex justify-center">
        {[...Array(5)].map((_, index) => (
          <Star key={index} className="text-yellow-500 fill-yellow-500" size={20} />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-lg">
        {text}
      </p>

      {/* Author Section */}
      <div className="flex items-center justify-center space-x-2">
        <img src={image} alt={author} className="w-14 h-14 rounded-full object-cover" />
        <span className="text-gray-900 font-medium">{author}</span>
      </div>
    </div>
  );
}
