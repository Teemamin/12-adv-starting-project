import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import EventsPage,{loader as eventsLoader} from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsRoot from "./pages/EventsRoot";
import IsError from "./pages/IsError";
import { eventLoader, action as eventAction } from "./pages/EventDetailPage";
import {action as reusableAction} from './components/EventForm'
// import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import NewsletterPage, {action as newsletterAction} from "./pages/NewsLetterPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      errorElement: <IsError/>,
      children: [
        {
          index: true,
          element: <HomePage/>,
        },
        {
          path: "events",
          element: <EventsRoot/>,
          children: [
            {
              index: true,
              element: <EventsPage/>,
              loader: eventsLoader, // loader of a page will be called as soon as we start visitin the path, not after the compont has rendered but before we get there
            },// react router will wait for the loader fuc to return data before rendering the path with the said data
            {
              path: ":id",
              id: 'event-detail', // this let us target this loader with  useRouteLoaderData
              loader: eventLoader, // loader data is avilable to any component on thesame level wr d loader is added or componets nested lower
              children: [
                {
                  index: true,
                  element: <EventDetailPage/>,
                  action: eventAction
                  
                },
                {
                  path: "edit",
                  element: <EditEventPage/>,
                  action: reusableAction
                },
              ]
            },
            {
              path: "new",
              element: <NewEventPage/>,
              action: reusableAction
            },
           
          ],
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
        
      ]

    },
   
  ])
  return <RouterProvider router={router} />;
}

export default App;
