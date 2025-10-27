import { Button, Flex, Table, Space, Image, Typography, type TableProps, Divider, Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { generateOrder } from '@/api/order';
import type { AddressProps, PreGoods } from '@/types/goods';
import type { GenerateOrderResponse } from '@/types/order';

const { Text } = Typography;

export function Checkout() {
  const titleClassName = 'text-base font-normal leading-17 border-b border-[#f5f5f5] mb-5';
  const addressCardClassName = 'p-5 leading-8 border border-[#f5f5f5] mb-2 mr-2 text-[#606266] cursor-pointer';
  const [currentAddress, setCurrentAddress] = useState<AddressProps | null>(null);
  const [orderInfo, setOrderInfo] = useState<GenerateOrderResponse | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<AddressProps | null>(null);
  const [showAddressList, setShowAddressList] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await generateOrder();
    const def = res.userAddresses?.find(item => item.isDefault === 0) || null;
    setCurrentAddress(def);
    setSelectedDelivery(def);
    setOrderInfo(res);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns: TableProps<PreGoods>['columns'] = [
    {
      title: '商品信息',
      key: 'name',
      render: (_, item) => (
        <Flex align="center" gap={16}>
          <Image src={item.picture} alt={item.name} width={80} height={80} preview={false} />
          <div>
            <div className="text-base line-clamp-2">{item.name}</div>
            <div className="text-[#999] mt-1 truncate">{item.attrsText}</div>
          </div>
        </Flex>
      ),
    },
    {
      title: '单价',
      key: 'price',
      render: (price: string) => <span>￥{price}</span>,
    },
    {
      title: '数量',
      key: 'count',
      render: (count: number) => <span className="text-base">x{count}</span>,
    },
    {
      title: '小计',
      key: 'totalPrice',
      render: (totalPrice: string) => <span>￥{totalPrice}</span>,
    },
    {
      title: '实付',
      key: 'totalPayPrice',
      render: (totalPayPrice: string) => <Text className="text-(--price-color)">￥{totalPayPrice}</Text>,
    },
  ];

  const RadioCard = ({ label }: { label: string }) => {
    return (
      <div className="w-55 h-12 leading-12 text-[#666] border border-[#e4e4e4] text-center cursor-pointer">{label}</div>
    );
  };

  // 切换收货地址
  const handleChangeAddress = () => {
    setShowAddressList(false);
    setCurrentAddress(selectedDelivery);
  };

  return (
    <div className="mx-(--padding-x) mb-5 px-5 bg-white">
      <h3 className={titleClassName}>收货地址</h3>

      <Flex justify="space-between" align="center" className="border border-[#f5f5f5]">
        <div className="p-5 leading-8">
          {!currentAddress ? (
            <p className="text-[#999]">您需要先添加收货地址才可提交订单。</p>
          ) : (
            <>
              <p>
                <span className="text-[#999] inline-block w-16">收货人:</span> {currentAddress.receiver}
              </p>
              <p>
                <span className="text-[#999] inline-block w-16">联系方式:</span> {currentAddress.contact}
              </p>
              <p>
                <span className="text-[#999] inline-block w-16">收货地址:</span> {currentAddress.address}
              </p>
            </>
          )}
        </div>

        <div className="w-105 text-center">
          <Button size="large" className="mr-5" onClick={() => setShowAddressList(true)}>
            切换地址
          </Button>
          <Button size="large">添加地址</Button>
        </div>
      </Flex>

      <h3 className={titleClassName}>商品信息</h3>

      <Table<PreGoods> className="bgHeaderTable" rowKey="id" dataSource={orderInfo?.goods} columns={columns} />

      <h3 className={titleClassName}>配送时间</h3>
      <Space size={20}>
        <RadioCard label="不限送货时间：周一至周日" />
        <RadioCard label="工作日送货：周一至周五" />
        <RadioCard label="双休日、假日送货：周六至周日" />
      </Space>

      <h3 className={titleClassName}>支付方式</h3>
      <Space size={20}>
        <RadioCard label="在线支付" />
        <RadioCard label="货到付款" />
        <div className="text-[#999]">货到付款需付5元手续费</div>
      </Space>

      <h3 className={titleClassName}>金额明细</h3>
      <Flex justify="flex-end">
        <div className="w-72 leading-11">
          <Flex justify="space-between">
            <div>商品件数:</div>
            <div className="mr-15">10件</div>
          </Flex>
          <Flex justify="space-between">
            <div>商品总价:</div>
            <div className="mr-15">￥100</div>
          </Flex>
          <Flex justify="space-between">
            <div>运费:</div>
            <div className="mr-15">￥10</div>
          </Flex>
          <Flex justify="space-between">
            <div>应付总额:</div>
            <div className="mr-15 text-(--price-color) text-lg">110</div>
          </Flex>
        </div>
      </Flex>
      <Divider />
      <div className="p-14 text-right">
        <Button size="large" type="primary">
          提交订单
        </Button>
      </div>

      {/* 收货地址 modal */}
      <Modal
        title="切换收货地址"
        open={showAddressList}
        onOk={handleChangeAddress}
        onCancel={() => setShowAddressList(false)}
      >
        <Divider style={{ margin: '15px 0 0 0' }} />
        <div className="max-h-130 overflow-y-auto my-2">
          {orderInfo?.userAddresses?.map(item => (
            <div
              className={`${addressCardClassName} ${selectedDelivery?.id === item.id ? 'border-(--primary-color)!' : ''}
              ${selectedDelivery?.id === item.id ? 'bg-(--primary-color)/10' : ''}`}
              onClick={() => setSelectedDelivery(item)}
            >
              <p>
                <span className="inline-block w-16">收货人:</span> {item.receiver}
              </p>
              <p>
                <span className="inline-block w-16">联系方式:</span> {item.contact}
              </p>
              <p>
                <span className="inline-block w-16">收货地址:</span> {item.address}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
