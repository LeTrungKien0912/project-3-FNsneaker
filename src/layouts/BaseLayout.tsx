
import { Outlet } from 'react-router-dom'
import Footer from './base/Footer'
import Header from './base/Header'

const BaseLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default BaseLayout
