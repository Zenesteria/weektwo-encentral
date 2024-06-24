let showForm = false;

const AddItemButton = document.getElementById("addItem");

const Items = document.getElementById("Items");
const tableControl = document.getElementById("tableControl");

// utils
function showToaster(message, duration = 3000) {
  // Create toaster element
  const toaster = document.createElement("div");
  toaster.className = "toaster";
  toaster.textContent = message;

  // Add the toaster to the container
  const container = document.getElementById("toaster-container");
  container.appendChild(toaster);

  // Show the toaster
  setTimeout(() => {
    toaster.classList.add("show");
  }, 100);

  // Remove the toaster after the specified duration
  setTimeout(() => {
    toaster.classList.remove("show");
    setTimeout(() => {
      container.removeChild(toaster);
    }, 500);
  }, duration);
}
const generateID = (length) => {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var id = "";
  for (var i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};
function formatToNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}
//

const renderTableData = () => {
  const DATA_ITEMS = JSON.parse(localStorage.getItem("items"));
  console.log(DATA_ITEMS);
  if (!DATA_ITEMS || DATA_ITEMS.length == 0) {
    Items.innerHTML = `
    <tr>
      <td colspan="4" class="">No Data Available.</td>
    </tr>
    `;
    return;
  }
  let content = "";
  DATA_ITEMS.map((item) => {
    content += `
      <tr id="${item.id}">
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${formatToNaira(item.price)}</td>
          <td>
            <button onclick="handleItemEdit('${item.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </button>
            <button data-variant="destructive" onclick="handleItemDelete('${
              item.id
            }')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
              </svg>
            </button>
          </td>
      </tr>
    `;
  });
  Items.innerHTML = content;
};

const handleItemDelete = (id) => {
  const DATA_ITEMS = JSON.parse(localStorage.getItem("items"));
  let newDataItems = [...DATA_ITEMS];
  newDataItems.splice(
    newDataItems.indexOf(newDataItems.filter((item) => item.id == id)[0]),
    1
  );
  localStorage.setItem("items", JSON.stringify(newDataItems));
  showToaster("Item Successfully Deleted");
  renderTableData();
};

const handleCancelForm = (id, reverse) => {
  if (reverse) {
    renderTableData();
    showForm = false;
    return;
  }
  let selectedRow = document.getElementById(id);
  Items.removeChild(selectedRow);
  showForm = false;
};

const handleSaveItem = (id) => {
  const DATA_ITEMS = JSON.parse(localStorage.getItem("items"));
  const InputID = document.getElementById("ID");
  const InputItemName = document.getElementById(
    id ? `${id}_ItemName` : "ItemName"
  );
  const InputItemPrice = document.getElementById(
    id ? `${id}_ItemPrice` : "ItemPrice"
  );

  if (id) {
    if (InputItemName.value.length < 3) {
      showToaster("Item Name is Too Short");
      return;
    }
    if (!(InputItemPrice.value > 0)) {
      showToaster("Item Price is Invalid");
      return;
    }
    let newData = [...DATA_ITEMS];
    newData[newData.indexOf(newData.filter((item) => item.id == id)[0])] = {
      id,
      name: document.getElementById(`${id}_ItemName`).value,
      price: document.getElementById(`${id}_ItemPrice`).value,
    };
    localStorage.setItem("items", JSON.stringify(newData));
    handleCancelForm(id);
    showToaster("Item Has Been Updated");
    renderTableData();
    return;
  }



  if (DATA_ITEMS) {
    DATA_ITEMS.push({
      id: InputID.value,
      name: InputItemName.value,
      price: InputItemPrice.value,
    });
    localStorage.setItem("items", JSON.stringify(DATA_ITEMS));
    handleCancelForm("inputRow");
    showToaster("Item Successfully Added!");
    renderTableData();
    return;
  }
  localStorage.setItem(
    "items",
    JSON.stringify([
      {
        id: InputID.value,
        name: InputItemName.value,
        price: InputItemPrice.value,
      },
    ])
  );
  handleCancelForm("inputRow");
  showToaster("Item Successfully Added!")
  renderTableData();
};

