function loginModal() {
  fetch("autofill-email")
    .then(function (res) {
      return res.text();
    })
    .then(function (data) {
      document.getElementById("email").setAttribute("value", data);
    });
}

function loginModalCheck(e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let checkbox = document.getElementById("checkbox").checked;

  fetch("submit-login-form", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      checkbox: checkbox,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

document.addEventListener("DOMContentLoaded", function () {
  // Dropdown control
  const dropdownInstances = M.Dropdown.init(
    document.querySelectorAll(".dropdown-trigger"),
    {
      coverTrigger: false,
      closeOnClick: true,
    }
  );

  window.addEventListener("click", (e) => {
    if (
      document.getElementById("dropdown1").contains(e.target) == false &&
      document.querySelector(".dropdown-trigger").contains(e.target) == false &&
      dropdownInstances[0].isOpen == true
    ) {
      console.log("in close function");
      dropdownInstances[0].close();
    }
  });

  // Button tooltip
  let walletConnected = false;
  M.Tooltip.init(document.querySelectorAll(".tooltipped"), {});
  if (walletConnected) {
    document
      .getElementById("stake-button")
      .setAttribute("data-tooltip", "Stake or Unstake MATER");
  } else {
    document
      .getElementById("stake-button")
      .setAttribute("data-tooltip", "Please, connect your wallet");
  }

  // Sidenav menu
  M.Sidenav.init(document.querySelectorAll(".sidenav"), {});
  M.Collapsible.init(document.querySelectorAll(".collapsible"), {});

  // Select in stake
  M.FormSelect.init(
    document.querySelectorAll("select"),
    (dropdownOptions = { constrainWidth: true })
  );

  // Modal control
  M.Modal.init(document.querySelectorAll(".modal"), {});

  const loginButton = document.querySelector("#loginButton");
  loginButton.addEventListener("click", (e) => {
    loginModal();
  });

  const checkCredentials = document.querySelector("#checkCredentials");
  checkCredentials.addEventListener("click", (e) => {
    loginModalCheck(e);
  });
});
