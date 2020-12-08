import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { courses } from './courses.reducer';
import { classes } from './classes.reducer';
import { signalements } from './signalements.reducer';
import { documents } from './documents.reducer';
import { mails } from './mail.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    courses,
    classes,
    signalements,
    documents,
    mails,
    alert
});

export default rootReducer;
