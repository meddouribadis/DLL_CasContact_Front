import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NewsCard(props) {

    console.log(props);
    return (
            <div className={`card ${ props.className }`}>
                { props.article.urlToImage && <img className="card-img-top" src={props.article.urlToImage} alt="Card image cap"/> }
                <div className="card-body">
                    <h6 className="card-title">{props.article.title}</h6>
                    <p className="card-text">{props.article.description}</p>
                    <a href={props.article.url} className="btn btn-primary">Go somewhere</a>
                </div>
                <div className="card-footer">
                    <small className="text-muted">{new Date(props.article.publishedAt).toLocaleDateString()}</small>
                </div>
            </div>
    );
}

export { NewsCard };
