import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

const formatPrice = (n) =>
  Number(n || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function CheckoutPage() {
    
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });

  const shippingFee = 0;
  const grandTotal = useMemo(() => cartTotal + shippingFee, [cartTotal]);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (!form.fullName || !form.phone || !form.address) {
    alert("Điền đầy đủ thông tin giao hàng nha 😤");
    return;
  }

  if (!items?.length) {
    alert("Giỏ hàng trống rồi bro 😅");
    navigate("/phones");
    return;
  }

  try {
    setLoading(true);

    // ✅ 0) BẮT BUỘC LOGIN (Cách 2)
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr) throw userErr;

    if (!user) {
      alert("Bạn cần đăng nhập để đặt hàng nhé!");
      navigate("/login");
      return;
    }

    // ✅ 1) Insert ORDER (nhớ có user_id)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id, // 👈 DÒNG QUAN TRỌNG NHẤT cho RLS
          full_name: form.fullName,
          phone: form.phone,
          address: form.address,
          note: form.note,
          payment_method: form.paymentMethod,
          total_amount: grandTotal,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // ✅ 2) Insert ORDER ITEMS (fix cartItems -> items)
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,         // nếu DB của m là text thì ok, nếu uuid/int thì nhớ match kiểu
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // ✅ 3) Done
    clearCart();
    alert("🎉 Đặt hàng thành công!");

    // điều hướng tới trang success (nếu m có)
    navigate(`/order-success/${order.id}`);
  } catch (err) {
    console.error(err);
    alert(`❌ Có lỗi khi đặt hàng: ${err?.message || "Thử lại nhé"}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <form
          onSubmit={handlePlaceOrder}
          className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5"
        >
          <h2 className="text-xl font-semibold">Thông tin giao hàng</h2>

          <input
            name="fullName"
            placeholder="Họ và tên"
            value={form.fullName}
            onChange={onChange}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3"
          />
          <input
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={onChange}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3"
          />
          <input
            name="address"
            placeholder="Địa chỉ giao hàng"
            value={form.address}
            onChange={onChange}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3"
          />

          <textarea
            name="note"
            rows={3}
            placeholder="Ghi chú"
            value={form.note}
            onChange={onChange}
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3"
          />

          <div className="flex gap-4 text-sm">
            {["cod", "bank", "momo"].map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={m}
                  checked={form.paymentMethod === m}
                  onChange={onChange}
                />
                {m === "cod"
                  ? "COD"
                  : m === "bank"
                  ? "Chuyển khoản"
                  : "MoMo"}
              </label>
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 font-bold disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
          </button>
        </form>

        {/* SUMMARY */}
        <aside className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Đơn hàng</h2>

          <div className="space-y-3 max-h-64 overflow-auto">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between text-sm">
                <span className="line-clamp-1">
                  {it.name} × {it.quantity}
                </span>
                <span className="text-blue-400">
                  {formatPrice(it.price * it.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span className="text-blue-400">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
