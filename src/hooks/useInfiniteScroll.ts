import { useEffect, useRef } from 'react';

// useInfiniteScroll
// 通过浏览器的 IntersectionObserver 监听“哨兵”元素是否进入视口，
// 当进入视口时触发 onLoadMore，用于实现列表的滚动加载。

type UseInfiniteScrollOptions = {
  onLoadMore: () => void;
  enabled?: boolean;
  // root: 作为可视区域判定的滚动容器，默认是浏览器视窗（null）
  root?: Element | Document | null;
  // rootMargin: 预加载阈值（例如 '200px' 表示在底部前 200px 即触发）
  rootMargin?: string;
  // threshold: 触发比例（0~1），0 表示元素刚出现就触发，1 表示完全出现才触发
  threshold?: number;
};

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
  const { onLoadMore, enabled = true, root = null, rootMargin = '200px', threshold = 0 } = options;
  // 作为“哨兵”的占位元素，放在列表底部用于被观察
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const node = sentinelRef.current;
    if (!node) return;

    // 创建观察器：当哨兵进入可视区域（满足阈值）时，调用 onLoadMore 拉取下一页
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          onLoadMore();
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    // 组件卸载或依赖变化时断开观察，避免内存泄漏
    return () => observer.disconnect();
  }, [enabled, onLoadMore, root, rootMargin, threshold]);

  return { sentinelRef };
}
