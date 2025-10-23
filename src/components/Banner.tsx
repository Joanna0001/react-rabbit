import { useBannerQuery } from '@/hooks/useHome';
import { Carousel, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
export function Banner({ distributionSite = 1 }: { distributionSite?: number }) {
  const { data: bannerList } = useBannerQuery(distributionSite);
  const navigate = useNavigate();
  const [hasArrow, setHasArrow] = useState(false);

  return (
    <div onMouseEnter={() => setHasArrow(true)} onMouseLeave={() => setHasArrow(false)}>
      <Carousel autoplay arrows={hasArrow}>
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
    </div>
  );
}
