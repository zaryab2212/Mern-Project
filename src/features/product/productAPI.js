import { createAsyncThunk } from "@reduxjs/toolkit";
//  export function fetchAllProducts() {
//    return new Promise(async (resolve) => {
//     //TODO: we will not hard-code server URL here
//     const response = await fetch("/products");
//     const data = await response.json();
//    resolve({ data });
//  });
// }

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("/products/"+ id );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination,admin) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values

  let queryString = "";
  for (let key in filter) {
    const CategoryValue = filter[key];
    if (CategoryValue.length > 0) {
      const lastCategoryValue = CategoryValue[CategoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin){
    queryString+= "admin=true"
  }
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count")
    resolve({ data:{products:data,totalItems:+totalItems} });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/category");
    const data = await response.json();
    resolve({ data });
  });

}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });

}

export function createProduct(product){
 
    return new Promise(async(resolve, reject) => {

    const response = await fetch("/products/",{
      method: 'POST',
      body:   JSON.stringify(product),
      headers: {'content-type' :'application/json'}
    })
    const data = response.json()

    resolve({data})
  
})

}

export function updateProduct(update){
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/'+update.id,{
    method: 'PATCH',
    body: JSON.stringify(update),
    headers:{"content-type": "application/json"}
   
    })
    const data = await response.json()
    resolve({data})
  } )

}


// export function deleteProduct(id){
//   return new Promise((resolve, reject) => {
//     const response = fetch(`/products/`+id),{
//       method: "DELETE",
//       body:JSON.stringify(id),
//       headers: 'content-type': 'application/json'
//     }
  

//   }
  
//   const data = response.json()
// resolve ({data})
//   )
// } 