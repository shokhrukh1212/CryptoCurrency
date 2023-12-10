import { RiseOutlined, FallOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  wrapper_style,
  container_style,
  rise_fall_style,
  delete_style,
} from "../constants/contentStyles";
const CryptoContent = ({
  symbol,
  price,
  imageUrl,
  hasGrown,
  setCryptoList,
  setSymbolList,
  setSymbol,
}) => {
  const handleDelete = () => {
    setCryptoList((lastCryptoList) => {
      const newList = lastCryptoList.filter((item) => item.symbol !== symbol);
      return newList;
    });
    setSymbolList((lastSymbolList) => {
      const newList = lastSymbolList.filter((sym) => sym !== symbol);
      return newList;
    });
    setSymbol("");
  };

  const increaseStyle = {
    ...wrapper_style,
    backgroundColor: "green",
  };
  const decreaseStyle = {
    ...wrapper_style,
    backgroundColor: "red",
  };
  return (
    <>
      <div style={hasGrown ? increaseStyle : decreaseStyle}>
        <div style={container_style}>
          <h3>{symbol}</h3>
          <h3>{price}</h3>
        </div>

        <div style={container_style}>
          <img src={imageUrl} alt="Crypto" />
          {hasGrown ? (
            <RiseOutlined style={rise_fall_style} />
          ) : (
            <FallOutlined style={rise_fall_style} />
          )}
        </div>

        <DeleteOutlined style={delete_style} onClick={handleDelete} />
      </div>
    </>
  );
};

export default CryptoContent;
