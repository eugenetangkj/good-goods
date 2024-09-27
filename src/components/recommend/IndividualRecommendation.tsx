import React, { useState } from 'react';
import { CommunityRecommendationComment } from '@/constants/CommunityRecommendationComment';
import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';


interface IndividualSubmission {
  enterpriseName: string;
  description: string;
  website: string;
  comments: CommunityRecommendationComment[];
  numberOfDislikes: number;
  numberOfLikes: number;
}

interface IndividualPostProps {
  submission: IndividualSubmission;
}

const IndividualRecommendation: React.FC<IndividualPostProps> = ({ submission }) => {
  // Initialize likes and dislikes from props
  const [likes, setLikes] = useState(submission.numberOfLikes);
  const [dislikes, setDislikes] = useState(submission.numberOfDislikes);
  
  // Initialize comments from props
  const [comments, setComments] = useState<CommunityRecommendationComment[]>(submission.comments);

  // New comment input state
  const [newComment, setNewComment] = useState('');

  // Add new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment('');  // Clear the input after adding a comment
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">

      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white shadow-md border border-gray-200 rounded-xl p-6 flex flex-col space-y-8">
        <div className='space-y-4'>
          <h2 className="text-2xl font-bold text-good-goods-blue-900">{submission.enterpriseName}</h2>
          <p className="text-gray-700">{submission.description}</p>
        </div>
        <a href={submission.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>

        {/* Upvote/Downvote Section */}
        <div className="flex justify-end space-x-2 items-center">
          <button 
            className="px-2 py-1 text-blue-700 hover:text-blue-500 rounded duration-200" 
            onClick={() => setLikes(likes + 1)}
          >
            <FaRegThumbsUp />
          </button>
          <span>{likes}</span>
          <button 
            className="px-2 py-1 text-gray-500 hover:text-gray-700 rounded duration-200" 
            onClick={() => setDislikes(dislikes + 1)}
          >
            <FaRegThumbsDown />
          </button>
          <span>{dislikes}</span>
        </div>
      </div>

      {/* Comment Section */}
      <div className="w-full max-w-3xl space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>

      {/* Add Comment Input */}
      <div className="w-full max-w-3xl bg-gray-100 border border-gray-300 rounded-lg p-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Add a Comment</h3>
        <textarea 
          className="w-full h-24 p-2 border border-gray-300 rounded-xl" 
          placeholder="Write your comment here..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          className="px-4 py-2 bg-good-goods-blue-900 text-white rounded-full hover:bg-sky-700 duration-200" 
          onClick={handleAddComment}
        >
          Submit
        </button>
      </div>
      
    </div>
  );
};

export default IndividualRecommendation;