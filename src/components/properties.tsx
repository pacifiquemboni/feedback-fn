import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../redux/store";
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

export default function FeedbackBoard() {
  // Dummy data for feedback
  const feedbacks = [
    {
      id: "6257af76-82ea-4d1c-b279-cc23390d6d75",
      category: "bug",
      title: "Formative feedback",
      description:
        "An instructor asking a student, `What do you notice about this draft?` to encourage their critical thinking during the writing process.",
      upvotes: 0,
      createdAt: "2025-09-18T16:06:45.861Z",
    },
    {
      id: "c85dfc77-22bc-43a7-bdf9-aaa123456789",
      category: "feature",
      title: "Dark mode support",
      description:
        "Add a dark mode toggle so users can switch between light and dark themes easily.",
      upvotes: 2,
      createdAt: "2025-09-17T12:40:45.861Z",
    },
  ];

  // Dummy comments data
  const commentsData: Record<string, { id: number; content: string }[]> = {
    "6257af76-82ea-4d1c-b279-cc23390d6d75": [
      { id: 1, content: "This would really help students reflect better!" },
      { id: 2, content: "Great suggestion, very useful for teaching." },
    ],
    "c85dfc77-22bc-43a7-bdf9-aaa123456789": [
      { id: 3, content: "Dark mode would be awesome!" },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Feedback Board</h1>
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            comments={commentsData[feedback.id] || []}
          />
        ))}
      </div>
    </div>
  );
}
function FeedbackCard({ feedback, comments }: any) {
  const [showComments, setShowComments] = useState(false);
  const [votes, setVotes] = useState(Number(feedback.upvotes) || 0);

  const handleUpvote = () => setVotes((prev) => prev + 1);
  const handleDownvote = () => setVotes((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3">
      {/* Category & Date */}
      <div className="flex justify-between items-center">
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {feedback.category}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(feedback.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-800">{feedback.title}</h2>

      {/* Description */}
      <p className="text-gray-600">{feedback.description}</p>

      {/* Upvote/Downvote */}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-1 text-green-600 hover:scale-105 transition"
          onClick={handleUpvote}
        >
          <ThumbsUp size={18} /> {votes}
        </button>
        <button
          className="flex items-center gap-1 text-red-500 hover:scale-105 transition"
          onClick={handleDownvote}
        >
          <ThumbsDown size={18} />
        </button>
      </div>

      {/* Toggle Comments */}
      <button
        onClick={() => setShowComments((prev) => !prev)}
        className="flex items-center text-blue-500 hover:underline text-sm"
      >
        {showComments ? (
          <>
            <ChevronUp size={16} className="mr-1" /> Hide Comments
          </>
        ) : (
          <>
            <ChevronDown size={16} className="mr-1" /> Show Comments
          </>
        )}
      </button>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t pt-3">
          {comments?.length > 0 ? (
            <ul className="space-y-2">
              {comments.map((c: any) => (
                <li
                  key={c.id}
                  className="bg-gray-100 p-2 rounded-md text-sm text-gray-700"
                >
                  {c.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}