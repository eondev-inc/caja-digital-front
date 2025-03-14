
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import routes from './routes'
import { PrivateRoute } from './components/Wrappers/PrivateRoute';
import { RouterWrapper } from './components/Wrappers/RouterWrapper';
import { ScrollToTop } from './components/Commons/ScrollToTop';
import { useStore } from './app/store';


function App() {
  const { isAuthenticated } = useStore();

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {routes.map(({ path, element, layout, isProtected }, index) => {
          return (
            <Route
              key={index}
              path={path}
              element={
                isProtected ? (
                  <PrivateRoute isAuthenticated={isAuthenticated} element={element} layout={layout} />
                ) : (
                  <RouterWrapper element={element} layout={layout} />
                )
              }
            />
          )
        })

        }
      </Routes>
    </Router>
  );

}

export default App
