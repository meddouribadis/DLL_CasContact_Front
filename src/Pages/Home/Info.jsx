import React from "react";
import {NewsCard} from "../../Components/NewsCard";

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

    let newsFeed = {
        "status": "ok",
        "totalResults": 7,
        "articles": [
            {
                "source": {
                    "id": null,
                    "name": "Francetvinfo.fr"
                },
                "author": null,
                "title": "Vague de contaminations en Moselle : le maire de Thionville dénonce \"l'amateurisme\" de la politique vaccinale - Franceinfo",
                "description": "La Moselle fait face à une recrudescence des cas de contamination au Covid-19, notamment à cause des variants. Pierre Cuny, maire de Thionville, estime qu'il faut fermer les écoles, les collèges et les lycées.",
                "url": "https://www.francetvinfo.fr/sante/maladie/coronavirus/vaccin/vague-de-contaminations-en-moselle-le-maire-de-thionville-denonce-l-amateurisme-de-la-politique-vaccinale-et-reclame-la-fermeture-anticipee-des-etablissements-scolaires_4295521.html",
                "urlToImage": "https://www.francetvinfo.fr/pictures/aD82uPKk3rtiO_R6JMvZU3Jxb6A/1500x843/2021/02/13/phpCfoKLy.jpg",
                "publishedAt": "2021-02-13T08:34:03Z",
                "content": "La Moselle fait face à une recrudescence des cas de contamination au Covid-19, notamment à cause des variants. Pierre Cuny, maire de Thionville, estime qu'il faut fermer les écoles, les collèges et l… [+2131 chars]"
            },
            {
                "source": {
                    "id": null,
                    "name": "Www.rtl.fr"
                },
                "author": null,
                "title": "Coronavirus : comment fonctionne le spray nasal anti-Covid bientôt disponible ? - RTL.fr",
                "description": "La société Pharma & Beauty va commercialiser un spray nasal qui élimine 99% de la charge virale.",
                "url": "https://www.rtl.fr/actu/bien-etre/coronavirus-comment-fonctionne-le-spray-nasal-anti-covid-bientot-disponible-7900001340",
                "urlToImage": "https://images.rtl.fr/rtl/www/1385864-un-spray-nasal-a-base-d-eau-ionisee-connue-pour-ses-proprietes-antimicrobiennes-qui-elimine-99-de-la-charge-virale-a-l-usine-pharma-and-beauty-de-saint-chamas-dans-le-sud-est-de-la-france-le-21-janvier-2021.jpg",
                "publishedAt": "2021-02-13T05:05:00Z",
                "content": "La société française Pharma &amp; Beauty apporte sa contribution dans la lutte contre l'épidémie de Covid-19 en commercialisant dès le mois de mars un spray nasal censé éliminer 99% de la charge vira… [+912 chars]"
            },
            {
                "source": {
                    "id": null,
                    "name": "Le Parisien"
                },
                "author": "Florence Méréo et Thomas Poupeau",
                "title": "Covid-19 : face aux variants, les écoles de Moselle retiennent leur souffle - Le Parisien",
                "description": "Le ministre de la Santé, Olivier Véran, s’est rendu dans le département ce vendredi. Des mesures locales pourraient être annoncées.",
                "url": "https://www.leparisien.fr/societe/sante/covid-19-face-aux-variants-les-ecoles-de-moselle-retiennent-leur-souffle-12-02-2021-8424646.php",
                "urlToImage": "https://cloudfront-eu-central-1.images.arcpublishing.com/leparisien/L2IP6GCPXFDLBIYK2TSNNWKHWU.jpg",
                "publishedAt": "2021-02-12T20:12:00Z",
                "content": "Depuis quelques jours, François Braun tourne la question dans tous les sens. « Mais qu'est-ce qu'ils font bien là? », se demande le patron du Samu-Urgences de France, qui est aussi urgentiste à l'hôp… [+3439 chars]"
            },
            {
                "source": {
                    "id": null,
                    "name": "L'Indépendant"
                },
                "author": "Martial Mehr",
                "title": "Covid-19 - 20.701 nouveaux cas détectés en France en 24 heures, 320 décès supplémentaires - L'Indépendant",
                "description": "Dans le bilan quotidien publié ce vendredi soir par Santé Publique France, la situation sanitaire semble s'améliorer en France grâce à la baisse de certains indicateurs sensibles de l'épidémie. On fait le point.",
                "url": "https://www.lindependant.fr/2021/02/12/covid-19-20701-nouveaux-cas-detectes-en-france-en-24-heures-320-deces-supplementaires-9370159.php",
                "urlToImage": "https://images.lindependant.fr/api/v1/images/view/6026dee43e4546091e0c19a5/large/image.jpg?v=1",
                "publishedAt": "2021-02-12T20:07:00Z",
                "content": "Dans le bilan quotidien publié ce vendredi soir par Santé Publique France, la situation sanitaire semble s'améliorer en France grâce à la baisse de certains indicateurs sensibles de l'épidémie. On fa… [+1066 chars]"
            },
            {
                "source": {
                    "id": null,
                    "name": "FRANCE 24 English"
                },
                "author": "Sébastian SEIBT",
                "title": "Covid-19 : un recul mondial en trompe-l’œil ? - FRANCE 24",
                "description": "L’OMS a annoncé, jeudi, une baisse de 17 % des nouveaux cas de Covid-19 dans le monde, une tendance constatée sur tous les continents. Mais ces données officielles sont à prendre avec précaution.",
                "url": "https://www.france24.com/fr/europe/20210212-covid-19-un-recul-mondial-en-trompe-l-œil",
                "urlToImage": "https://s.france24.com/media/display/6cf77736-6d4d-11eb-a2b7-005056bf87d6/w:1280/p:16x9/120221-covid-seringue-case-m.JPG",
                "publishedAt": "2021-02-12T16:48:00Z",
                "content": "LOMS a annoncé, jeudi, une baisse de 17 % des nouveaux cas de Covid-19 dans le monde, une tendance constatée sur tous les continents. Mais ces données officielles sont à prendre avec précaution. \r\n \"… [+4705 chars]"
            },
            {
                "source": {
                    "id": null,
                    "name": "BFMTV"
                },
                "author": null,
                "title": "Vaccin: la France, premier pays à recommander une seule dose pour les personnes ayant déjà eu le Covid-19 - BFMTV",
                "description": "L'avis rendu par la Haute autorité de santé doit encore recevoir l'aval du gouvernement.",
                "url": "https://www.bfmtv.com/sante/vaccin-la-france-premier-pays-a-recommander-une-seule-dose-pour-les-personnes-ayant-deja-eu-le-covid-19_AD-202102120241.html",
                "urlToImage": "https://images.bfmtv.com/_LoOj0Uh_eUPUfgDMwfVMdBWwwY=/0x40:768x472/768x0/images/En-France-la-seule-cible-des-plus-de-75-ans-en-ville-pour-lesquels-la-vaccination-est-theoriquement-ouverte-depuis-le-18-janvier-represente-5-millions-de-personnes-960865.jpg",
                "publishedAt": "2021-02-12T13:35:49Z",
                "content": "L'avis rendu par la Haute autorité de santé doit encore recevoir l'aval du gouvernement.\r\nLes autorités sanitaires françaises ont recommandé vendredi de \"ne proposer qu'une seule dose\" de vaccin cont… [+3212 chars]"
            },
            {
                "source": {
                    "id": null,
                    "name": "Www.rtl.fr"
                },
                "author": null,
                "title": "Huiles essentielles, chloroquine... Un protocole polémique contre la Covid-19 - RTL.fr",
                "description": "ÉCLAIRAGE - Un collectif propose un protocole de soins qui fait débat. L'Ordre des médecins a demandé une évaluation.",
                "url": "https://www.rtl.fr/actu/bien-etre/huiles-essentielles-chloroquine-un-protocole-polemique-contre-la-covid-19-7900001341",
                "urlToImage": "https://images.rtl.fr/rtl/www/1211308-hydroxychloroquine-illustration.jpg",
                "publishedAt": "2021-02-12T12:14:00Z",
                "content": "Sophrologie, zinc, vitamine C, homéopathie, vitamine D, ivermectine, hydroxycholoroquine... Ces solutions pourraient-elles traiter la Covid-19 de manière précoce ? C'est en tous cas ce qu'avance le c… [+4099 chars]"
            }
        ]
    }

    return (
        <div className="container">
            <h1>Les dernières news</h1>
            <hr/>
            <div className="row row-cols-1 row-cols-md-3 g-">
                {newsFeed.articles.map((article, index) =>
                    <div className="col mb-3">
                        <NewsCard className={"h-100"} key={index} article={article}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export {Cookies, latestNews};
