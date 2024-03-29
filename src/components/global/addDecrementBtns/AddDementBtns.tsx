import "./addDecrementBtns.css";
interface Props {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
}

function AddDementBtns({ setQuantity, quantity }: Props) {
  const add = () => {
    setQuantity(quantity => quantity + 1);
  };
  const handleDecrement = () => {
    if(quantity === 1)return
    setQuantity(quantity => quantity - 1);
  };

  return (
    <div className="add-decrement">
      <button onClick={handleDecrement}> - </button>
      <input
        type="number"
        min={1}
        value={quantity}
        max={99}
        readOnly
      />
      <button onClick={add}> + </button>
    </div>
  );
}

export default AddDementBtns;
