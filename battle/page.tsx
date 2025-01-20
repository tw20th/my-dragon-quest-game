"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Character {
  name: string;
  hp: number;
  attack: number;
  dropItem?: string; // ドロップアイテム
}

const BattlePage = () => {
  const router = useRouter();

  const enemies: Character[] = [
    { name: "Slime", hp: 50, attack: 10, dropItem: "Slime Gel" },
    { name: "Goblin", hp: 80, attack: 15, dropItem: "Goblin Dagger" },
    { name: "Dragon", hp: 150, attack: 25, dropItem: "Dragon Scale" },
  ];

  const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

  const [player, setPlayer] = useState<
    Character & { level: number; exp: number }
  >({
    name: "Hero",
    hp: 100,
    attack: 20,
    level: 1, // 初期レベル
    exp: 0, // 初期経験値
  });

  const [enemy, setEnemy] = useState<Character>(randomEnemy);
  const [log, setLog] = useState<string[]>([]);

  const attackEnemy = () => {
    const damage = player.attack;
    const updatedEnemyHp = Math.max(enemy.hp - damage, 0);

    setEnemy((prev) => ({ ...prev, hp: updatedEnemyHp }));
    setLog((prev) => [
      ...prev,
      `You attacked ${enemy.name} for ${damage} damage.`,
    ]);

    if (updatedEnemyHp <= 0) {
      const expGained = 10; // 経験値を固定値で加算（後で動的に変更可能）
      setLog((prev) => [
        ...prev,
        `${enemy.name} is defeated!`,
        `You obtained ${enemy.dropItem} and earned ${expGained} EXP!`,
      ]);

      // 経験値を加算
      setPlayer((prev) => {
        const expGained = 10; // 獲得する経験値（固定値）
        const newExp = prev.exp + expGained; // 新しい経験値
        const levelUpThreshold = prev.level * 20; // レベルアップに必要な経験値

        if (newExp >= levelUpThreshold) {
          // レベルアップ処理
          setLog((prevLog) => [
            ...prevLog,
            `You leveled up to Level ${prev.level + 1}!`,
          ]);
          return {
            ...prev,
            exp: newExp - levelUpThreshold, // 必要経験値を差し引く
            level: prev.level + 1, // レベルを1上げる
            hp: prev.hp + 20, // HPを増加
            attack: prev.attack + 5, // 攻撃力を増加
          };
        }

        // レベルアップしない場合は経験値を更新
        return { ...prev, exp: newExp };
      });
      return;
    }

    setTimeout(() => enemyAttack(), 1000);
  };

  const enemyAttack = () => {
    const damage = enemy.attack;
    const updatedPlayerHp = Math.max(player.hp - damage, 0);

    setPlayer((prev) => ({ ...prev, hp: updatedPlayerHp }));
    setLog((prev) => [
      ...prev,
      `${enemy.name} attacked you for ${damage} damage.`,
    ]);

    if (updatedPlayerHp <= 0) {
      setLog((prev) => [...prev, `You are defeated! Game Over.`]);
    }
  };

  const endBattle = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Battle!</h1>

      <div className="flex justify-between w-full max-w-md mb-6">
        <div className="text-center">
          <h2 className="text-lg font-bold">{player.name}</h2>
          <p>HP: {player.hp}</p>
          <p>Level: {player.level}</p>
          <p>EXP: {player.exp}</p>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold">{enemy.name}</h2>{" "}
          {/* 修正: 敵の名前を表示 */}
          <p>HP: {enemy.hp}</p>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={attackEnemy}
          disabled={player.hp <= 0 || enemy.hp <= 0}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Attack
        </button>
        <button
          onClick={endBattle}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Run
        </button>
      </div>

      <div className="w-full max-w-md bg-gray-800 text-white p-4 rounded overflow-y-auto h-40">
        {log.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
    </div>
  );
};

export default BattlePage;
