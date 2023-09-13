import database from "./database.json";

export const checkout = (productIDs = []) => {
  // Please complete your code here.
  // Product's detail can be found in `database`.

  return 0;
};

document.getElementById("app").innerHTML =
  "Your price is $" + checkout(["003", "002", "003", "003", "004"]);
