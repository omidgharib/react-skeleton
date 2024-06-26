import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/stores/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes'
import './style/index.less'
const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
