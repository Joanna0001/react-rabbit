import { useGoodsListQuery } from '@/hooks/useHome';
import type { GoodsResponse } from '@/types/category';
import { Image, Flex } from 'antd';
import { ProductCard } from '@/components/ProductCard';

export function Product() {
  const { data: goodsList } = useGoodsListQuery();
  return (
    <div className="bg-white my-5" style={{ padding: '0 calc(50% - var(--max-width)/2)' }}>
      {goodsList?.map(item => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function ProductItem({ item }: { item: GoodsResponse }) {
  return (
    <div>
      <h3 className="text-[32px] ml-[8px] py-10">{item.name}</h3>
      <Flex>
        <div>
          <Image preview={false} src={item.picture} width={240} height={610} />
        </div>
        <div className="ml-[20px] flex flex-wrap gap-[20px]">
          {item.goods.map(good => (
            <ProductCard key={good.id} {...good} />
          ))}
        </div>
      </Flex>
    </div>
  );
}
