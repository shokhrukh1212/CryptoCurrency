import { useEffect, useState } from "react";
import { apiKey } from "../constants/apiKey";
import useInitialCrypto from "../hooks/useInitialCrypto";
import useUpdatePrices from "../hooks/useUpdatePrices";
import CryptoContent from "./CryptoContent";

const Crypto = () => {
  const [cryptoName, setCryptoName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cryptoList, setCryptoList] = useState([]);
  const [symbolList, setSymbolList] = useState([]);
  const [symbol, setSymbol] = useState();
  const [imageUrl, setImageUrl] = useState();

  // using our custom hook to fetch initial values
  useInitialCrypto(setSymbolList, setCryptoList, setIsLoading, setError);

  // fetching prices in every 5 seconds
  useUpdatePrices(
    setIsLoading,
    cryptoList,
    setCryptoList,
    setError,
    symbolList
  );

  // fetching symbol data when symbolList array has changed
  useEffect(() => {
    const fetchSymbolData = async () => {
      try {
        setIsLoading(true);
        if (symbol) {
          const res = await fetch(
            `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${apiKey}`
          );
          const data = await res.json();
          if (data.USD) {
            const price = data.USD;
            setCryptoList([
              ...cryptoList,
              { symbol, imageUrl, [symbol]: price, hasGrown: true },
            ]);
          }
        }
      } catch (error) {
        setError("Cryptocurrency not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSymbolData();
  }, [symbolList]);

  // fetching crypto data after entering an input field
  const fetchCryptoData = async () => {
    try {
      setIsLoading(true);
      if (cryptoName) {
        const validId = cryptoName.toLowerCase();
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${validId}`
        );
        const data = await res.json();
        if (data && data.symbol) {
          const symbol = data.symbol.toUpperCase();
          const imageUrl = data.image.small;
          if (!symbolList.includes(symbol)) {
            setSymbolList([...symbolList, symbol]);
            setSymbol(symbol);
            setImageUrl(imageUrl);
          }
        } else {
          setError("Cryptocurrency not found");
        }
      }
    } catch (error) {
      setError("Ooops, something went wrong! ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    setError(null);
    fetchCryptoData();
    setCryptoName("");
  };

  return (
    <>
      <input
        type={"text"}
        onChange={(e) => setCryptoName(e.target.value)}
        value={cryptoName}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleClick} disabled={!cryptoName}>
        {isLoading ? "...Loading" : "Search"}
      </button>
      <br></br>
      {error && <div>{error}</div>}

      <div style={{ display: "flex", marginTop: 20 }}>
        {cryptoList.map((item, index) => {
          const { symbol, imageUrl, hasGrown } = item;
          return (
            <CryptoContent
              key={index}
              symbol={symbol}
              price={item[symbol]}
              imageUrl={imageUrl}
              hasGrown={hasGrown}
              setCryptoList={setCryptoList}
              setSymbolList={setSymbolList}
              setSymbol={setSymbol}
            />
          );
        })}
      </div>
    </>
  );
};
export default Crypto;
