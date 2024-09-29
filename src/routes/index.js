import NotFound from '../components/Commons/NotFound';
import { LoginLayout } from '../layout/login/LoginLayout';
import { NoLoginLayout } from '../layout/nologin/NoLoginLayout';
import { Dashboard } from '../pages/Dashboard';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

const routes = [
  {
    path: '/',
    layout: NoLoginLayout,
    isProtected: false,
    element: Home,
  },
  {
    path: '/login',
    element: Login,
    layout: NoLoginLayout,
    isProtected: false,
  },
  {
    path: '/register',
    element: Register,
    layout: NoLoginLayout,
    isProtected: false,
  },
  {
    path: '*',
    element: NotFound,
    layout: NoLoginLayout,
    isProtected: false,
  },
  {
    path: '/dashboard',
    layout: LoginLayout,
    isProtected: false,
    element: Dashboard,
  },
];

export default routes;
