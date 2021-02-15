import React, {useEffect, useState} from "react";
import {NewsCard} from "../../Components/NewsCard";
import config from 'config';

function Cookies() {

    return (
        <div className={"container"}>
            <h1>A propos des cookies</h1>
            <div className="text">
                <p>Le site Univ-evry.fr utilise des cookies qui permettent de conserver des données utilisateur afin de
                    faciliter votre navigation. Comment et pourquoi l'Université d'Évry utilise ces fichiers qui ne sont
                    ni des logiciels espions ni des virus.</p>
            </div>

            <h2>Qu'est-ce qu'un cookie ?</h2>
            <div className="text">
                <p>Le mot "cookies" désigne une partie d'un texte, des pixels, des fichiers GIF invisibles, des fichiers
                    journaux, des balises Web ou tout autre fichier de traçage et de suivi ainsi que toute technologie
                    similaire qui se trouve sur votre appareil. Selon les paramètres que vous avez sélectionnés, votre
                    navigateur ajoute le texte sur votre appareil sous la forme d'un petit fichier.<br/><br/>
                    Vous pouvez changer les paramètres du navigateur pour refuser les cookies.<br/><br/>
                    De nombreux navigateurs sont paramétrés pour accepter les cookies par défaut, car ces derniers
                    facilitent l'affichage de certains contenus. Si vous choisissez de désactiver les cookies au niveau
                    du navigateur ou de refuser les cookies à l'aide de notre outil de gestion des cookies (voir
                    ci-dessous), le site Internet peut fonctionner différemment ou peut vous empêcher d'utiliser
                    certaines parties du site.
                </p>
            </div>

            <h2>Pourquoi l'université d'évry utilise des cookies ?</h2>
            <div className="text">
                <p>L'Université d'Évry utilise des cookies à plusieurs fins :</p>
                <ul className="ul--rte">
                    <li>Un Cookie indispensable pour les contrôles de sécurité du site et contre les attaques sur notre
                        site. Pour la sécurité du site et de votre navigation, vous ne pourrez pas désactiver ce cookie.
                    </li>
                    <li>Un cookie de session qui ne sert que le temps que vous êtes logué à votre compte. Il vous
                        permettra
                        de rester connecté à votre compte tout le long de votre visite sur notre site. Il expire à la
                        fermeture de votre navigateur.
                    </li>
                    <li>Nous utilisons également des cookies "analytiques" pour nous aider à améliorer la navigation des
                        visiteurs fréquents sur notre site Web. Ces cookies nous aident à déterminer ce que ces
                        utilisateurs
                        visitent ou non, et nous donnent des indications sur la manière d'améliorer votre navigation.
                    </li>
                    <li>Les liens de partage vers Facebook, Twitter et tout autre réseau social similaire : Lorsque vous
                        utilisez l'un des boutons de partage se trouvant sur un site, un cookie peut être installé par
                        le
                        service que vous avez choisi afin de partager le contenu. L'Université d'Évry ne contrôle pas
                        l'établissement de ces cookies, et l'outil de l'Université d'Évry ne bloquera pas les cookies de
                        ces
                        sites tiers. Veuillez consulter le site Web pertinent pour en savoir plus.
                    </li>
                    <li>Youtube :<br/>L'Université d'Évry peut intégrer des vidéos en provenance de Youtube. Les pages
                        auxquelles ces vidéos sont intégrées peuvent contenir des cookies installés par Youtube .
                        Veuillez
                        vous rendre sur :
                        <a href="https://www.google.com/settings/u/0/ads"> https://www.google.com/settings/u/0/ads.</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function latestNews() {
    const requestOptions = {
        method: 'GET'
    };

    const [newsFeed, setNewsFeed] = useState(null);

    useEffect(() => {
        fetch(`http://newsapi.org/v2/top-headlines?apiKey=${config.newsApiKey}&country=fr&q=covid&from=2021-02-11`, requestOptions).then(res => res.json()).then((data, err) => {
            setNewsFeed(data);
        });
    }, []);

    return (
        <div className="container">
            <h1>Les dernières news</h1>
            <hr/>
            <div className="row row-cols-1 row-cols-md-3 g-">
                {newsFeed && newsFeed.articles.map((article, index) =>
                    <div key={index} className="col mb-3">
                        <NewsCard className={"h-100"} article={article}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export {Cookies, latestNews};
