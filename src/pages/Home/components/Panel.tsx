import { Image, Card, Flex } from 'antd';
import { useHotGoodsQuery, useNewGoodsQuery } from '@/hooks/useHome';

const { Meta } = Card;

export function HotPanel() {
  const { data: hotGoodsList } = useHotGoodsQuery();

  return (
    <div className="bg-white" style={{ padding: '0 calc(50% - var(--max-width)/2)' }}>
      <div className="text-[32px]" style={{ padding: '40px 0' }}>
        人气推荐<span className="ml-5 text-base text-[#999]">人气爆款 不容错过</span>
      </div>

      <Flex justify="space-between">
        {hotGoodsList?.map(item => (
          <Card
            hoverable
            variant="borderless"
            cover={<Image width={300} height={300} src={item.picture} preview={false} />}
            style={{ boxShadow: 'none' }}
          >
            <Meta
              title={<div className="text-[22px] font-normal text-center">{item.title}</div>}
              description={<div className="text-[18px] color-[#999] text-center">{item.alt}</div>}
            />
          </Card>
        ))}
      </Flex>
    </div>
  );
}

export function HomePanel() {
  const { data: newGoodsList } = useNewGoodsQuery();

  return (
    <div className="bg-white" style={{ padding: '0 calc(50% - var(--max-width)/2)' }}>
      <div className="text-[32px]" style={{ padding: '40px 0' }}>
        新鲜好物<span className="ml-5 text-base text-[#999]">新鲜出炉 品质靠谱</span>
      </div>

      <Flex justify="space-between">
        {newGoodsList?.map(item => (
          <Card
            styles={{ body: { backgroundColor: '#f0f9f4' } }}
            hoverable
            cover={<Image width={300} height={300} src={item.picture} preview={false} />}
          >
            <Meta
              title={<div className="text-[22px] text-center ellipsis w-[246px]">{item.name}</div>}
              description={<div className="text-[22px] text-[var(--price-color)] text-center">￥{item.price}</div>}
            />
          </Card>
        ))}
      </Flex>
    </div>
  );
}
