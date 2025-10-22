import { Banner } from './components/Banner';
import { HomePanel, HotPanel } from './components/Panel';
import { Product } from './components/Product';

export default function Home() {
  return (
    <div>
      <Banner />
      <HomePanel />
      <HotPanel />
      <Product />
    </div>
  );
}
