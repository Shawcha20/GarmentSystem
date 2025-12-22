import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showConfirm, showSuccess } from "../../Utils/Notification";

export default function AdminAllProducts() {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axiosSecure.get("/admin/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    const confirm = await showConfirm("Delete this product?");
    if (!confirm.isConfirmed) return;

    await axiosSecure.delete(`/admin/products/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id));
    showSuccess("Product deleted");
  };

  const toggleHome = async (id, value) => {
    await axiosSecure.patch(`/admin/products/home/${id}`, {
      showOnHome: value,
    });

    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, showOnHome: value } : p))
    );
  };

  const handleUpdate = async () => {
    console.log(selected);
    await axiosSecure.patch(`/admin/products/${selected._id}`, selected);
    setProducts((prev) =>
      prev.map((p) => (p._id === selected._id ? selected : p))
    );
    showSuccess("Product updated");
    setSelected(null);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        All Products ({products.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead className="bg-pink-100">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.images} className="w-14 h-14 rounded" />
                </td>
                <td>{p.name}</td>
                <td>৳{p.price}</td>
                <td>{p.category}</td>
                <td>{p.created_by}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={p.showOnHome}
                    onChange={(e) => toggleHome(p._id, e.target.checked)}
                    className="toggle toggle-success"
                  />
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelected(p)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE MODAL */}
      {selected && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-xl mb-4 text-pink-600">
              Update Product
            </h3>

            {/* PRODUCT NAME */}
            <input
              className="input input-bordered w-full mb-3"
              value={selected.name}
              onChange={(e) =>
                setSelected({ ...selected, name: e.target.value })
              }
              placeholder="Product Name"
            />

            {/* DESCRIPTION */}
            <textarea
              className="textarea textarea-bordered w-full mb-3"
              rows="3"
              value={selected.description}
              onChange={(e) =>
                setSelected({ ...selected, description: e.target.value })
              }
              placeholder="Product Description"
            />

            {/* PRICE */}
            <input
              type="number"
              className="input input-bordered w-full mb-3"
              value={selected.price}
              onChange={(e) =>
                setSelected({ ...selected, price: Number(e.target.value) })
              }
              placeholder="Price"
            />

            {/* CATEGORY */}
            <select
              className="select select-bordered w-full mb-3"
              value={selected.category}
              onChange={(e) =>
                setSelected({ ...selected, category: e.target.value })
              }
            >
              <option>Shirt</option>
              <option>Pant</option>
              <option>Jacket</option>
              <option>Accessories</option>
              <option>Bridal</option>
            </select>

            {/* IMAGES (comma separated URLs) */}
            <input
              className="input input-bordered w-full mb-3"
              value={selected.images}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  images: e.target.value,
                })
              }
              placeholder="Image URLs (comma separated)"
            />

            {/* DEMO VIDEO */}
            <input
              className="input input-bordered w-full mb-3"
              value={selected.demoVideo || ""}
              onChange={(e) =>
                setSelected({ ...selected, demoVideo: e.target.value })
              }
              placeholder="Demo Video URL (optional)"
            />

            {/* PAYMENT OPTION */}
            <select
              className="select select-bordered w-full mb-4"
              value={selected.paymentOption}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  paymentOption: e.target.value,
                })
              }
            >
              <option value="CashOnDelivery">Cash on Delivery</option>
              <option value="PayFirst">PayFirst</option>
            </select>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setSelected(null)}
              >
                Cancel
              </button>

              <button
                className="btn bg-pink-500 text-white"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
