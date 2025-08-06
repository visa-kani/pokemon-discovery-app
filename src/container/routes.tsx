import { lazy, Suspense } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./layout";
import { Loader } from "../component/loader";
const DiscoverPokemon = lazy(() => import("../pages/pokemon"));
const MyCollections = lazy(() => import("../pages/my-collections"));

// Root route
const rootRoute: any = createRootRoute({
  component: Layout,
});

const discover = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover-pokemon",
  component: () => (
    <Suspense fallback={<Loader />}>
      <DiscoverPokemon />
    </Suspense>
  ),
});

const myCollections = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-collections",
  component: () => (
    <Suspense fallback={<Loader />}>
      <MyCollections />
    </Suspense>
  ),
});

// Create route tree
const routeTree = rootRoute.addChildren([discover, myCollections]);

// Create and export router
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {},
});
