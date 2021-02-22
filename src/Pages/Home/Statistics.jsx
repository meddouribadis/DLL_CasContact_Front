import React, {useEffect, useState} from "react";
import config from 'config';

//FA
import {faAngleDoubleUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// Components
import {DashCard} from "../../Components/DashboardCard";

function ShowCovidStatistics() {

    const [covidData, setCovidData] = useState(false);

    useEffect(() => {
        fetch("https://covid-193.p.rapidapi.com/statistics?country=France", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${config.covidApiKey}`,
                "x-rapidapi-host": "covid-193.p.rapidapi.com"
            }
        }).then(res => res.json())
            .then(response => {
                setCovidData(response);
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="row">
            <div className="col">
                <h3>Statistiques Covid <small className="h6 text-muted">(Mise à jour à {new Date().toLocaleTimeString()})</small></h3>
                <br/>
                {covidData &&
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-12 mb-3">
                        <DashCard title={"Nombre de cas"} className={"h-100"}>
                            <h2>{numberWithCommas(covidData.response[0].cases.active)}</h2>
                            <p className={"card-text"}><FontAwesomeIcon
                                icon={faAngleDoubleUp}/> {numberWithCommas(covidData.response[0].cases.new)}</p>
                        </DashCard>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12 mb-3">
                        <DashCard title={"Décès"} className={"h-100"}>
                            <h2>{numberWithCommas(covidData.response[0].deaths.total)}</h2>
                            <p className={"card-text"}><FontAwesomeIcon
                                icon={faAngleDoubleUp}/> {numberWithCommas(covidData.response[0].deaths.new)}</p>
                        </DashCard>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12 mb-3">
                        <DashCard title={"Tests"} className={"h-100"}>
                            <h2>{numberWithCommas(covidData.response[0].tests.total)}</h2>
                            <p className={"card-text"}><FontAwesomeIcon
                                icon={faAngleDoubleUp}/> {numberWithCommas(covidData.response[0].tests["1M_pop"])}</p>
                        </DashCard>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export {ShowCovidStatistics};
