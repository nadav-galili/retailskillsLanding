import Link from "next/link";

const products = [
  { label: "בוט WhatsApp", href: "/whatsapp-bot" },
  { label: "דשבורדים", href: "/dashboards" },
  { label: "פורטל למידה", href: "/learning" },
  { label: "דמו חי", href: "/demo" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-elevated">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-text-primary font-bold text-lg mb-3">
              Retail-Skillz
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              הטכנולוגיה שמנהלת רשתות קמעונאיות
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-text-primary font-bold text-lg mb-3">
              מוצרים
            </h3>
            <ul className="flex flex-col gap-2">
              {products.map((product) => (
                <li key={product.href}>
                  <Link
                    href={product.href}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text-primary font-bold text-lg mb-3">
              צור קשר
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-text-secondary">
              <li>
                <a
                  href="mailto:info@retail-skillz.com"
                  className="hover:text-text-primary transition-colors"
                >
                  info@retail-skillz.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+972-00-000-0000"
                  className="hover:text-text-primary transition-colors"
                >
                  072-000-0000
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/97200000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 text-center text-text-secondary text-sm">
          &copy; 2024 Retail-Skillz. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
