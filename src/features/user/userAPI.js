

export function fetchLoggedInUserOrders(){
return new Promise(async (resolve, reject) => {
  const response = await fetch("http://localhost:8080/orders/me/")
  const data = await response.json()
  resolve({data})
})
} 
export function  fetchLoggedInInfo(){
return new Promise(async (resolve) => {
  const response = await fetch("http://localhost:8080/users/me")
  const data = await response.json()
  resolve({data})
})
}
export function updateUser(update){
  return new Promise( async (resolve) => {
   const response = await fetch("http://localhost:8080/users/" +update._id   , {
    method : "PATCH",
    body : JSON.stringify(update),
    headers: {"content-type" : "application/json"}
   })
   const data = await response.json()
   resolve({data})
  })
}
