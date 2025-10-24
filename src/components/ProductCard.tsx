import { LazyImage } from './LazyImage';

interface ProductCardProps {
  picture: string;
  name: string;
  desc: string;
  price: string;
  openProductDetail: () => void;
}

export function ProductCard({ picture, name, desc, price, openProductDetail }: ProductCardProps) {
  const cardClassNames =
    'p-[20px_30px] w-55 cursor-pointer hover:shadow-(--shadow) hover:-translate-y-[3px] transition-all duration-300';

  return (
    <div className={cardClassNames} onClick={openProductDetail}>
      <LazyImage src={picture} width={160} height={160} alt={name} preview={false} />
      <div className="text-center text-base text-[#333] mt-2.5 ellipsis">{name}</div>
      <div className="text-center text-sm text-[#999]  my-2.5 ellipsis">{desc}</div>
      <div className="text-center text-xl text-(--price-color)">￥{price}</div>
    </div>
  );
}
