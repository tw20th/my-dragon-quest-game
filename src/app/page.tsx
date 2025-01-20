"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useGameStore from "./store/gameStore";
import Map from "./components/Map";

const GamePage = () => {
  const router = useRouter();

  const mapData = [
    ["grass", "grass", "water", "grass"],
    ["grass", "tree", "water", "grass"],
    ["grass", "grass", "grass", "village"],
  ];

  const playerPosition = useGameStore((state) => state.playerPosition);
  const movePlayer = useGameStore((state) => state.movePlayer);

  // キーイベントを useCallback でメモ化
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") movePlayer("up");
      if (e.key === "ArrowDown") movePlayer("down");
      if (e.key === "ArrowLeft") movePlayer("left");
      if (e.key === "ArrowRight") movePlayer("right");
    },
    [movePlayer] // 依存配列に movePlayer を追加
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">ドラクエ風ゲーム</h1>
      <Map mapData={mapData} playerPosition={playerPosition} />
      <button
        onClick={() => router.push("/battle")}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Start Battle
      </button>
    </main>
  );
};

export default GamePage;
