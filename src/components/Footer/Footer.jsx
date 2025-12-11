export default function Footer() {
  return (
    <footer id="support" className="py-8 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-xs text-slate-300">
        <div className="md:col-span-2">
          <p className="font-semibold text-sm mb-2">TechPhone Store</p>
          <p>
            Chuyên điện thoại, tablet, phụ kiện chính hãng. Hỗ trợ sinh viên, trả góp 0%, ship nhanh
            nội thành.
          </p>
        </div>

        <div>
          <p className="font-semibold text-sm mb-2">Hỗ trợ khách hàng</p>
          <ul className="space-y-1">
            <li>Hotline: 1900 9999</li>
            <li>Zalo CSKH: 09xx xxx xxx</li>
            <li>Đổi trả &amp; bảo hành</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-sm mb-2">Kết nối</p>
          <ul className="space-y-1">
            <li>Facebook Fanpage</li>
            <li>TikTok Shop</li>
            <li>Shopee / Lazada</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-4 border-t border-slate-800 pt-4 text-[11px] text-slate-500 flex flex-wrap justify-between gap-2">
        <p>© {new Date().getFullYear()} TechPhone. All rights reserved.</p>
        <p>Made for practice by Zeus 🎧</p>
      </div>
    </footer>
  );
}
