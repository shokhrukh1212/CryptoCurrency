import { useEffect } from "react";
import { apiKey } from "../constants/apiKey";

const useInitialCrypto = (
  setSymbolList,
  setCryptoList,
  setIsLoading,
  setError
) => {
  // Initially, we have Dogecoin crypto list
  useEffect(() => {
    const fetchDogecoin = async () => {
      try {
        setIsLoading(true);
        const resPrice = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=USD&api_key=${apiKey}`
        );
        const resData = await fetch(
          "https://api.coingecko.com/api/v3/coins/dogecoin"
        );
        const priceData = await resPrice.json();
        const data = await resData.json();
        setSymbolList(["DOGE"]);
        setCryptoList([
          {
            symbol: data.symbol.toUpperCase(),
            imageUrl: data.image.small,
            [data.symbol.toUpperCase()]: priceData.USD,
            hasGrown: true,
          },
        ]);
      } catch (error) {
        setError("Cryptocurrency not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogecoin();
  }, []);
};
export default useInitialCrypto;
