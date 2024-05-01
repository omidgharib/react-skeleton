import { lazy } from 'react'
const Main = lazy(() => import('../layouts/Main'))
const Tasks = lazy(() => import('../Views/Tasks'))
const Contact = lazy(() => import('../Views/Contact'))
const Demo = lazy(() => import('../Views/Demo'))
const DailyTask = lazy(() => import('../Views/DailyTask'))
const NotFound = lazy(() => import('../Views/404'))
import ErrorPage from '../Views/ErrorPage'
import Formhook from '@/Views/Formhook'

// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }

const mainRoutes = [
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        loader: async () => {
            return { list: [] }
        },
        // loader: rootLoader,
        // action: rootAction,
        children: [
            {
                path: '*',
                element: <NotFound />,
            },
            {
                index: true,
                // path: "/Tasks",
                element: <Tasks />,
                // loader: contactLoader,
                // action: editAction,
            },
            {
                path: 'contacts/:contactId',
                element: <Contact />,
            },
            {
                path: 'demo',
                element: <Demo />,
                index: true,
            },
            {
                path: 'formhook',
                element: <Formhook />,
                index: true,
            },
            {
                path: 'dailytask',
                element: <DailyTask />,
                index: true,
            },
        ],
    },
]

export default mainRoutes
