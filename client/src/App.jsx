import { useContext } from 'react';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

import { GlobalContext } from './contexts/GlobalContext.jsx';
import Loader from './components/ui/Loader.jsx';

function App() {
  const { isLoading } = useContext(GlobalContext);

  return (
    <section className='flex flex-col bg-gradient-to-br from-[#0f172a] via-[#3b82f6] to-[#ec4899] w-screen h-screen'>
      <Header />
      <section className='flex flex-grow overflow-hidden'>
        <Main />
      </section>
      <Footer />
      {/* Passo isLoading come prop dal context */}
      <Loader isLoading={isLoading} />
    </section>
  );
}

export default App;