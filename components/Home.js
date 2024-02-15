import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Home.module.css';
import Tweet from "./Tweet";

function Home() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.value);
    console.log(user)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds smooth scrolling animation
        })
    }

    const handleLogout = () => {
        dispatch(logout());
        return window.location.replace('/')
    };

    const [tweetsData, setTweetsData] = useState([]);
    const [lastTweet, setLastTweet] = useState({});

    useEffect(() => {
        fetch('http://localhost:3000/tweets')
          .then(response => response.json())
          .then(data => {
            setLastTweet(data.tweets[0]);
            setTweetsData(data.tweets.filter((data, i) => i > 0));
          });
      }, []);

  
  const tweets = tweetsData.map((data, i) => {
    return <Tweet key={i} {...data} />;
  });


    return (
        <div>
            <main >
                <h1 >
                    Welcome to Home page
                </h1>
                <div className={styles.sectionsContainer}>
                    <div className="section">
                        <img onClick={scrollToTop} src="../img/bird.png" alt='bird'></img>
                        <div>Welcome {user.username}</div>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                    <div className="section">
                        <div>
                            <input type="search"></input>
                            <button>Submit tweet</button>
                        </div>
                        <div className="tweetsContainer">
                            {/* {Tweets} */}
                        </div>
                        <div></div>
                    </div>
                    <div className="section"></div>
                </div>
            </main>
        </div>
    );
}

export default Home;
