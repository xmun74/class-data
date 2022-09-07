import React from "react";
import Item from "../components/Item";

function ItemListContainer({ items, setCartItems, cartItems }) {
  const handleClick = (e, id) => {
    let newItemArr = {
      itemId: id,
      quantity: 1,
    };
    // 클릭한 id를 장바구니에 추가
    // 없으면 itemid추가
    // 있으면 수량++

    // for (let i = 0; i < cartItems.length; i++) {
    //   if (cartItems[i].itemId === id) {
    //     newItemArr.quantity = Number(newItemArr.quantity) + 1;
    //     return setCartItems([...cartItems]);
    //   } else {
    //     return setCartItems([...cartItems, newItemArr]);
    //   }
    // }

    cartItems.map((el) => {
      if (el.itemId === id) {
        el.quantity = el.quantity + 1;
        console.log("추가한다");
        return setCartItems([...cartItems]);
      } else {
        return setCartItems([...cartItems, newItemArr]);
      }
    });
  };
  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">쓸모없는 선물 모음</div>
        {items.map((item, idx) => (
          <Item item={item} key={idx} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
