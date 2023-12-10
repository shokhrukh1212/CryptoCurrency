import { apiKey } from "../constants/apiKey";
import { useEffect } from "react";

const useUpdatePrices = (
  setIsLoading,
  cryptoList,
  setCryptoList,
  setError,
  symbolList
) => {
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        setIsLoading(true);
        symbolList.forEach(async (item) => {
          const res = await fetch(
            `https://min-api.cryptocompare.com/data/price?fsym=${item}&tsyms=USD&api_key=${apiKey}`
          );

          const data = await res.json();
          const symbolItem = cryptoList.find(
            (symItem) => symItem.symbol === item
          );

          // checking if symbol value has changed
          if (symbolItem[item] !== data.USD) {
            const index = cryptoList.findIndex(
              (cryptoItem) => cryptoItem.symbol === item
            );

            let newItem;

            // checking whether a value has increased or decreased
            if (symbolItem[item] > data.USD) {
              newItem = { ...symbolItem, [item]: data.USD, hasGrown: false };
            } else if (symbolItem[item] <= data.USD) {
              newItem = { ...symbolItem, [item]: data.USD, hasGrown: true };
            }

            const newCryptoList = [...cryptoList];
            newCryptoList[index] = newItem;
            setCryptoList(newCryptoList);
          }
        });
      } catch (error) {
        setError("Ooops, something went wrong! ", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const intervalId = setInterval(fetchCryptoPrices, 5000);
    return () => clearInterval(intervalId);
  }, [symbolList, cryptoList]);
};

export default useUpdatePrices;
