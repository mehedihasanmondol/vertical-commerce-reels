
import { Product } from '../types/Product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sleek Wireless Headphones',
    price: 129.99,
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and crystal-clear sound quality.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop'
    ],
    features: ['Noise Canceling', '30hr Battery', 'Wireless', 'Premium Sound'],
    slug: 'sleek-wireless-headphones',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Modern Minimalist Watch',
    price: 89.99,
    description: 'Elegant timepiece with a sleek design, perfect for both casual and formal occasions.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop'
    ],
    features: ['Water Resistant', 'Minimalist Design', 'Premium Materials', 'Lightweight'],
    slug: 'modern-minimalist-watch',
    category: 'Accessories',
    inStock: true,
  },
  {
    id: '3',
    name: 'Smart Fitness Tracker',
    price: 59.99,
    description: 'Advanced fitness tracking with heart rate monitoring, sleep analysis, and smartphone integration.',
    images: [
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop'
    ],
    features: ['Heart Rate Monitor', 'Sleep Tracking', 'Waterproof', 'Long Battery'],
    slug: 'smart-fitness-tracker',
    category: 'Fitness',
    inStock: true,
  },
  {
    id: '4',
    name: 'Premium Coffee Maker',
    price: 199.99,
    description: 'Professional-grade coffee maker that brews the perfect cup every time with precision temperature control.',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop'
    ],
    features: ['Temperature Control', 'Auto Timer', 'Premium Build', 'Easy Clean'],
    slug: 'premium-coffee-maker',
    category: 'Kitchen',
    inStock: true,
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    price: 299.99,
    description: 'Comfortable and supportive office chair designed for long work sessions with adjustable features.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop'
    ],
    features: ['Ergonomic Design', 'Adjustable Height', 'Lumbar Support', 'Premium Materials'],
    slug: 'ergonomic-office-chair',
    category: 'Furniture',
    inStock: true,
  },
];
