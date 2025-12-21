import React from 'react'

export default function UpdateModal() {
  return (
    <div>
        <div className="modal-box">
      <h3 className="font-bold text-lg text-pink-600">
        Update Product
      </h3>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const updated = {
            name: e.target.name.value,
            price: Number(e.target.price.value),
            paymentOption: e.target.paymentOption.value,
          };

          await axiosSecure.patch(
            `/products/${selectedProduct._id}`,
            updated
          );

          setProducts(prev =>
            prev.map(p =>
              p._id === selectedProduct._id
                ? { ...p, ...updated }
                : p
            )
          );

          setSelectedProduct(null);
          showSuccess("Product updated");
        }}
        className="space-y-3 mt-4"
      >
        <input
          name="name"
          defaultValue={selectedProduct.name}
          className="input input-bordered w-full"
        />

        <input
          name="price"
          type="number"
          defaultValue={selectedProduct.price}
          className="input input-bordered w-full"
        />

        <select
          name="paymentOption"
          defaultValue={selectedProduct.paymentOption}
          className="select select-bordered w-full"
        >
          <option>Cash on Delivery</option>
          <option>PayFirst</option>
        </select>

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setSelectedProduct(null)}
          >
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}
