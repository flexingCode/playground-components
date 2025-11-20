import { BrowserRouter, Route, Routes } from "react-router";
import DataTableScreen from "../pages/DataTableScreen/page";
import FormBuilderScreen from "../pages/FormBuilderScreen/page";
import InfinityScrollScreen from "../pages/InfinityScrollScreen/page";
import MultistepScreen from "../pages/MultistepScreen/page";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<DataTableScreen />} />
            <Route path="/form-builder" element={<FormBuilderScreen />} />
            <Route path="/infinity-scroll" element={<InfinityScrollScreen />} />
            <Route path="/multistep" element={<MultistepScreen />} />
        </Routes>
    </BrowserRouter>
  )
};

export default Router;