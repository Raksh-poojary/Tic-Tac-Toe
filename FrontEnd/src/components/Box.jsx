function Box({ value, onClick }) {
    return (
        <button
            className="box"
            style={{backgroundColor:value === "X" ? "lightblue" :
                                    value === "O" ? "lightgreen" : ""
            }}
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default Box;
