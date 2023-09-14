import {
  checkout
}
from "./checkout";


const render = () => {
  let content
  try {
    const price = checkout(["003", "002", "003", "003", "004"])
    content = `Your price is $${price}`
  } catch (error) {
    content = 'Something went wrong, Please contact customer service.'
    console.error(error)
  }
  document.getElementById("app").innerHTML = content;
}

render()