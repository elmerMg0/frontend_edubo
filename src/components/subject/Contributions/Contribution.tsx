import { CommentsFull, TypeBtns } from "../Subject";
import { useEffect, useState } from "react";
import { APISERVICE, AxiosService } from "../../../service/api.service";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import { getCookie } from "../../../utilities/cookies";

interface AppState {
  contribution: CommentWithReplies[];
  likeList: {
    comment_id: number;
  }[];
}
type Props = {
  btnSelected: TypeBtns;
};

export interface CommentWithReplies extends CommentsFull {
  comments: CommentWithReplies[];
}
function Contribution({ btnSelected }: Props) {
  const { idSubject } = useParams();
  const [likeList, setLikeList] = useState<AppState["likeList"]>([]);
  const [comments, setComments] = useState<AppState["contribution"]>([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const idStudent = getCookie("userId");
  useEffect(() => {
    if (btnSelected === TypeBtns.CONTRIBUTION) getComments();
    () => {
      console.log("component will unmount");
    };
  }, [btnSelected]);

  const getComments = async () => {
    const params = {
      idSubject: idSubject,
      idStudent: 8,
    };
    try {
      setLoading(true);
      const response = await AxiosService.get("comment/get-comments", params);
      if (response) {
        setComments(response.data.comments);
        setLikeList(response.data.commentLikesList);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };



  const handleOpenEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const updateLikeState = (newListComments: CommentWithReplies[], newListCommentLikes : AppState["likeList"]) => {
    setComments(newListComments);
    setLikeList(newListCommentLikes);

  }

  const handleSendComment = async (
    text: string,
    idComment: number | undefined
  ) => {
    const body = {
      comment_text: text,
      usuario_id: idStudent,
      subject_id: idSubject,
      num_likes: 0,
      num_comments: 0,
      comment_id: idComment,
    };
    const response = await APISERVICE.post(body, "comment/create", "");
    if (response.success) {
      getComments();
      setIsOpenEdit(false);
    }
  };

  return (
    <div className="contribution">
      <h2 className="title-section-subject">Comentarios</h2>

      <button
        className={`btn-comment ${isOpenEdit ? "active" : ""}`}
        onClick={() => handleOpenEdit()}
      >
        <span>Escribe un comentario</span>
      </button>
      
      <CommentInput
        classname={`mb-3 input_comment-container ${isOpenEdit ? "active" : ""}`}
        commentId={undefined}
        setIsOpen={() => setIsOpenEdit(false)}
        send={handleSendComment}
      />
   
      <ul className="card_comment-list">
        {comments?.length > 0 ?  comments.map((comment: CommentWithReplies) => (  
            <Comments 
              comments={comments}
              key={comment.id}
              comment={comment} 
              likeList={likeList} 
              send={handleSendComment} 
              updateLikeState={updateLikeState}
          />
        )) : (
          <>
            {loading ? (
              Array.from({ length: 3 }, (_, index) => index + 1).map((i) => {
                return (
                  <div className="card_comment mb-4" key={i}>
                    <Skeleton circle width={24} height={24} />
                    <div className="">
                      <Skeleton count={1} height={20} width={"50%"} />
                      <Skeleton count={1} height={50} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center m-0" style={{fontSize: "14px"}}>Escribe un comentario o pregunta</p>
            )}
          </>
        )}
      </ul>
    </div>
  );
}

export default Contribution;
