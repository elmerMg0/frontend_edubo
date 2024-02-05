import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiSendPlaneLine } from "react-icons/ri";

interface Props {
  commentId: number | undefined;
  setIsOpen: () => void;
  send: (text: string, idComment: number | undefined) => void,
  classname:string
}
function CommentInput({ commentId, setIsOpen, send, classname}: Props) {

  const [commentText, setCommentText] = useState('');
  const inputRef = useRef<HTMLDivElement>(null); 
  const handleSend =  () => {
    send(commentText, commentId);
    setCommentText('');
    if(inputRef.current)inputRef.current.innerText = '';
  }
  
  return (
    <div className={classname}>
      <div
        className={`input_comment`}
        contentEditable="true"
        onInput={(e) => setCommentText(e.currentTarget.innerText)}
        placeholder="Escribe un comentario"
        ref={inputRef}
      ></div>

      <button
        className="btn-send-comment"
        onClick={handleSend}
      >
        <RiSendPlaneLine />
      </button>

      <button
        className="input_comment-btnclose"
        onClick={setIsOpen}
      >
        <IoMdClose />
      </button>
    </div>
  );
}

export default CommentInput;
