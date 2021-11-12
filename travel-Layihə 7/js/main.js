"use strict";
$(document).ready(() => {
  const cartButtons = $(".cart-button");

  $(cartButtons).map((index, button) => {
    const local = localStorage.getItem("buyed");

    if (local) {
      const parsed = JSON.parse(local);
      $(".basket-count span").text(parsed.buyed.length)
      $(parsed.buyed).map((index, element) => {
        $(`.cart:nth-child(${element + 1})`).addClass("active");
        $(`.cart:nth-child(${element + 1}) .cart-button`).text("Cancel");
      });
    }

    $(button).click(function () {
      const parent = this.closest(".cart");
      parent.classList.toggle("active");

      if (parent.classList.contains("active")) {
        $(this).text("Cancel");
        const local = localStorage.getItem("buyed");
        if (local) {
          const parsed = JSON.parse(local);
          parsed.buyed.push(index);
          localStorage.setItem("buyed", JSON.stringify(parsed));
          $(".basket-count span").text(parsed.buyed.length);
        } else {
          localStorage.setItem("buyed", JSON.stringify({ buyed: [index] }));

          $(".basket-count span").text(1);
        }
      } else {
        const local = localStorage.getItem("buyed");
        if (local) {
          const parsed = JSON.parse(local);

          const filtered = parsed.buyed.filter((item) => item != index);

          localStorage.setItem(
            "buyed",
            JSON.stringify({ buyed: [...filtered] })
          );

          $(".basket-count span").text(filtered.length);
        }
        $(this).text("Buy Now");
      }
    });
  });
});

//[2,5]
