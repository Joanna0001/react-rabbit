import { Flex, Image, Typography, Space, Button, InputNumber, Divider, message } from 'antd';
import { LazyImage } from '@/components/LazyImage';
import { useState, useEffect } from 'react';
import styles from './GoodsInfo.module.css';
import type { GoodsInfoResponse, SkuProps } from '@/types/goods';
import { addCart } from '@/api/cart';

const { Text } = Typography;

export function GoodsInfo({ data }: { data: GoodsInfoResponse }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [mainPicture, setMainPicture] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  // 选中的规格 {规格名: 规格值}
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  // 当前选中的 SKU
  const [currentSku, setCurrentSku] = useState<SkuProps | null>(null);

  useEffect(() => {
    if (data?.mainPictures?.[0]) {
      setMainPicture(data.mainPictures[0]);
    }
  }, [data]);

  // 根据选中的规格找到对应的 SKU
  useEffect(() => {
    if (!data?.skus || Object.keys(selectedSpecs).length === 0) {
      return;
    }

    // 检查是否所有规格都已选择
    const allSpecsSelected = data.specs.every(spec => selectedSpecs[spec.name]);

    if (allSpecsSelected) {
      // 查找匹配的 SKU
      const matchedSku = data.skus.find(sku => {
        return sku.specs.every(skuSpec => {
          return selectedSpecs[skuSpec.name] === skuSpec.valueName;
        });
      });

      if (matchedSku) {
        setCurrentSku(matchedSku);
        // 更新主图
        if (matchedSku.picture) setMainPicture(matchedSku.picture);
      } else {
        setCurrentSku(null);
      }
    } else {
      setCurrentSku(null);
    }
  }, [selectedSpecs, data]);

  // 获取当前库存
  const getCurrentInventory = () => {
    return currentSku?.inventory || data?.inventory;
  };

  // 加入购物车
  const handleAddToCart = async () => {
    // 检查是否有规格且是否全部选择
    if (data?.specs && data.specs.length > 0 && !currentSku) return messageApi.warning('请选择完整的商品规格');
    // 检查库存
    if (count > getCurrentInventory()) return messageApi.warning('商品库存不足');

    // 调用购物车的 API
    if (!currentSku?.id) return;
    await addCart(currentSku.id, count);
    messageApi.success('加入购物车成功');
  };

  return (
    <Flex style={{ marginBottom: '20px', backgroundColor: '#fff' }}>
      {contextHolder}
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
        <h3 className="text-[22px]">{data?.name}</h3>
        <p className="mt-2.5 text-sm text-[#999]">{data?.desc}</p>
        <p className="mt-2.5 text-[22px] text-(--price-color)">
          <span className="text-sm">￥</span>
          {currentSku?.price || data?.price}
          <Text delete style={{ fontSize: '14px', color: '#999', marginLeft: '8px' }}>
            ￥{currentSku?.oldPrice || data?.oldPrice}
          </Text>
          {currentSku && <span className="ml-2 text-sm text-[#999]">库存：{getCurrentInventory()}</span>}
        </p>
        <div className="bg-[#f5f5f5] w-125 p-[20px_10px] mt-2.5 mb-4 text-sm text-[#666]">
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
          <Flex key={item.id} style={{ marginTop: '5px' }}>
            <div className="w-12.5 shrink-0 text-[#999]">{item.name}</div>
            <Flex wrap>
              {item.values.map(value => {
                // 检查规格是否被选中
                const isSelected = selectedSpecs[item.name] === value.name;
                return (
                  <div
                    key={value.name}
                    onClick={() =>
                      setSelectedSpecs(prev => {
                        if (prev[item.name] === value.name) {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          const { [item.name]: _, ...rest } = prev;
                          return rest;
                        }
                        return { ...prev, [item.name]: value.name };
                      })
                    }
                    className={`text-[#666] border h-8 leading-8 px-5 mr-3 mb-3 cursor-pointer
                      hover:border-(--primary-color) transition-colors
                      ${
                        isSelected ? 'border-(--primary-color) text-(--primary-color) bg-[#e9f2f9]' : 'border-[#e4e4e4]'
                      }`}
                  >
                    {value.picture && (
                      <Image
                        src={value.picture}
                        alt={value.name}
                        width={24}
                        height={24}
                        preview={false}
                        style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }}
                      />
                    )}
                    <span style={{ verticalAlign: 'middle' }}>{value.name}</span>
                  </div>
                );
              })}
            </Flex>
          </Flex>
        ))}

        <div className="mt-2 mb-4">
          <span className="text-[#999] mr-2">数量</span>
          <InputNumber
            addonBefore="+"
            addonAfter="-"
            value={count}
            min={1}
            max={getCurrentInventory()}
            style={{ width: 150 }}
            className={styles.centeredInputNumber}
            onChange={value => setCount(value ?? 1)}
          />
        </div>
        <Button
          size="large"
          style={{ color: '#606266' }}
          onClick={handleAddToCart}
          disabled={!currentSku && data?.specs && data.specs.length > 0}
        >
          加入购物车
        </Button>
      </div>
    </Flex>
  );
}
