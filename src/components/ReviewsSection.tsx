
const customerReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing quality products! Fast shipping and excellent customer service.",
    product: "Wireless Headphones",
    date: "2 days ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    comment: "Great value for money. The product exceeded my expectations.",
    product: "Smart Watch",
    date: "1 week ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 5,
    comment: "Love the shopping experience! Will definitely order again.",
    product: "Bluetooth Speaker",
    date: "3 days ago",
    avatar: "/placeholder.svg"
  }
];

export const ReviewsSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⭐ Customer Reviews</h3>
      
      <div className="space-y-4">
        {customerReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">for {review.product}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <button className="text-purple-600 hover:text-purple-700 font-semibold">
          View All Reviews →
        </button>
      </div>
    </div>
  );
};
