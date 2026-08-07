import { useFrameStore } from '../store/useFrameStore';
import SetupScreen from '../components/SetupScreen';
import Slideshow from '../components/Slideshow';
import SkippedToast from '../components/SkippedToast';

const HomePage = () => {
  const isRunning = useFrameStore((state) => state.isRunning);

  return (
    <>
      {isRunning ? <Slideshow /> : <SetupScreen />}
      <SkippedToast />
    </>
  );
};

export default HomePage;
