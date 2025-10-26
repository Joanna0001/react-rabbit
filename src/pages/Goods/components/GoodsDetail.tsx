import { Flex } from 'antd';
import type { Goods, DetailsProps } from '@/types/goods';
import { LazyImage } from '@/components/LazyImage';
import { ProductCard } from '@/components/ProductCard';

export function GoodsDetail({ hotByDay, details }: { hotByDay: Goods[]; details: DetailsProps }) {
  return (
    <Flex justify="space-between">
      <div className="w-235 bg-white">
        <h3 className="text-lg border-b border-[#f5f5f5] h-18 leading-18 pl-12 text-[#333]">商品详情</h3>
        <div className="p-10">
          <Flex wrap style={{ marginBottom: 25 }}>
            {details.properties.map(property => (
              <Flex key={property.name} style={{ width: '50%', marginBottom: 12, fontSize: 14 }}>
                <div className="text-[#999] w-25">{property.name}</div>
                <div className="text-[#666] ">{property.value}</div>
              </Flex>
            ))}
          </Flex>

          <div>
            {details.pictures.map((picture, index) => (
              <LazyImage key={index} src={picture} alt={`商品图片${index + 1}`} width="100%" preview={false} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-70">
        <h3 className="bg-[#e26237] h-18 leading-18 text-[#fff] pl-6 text-lg">24小时热榜</h3>
        <div className="bg-white">
          {hotByDay.map(item => (
            <ProductCard key={item.id} {...item} width="w-70" isShadow={false} openProductDetail={() => {}} />
          ))}
        </div>
        <h3 className="bg-[#e26237] h-18 leading-18 text-[#fff] pl-6 text-lg mt-5">周热榜</h3>
        <div className="bg-white">
          {hotByDay.map(item => (
            <ProductCard key={item.id} {...item} width="w-70" isShadow={false} openProductDetail={() => {}} />
          ))}
        </div>
      </div>
    </Flex>
  );
}
