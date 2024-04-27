import Nav from '@components/Nav';
import '@styles/global.css';
import Provider from '@components/Provider';
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const RootLayout = ({ children }) => {
  return (
    <html>
        <body>
          <Provider>
              <div className="main">
                <div className="gradient"></div>
              </div>
              <main className='app w-full'>
                <Nav/>
                { children }
              </main>
              <ToastContainer/>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout