import React from "react";

const ProductDetailsTable = ({ data }) => {
  const { sku, category, tags } = data;

  return (
    <div className="pt-10 border-t">
      {/* Table for larger screens */}
      <table className="w-full text-left border-collapse hidden md:table">
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
                    className="inline-block px-2 py-1 m-1 bg-gray-200 rounded"
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

      {/* Responsive card view for smaller screens */}
      <div className="md:hidden flex flex-col gap-3">
        <div>
          <strong>SKU:</strong> <span>{sku}</span>
        </div>
        <div>
          <strong>Category:</strong> <span>{category}</span>
        </div>
        <div>
          <strong>Tags:</strong>{" "}
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 m-1 bg-gray-200 rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <span>No Tags</span>
          )}
        </div>
        <div>
          <strong>Share:</strong>{" "}
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTable;
