import { createObserver } from "./createObserver";

const baseUrl = import.meta.env.VITE_BASE_URL;
const removeBaseUrl = (path) => path.replace(baseUrl, "/");

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => removeBaseUrl(window.location.pathname);

  const getTarget = () => routes[getPath()];

  const push = (path) => {
    window.history.pushState(null, null, removeBaseUrl(path));
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
