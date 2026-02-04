import { useMemo } from 'react';
import { Container, Theme } from './settings/types';
import { PortfolioHero } from './components/generated/PortfolioHero';
import { QuestLog } from './components/generated/QuestLog';
import { Arsenal } from './components/generated/Arsenal';
import { Terminal } from './components/generated/Terminal';

const theme: Theme = 'dark';
// only use 'centered' container for standalone components, never for full page apps or websites.
const container: Container = 'none';

function App() {
  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    return (
      <>
        <PortfolioHero />
        <QuestLog />
        <Arsenal />
        <Terminal />
      </>
    ); // %EXPORT_STATEMENT%
  }, []);

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