import { Tabs, type TabsProps, Flex, Spin, Empty } from 'antd';
import { useInfiniteGoodsByCategoryIdQuery } from '@/hooks/useCategory';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export function Sub() {
  const [activeTab, setActiveTab] = useState<string>('publishTime');

  const items: TabsProps['items'] = [
    {
      key: 'publishTime',
      label: '最新商品',
      children: <ProductList sortField="publishTime" />,
    },
    {
      key: 'orderNum',
      label: '最高人气',
      children: <ProductList sortField="orderNum" />,
    },
    {
      key: 'evaluateNum',
      label: '评论最多',
      children: <ProductList sortField="evaluateNum" />,
    },
  ];
  return (
    <div className="mx-(--padding-x) mb-5 px-3 py-5 bg-white">
      <Tabs items={items} activeKey={activeTab} onChange={setActiveTab} />
    </div>
  );
}

function ProductList({ sortField }: { sortField: string }) {
  const { id } = useParams<{ id: string }>();
  const [pageSize] = useState(20);

  const { items, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteGoodsByCategoryIdQuery({
    categoryId: id!,
    sortField,
    pageSize,
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const { sentinelRef } = useInfiniteScroll({ onLoadMore: handleLoadMore, enabled: !!hasNextPage });

  return (
    <div>
      <Flex wrap justify="space-around">
        {items.map(good => (
          <ProductCard key={good.id} {...good} openProductDetail={() => {}} />
        ))}
      </Flex>
      <div ref={sentinelRef} />
      <div className="py-4 text-center">
        {isFetchingNextPage && <Spin />}
        {!hasNextPage && items.length > 0 && <div className="text-[#999]">没有更多了</div>}
        {items.length === 0 && <Empty description="暂无商品" />}
      </div>
    </div>
  );
}
