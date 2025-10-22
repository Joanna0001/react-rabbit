import { Banner } from './components/Banner';
import { HomePanel, HotPanel } from './components/Panel';

export default function Home() {
  return (
    <div>
      <Banner />
      <HomePanel />
      <HotPanel />
    </div>
  );
}
