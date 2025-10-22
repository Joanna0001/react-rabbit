import { useBannerQuery } from '@/hooks/useHome';
import { Carousel, Image, Flex, Space, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCategoryQuery } from '@/hooks/useCategory';
import styles from './Banner.module.css';
import { useState } from 'react';
import type { Goods } from '@/types/goods';

export function Banner() {
  const { data: bannerList } = useBannerQuery();
  const { data: categoryList } = useCategoryQuery();
  const navigate = useNavigate();
  const [showCategoryMask, setShowCategoryMask] = useState(false);
  const [categoryCards, setCategoryCards] = useState<Goods[]>();

  const handleShowCategoryMask = (item: Goods[]) => {
    console.log('item', item);
    setCategoryCards(item);
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
            onMouseEnter={() => handleShowCategoryMask(item?.goods)}
            onMouseLeave={() => setShowCategoryMask(false)}
          >
            <span>{item.name}</span>
            <span>{item?.children?.length ? item?.children?.[0]?.name : null}</span>
            <span>{item?.children?.length && item?.children?.length > 1 ? item?.children?.[1]?.name : null}</span>
          </Space>
        ))}
      </Flex>

      <div
        className={`${styles.categoryMask} ${showCategoryMask ? styles.show : ''}`}
        onMouseEnter={() => setShowCategoryMask(true)}
        onMouseLeave={() => setShowCategoryMask(false)}
      >
        <div>
          分类推荐<span>根据您的购买或浏览记录推荐</span>
        </div>

        <Row gutter={[20, 20]}>
          {categoryCards?.map(item => (
            <Col span={8} key={item.id}>
              <Card
                key={item.id}
                styles={{ body: { padding: 12, display: 'flex', alignItems: 'center', gap: 12 } }}
                onClick={() => navigate(`/detail/${item.id}`)}
              >
                <div>
                  <Image width={100} height={100} src={item.picture} preview={false} />
                </div>
                <div className={styles.categoryCardContent}>
                  <div>{item.desc}</div>
                  <div>{item.name}</div>
                  <div>￥{item.price}</div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* <Card>
          {categoryCards?.map(item => (

          ))}
        </Card> */}
      </div>
    </div>
  );
}
