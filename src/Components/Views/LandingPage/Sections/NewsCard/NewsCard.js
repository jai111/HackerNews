
import './NewsCard.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'

function NewsCard (props) {

    const [shouldFire, setShouldFire] = useState(true)

    let onLinkClick=(e)=>{
        if(!shouldFire){
            e.preventDefault()
        }
    }

    function openWebsite(page) {
        window.open(page);
    }

    let onMouseEnter=()=>{
        setShouldFire(false)
    }

    let onMouseLeave=()=>{
        setShouldFire(true)
    }

    return (
        <div className='news-card-container'>
            <Link onClick={(e) => onLinkClick(e)} style={{textDecoration: 'none'}} to={`/news/${props.newsId}`}>
                <div className='news-card'>
                    <div className='news-number'>
                        <span className='number-style'>
                            {props.index}
                        </span>
                    </div>
                    <div className='news'>
                        <div style={{marginBottom: '8px'}}>
                            <div className='description'>
                                <h4 className='name'>{props.author}</h4>
                            </div>
                        </div>
                        <div style={{marginBottom: '8px'}}>
                            <div >
                                <h2 className='title'>
                                    {props.title}
                                    <button className='url-button' onClick={() => {openWebsite( props.url)}} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}><span style={{ fontSize: '12px', opacity: '0.5'}}>{`(${props.url})`}</span></button>
                                </h2>
                            </div>
                        </div>
                        <span className='date'>
                            {new Date(props.date).toDateString()}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default NewsCard;