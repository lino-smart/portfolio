import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { PortfolioHero } from './components/PortfolioHero';
import { QuestLog } from './components/QuestLog';
import { Arsenal } from './components/Arsenal';
import { Terminal } from './components/Terminal';
import { Preloader } from './components/Preloader';
import { AnimatePresence } from 'framer-motion';

const theme: Theme = 'dark';
const container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  const [loading, setLoading] = useState(true);

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    return (
      <AnimatePresence>
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="content">
            <PortfolioHero />
            <QuestLog />
            <Arsenal />
            <Terminal />
          </div>
        )}
      </AnimatePresence>
    );
  }, [loading]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;