export const isLandscape = (): boolean => window.matchMedia('(orientation: landscape)').matches;

export const moveUrlPathIntoHashRoute = (): void => {
  const { pathname, search, hash } = window.location;
  if (pathname === '/' || hash) return;
  window.history.replaceState(null, '', `/${search}#${pathname}`);
};
