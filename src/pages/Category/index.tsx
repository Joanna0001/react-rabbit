import { Banner } from '@/components/Banner';
import { Flex } from 'antd';
import { useCategoryByIdQuery } from '@/hooks/useCategory';
import { useParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { LazyImage } from '@/components/LazyImage';
import { useNavigate, useLocation } from 'react-router-dom';

export function Category() {
  const { id } = useParams<{ id: string }>();
  const { data: categoryData } = useCategoryByIdQuery(id!);
  const titleClassNames = 'text-[28px] h-25 leading-25 text-center text-[#666]';
  const navigate = useNavigate();
  const location = useLocation();

  const openProductDetail = (id: string, name: string) => {
    const state = (location.state || {}) as { categoryId?: string; categoryName?: string };
    navigate(`/category/sub/${id}`, { state: { ...state, categoryId: id, categoryName: name } });
  };

  return (
    <div className="px-(--padding-x)">
      {/* 面包屑已在 MainLayout 统一渲染 */}
      <Banner distributionSite={2} />

      <div className="bg-white my-5 pb-5">
        <h3 className={titleClassNames}>全部分类</h3>
        <Flex wrap style={{ padding: '0 32px' }} justify="space-around">
          {categoryData?.children.map(item => (
            <div key={item.id} className="px-8 cursor-pointer hover:text-(--primary-color)">
              <LazyImage src={item.picture} width={100} height={100} alt={item.name} preview={false} />
              <div className="text-center text-base leading-8">{item.name}</div>
            </div>
          ))}
        </Flex>
      </div>

      {categoryData?.children.map(item => (
        <div key={item.id} className="bg-white mb-5">
          <h3 className={titleClassNames}>- {item.name} -</h3>
          <Flex wrap justify="space-around" style={{ padding: '0 40px 30px' }}>
            {item.goods?.map(goods => (
              <ProductCard key={goods.id} {...goods} openProductDetail={() => openProductDetail(item.id, item.name)} />
            ))}
          </Flex>
        </div>
      ))}
    </div>
  );
}
