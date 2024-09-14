import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const currencyApiKey = '10df86099a660cd73dd75467';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            fetchExchangeRate(fromCurrency, toCurrency);
        }
    }, [fromCurrency, toCurrency]);

    const fetchExchangeRate = async (from, to) => {
        const url = `https://v6.exchangerate-api.com/v6/${currencyApiKey}/latest/${from}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.result === "success") {
                const rate = data.conversion_rates[to];
                setExchangeRate(rate);
                setConvertedAmount((amount * rate).toFixed(2));
            } else {
                console.error('Error fetching exchange rate');
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        if (exchangeRate) {
            setConvertedAmount((e.target.value * exchangeRate).toFixed(2));
        }
    };

    return (
        <div className="converter-container">
            <h2>Currency Converter</h2>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
            />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                {}
            </select>

            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                {}
            </select>

            <div className="result">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </div>
        </div>
    );
};

export default CurrencyConverter;
