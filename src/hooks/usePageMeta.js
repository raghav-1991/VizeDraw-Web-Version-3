import { useEffect } from 'react';

export default function usePageMeta(page) {
  useEffect(() => {
    document.title = page ? page.title : 'Page not available | VizeDraw';
    const meta = document.querySelector('meta[name="description"]');
    if (meta && page) meta.setAttribute('content', page.description);
  }, [page]);
}
