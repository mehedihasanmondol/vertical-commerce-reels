
import { useState } from 'react';
import { MessageCircle, Send, Heart, X } from 'lucide-react';

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface CommentsProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

export const Comments = ({ isOpen, onClose, productId }: CommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      user: 'sarah_k',
      text: 'This looks amazing! Perfect for my home office 💕',
      timestamp: '2h',
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      user: 'mike_designer',
      text: 'Great ergonomic design. Been using it for months!',
      timestamp: '5h',
      likes: 8,
      isLiked: true
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    console.log('New comment:', newComment);
    setNewComment('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg">Comments</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {comment.user[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{comment.user}</span>
                  <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                </div>
                <p className="text-sm mt-1">{comment.text}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button className={`flex items-center space-x-1 text-xs ${comment.isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                    <Heart size={12} fill={comment.isLiked ? 'currentColor' : 'none'} />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-xs text-gray-500">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              Y
            </div>
            <div className="flex-1 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
