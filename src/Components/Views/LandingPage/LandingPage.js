import './LandingPage.css'
import NewsCard from './Sections/NewsCard/NewsCard';
import React, { useEffect, useState } from 'react'

function LandingPage () {

    const [News, setNews] = useState([])
    const [Loading, setLoading] = useState(true)
    const [Search, SetSearch] = useState('')

    useEffect(() => {
        const endpoint = `https://hn.algolia.com/api/v1/search?query=${Search}`;
        const timer = setTimeout(() => {
            fetchNews(endpoint)
        },500)
        return () => clearTimeout(timer)
    }, [Search])


    const fetchNews = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(new Date(result.hits[0].created_at).toDateString())
                setNews(result.hits)
            },setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    let handleSearch = (e)=> {
        SetSearch(e.target.value)
    }

    return(
        <div className='container'>
            <div className='search-box'>
                <span style={{padding: '7px 7px 6px 8 px'}}>
                    <svg style={{verticalAlign: 'middle', marginLeft: '10px', marginTop: '7px'}} width="35" height="35" viewBox="0 0 25 25" fill="rgba(8, 8, 8, 1)"><path d="M20.07 18.93l-4.16-4.15a6 6 0 1 0-.88.88l4.15 4.16a.62.62 0 1 0 .89-.89zM6.5 11a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0z"></path></svg>
                </span>
                <input className='input' value={Search} placeholder='Search News' onChange={handleSearch}></input>
            </div>
            <div className='title-box'>
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" class="ix y"><path fill="#fff" d="M0 .8h28v28H0z"></path><g opacity="0.8" clip-path="url(#trending_svg__clip0)"><path fill="#fff" d="M4 4.8h20v20H4z"></path><circle cx="14" cy="14.79" r="9.5" stroke="#000"></circle><path d="M5.46 18.36l4.47-4.48M9.97 13.87l3.67 3.66M13.67 17.53l5.1-5.09M16.62 11.6h3M19.62 11.6v3" stroke="#000" stroke-linecap="round"></path></g><defs><clipPath id="trending_svg__clip0"><path fill="#fff" transform="translate(4 4.8)" d="M0 0h20v20H0z"></path></clipPath></defs></svg>
                <div className='title'>HACKER NEWS</div>
            </div>
            <div className='news-box-container'>
                <div className='news-box'>
                    {
                       News &&  News.map( (news, index) =>{
                            return(
                                <React.Fragment key={index}>
                                    <NewsCard
                                        date = {news.created_at}
                                        title = {news.title}
                                        points = {news.points}
                                        index = {index+1}
                                        author = {news.author}
                                        newsId = {news.objectID}
                                        url = {news.url}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
            {Loading && <div style={{textAlign: 'center'}}>Loading...</div>}

        </div>
    )
}

export default LandingPage;