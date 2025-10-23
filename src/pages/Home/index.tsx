import { HomeBanner } from './components/HomeBanner';
import { HomePanel, HotPanel } from './components/Panel';
import { Product } from './components/Product';

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <HomePanel />
      <HotPanel />
      <Product />
    </div>
  );
}
