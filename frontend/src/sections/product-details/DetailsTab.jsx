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
      <div className="flex">
        {tabs.map((tab) => (
          <p className="cursor-pointer p-3" key={tab.id} onClick={() => setCurrentTab(tab.name)}>
            {tab.name}
          </p>
        ))}
      </div>

      <p className="m-2 bg-red-300">{content}</p>
    </div>
  );
};

export default DetailsTab;
