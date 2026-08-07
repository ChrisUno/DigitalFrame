import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';

interface AppProps {
  basename?: string;
}

const App = ({ basename }: AppProps) => {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;