import { CommentWithReplies } from "./Contribution";
import { FaRegComment } from "react-icons/fa";
import { useRef, useState } from "react";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";
import { AxiosService } from "../../../service/api.service";
interface AppState {
    likeList: {
      comment_id: number;
    }[];
  }
interface Props {
  comment: CommentWithReplies;
  comments: CommentWithReplies[];
  likeList: {
    comment_id: number;
  }[];
  send: (text: string, idComment: number | undefined) => void;
  updateLikeState: (newListComments:CommentWithReplies[], newListCommentLikes: AppState["likeList"]) => void
}
function Comments({ comment, likeList, send, updateLikeState, comments}: Props) {
  const [isOpenReply, setIsOpenReply] = useState(false);
  const commentToReply = useRef(0);
  const [numberOfRepliesShowed, setNumberOfRepliesShowed] = useState(0);

  const updateLikesRecursive = (
    comments: CommentWithReplies[],
    idComment: number,
    updateFn: (comment: CommentWithReplies) => void
  ) => {
    return comments.map((comment: CommentWithReplies) => {
      if (comment.id === idComment) {
        updateFn(comment);
      } else if (comment.comments) {
        comment.comments = updateLikesRecursive(
          comment.comments as CommentWithReplies[],
          idComment,
          updateFn
        );
      }
      return comment;
    });
  };

  const handleLike = (idComment: number | undefined) => {
    if (!idComment) return;

    const isLiked = likeList.some((value) => value.comment_id === idComment);
    const updateLikes = (comment: CommentWithReplies) => {
      comment.num_likes = isLiked
        ? comment.num_likes - 1
        : comment.num_likes + 1;
    };

    const newListComments = updateLikesRecursive(
      comments,
      idComment,
      updateLikes
    );

    const newListCommentLikes = isLiked
      ? likeList.filter((value) => value.comment_id !== idComment)
      : [...likeList, { comment_id: idComment }];

   
    const params = {
      idComment: idComment,
      idStudent: 8,
    };
    updateLikeState(newListComments, newListCommentLikes);
    AxiosService.get("api/update-likes", params);
  };

  const toggleReply = (idComment: number | undefined) => {
    if (!idComment) return;
    commentToReply.current = idComment;
    setIsOpenReply(!isOpenReply);
  };

  const handleSend = (commentText: string, idComment: number | undefined) => {
    send(commentText, idComment);
    setIsOpenReply(false);
  };

  const showMoreReplies = () => {
    let newNumber = 0;
    newNumber = numberOfRepliesShowed === comment.num_comments ? 0 : numberOfRepliesShowed + 3 > comment.num_comments ? comment.num_comments : numberOfRepliesShowed + 3  
    setNumberOfRepliesShowed(newNumber)
  }

  return (
    <>
      <CommentCard comment={comment} likeList={likeList} toggleLike={handleLike} classname="card_comment">
           {/* Btn Answer */}
            <div
              className={`card_comment-reply ${
                isOpenReply && comment.id === commentToReply.current
                  ? "active"
                  : ""
              }`}
            >
              <button onClick={() => toggleReply(comment.id)}>
                <FaRegComment />
                <p>Responder</p>
              </button>
            </div>

            {/*Input Reply comment  */}
            <div
              style={{ gridColumn: "2/3" }}
            >
                <CommentInput
                classname={`input_comment-container ${
                  isOpenReply && comment.id === commentToReply.current
                    ? "active"
                    : ""
                }`}
                commentId={comment.id}
                setIsOpen={() => setIsOpenReply(false)}
                send={handleSend}
              />
            </div>
            {/* Replies */}
            <ul className="comment-replies">
              {comment.comments?.length > 0 &&
                comment.comments.slice(0, numberOfRepliesShowed).map((commentReply: CommentWithReplies) => (
                  <CommentCard
                    key={commentReply.id}
                    comment={commentReply}
                    likeList={likeList}
                    toggleLike={handleLike}
                    classname="card_comment-reply2"
                  >
                  </CommentCard>
                ))}
                <div className={`btn-view_more ${comment.num_comments === 0 ? "d-none" : ""}`}>
                    <button onClick={() => showMoreReplies()}>
                      { numberOfRepliesShowed === comment.num_comments ? "Ocultar" : `ver ${comment.num_comments - numberOfRepliesShowed} respuestas` }
                    </button>
                </div>
            </ul>
        </CommentCard>
    </>
  );
}

export default Comments;
