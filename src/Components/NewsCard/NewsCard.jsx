import React from 'react';

function NewsCard(props) {
    return (
        <div className={`card ${props.className}`}>
            {props.article.urlToImage &&
            <img className="card-img-top" src={props.article.urlToImage} alt="Card image cap"/>}
            <div className="card-body">
                <h6 className="card-title">{props.article.title}</h6>
                <p className="card-text">{props.article.description}</p>
                <a target='_blank' href={props.article.url} className="btn btn-primary">Voir l'article</a>
            </div>
            <div className="card-footer">
                <small className="text-muted">{new Date(props.article.publishedAt).toLocaleDateString()}</small>
                <small className="text-muted"> - {props.article.source.name}</small>
            </div>
        </div>
    );
}

export {NewsCard};