const renderTabularForm = () => {
  let inputRow = document.createElement("tr");
  inputRow.classList.add("input__row");
  inputRow.setAttribute("id", "inputRow");

  inputRow.innerHTML = `
  <tr class="input__row" id="inputRow">
    <td class="form__cell">
      <input disabled="false" value="${generateID(5)}" id="ID">
    </td>
    <td class="form__cell">
      <input id="ItemName">
    </td>
    <td class="form__cell">
      <input id="ItemPrice" type="number">
    </td>
    <td class="form__cell">
      <button data-variant="sucess" type="submit" onclick="handleSaveItem()" id="save">
        Submit
      </button>
      <button data-variant="destructive" onclick="handleCancelForm('inputRow')" id="cancel">
        Cancel
      </button>
    </td>
  </tr>
  `;
  Items.appendChild(inputRow);

  const InputItemName = document.getElementById("ItemName");
  const InputItemPrice = document.getElementById("ItemPrice");
  const submitButton = document.getElementById("save");
  let itemNameValue = "";
  let itemPriceValue = 0;

  if (InputItemName.value.length < 3 || !(InputItemPrice.value > 0)) {
    submitButton.setAttribute("disabled", "true");
  }

  InputItemName.addEventListener("input", (e) => {
    itemNameValue = e.target.value;
    if (itemNameValue.length < 3 || !(itemPriceValue > 0)) {
      submitButton.setAttribute("disabled", "true");
    } else {
      submitButton.removeAttribute("disabled");
    }
  });

  InputItemPrice.addEventListener("input", (e) => {
    itemPriceValue = Number(e.target.value);
    if (!(itemPriceValue > 0) || itemNameValue.length < 3) {
      submitButton.setAttribute("disabled", "true");
    } else {
      submitButton.removeAttribute("disabled");
    }
  });
};

const handleItemEdit = (id) => {
  renderTableData();
  showForm = true;
  let selectedItem = document.getElementById(id);
  const DATA_ITEMS = JSON.parse(localStorage.getItem("items"));
  let currentData = DATA_ITEMS.filter((item) => item.id == id)[0];
  selectedItem.innerHTML = `
      <td class="form__cell">
        <input disabled="false" value="${id}" id="${id}_ID">
      </td>
      <td class="form__cell">
        <input id="${id}_ItemName" value="${currentData.name}">
      </td>
      <td class="form__cell">
        <input id="${id}_ItemPrice" type="number" value="${currentData.price}">
      </td>
      <td class="form__cell">
        <button data-variant="sucess" onclick="handleSaveItem('${id}')" id="save">
          Submit
        </button>
        <button data-variant="destructive" onclick="handleCancelForm('${id}','true')" id="cancel">
          Cancel
        </button>
      </td>
  `;
  const InputItemName = document.getElementById(`${id}_ItemName`);
  const InputItemPrice = document.getElementById(`${id}_ItemPrice`);
  const submitButton = document.getElementById("save");
  let itemNameValue = currentData.name;
  let itemPriceValue = currentData.price;

  if (InputItemName.value.length < 3 || !(InputItemPrice.value > 0)) {
    submitButton.setAttribute("disabled", "true");
  }

  InputItemName.addEventListener("input", (e) => {
    console.log(e.target.value)
    itemNameValue = e.target.value;
    if (itemNameValue.length < 3 || !(itemPriceValue > 0)) {
      submitButton.setAttribute("disabled", "true");
    } else {
      submitButton.removeAttribute("disabled");
    }
  });

  InputItemPrice.addEventListener("input", (e) => {
    console.log(e.target.value)
    itemPriceValue = Number(e.target.value);
    if (!(itemPriceValue > 0) || itemNameValue.length < 3) {
      submitButton.setAttribute("disabled", "true");
    } else {
      submitButton.removeAttribute("disabled");
    }
  });
};

AddItemButton.addEventListener("click", () => {
  if (!showForm) {
    renderTabularForm();
    showForm = true;
  }
});

renderTableData();
