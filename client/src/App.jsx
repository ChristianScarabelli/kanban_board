import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'

function App() {


  return (
    <>
      <section className='flex flex-col bg-gradient-to-br from-[#0f172a] via-[#3b82f6] to-[#ec4899] w-screen h-screen'>
        <Header />
        <section className='flex-grow'>
          <Main />
        </section>
        <Footer />
      </section>
    </>
  )
}

export default App
