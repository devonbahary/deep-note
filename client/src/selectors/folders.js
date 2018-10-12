import moment from 'moment';

export default folders => folders.sort((a, b) => moment(a.lastUpdated).isBefore(b.lastUpdated) ? 1 : -1);