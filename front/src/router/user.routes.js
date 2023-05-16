import { Layout, Home, Statistics, UserPreferences, Help } from "@/views/user";

export default {
  path: "/",
  component: Layout,
  children: [
    { path: "/overview", component: Home },
    { path: "/statistics", component: Statistics },
    { path: "/help/:id", component: Help },
    { path: "/preferences", component: UserPreferences },
    { path: "", redirect: "/overview" },
  ],
};
