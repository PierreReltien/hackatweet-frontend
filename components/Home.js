import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import styles from '../styles/Home.module.css';
import Tweet from "./Tweet";
import { useEffect } from 'react';
import LastTweet from "./LastTweet";
import { Button } from "@mui/material";

function Home() {

    const dispatch = useDispatch();

    const [tweetsData, setTweetsData] = useState([]);
    const [lastTweet, setLastTweet] = useState({});
    const [newMessage, setNewMessage] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')

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


    //création de tweet
    const handleCreateTweet = () => {
        console.log('coucou')

        fetch('http://localhost:3000/users/tweet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: newMessage,
                token: user.token
            }),
        }).then(response => response.json())
            .then(data => {

                console.log(data)
                if (data.result) {
                    setNewMessage('')
                    // window.location.reload()
                }
            })
    }

    //route coté back end pour récupérer tous les tweets de la BDD
    useEffect(() => {
        fetch('http://localhost:3000/users/tweet')
            .then(response => response.json())
            .then(data => {
                console.log(data)

                if (data.result) {
                    setLastTweet(data.tweets[0]);
                    console.log(lastTweet)
                    setTweetsData(data.tweets.filter((data, i) => i > 0))
                } else { setLastTweet({}) }
            }
            );
    }, [newMessage, deleteMessage]);

    const deleteMessages = (tweetId) => {
        console.log('Delete message');
        setDeleteMessage(tweetId);
    };

    const tweets = tweetsData.map((data, i) => {
        return <Tweet key={i} {...data} deleteMessages={deleteMessages} />;
    });




    return (

        <div>
            <main >
                <h1 >
                    Home
                </h1>
                <div className={styles.sectionsContainer}>
                    <div className={styles.section1}>
                        <img onClick={scrollToTop} src="../img/cupoftea.png" alt='cup of tea' className={styles.img}></img>
                        <h2>Welcome {user.username}</h2>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>
                    <div className={styles.section2}>
                        <div>
                            <input type="search" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className={styles.submitInput}></input>
                            <button onClick={handleCreateTweet} className={styles.submitButton}>Take a sip</button>
                        </div>

                        <LastTweet {...lastTweet} deleteMessages={deleteMessages} />

                        <div className={styles.tweetContainer}>
                            {tweets}
                        </div>
                        <div></div>
                    </div>
                    <div className={styles.section3}>test</div>
                </div>
            </main>
        </div>
    );
}

export default Home;
