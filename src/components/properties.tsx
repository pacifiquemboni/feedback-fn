import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "react-toastify";

export default function FeedbackBoard() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [commentsData, setCommentsData] = useState<
    Record<string, { id: string; content: string }[]>
  >({});
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Vite

  useEffect(() => {
    // Fetch all feedbacks
    fetch(`${BACKEND_URL}/feedback`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  const fetchComments = async (feedbackId: string) => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Vite

      const res = await fetch(
        `${BACKEND_URL}/feedback/comments/${feedbackId}`
      );
      if (!res.ok) throw new Error(`Failed to fetch comments: ${res.status}`);
      const data = await res.json();

      // Map to the format expected by FeedbackCard
      const formattedComments = data.map((c: any) => ({
        id: c.id,
        content: c.comment,
      }));

      setCommentsData((prev) => ({ ...prev, [feedbackId]: formattedComments }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async (feedbackId: string, comment: string) => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Vite

      const res = await fetch(`${BACKEND_URL}/feedback/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId, comment }),
      });

      if (!res.ok) throw new Error("Failed to add comment");
      const newComment = await res.json();
      toast.success("Comment added successfully!");
      // Update local state with the new comment
      setCommentsData((prev) => ({
        ...prev,
        [feedbackId]: [
          ...(prev[feedbackId] || []),
          { id: newComment.id, content: newComment.comment },
        ],
      }));
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Feedback Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            feedback={feedback}
            comments={commentsData[feedback.id] || []}
            fetchComments={fetchComments}
            addComment={addComment}
          />
        ))}
      </div>

    </div>
  );
}
function FeedbackCard({
  feedback,
  comments,
  fetchComments,
  addComment,
}: {
  feedback: any;
  comments: { id: string; content: string }[];
  fetchComments: (id: string) => void;
  addComment: (feedbackId: string, comment: string) => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [votes, setVotes] = useState(Number(feedback.upvotes) || 0);
  const [loadingVote, setLoadingVote] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Vite
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowComments(false);
      }
    };
    if (showComments) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showComments]);

  const handleToggleComments = () => {
    if (!showComments && comments.length === 0) fetchComments(feedback.id);
    setShowComments((prev) => !prev);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    await addComment(feedback.id, newComment.trim());
    setNewComment("");
    setSubmittingComment(false);
  };
  const handleUpvote = async () => {
    try {
      
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // CRA
// console.log("Backend URL:", BACKEND_URL);


      setLoadingVote(true);
      const res = await fetch(`${BACKEND_URL}/feedback/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId: feedback.id }),
      });

      if (!res.ok) throw new Error("Failed to upvote");

      const updated = await res.json();
      // Update votes from server response if available, else increment
      setVotes(updated?.upvotes ?? votes + 1);
      toast.success("Upvote successful!");
    } catch (error) {
      console.error("Upvote failed:", error);
    } finally {
      setLoadingVote(false);
    }
  };

  const handleDownvote = async () => {
    try {
      setLoadingVote(true);
      const res = await fetch(`${BACKEND_URL}/feedback/downvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId: feedback.id }),
      });

      if (!res.ok) throw new Error("Failed to downvote");

      const updated = await res.json();
      setVotes(updated?.upvotes ?? (votes > 0 ? votes - 1 : 0));
    } catch (error) {
      console.error("Downvote failed:", error);
    } finally {
      setLoadingVote(false);
    }
  };

  return (
    <div ref={cardRef} className="relative">
      {/* CARD */}
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

        {/* Votes */}
        <div className="flex items-center gap-4">
          <button
            className={`flex items-center gap-1 text-green-600 hover:scale-105 transition ${loadingVote ? "opacity-50 pointer-events-none" : ""}`}
            onClick={handleUpvote}
            disabled={loadingVote}
          >
            <ThumbsUp size={18} /> {votes}
          </button>

          <button
            className={`flex items-center gap-1 text-red-500 hover:scale-105 transition ${loadingVote ? "opacity-50 pointer-events-none" : ""}`}
            onClick={handleDownvote}
            disabled={loadingVote}
          >
            <ThumbsDown size={18} />
          </button>
         
        </div>

        {/* Toggle Comments */}
        <button
          onClick={handleToggleComments}
          className="flex items-center text-blue-500 hover:underline text-sm"
        >
          {showComments ? (
            <>
              <ChevronUp size={16} className="mr-1" /> Hide Comments({comments.length})
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" /> Show Comments 
            </>
          )}
        </button>
      </div>

      {/* FLOATING COMMENTS PANEL */}
      {showComments && (
        <div className="absolute left-0 right-0 mt-[-2] bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
          <form onSubmit={handleSubmitComment} className="flex gap-2 mb-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={submittingComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50"
            >
              {submittingComment ? "Posting..." : "Post"}
            </button>
          </form>

          {comments?.length > 0 ? (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {comments.map((c) => (
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

