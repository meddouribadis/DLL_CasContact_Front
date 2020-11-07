import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signalementActions, userActions} from '../../_actions';

function CalendrierPage() {

    const dispatch = useDispatch();
    const signalements = useSelector(state => state.signalements);
    const user = useSelector(state => state.authentication.user);
    const [signalEvents, setSignalEvents] = useState(undefined);

    function toEvents(source){

        let dest = source.map(
            obj => {

                let backgroudColor = obj.isCasContact ? '#ffc107' : '#dc3545';
                let borderColor = obj.isCasContact ? '#db7800' : '#7a1922';
                let textColor = obj.isCasContact ? '#212529' : '#fff';
                return {
                    "title": obj.User.firstName + ' ' + obj.User.lastName,
                    'start': obj.dateDebut,
                    'end': obj.dateFin,
                    'url': 'dashboard/signalement/edit/'+obj.id,
                    'allDay': true,
                    'backgroundColor': backgroudColor,
                    'borderColor': borderColor,
                    'textColor': textColor
                }
            }
        );

        return dest;
    }

    useEffect(() => {
        dispatch(signalementActions.getAllActive()).then((data, err) => {
            setSignalEvents(toEvents(data.signalements));
        });
    }, []);

    return (
        <div className="col-12">
            <h1>Calendrier</h1>
            <hr/>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={signalEvents}
                locales={frLocale}
                locale={'fr'}
            />
        </div>
    );
}

export { CalendrierPage };
