import Box from "./Box";

function Board({ board, onMove }) {
    return (
        <div className="container">
            {board.map((value, index) => (
                <Box
                    key={index}
                    value={value}
                    onClick={() => onMove(index)}
                />
            ))}
        </div>
    );
}

export default Board;
