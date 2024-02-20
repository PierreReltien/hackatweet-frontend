import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from '../styles/Tweet.module.css';
import { useState } from 'react';

function Tweet(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // console.log(props)

  const [messages, setMessages] = useState('')

  const handleDeleteClick = (tweetId) => {
    console.log(tweetId)
    if (!user.token) {
      return;
    }

    fetch(`http://localhost:3000/users/tweet/${tweetId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: user.token
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result) {
          console.log('message supprimé')
          props.deleteMessages(tweetId);
        } else {
          console.log('problème')
        }
      }
      );
  }



  // const handleLikeClick = () => {

  //   if (!user.token) {
  //     return;
  //   }
  //mettre en place route spécifique pour incrémenter les likes
  // fetch(`http://localhost:3000/tweet/like/${user.token}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.result) {
  //         dispatch(removeBookmark(props));
  //       } else {
  //         dispatch(addBookmark(props));
  //       }
  //     }
  //   );

  // }


  // let iconStyle = {};
  // if (props.isBookmarked) {
  //   iconStyle = { 'color': '#E9BE59' };
  // }


  return (

    <div className={styles.tweet}>
      <div className={styles.tweetContainer}>
        <h3>{props?.username?.username}</h3>
        <p>{props.message}</p>
        <div className={styles.tweetIcons}>
          <FontAwesomeIcon onClick={() => handleLikeClick()} icon={faHeart} className={styles.bookmarkIcon} />
          <div>{props.liked}</div>
          <FontAwesomeIcon onClick={() => handleDeleteClick(props._id) }className={styles.trash} icon={faTrash} />
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
}

export default Tweet;
