import { Table, type TableColumnsType, Image, Flex, Typography, Button, Popconfirm, message } from 'antd';
import { useState, useMemo, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCart } from '@/hooks/useCart';
import { deleteCart } from '@/api/cart';
import type { Cart } from '@/types/cart';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export function Cart() {
  const queryClient = useQueryClient();
  const { data: cartData } = useCart();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultSelected = cartData?.filter(item => item.selected).map(item => item.skuId) || [];
    setSelectedRowKeys(defaultSelected);
  }, [cartData]);

  const handleDelete = async (skuId: string) => {
    await deleteCart([skuId]);
    message.success('删除成功');
    queryClient.invalidateQueries({ queryKey: ['cart'] });
  };

  const columns: TableColumnsType<Cart> = [
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
      dataIndex: 'price',
      key: 'price',
      width: 130,
      align: 'center',
      render: (price: string) => <Text className="text-(--price-color)">￥{price}</Text>,
    },
    {
      title: '数量',
      dataIndex: 'count',
      key: 'count',
      width: 130,
      align: 'center',
      render: (count: number) => <span className="text-base">x{count}</span>,
    },
    {
      title: '小计',
      key: 'subtotal',
      width: 140,
      align: 'center',
      render: (_, item) => (
        <Text style={{ color: 'var(--price-color)' }}>￥{(Number(item.price) * item.count).toFixed(2)}</Text>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, item) => (
        <Popconfirm
          title="确定删除该商品吗？"
          onConfirm={() => handleDelete(item.skuId)}
          okText="删除"
          cancelText="取消"
        >
          <Button color="primary" variant="text">
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // 选择的商品
  const selectedItems = useMemo(
    () => cartData?.filter(item => selectedRowKeys.includes(item.skuId)) || [],
    [cartData, selectedRowKeys],
  );
  // 选择的商品数量
  const totalCount = useMemo(() => selectedItems.reduce((acc, cur) => acc + cur.count, 0), [selectedItems]);
  // 选择的商品合计
  const totalAmount = useMemo(
    () => selectedItems.reduce((acc, cur) => acc + Number(cur.price) * cur.count, 0),
    [selectedItems],
  );
  // 所有商品合计数量
  const total = useMemo(() => cartData?.reduce((acc, cur) => acc + cur.count, 0), [cartData]);

  return (
    <div className="mx-(--padding-x)">
      <Table
        rowKey="skuId"
        dataSource={cartData}
        columns={columns}
        pagination={false}
        className="cartTable"
        rowSelection={{ selectedRowKeys, onChange: keys => setSelectedRowKeys(keys) }}
      />

      <Flex
        justify="space-between"
        align="center"
        style={{ margin: '20px 0', padding: '0 30px', height: 80, lineHeight: 80 }}
        className="bg-white"
      >
        <div className="text-[#666]">
          共{total}件商品, 已选择 {totalCount} 件，商品合计{totalAmount.toFixed(2)}
        </div>
        <Button type="primary" size="large" disabled={selectedItems.length === 0} onClick={() => navigate('/checkout')}>
          下单结算
        </Button>
      </Flex>
    </div>
  );
}
