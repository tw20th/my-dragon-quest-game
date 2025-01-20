import { create } from "zustand";

interface GameState {
  playerPosition: [number, number];
  movePlayer: (direction: string) => void;
}

const useGameStore = create<GameState>((set) => ({
  playerPosition: [0, 0],
  movePlayer: (direction) =>
    set((state) => {
      const [x, y] = state.playerPosition;
      switch (direction) {
        case "up":
          return { playerPosition: [Math.max(0, x - 1), y] };
        case "down":
          return { playerPosition: [Math.min(2, x + 1), y] }; // マップサイズに応じて調整
        case "left":
          return { playerPosition: [x, Math.max(0, y - 1)] };
        case "right":
          return { playerPosition: [x, Math.min(3, y + 1)] };
        default:
          return state;
      }
    }),
}));

export default useGameStore;
