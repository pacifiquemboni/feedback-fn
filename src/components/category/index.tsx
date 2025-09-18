
import { useEffect, useState } from "react";

import SubCategoryForm from "./subcategory";
import CategoryForm from "./category";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchCategory } from "../../redux/actions/category";

const CategoryIndex = () => {
  // const { t } = useTranslation();
  const [isCategory, setCategory] = useState(true)
  const [isSubCategory, setSubCategory] = useState(false)
  const dispatch: AppDispatch = useDispatch();
 useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const OpenCategory = (() => {
    setCategory(true)
    setSubCategory(false)
  })
  const OpenSubCategory = (() => {
    setCategory(false)
    setSubCategory(true)
  })
 
  return (
    <div className="py-5">
      <div className="text-white flex cursor-pointer ">
        <div onClick={OpenCategory} className={`p-3 ${isCategory ? "text-grey border-b-4 border-white" : ""}`}>Category</div>
        <div onClick={OpenSubCategory} className={`p-3 ${isSubCategory ? " text-grey border-b-4 border-white" : ""}`}>SubCategory</div>
      </div>
      <hr className="border border-white"/>
      {
        isCategory && (
          <div>
            <CategoryForm />
            
          </div>
        )}
      {
        isSubCategory && (

          <div className=" flex flex-col items-center">

            <SubCategoryForm />
           
          </div>



        )
      }

    </div>
  );
};

export default CategoryIndex;
