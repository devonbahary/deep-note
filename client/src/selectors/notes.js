import moment from 'moment';

export default notes => notes.sort((a, b) => moment(a.lastUpdated).isBefore(b.lastUpdated) ? 1 : -1);