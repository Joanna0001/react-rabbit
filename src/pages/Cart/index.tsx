import { Table } from 'antd';
import { useCart } from '@/hooks/useCart';

export function Cart() {
  const { data: cartData } = useCart();
  const columns = [
    {
      title: '商品信息',
    },
    {
      title: '单价',
    },
    {
      title: '数量',
    },
    {
      title: '小计',
    },
    {
      title: '操作',
    },
  ];

  return (
    <div className="mx-(--padding-x)">
      <Table dataSource={cartData} columns={columns} />
    </div>
  );
}
