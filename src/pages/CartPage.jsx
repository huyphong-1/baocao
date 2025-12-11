import { useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext"; // Đảm bảo import đúng CartContext
import { useState, useEffect } from "react"; // Import useState và useEffect

const formatPrice = (number) =>
  number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  // Kiểm tra giỏ hàng có sản phẩm hay không
  useEffect(() => {
    if (items.length === 0) {
      // Nếu giỏ hàng trống, điều hướng về trang sản phẩm
      navigate("/phones");
    }
  }, [items, navigate]);

  if (items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-white">
          Giỏ hàng của bạn
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Hiện chưa có sản phẩm nào trong giỏ hàng.
        </p>
        <button
          onClick={() => navigate("/phones")}
          className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-sm font-semibold transition"
        >
          Bắt đầu mua sắm 📱
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 md:py-12">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
        Giỏ hàng của bạn
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-lg">
            <div className="hidden sm:grid grid-cols-5 gap-4 p-4 border-b border-gray-800">
              <h2 className="col-span-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">Sản phẩm</h2>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center">Số lượng</h2>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Giá</h2>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-right">Tổng</h2>
            </div>

            {/* Danh sách sản phẩm trong giỏ */}
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center p-4 border-b border-gray-800">
                <div className="col-span-2 flex items-center space-x-4">
                  <img
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md bg-gray-800"
                    src={item.image}
                  />
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-slate-400">Màu: {item.color || 'Mặc định'}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="sm:hidden text-xs text-red-400 mt-1"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center border border-gray-700 rounded-full">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">remove</span>
                    </button>
                    <span className="px-3 text-sm font-medium text-gray-300">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="sm:hidden text-xs text-gray-400">Giá: </span>
                  <span className="font-medium text-gray-300">{formatPrice(item.price)}</span>
                </div>

                <div className="text-right">
                  <span className="sm:hidden text-xs text-gray-400">Tổng: </span>
                  <span className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="hidden sm:inline-block ml-4 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Xóa giỏ hàng */}
            <button
              onClick={clearCart}
              className="text-xs text-red-400 hover:text-red-300 mt-2"
            >
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-lg p-6 sticky top-28">
            <h2 className="text-xl font-bold border-b border-gray-800 pb-4 mb-4 text-white">Tóm tắt đơn hàng</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Tạm tính</span>
                <span className="font-medium text-gray-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phí vận chuyển</span>
                <span className="font-medium text-gray-200">Miễn phí</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold mt-6 pt-4 border-t border-gray-800 text-white">
              <span>Tổng cộng</span>
              <span className="text-primary">{formatPrice(cartTotal)}</span>
            </div>
            <button className="w-full bg-primary text-white font-bold py-3 rounded-full mt-6 hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <span>Tiến hành thanh toán</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
