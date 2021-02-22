import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import {useDispatch, useSelector} from 'react-redux';
import {signalementActions} from '../../_actions';
import {CalendarModal} from "../../Components/CalendarModal";

function CalendrierEventsPage() {

    const requestOptions = {method: 'GET'};
    const [coursEvents, setCoursEvents] = useState(undefined);
    const [modalStyle, setModalStyle] = useState({display: 'none'});
    const [modalClass, setModalClass] = useState('');
    const [currentEvent, setCurrentEvent] = useState({
        title: "Title",
        start: " ",
        end: "obj.dtEnd",
        extendedProps: {
            prof: '',
            location: ''
        }
    });

    useEffect(() => {
        fetch(`http://146.59.195.214:8006/api/v1/events/M2MIAA`, requestOptions).then(res => res.json()).then((data, err) => {
            setCoursEvents(toEvents(data));
        });
    }, []);

    function toEvents(source) {
        let dest = source.map(
            obj => {
                return {
                    'title': obj.matiere,
                    'start': obj.dtStart,
                    'end': obj.dtEnd,
                    'allDay': false,
                    'prof': obj.prof,
                    'location': obj.location,
                    'backgroundColor': '#ffc107',
                    'borderColor': '#db7800',
                    'textColor': '#212529'
                }
            }
        );

        return dest;
    }

    function handleEventClick({event, el}) {
        console.log(event);
        setCurrentEvent(event);
        toggleModal();
    }

    function toggleModal() {
        modalClass === 'show' ? setModalClass('') : setModalClass('show');
        modalStyle.display === 'block' ? setModalStyle({display: 'none'}) : setModalStyle({display: 'block'});
    }

    return (
        <div className="col-12">
            <h1>Calendrier</h1>
            <hr/>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                eventClick={handleEventClick}
                events={coursEvents}
                locales={frLocale}
                locale={'fr'}
            />
            <CalendarModal event={currentEvent} toggle={toggleModal} modalClass={modalClass}
                           modalStyle={modalStyle}/>
        </div>
    );
}

function CalendrierSignalementsPage() {

    const dispatch = useDispatch();
    const [signalEvents, setSignalEvents] = useState(undefined);

    function toEvents(source) {

        let dest = source.map(
            obj => {
                let backgroudColor = obj.isCasContact ? '#ffc107' : '#dc3545';
                let borderColor = obj.isCasContact ? '#db7800' : '#7a1922';
                let textColor = obj.isCasContact ? '#212529' : '#fff';
                return {
                    "title": obj.User.firstName + ' ' + obj.User.lastName,
                    'start': obj.dateDebut,
                    'end': obj.dateFin,
                    'url': 'dashboard/signalement/edit/' + obj.id,
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
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={signalEvents}
                locales={frLocale}
                locale={'fr'}
            />
        </div>
    );
}

function CalendrierPage() {
    const user = useSelector(state => state.authentication.user);

    return (
        <div className="container">
            {user && user.role === 'TEACHER' &&
            <CalendrierSignalementsPage/>
            }
            {user && user.role !== 'TEACHER' &&
            <CalendrierEventsPage/>
            }
        </div>
    )
}

export {CalendrierPage, CalendrierSignalementsPage, CalendrierEventsPage};
