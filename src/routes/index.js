import NotFound from "../components/Commons/NotFound";
import { LoginLayout } from "../layout/login/LoginLayout";
import { NoLoginLayout } from "../layout/nologin/NoLoginLayout";
import Main from "../pages/dashboard/Main";
import OpenRegister from "../pages/dashboard/OpenRegister";
import Sales from "../pages/dashboard/Sales";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

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
    isProtected: false
  },
  {
    path: 'dashboard',
    layout: LoginLayout,
    isProtected: true,
    element: Main,
  },
  {
    path: '/dashboard/open-register',
    layout: LoginLayout,
    isProtected: true,
    element: OpenRegister,
  },
  {
    path: '/dashboard/sales',
    layout: LoginLayout,
    isProtected: true,
    element: Sales,
  }
]

export default routes;
