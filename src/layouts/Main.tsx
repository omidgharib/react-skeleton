import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layouts/header'

const Main = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto main-content'>
        <Suspense fallback={<p>Loading ...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}

export default Main
