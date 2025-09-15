function InputBox({
  label,

  className = "",
  amount,
  onAmountChange,
  oncurrencyChange,
  currencyOption = [],
  selectCurrency,
  amountDisable = false,
}) {
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex `}>
      <div className="w-1/2">
        <label className="text-black/40 mb-2 inline-block">label</label>
        <input
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange(Number(e.target.value)) && onAmountChange
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={oncurrencyChange}
          onChange={(e) =>
            oncurrencyChange && oncurrencyChange(Number(e.target.value))
          }
          disabled={amountDisable}
        >
          <option value="usd">usd</option>
        </select>
      </div>
    </div>
  );
}

export default InputBox;
