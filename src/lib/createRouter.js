import { BASE_URL } from "./config";
import { createObserver } from "./createObserver";

export const createRouter = (routes) => {
  const { subscribe, notify } = createObserver();

  const getPath = () => window.location.pathname.replace(BASE_URL, "/");

  const getTarget = () => routes[getPath()];

  const push = (path) => {
    window.history.pushState(
      null,
      "",
      `${BASE_URL.replace(/\/+$/, "")}${path}`,
    );
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
