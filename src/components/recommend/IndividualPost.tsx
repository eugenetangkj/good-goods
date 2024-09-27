import React, { useState } from 'react';

interface Comment {
  id: number;
  text: string;
}

interface IndividualSubmission {
  enterpriseName: string;
  description: string;
  website: string;
  comments: Comment[];
  numberOfDislikes: number;
  numberOfLikes: number;
}

interface IndividualPostProps {
  submission: IndividualSubmission;
}

const IndividualPost: React.FC<IndividualPostProps> = ({ submission }) => {
  // Initialize likes and dislikes from props
  const [likes, setLikes] = useState(submission.numberOfLikes);
  const [dislikes, setDislikes] = useState(submission.numberOfDislikes);
  
  // Initialize comments from props
  const [comments, setComments] = useState<Comment[]>(submission.comments);

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
      <div className="w-full max-w-3xl bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{submission.enterpriseName}</h2>
        <p className="text-gray-700">{submission.description}</p>
        <a href={submission.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>

        {/* Upvote/Downvote Section */}
        <div className="flex justify-end space-x-2 items-center">
          <button 
            className="px-2 py-1 bg-green-200 text-green-800 rounded" 
            onClick={() => setLikes(likes + 1)}
          >
            Upvote
          </button>
          <span>{likes}</span>
          <button 
            className="px-2 py-1 bg-red-200 text-red-800 rounded" 
            onClick={() => setDislikes(dislikes + 1)}
          >
            Downvote
          </button>
          <span>{dislikes}</span>
        </div>
      </div>

      {/* Comment Section */}
      <div className="w-full max-w-3xl space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>

      {/* Add Comment Input */}
      <div className="w-full max-w-3xl bg-gray-100 border border-gray-300 rounded-lg p-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Add a Comment</h3>
        <textarea 
          className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
          placeholder="Write your comment here..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
          onClick={handleAddComment}
        >
          Submit
        </button>
      </div>
      
    </div>
  );
};

export default IndividualPost;
