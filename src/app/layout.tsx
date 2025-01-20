import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "ドラゴンクエスト風ゲーム",
  description: "Next.jsで作るドラクエ風の冒険ゲーム",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-800 text-white min-h-screen flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
