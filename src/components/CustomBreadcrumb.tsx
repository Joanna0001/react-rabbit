import { Breadcrumb } from 'antd';
import { Link, useLocation, matchPath } from 'react-router-dom';

export function CustomBreadcrumb() {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const matchCategory = matchPath({ path: '/category/:id' }, location.pathname);
  const matchSub = matchPath({ path: '/category/sub/:id' }, location.pathname);

  const state = (location.state || {}) as {
    categoryId?: string;
    categoryName?: string;
    subId?: string;
    subName?: string;
  };

  const items = [] as { title: React.ReactNode }[];

  // 首页
  if (isHome) {
    items.push({ title: '首页' });
  } else {
    items.push({ title: <Link to="/">首页</Link> });
  }

  // 分类
  if (matchCategory && !matchSub) {
    items.push({ title: state.categoryName || '分类' });
  }

  // 子分类
  if (matchSub) {
    const categoryId = state.categoryId;
    const categoryName = state.categoryName || '分类';
    if (categoryId) {
      items.push({
        title: (
          <Link to={`/category/${categoryId}`} state={{ categoryId, categoryName }}>
            {categoryName}
          </Link>
        ),
      });
    } else {
      items.push({ title: categoryName });
    }
    items.push({ title: state.subName || '子分类' });
  }

  return <Breadcrumb separator=">" items={items} style={{ padding: '25px var(--padding-x)' }} />;
}
