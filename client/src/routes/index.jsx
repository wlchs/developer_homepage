import Contact from './Contact';
import Projects from './Projects';
import Welcome from './Welcome';
import Admin from './Admin';

export default [
  {
    id: 0,
    display: true,
    name: 'Contact',
    path: '/contact',
    View: Contact,
  },
  {
    id: 1,
    display: true,
    name: 'Projects',
    path: '/projects',
    View: Projects,
  },
  {
    id: 2,
    display: false,
    name: 'Welcome',
    path: '/',
    View: Welcome,
  },
  {
    id: 3,
    display: false,
    name: 'Admin',
    path: '/admin',
    View: Admin,
  },
];
