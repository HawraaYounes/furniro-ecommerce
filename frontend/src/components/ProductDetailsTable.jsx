import React from "react";

const ProductDetailsTable = ({ data }) => {
  const { sku, category, tags } = data;

  return (
    <div className="pt-5 border-t">
      <table className="w-full text-left border-collapse">
        <tbody>
          {/* SKU Row */}
          <tr>
            <th className="p-2 ">SKU:</th>
            <td className="p-2 ">{sku}</td>
          </tr>

          {/* Category Row */}
          <tr>
            <th className="p-2 ">Category:</th>
            <td className="p-2 ">{category}</td>
          </tr>

          {/* Tags Row */}
          <tr>
            <th className="p-2 ">Tags:</th>
            <td className="p-2 ">
              {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-1 py-1 m-1"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span>No Tags</span>
              )}
            </td>
          </tr>

          {/* Share Row */}
          <tr>
            <th className="p-2">Share:</th>
            <td className="p-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 mr-4"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 mr-4"
              >
                Twitter
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                LinkedIn
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailsTable;
