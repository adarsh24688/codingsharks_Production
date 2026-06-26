import { Fraunces } from "next/font/google";
import { BlogHeader, BlogFooter } from "@/components/layout/blog-chrome";

// Elegant editorial serif — scoped to the blog DETAIL microsite only.
const fraunces = Fraunces({
  variable: "--font-blog-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function BlogDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} blog-microsite min-h-dvh`}>
      <BlogHeader />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}
