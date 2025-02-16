import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'

import GlobalProvider from './contexts/GlobalContext.jsx'

function App() {


  return (
    <GlobalProvider>
      <section className='flex flex-col bg-gradient-to-br from-[#0f172a] via-[#3b82f6] to-[#ec4899] w-screen h-screen'>
        <Header />
        <section className='flex-grow'>
          <Main />
        </section>
        <Footer />
      </section>
    </GlobalProvider>
  )
}

export default App
