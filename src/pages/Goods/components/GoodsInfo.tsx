import { Flex, Image, Typography } from 'antd';
import { LazyImage } from '@/components/LazyImage';
import { useParams } from 'react-router-dom';
import { useGoodsByIdQuery } from '@/hooks/useGoods';

const { Text } = Typography;

export function GoodsInfo() {
  const { id } = useParams();
  const { data } = useGoodsByIdQuery(id!);
  return (
    <div>
      <Flex>
        <Flex style={{ padding: '30px 50px' }}>
          <LazyImage width={400} height={400} src={data?.mainPictures?.[0]} alt={data?.name} preview={false} />
          <Flex vertical justify="space-between">
            {data?.mainPictures.map((picture, index) => (
              <Image
                key={index}
                width={64}
                height={64}
                preview={false}
                src={picture}
                className="ml-3 hover:border-2 hover:border-(--primary-color)"
              />
            ))}
          </Flex>
        </Flex>

        <div className="py-7.5 pr-7.5">
          <h3 className="text-[22px] text-[#333]">{data?.name}</h3>
          <p className="mt-2.5 text-sm text-[#999]">{data?.desc}</p>
          <p className="mt-2.5 text-[22px] text-(--price-color)">
            <span className="text-sm">￥</span>
            {data?.price}
            <Text delete style={{ fontSize: '14px', color: '#999', marginLeft: '8px' }}>
              ￥{data?.oldPrice}
            </Text>
          </p>
          <p>{data?.salesCount}</p>
          <p>{data?.commentCount}</p>
          <p>{data?.collectCount}</p>
          <p>{data?.isCollect}</p>
          <p>{data?.isPreSale}</p>
        </div>
      </Flex>
    </div>
  );
}
