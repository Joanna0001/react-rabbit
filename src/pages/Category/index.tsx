import { Banner } from '@/components/Banner';
import { Breadcrumb, Flex } from 'antd';
import { useCategoryByIdQuery } from '@/hooks/useCategory';
import { useBreadcrumbStore } from '@/store/useBreadcrumb';
import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { LazyImage } from '@/components/LazyImage';

export function Category() {
  const { breadcrumb } = useBreadcrumbStore();
  const { id } = useParams<{ id: string }>();
  const { data: categoryData } = useCategoryByIdQuery(id!);
  const titleClassNames = 'text-[28px] h-25 leading-25 text-center text-[#666]';

  return (
    <div className="px-(--padding-x)">
      <Breadcrumb separator=">" items={breadcrumb} style={{ padding: '25px 0' }} />
      <Banner distributionSite={2} />

      <div className="bg-white my-5 pb-5">
        <h3 className={titleClassNames}>全部分类</h3>
        <Flex wrap style={{ padding: '0 32px' }} justify="space-around">
          {categoryData?.children.map(item => (
            <div key={item.id} className="px-8 cursor-pointer hover:text-(--primary-color)">
              <LazyImage src={item.picture} width={100} height={100} alt={item.name} preview={false} />
              <div className="text-center text-base color-[#333] leading-8">{item.name}</div>
            </div>
          ))}
        </Flex>
      </div>

      {categoryData?.children.map(item => (
        <div key={item.id} className="bg-white mb-5">
          <h3 className={titleClassNames}>- {item.name} -</h3>
          <Flex wrap justify="space-around" style={{ padding: '0 40px 30px' }}>
            {item.goods?.map(goods => (
              <ProductCard key={goods.id} {...goods} />
            ))}
          </Flex>
        </div>
      ))}
    </div>
  );
}
