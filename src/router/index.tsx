import { createBrowserRouter, RouterProvider } from "react-router";
import DataTableScreen from "@pages/DataTableScreen/page";
import FormBuilderScreen from "@pages/FormBuilderScreen/page";
import InfinityScrollScreen from "@pages/InfinityScrollScreen/page";
import MultistepScreen from "@pages/MultistepScreen/page";
import MainLayout from "@layouts/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DataTableScreen />,
        handle: { title: "Data Table" },
      },
      {
        path: "/form-builder",
        element: <FormBuilderScreen />,
        handle: { title: "Form Builder" },
      },
      {
        path: "/infinity-scroll",
        element: <InfinityScrollScreen />,
        handle: { title: "Infinity Scroll" },
      },
      {
        path: "/multistep",
        element: <MultistepScreen />,
        handle: { title: "Multistep Form" },
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;