import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Contact from "./pages/contact/Contact"
import Portfolio from "./pages/portfolio/Portfolio"
import { createBrowserRouter, RouterProvider } from "react-router"
import AppLayout from "./components/AppLayout"

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/', 
      element: <AppLayout />,
      children: [
        {
          path: '/', 
          element: <Home />,
        },
        {
          path: '/about', 
          element: <About />,
        },
        {
          path: '/portfolio', 
          element: <Portfolio />,
        },
        {
          path: '/contact', 
          element: <Contact />,
        },
      ]
    }
  ])
  return <RouterProvider router={router} />;
}

export default App 