import { create } from 'zustand';
import type { BreadcrumbProps } from 'antd';
import { persist } from 'zustand/middleware';

interface BreadcrumbStore {
  breadcrumb: BreadcrumbProps['items'];
  setBreadcrumb: (items: BreadcrumbProps['items']) => void;
  resetBreadcrumb: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>()(
  persist(
    set => ({
      breadcrumb: [{ title: '首页', href: '/' }],
      resetBreadcrumb: () => set({ breadcrumb: [{ title: '首页', href: '/' }] }),
      setBreadcrumb: items => set(state => ({ breadcrumb: [...(state.breadcrumb ?? []), ...(items ?? [])] })),
    }),
    {
      name: 'breadcrumb-storage',
    },
  ),
);
