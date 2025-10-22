import { useGoodsListQuery } from '@/hooks/useHome';
import type { GoodsResponse } from '@/types/category';
import { Typography } from 'antd';

const { Title } = Typography;

export function Product() {
  const { data: goodsList } = useGoodsListQuery();
  return (
    <div className="bg-white" style={{ padding: '0 calc(50% - var(--max-width)/2)', marginTop: 20 }}>
      {goodsList?.map(item => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function ProductItem({ item }: { item: GoodsResponse }) {
  return (
    <div>
      <Title level={5}>{item.name}</Title>
      <div></div>
    </div>
  );
}
