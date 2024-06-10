import { CommentListProps } from '../../../interfaces/props';
import { formatDate } from '../../../utils/helpers';
import './CommentList.css';

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className='recipe-comments-container'>
      <h2 className='recipe-instructions-h2'> Comments </h2>
      {comments.map((comment) =>
        <div className='recipe-comment-box'> 
          <p className='recipe-comment'>{comment.comment}</p>
          <p className='recipe-comment-user'>{comment.username} </p>
          <p className='recipe-comment-date'>{formatDate(comment.date)}</p>
        </div>)}
    </div>
  );
};

export default CommentList;