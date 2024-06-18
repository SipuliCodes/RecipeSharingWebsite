import { useContext, useRef, useState } from 'react';

import useAutosizeTextArea from '../../../hooks/useAutosizeTextarea';
import { CommentListProps } from '../../../interfaces/props';
import { formatDate } from '../../../utils/helpers';
import './CommentList.css';
import { commentRecipe } from '../../../services/recipeService';
import { UserTokenContext } from '../../../contexts/userContext';

const CommentList = ({ id, comments }: CommentListProps) => {
  const [comment, setComment] = useState('');
  const [wantToComment, setWantToComment] = useState(false);

  const token = useContext(UserTokenContext);
  
  const commentRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(commentRef.current, comment);

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleAddClick = async () => {
    const newComment = await commentRecipe(id, comment, token);
    comments.push(newComment);
    setComment('');
    setWantToComment(!wantToComment);
  };

  const handleClick = () => {
    setWantToComment(!wantToComment);
    if (wantToComment) {
      setComment('');
    }
    setTimeout(() => commentRef.current?.scrollIntoView({ behavior: 'smooth' }), 10);
  };


  return (
    <div className='recipe-comments-container'>
      <h2 className='recipe-instructions-h2'> Comments </h2>
      {comments.map((comment, index) =>
        <div key={index} className='recipe-comment-box'> 
          <p className='recipe-comment'>{comment.comment}</p>
          <p className='recipe-comment-user'>{comment.username} </p>
          <p className='recipe-comment-date'>{formatDate(comment.date)}</p>
        </div>)}
      {!wantToComment && <button className='recipe-add-comment-add-button recipe-add-comment-button' onClick={handleClick}>Add comment</button>}
      {wantToComment &&
        <div className='recipe-add-comment-box'>
          <textarea
            placeholder=""
            value={comment}
            onChange={handleTextAreaChange}
            name='description'
            ref={commentRef}
            rows={3}
            className='recipe-add-comment-textarea'
          />
          <div className='recipe-add-comment-button-box'>
            <button className='recipe-add-comment-cancel-button recipe-add-comment-button' onClick={handleClick}>Cancel</button>
            <button onClick={handleAddClick} className='recipe-add-comment-add-button recipe-add-comment-button'>Add</button>
          </div>
        </div>
      }
    </div>
  );
};

export default CommentList;