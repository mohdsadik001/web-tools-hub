import React, { useState } from "react";
import Select from "react-select";
import { countriesList } from "../../assets/countries-list";

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #ccc",
    padding: "0.42rem 0.5rem",
    borderRadius: "0.375rem",
    outline: state.isFocused ? "2px solid #10B981" : "none",
    boxShadow: "none",
    minHeight: "48px",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 999,
  }),
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);

//   const countryOptions = countriesList.map((c) => ({
//     label: `${c.flag} ${c.name}`,
//     value: c.currency,
//   }));


  console.log(fromCurrency)
  const countryOptions = countriesList.map((c) => ({
  label: `${c.flag} ${c.currency_code} ${c.name}`,
  value: c.currency_code,
    }));

  const API_KEY = "f48126a537be16d5623dc2b9"

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) {
      alert("Enter valid amount");
      return;
    }
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
        // `https://v6.exchangerate-api.com/v6/f48126a537be16d5623dc2b9/pair/USD/INR/100`
      );
      const data = await res.json();
      if (data.result === "success") {
        setConvertedAmount(data.conversion_result);
        setConversionRate(data.conversion_rate)
      } else {
        alert("Conversion failed: " + data['error-type']);
      }
    } catch (err) {
      alert("Conversion failed.");
      console.error(err);
    }
  };

  return (
    <div className="mt-16 flex flex-col px-6 md:px-16 lg:px-24 xl:px-32 py-4">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">💸 Currency Converter</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <p>Amount</p>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="border border-gray-400 px-2 py-3 rounded outline-primary w-full" type="number" placeholder="Amount" />
        </div>

        <div>
          <p>From:</p>
          <Select 
            styles={customStyles}
            options={countryOptions}
            onChange={(option) => setFromCurrency(option.value)}
            defaultValue={countryOptions.find((c) => c.value === "USD")}
          />
        </div>

        <div>
          <p>To:</p>
          <Select
            styles={customStyles}
            options={countryOptions}
            onChange={(option) => setToCurrency(option.value)}
            defaultValue={countryOptions.find((c) => c.value === "INR")}
          />
        </div>
      </div>

      <button
        onClick={convertCurrency}
        className="flex gap-4 mt-4 items-center justify-center cursor-pointer w-full px-2 py-3 rounded bg-primary hover:bg-primary-dull transition text-white text-xl"
      >
        <i className="ri-money-dollar-circle-line"></i> Convert
      </button>


        <div className="w-full h-[30vh] border-2 border-primary rounded mt-8 px-3 py-4">
            {convertedAmount && (
        <div className="text-xl font-medium flex items-center flex-col justify-between">
          <p>Converted Amount{" "}</p>
            <div className="text-primary text-4xl mt-2">{`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}</div>
          <p className="mt-3">Conversion Rate{" "}</p>
            <div className="text-primary text-4xl mt-2">{`${amount/amount} ${fromCurrency} = ${conversionRate} ${toCurrency}`}</div>
        </div>
      )}
        </div>
      
    </div>
  );
};

export default CurrencyConverter;
