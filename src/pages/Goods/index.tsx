import { GoodsInfo } from './components/GoodsInfo';
import { GoodsDetail } from './components/GoodsDetail';
import { useParams } from 'react-router-dom';
import { useGoodsByIdQuery } from '@/hooks/useGoods';
import { FloatButton } from 'antd';

export function Goods() {
  const { id } = useParams();
  const { data } = useGoodsByIdQuery(id!);

  if (!data) return null;

  return (
    <div className="mx-(--padding-x) mb-5">
      <GoodsInfo data={data} />
      <GoodsDetail hotByDay={data.hotByDay} details={data.details} />
      <FloatButton.BackTop />
    </div>
  );
}
