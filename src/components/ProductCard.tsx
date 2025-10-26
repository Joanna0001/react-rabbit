import { LazyImage } from './LazyImage';

interface ProductCardProps {
  picture: string;
  name: string;
  desc: string;
  price: string;
  openProductDetail: () => void;
  width?: string;
  isShadow?: boolean;
}

export function ProductCard({
  picture,
  name,
  desc,
  price,
  openProductDetail,
  width = 'w-55',
  isShadow = true,
}: ProductCardProps) {
  const cardClassNames = `p-[20px_30px] ${width} cursor-pointer ${isShadow ? 'hover:shadow-(--shadow) hover:-translate-y-[3px] transition-all duration-300' : ''}`;

  return (
    <div className={cardClassNames} onClick={openProductDetail}>
      <LazyImage src={picture} width="100%" alt={name} preview={false} />
      <div className="text-center text-base mt-2.5 ellipsis">{name}</div>
      <div className="text-center text-sm text-[#999]  my-2.5 ellipsis">{desc}</div>
      <div className="text-center text-xl text-(--price-color)">￥{price}</div>
    </div>
  );
}
