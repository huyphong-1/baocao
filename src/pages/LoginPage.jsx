import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      if (mode === "login") {
        await signIn(form.email, form.password);
        navigate(from, { replace: true });
      } else {
        const data = await signUp(form.email, form.password);

        // Nếu Supabase không yêu cầu confirm email, thường sẽ có session luôn
        if (data?.session) {
          navigate("/", { replace: true });
        } else {
          setInfo(
            "Đăng ký thành công. Vui lòng kiểm tra email để xác nhận tài khoản rồi quay lại đăng nhập."
          );
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-xl font-bold mb-4 text-center">
        {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4"
      >
        <input
          type="email"
          required
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm outline-none"
        />

        <input
          type="password"
          required
          name="password"
          placeholder="Mật khẩu (tối thiểu 6 ký tự)"
          minLength={6}
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm outline-none"
        />

        {error && (
          <p className="text-xs text-red-400 bg-red-950/40 border border-red-800 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {info && (
          <p className="text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-800 px-3 py-2 rounded-lg">
            {info}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 font-medium text-sm transition disabled:opacity-60"
        >
          {loading
            ? "Đang xử lý..."
            : mode === "login"
            ? "Đăng nhập"
            : "Đăng ký"}
        </button>

        <p className="text-center text-xs text-slate-400">
          {mode === "login" ? (
            <>
              Chưa có tài khoản?
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                  setInfo("");
                }}
                className="text-blue-400 ml-1"
              >
                Đăng ký
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setInfo("");
                }}
                className="text-blue-400 ml-1"
              >
                Đăng nhập
              </button>
            </>
          )}
        </p>
      </form>
    </main>
  );
}
