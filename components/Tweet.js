import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from '../styles/Tweet.module.css';

function Tweet(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

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

  return (

    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <h3>{props.title}</h3>
        <FontAwesomeIcon onClick={() => handleLikeClick()} icon={faHeart} style={iconStyle} className={styles.bookmarkIcon} />
      </div>
      <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
      <div className={styles.divider}></div>
      <Image src={props.urlToImage} alt={props.title} width={600} height={314} />
      <p>{props.description}</p>
    </div>
  );
}

export default Tweet;
