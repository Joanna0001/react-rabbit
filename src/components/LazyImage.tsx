import { Image, type ImageProps } from 'antd';
import { useEffect, useRef, useState } from 'react';

export function LazyImage(props: ImageProps) {
  const [load, setLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(item => {
          if (item.isIntersecting) {
            setLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '0px 0px 200px 0px',
      },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} style={{ lineHeight: 0 }}>
      {load ? <Image {...props} /> : <div style={{ width: props.width, height: props.height }} />}
    </div>
  );
}
