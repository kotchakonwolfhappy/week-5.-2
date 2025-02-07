const BASE_URL = "https://6799f906747b09cdcccd31c4.mockapi.io";

window.onload = async () => {
    await loadData();
  };
  
  const loadData = async (searchTerm = "") => {
  
    const response = await axios.get(`${BASE_URL}/product`);
    let products = response.data;
  
    if (searchTerm) {
      products = products.filter(
        (product) =>
          String(product.pro_name)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(product.pro_inch)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
  
    let productHTMLData = `
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Inch</th>
            <th>Price</th>
            <th>QTY.</th>
            <th>Gifts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>`;
  
    for (let i = 0; i < products.length; i++) {
  
      productHTMLData += `<tr>
        <td>${products[i].pro_name}</td>
        <td>${products[i].pro_des}</td>
        <td>${products[i].pro_inch}</td>
        <td>${products[i].pro_price}</td>
        <td>${products[i].pro_qty}</td>
        <td>${products[i].pro_gift}</td>
        <td>
          <button onclick="editUser(${products[i].id})">Edit</button>
          <button class='delete' data-id='${products[i].id}'>Delete</button>
        </td>
      </tr>
      `;
    } 
  
    productHTMLData += `
        </tbody>
      </table>`;
    let productsDOM = document.getElementById("products");
        productsDOM.innerHTML = productHTMLData;
  };
  
  const handleSearch = async () => {
    const searchInput = document.getElementById("search").value;
    await loadData(searchInput);
  };
  
  let deleteDOMs = document.getElementsByClassName("delete");
  console.log(deleteDOMs);
  for (let i = 0; i < deleteDOMs.length; i++) {
    deleteDOMs[i].addEventListener("click", async (event) => {
      let id = event.target.dataset.id;
      try {
        await axios.delete(`${BASE_URL}/product/${id}`);
        loadData(); 
      } catch (error) {
        console.log("error", error);
      }
    });
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("edited")) {
    await loadData(); 
  };
  
  const editUser = (id) => {
  
  window.location.href = `index.html?id=${id}&edited=true`;
  };
  
  loadData();
  