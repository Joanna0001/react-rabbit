import { Flex, Image, Typography, Space, Button, InputNumber, Divider } from 'antd';
import { LazyImage } from '@/components/LazyImage';
import { useState, useEffect } from 'react';
import styles from './GoodsInfo.module.css';
import type { GoodsInfoResponse } from '@/types/goods';

const { Text } = Typography;

export function GoodsInfo({ data }: { data: GoodsInfoResponse }) {
  const [mainPicture, setMainPicture] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (data?.mainPictures?.[0]) {
      setMainPicture(data.mainPictures[0]);
    }
  }, [data]);

  // 修改数量
  const handleChange = (value: number | null) => {
    console.log('value', value);
    setQuantity(value ?? 1);
  };

  return (
    <Flex style={{ marginBottom: '20px', backgroundColor: '#fff' }}>
      <div className="w-145 h-150 p-[30px_50px]">
        <Flex>
          {mainPicture && <LazyImage width={400} height={400} src={mainPicture} alt={data?.name} preview={false} />}
          <Flex vertical justify="space-between">
            {data?.mainPictures?.map((picture, index) => (
              <Image
                key={index}
                width={64}
                height={64}
                preview={false}
                src={picture}
                className="ml-3 hover:border-2 hover:border-(--primary-color)"
                onMouseEnter={() => setMainPicture(picture)}
              />
            ))}
          </Flex>
        </Flex>

        <Space className="w-full mt-5" split={<Divider type="vertical" style={{ height: 80 }} />}>
          <div className="text-center">
            <p className="text-[#999]">销量人气</p>
            <p className="text-(--price-color) my-2.5">{data?.salesCount}+</p>
            <p className="text-[#666]">
              <i className="iconfont icon-task-filling text-(--primary-color) mr-1" />
              销量人气
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#999]">商品评价</p>
            <p className="text-(--price-color) my-2.5">{data?.commentCount}+</p>
            <p className="text-[#666]">
              <i className="iconfont icon-comment-filling text-(--primary-color) mr-1" />
              销量人气
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#999]">收藏人气</p>
            <p className="text-(--price-color) my-2.5">{data?.collectCount}+</p>
            <p className="text-[#666]">
              <i className="iconfont icon-favorite-filling text-(--primary-color) mr-1" />
              销量人气
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#999]">品牌信息</p>
            <p className="text-(--price-color) my-2.5 truncate">{data?.brand?.name}</p>
            <p className="text-[#666]">
              <i className="iconfont icon-dynamic-filling text-(--primary-color) mr-1" />
              销量人气
            </p>
          </div>
        </Space>
      </div>

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
        <div className="bg-[#f5f5f5] w-125 p-[20px_10px] my-2.5 text-sm text-[#666]">
          <div className="mb-5">
            <span className="w-12.5 inline-block text-[#999]">促销</span>
            <span>12月好物放送，App领券购买直降120元</span>
          </div>
          <div>
            <span className="w-12.5 inline-block text-[#999]">服务</span>
            <Space>
              <div>
                <Text type="success">•</Text>
                <span className="ml-[2px]">无忧退货</span>
              </div>
              <div>
                <Text type="success">•</Text>
                <span className="ml-[2px]">快速退款</span>
              </div>
              <div>
                <Text type="success">•</Text>
                <span className="ml-[2px]">免费包邮</span>
              </div>
              <Text type="success">了解详情</Text>
            </Space>
          </div>
        </div>

        {data?.specs.map(item => (
          <Flex key={item.id} style={{ marginTop: '20px' }}>
            <div className="w-12.5 shrink-0 text-[#999]">{item.name}</div>
            <Flex wrap>
              {item.values.map(value => (
                <div
                  key={value.name}
                  className="text-[#666] border border-[#e4e4e4] h-8 leading-8 px-5 mr-3 mb-3 cursor-pointer
                   hover:border-(--primary-color) active:border-(--primary-color)"
                >
                  {value.name}
                </div>
              ))}
            </Flex>
          </Flex>
        ))}

        <div className="mt-2 mb-4">
          <InputNumber
            addonBefore="+"
            addonAfter="-"
            value={quantity}
            min={1}
            max={10}
            style={{ width: 150 }}
            className={styles.centeredInputNumber}
            onChange={handleChange}
          />
        </div>
        <Button size="large" style={{ color: '#606266' }}>
          加入购物车
        </Button>
      </div>
    </Flex>
  );
}
