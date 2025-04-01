import { createObserver } from "./createObserver";

const baseUrl = import.meta.env.VITE_BASE_URL?.replace(/\/$/, "") || "";

export const removeBaseUrl = (path) =>
  path.startsWith(baseUrl) ? path.slice(baseUrl.length) || "/" : path;

export const withBaseUrl = (path) => `${baseUrl}${path === "/" ? "" : path}`;

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => removeBaseUrl(window.location.pathname);

  const getTarget = () => routes[getPath()];

  const push = (path) => {
    window.history.pushState(null, "", withBaseUrl(path));
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return {
    get path() {
      return getPath();
    },
    push,
    subscribe,
    getTarget,
  };
};
