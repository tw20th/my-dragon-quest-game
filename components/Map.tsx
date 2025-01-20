interface MapProps {
  mapData: string[][];
  playerPosition: [number, number];
}

const Map = ({ mapData, playerPosition }: MapProps) => {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${mapData[0].length}, 32px)` }}
    >
      {mapData.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-8 h-8 ${
              tile === "grass"
                ? "bg-green-500"
                : tile === "water"
                ? "bg-blue-500"
                : tile === "tree"
                ? "bg-yellow-700"
                : "bg-gray-500"
            } flex justify-center items-center`}
          >
            {playerPosition[0] === rowIndex &&
              playerPosition[1] === colIndex && (
                <span className="text-lg">🧙</span>
              )}
          </div>
        ))
      )}
    </div>
  );
};

export default Map;
