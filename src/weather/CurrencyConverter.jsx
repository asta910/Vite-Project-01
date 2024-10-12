import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const currencyApiKey = '10df86099a660cd73dd75467';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(100);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
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
                console.error('Error exchange rate');
            }
        } catch (error) {
            console.error('Error exchange rate:', error);
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
                className="int"
                value={amount}
                onChange={handleAmountChange}
            />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="change int clazzz">
                <option value="USD">USD (United States Dollar)</option>
                <option value="INR">INR (Indian Rupee)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (British Pound)</option>
                <option value="AUD">AUD (Australian Dollar)</option>
                <option value="CAD">CAD (Canadian Dollar)</option>
                <option value="JPY">JPY (Japanese Yen)</option>
                <option value="CNY">CNY (Chinese Yuan)</option>
                <option value="RUB">RUB (Russian Ruble)</option>
                <option value="BRL">BRL (Brazilian Real)</option>
                <option value="ZAR">ZAR (South African Rand)</option>
            </select>

            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="change int">
                <option value="USD">USD (United States Dollar)</option>
                <option value="INR">INR (Indian Rupee)</option>
                <option value="EUR">EUR (Euro)</option>
                <option value="GBP">GBP (British Pound)</option>
                <option value="AUD">AUD (Australian Dollar)</option>
                <option value="CAD">CAD (Canadian Dollar)</option>
                <option value="JPY">JPY (Japanese Yen)</option>
                <option value="CNY">CNY (Chinese Yuan)</option>
                <option value="RUB">RUB (Russian Ruble)</option>
                <option value="BRL">BRL (Brazilian Real)</option>
                <option value="ZAR">ZAR (South African Rand)</option>
            </select>

            <div className="result">
                {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </div>
        </div>
    );
};

export default CurrencyConverter;
