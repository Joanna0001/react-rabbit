import { useBannerQuery } from '@/hooks/useHome';
import { Carousel, Image, Flex, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCategoryQuery } from '@/hooks/useCategory';
import styles from './Banner.module.css';
import { useState } from 'react';
import type { categoryResponse } from '@/types/category';

export function Banner() {
  const { data: bannerList } = useBannerQuery();
  const { data: categoryList } = useCategoryQuery();
  const navigate = useNavigate();
  const [showCategoryMask, setShowCategoryMask] = useState(false);

  const handleShowCategoryMask = (item: categoryResponse) => {
    console.log('item', item);
    setShowCategoryMask(true);
  };

  return (
    <div className={styles.bannerWrapper}>
      <Carousel autoplay>
        {bannerList?.map(banner => (
          <Image
            width={1240}
            height={500}
            key={banner.id}
            src={banner.imgUrl}
            preview={false}
            onClick={() => navigate(banner.hrefUrl)}
          />
        ))}
      </Carousel>

      <Flex vertical className={styles.category}>
        {categoryList?.map(item => (
          <Space
            key={item.id}
            className={styles.categoryRow}
            size={12}
            onMouseEnter={() => handleShowCategoryMask(item)}
            onMouseLeave={() => setShowCategoryMask(false)}
          >
            <span>{item.name}</span>
            <span>{item?.children?.length ? item?.children?.[0]?.name : null}</span>
            <span>{item?.children?.length && item?.children?.length > 1 ? item?.children?.[1]?.name : null}</span>
          </Space>
        ))}
      </Flex>

      <div className={`${styles.categoryMask} ${showCategoryMask ? styles.show : ''}`}>
        <div>
          分类推荐<span>根据您的购买或浏览记录推荐</span>
        </div>

        <Card>
          <Card.Grid></Card.Grid>
        </Card>
      </div>
    </div>
  );
}
