
const trendingProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89,
    rating: 4.5,
    image: "/placeholder.svg",
    badge: "Trending"
  },
  {
    id: 2,
    name: "Smart Phone Case",
    price: 24,
    rating: 4.8,
    image: "/placeholder.svg",
    badge: "New"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 156,
    rating: 4.3,
    image: "/placeholder.svg",
    badge: "Hot"
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: 199,
    rating: 4.6,
    image: "/placeholder.svg",
    badge: "Trending"
  }
];

export const TrendingSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 Trending Now</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingProducts.map((product) => (
          <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow relative">
            <div className="absolute top-2 right-2">
              <span className={`text-xs px-2 py-1 rounded ${
                product.badge === 'New' ? 'bg-green-100 text-green-600' :
                product.badge === 'Hot' ? 'bg-red-100 text-red-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                {product.badge}
              </span>
            </div>
            
            <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-purple-600">${product.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
