import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import Comments from "./Sections/Comments/Comments";

function NewsDetail (props) {

    const {newsId} = useParams()
    const [Commnets, setComment] = useState([])
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(newsId)
        const endpoint = `https://hn.algolia.com/api/v1/items/${newsId}`;
        fetchComments(endpoint)
    }, [])


    const fetchComments = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setComment(result)
                setLoading(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    return (
        <React.Fragment>
            {Loading && <div style={{textAlign: 'center'}}>Loading...</div>}
            {Commnets && <div style={{textAlign: 'center', marginBottom: '40px'}}>
                <h1>
                    {Commnets.title}
                </h1>
                <div style={{opacity: '0.5'}}>{Commnets.points && `Points: ${Commnets.points}`}</div>
            </div>}
            {   
                Commnets.children && Commnets.children.map( (comment, index) => {
                    return(
                        <React.Fragment key={index}>
                            <Comments 
                                comments={comment.children}
                                text = {comment.text}
                                date = {comment.created_at}
                                author = {comment.author}
                            />
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
    )
}

export default NewsDetail;