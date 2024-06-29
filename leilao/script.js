document.addEventListener("DOMContentLoaded", () => {
  // Bootstrap form validation
  (function () {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        var forms = document.getElementsByClassName("needs-validation");
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  })();

  // Handle User Registration
  document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    // Here you would send the data to your server using fetch or XMLHttpRequest
    console.log("Register User:", { username, password, email });
    alert("Usuário registrado com sucesso!");
  });

  // Handle Item Creation
  document.getElementById("itemForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = document.getElementById("user_id").value;
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const startingBid = document.getElementById("starting_bid").value;

    // Here you would send the data to your server using fetch or XMLHttpRequest
    console.log("Create Item:", { userId, name, description, startingBid });
    alert("Item criado com sucesso!");
  });

  // Handle Auction Creation
  document.getElementById("auctionForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const itemId = document.getElementById("item_id").value;
    const startTime = document.getElementById("start_time").value;
    const endTime = document.getElementById("end_time").value;

    // Here you would send the data to your server using fetch or XMLHttpRequest
    console.log("Create Auction:", { itemId, startTime, endTime });
    alert("Leilão criado com sucesso!");
  });

  // Handle Bid Placement
  document.getElementById("bidForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const auctionId = document.getElementById("auction_id").value;
    const userIdBid = document.getElementById("user_id_bid").value;
    const bidAmount = document.getElementById("bid_amount").value;

    // Here you would send the data to your server using fetch or XMLHttpRequest
    console.log("Colocar lance:", { auctionId, userIdBid, bidAmount });
    alert("Lance realizado com sucesso!");
  });
});

