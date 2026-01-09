// Task 1: The "Order Status"
// Goal: Practice basic resolve and reject logic.
// ● The Scenario: Create a function checkOrderStatus(orderId).
// ● The Logic: * If the orderId is a number, resolve after 1 second with
// "Order Shipped".
// ○ If the orderId is not a number (e.g., a string or null), reject with
// "Invalid Order ID".

// ● The Requirement: Use an async function with try/catch to call this
// and log the result


const checkOrderStatus = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orders = {
        1: { name: "Shoes", quantity: 2, price: 2000, status: "Shipped" },
        2: { name: "Joystick", quantity: 1, price: 2500, status: "InProgress" },
        3: { product: "Laptop Bag", quantity: 1, price: 1800, status: "Delivered" },
      }
      const orderId = orders[id];
      if (typeof id === "number" && orderId) {
        resolve(orderId)

      } else {
        reject("Invalid Order Id")
      }
    }, 1000)

  })
}


const checkStatus = async () => {
  try {
    const result = await checkOrderStatus(1);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

checkStatus();