import LoaderContext from "../Context/LoaderContext.js";
import { useContext, memo } from "react";

const Loader = () => {
  const { loader, setLoader } = useContext(LoaderContext);
  return (
    <div className={`fixed inset-0 ${loader ? "flex" : "hidden"} items-center justify-center bg-[#c3c9d573] z-[1001]`} >
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-dotted border-black border-t-transparent"></div>
    </div>
  )
}

export default memo(Loader);