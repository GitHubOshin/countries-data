import { type RouteObject, useRoutes } from 'react-router-dom'
import Country from './pages/Country'
import Home from './pages/Home'

function App(): JSX.Element {
  const routes: RouteObject[] = [
    {
      element: <Home />,
      path: '/'
    },
    { element: <Country />, path: '/countries/:code' }
  ]
  const element = useRoutes(routes)
  return (
    <div className="h-full min-w-[375px]">
      {/* <Home /> */}
      {element}
    </div>
  )
}

export default App
