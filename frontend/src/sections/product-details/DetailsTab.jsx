import React, { useState } from "react";
import ProductDescriptionTab from "../../components/product-details/ProductDescriptionTab";
import ProductReviewsTab from "../../components/product-details/ProductReviewsTab";

const DetailsTab = ({product}) => {
  const tabs = [
    { id: 1, name: "Description" },
    { id: 2, name: "Reviews" },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  let content;
  currentTab==="Description"? content=<ProductDescriptionTab/>: content=<ProductReviewsTab/>
  return (
    <div className="py-9 ">
      <div className={`flex justify-center font-poppins gap-9`}>
        {tabs.map((tab) => (
          <p className={`cursor-pointer ${currentTab===tab.name?'font-medium text-black':'font-light text-gray'}`} key={tab.id} onClick={() => setCurrentTab(tab.name)}>
            {tab.name}
          </p>
        ))}
      </div>

      <div className="m-2 py-7 bg-red-300">{content}</div>
    </div>
  );
};

export default DetailsTab;
