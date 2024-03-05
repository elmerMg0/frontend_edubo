import { BsHeart, BsHeartFill } from "react-icons/bs";
import { CommentWithReplies } from "./Contribution";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
interface Props {
    comment: CommentWithReplies
    likeList: {
        comment_id: number
    }[]
    toggleLike: (idComment: number | undefined) => void,
    classname: string,
    children?: React.ReactNode
}
function CommentCard({comment, likeList, toggleLike, classname, children}:Props) {
  return (
    <li className={ `${classname}`} key={comment.id}>
      {
        comment.avatar ? 
        <img className="card_comment-img" src={ comment.avatar.includes('https') ? comment.avatar : APIURLIMG + comment.avatar} />
        :
        <img className="card_comment-img" src={`https://picsum.photos/200`} alt=""/>
      }
      <div className="card_comment-content">
        <p className="card_comment-content-name">{comment.name} {comment.lastName}</p>
        <p
        className="card_comment-content-text"
        dangerouslySetInnerHTML={{ __html: comment.comment_text.replace(/\n/g, '<br>') }}
      />
      </div>

      <div className="card_comment-likes">
        <button className="f-btn" onClick={() => toggleLike(comment.id)}>
          {likeList.some((value) => value.comment_id === comment.id) ? (
            <BsHeartFill style={{ color: "red" }} />
          ) : (
            <BsHeart color="white" />
          )}
        </button>
        <p style={{ margin: "0px", fontSize: "12px" }}>
          {comment.num_likes}
        </p>
      </div>

      {children}
    </li>
  );
}

export default CommentCard;
