import './Comments.css'
import React, {useState} from 'react'

function Comment (props) {

    const [text, setText] = useState('show')
    let handleShow = () =>{
        if(text ==='hide'){
            setText('show')
        }
        else{
            setText('hide')
        }
        props.onShow()
    }

    return (
        <div className='comment-card-container'>
            <div className='comment-card'>
                {/* <div className='comment-number'>
                    <span className='number-style'>
                        {props.index}
                    </span>
                </div> */}
                <div className='comment'>
                    <div style={{marginBottom: '8px'}}>
                        <div className='description'>
                            <h4 className='name'>{props.author}</h4>
                        </div>
                    </div>
                    <div style={{marginBottom: '8px'}}>
                        <div >
                            <div className='title' dangerouslySetInnerHTML={{ __html: props.text }}>
                            </div>
                        </div>
                    </div>
                    <span className='date'>
                        {new Date(props.date).toDateString()}
                    </span>
                    {props.len>0 && <p className='load-more'>
                        <button className='load-button' onClick={handleShow}>{`${text} ${props.len}  replies`}</button>
                    </p>}
                </div>
                
            </div>
        </div>
    )
}

function Comments (props) {

    const [Show, setShow] = useState(false)

    let onShow = ()=>{
        setShow(!Show)
    }

    if(props.text)
        {return(
           <React.Fragment>
               <Comment
                text = {props.text}
                date = {props.date}
                author = {props.author}
                len = {props.comments.length}
                onShow = {onShow}
               />
               {
                Show && props.comments.map( (comment, index) =>{
                    
                    return(
                        <React.Fragment key={index}>
                            <div style={{marginLeft: '50px'}}>
                                <Comment
                                     text = {comment.text}
                                     date = {comment.created_at}
                                     author = {comment.author}
                                     len = {0}
                                />
                            </div>
                        </React.Fragment>
                    )
                })
                }
           </React.Fragment>
        )}
}

export default Comments