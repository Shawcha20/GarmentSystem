import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showConfirm, showError, showSuccess } from "../../Utils/Notification";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

export default function ManageProducts() {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading]=useState(true);
  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/products").then((res) => {
      console.log(res.data.data);
      setProducts(res.data.data);
      setLoading(false);
    });
  }, []);
  if(loading)return <LoadingSpinner></LoadingSpinner>
  const handleDelete = async (id) => {
    const result = await showConfirm("Delete this product?");
    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showSuccess("Product deleted");
    } catch (err) {
      console.error(err);
      showError("Failed to delete product");
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Manage Products</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered mb-4 w-full max-w-sm"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-pink-100">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.images} className="w-16 h-16 rounded" />
                </td>
                <td>{p.name}</td>
                <td>৳{p.price}</td>
                <td>{p.paymentOption}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="btn btn-sm btn-outline"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-pink-600">Update Product</h3>

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

                setProducts((prev) =>
                  prev.map((p) =>
                    p._id === selectedProduct._id ? { ...p, ...updated } : p
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
        </dialog>
      )}
    </div>
  );
}
