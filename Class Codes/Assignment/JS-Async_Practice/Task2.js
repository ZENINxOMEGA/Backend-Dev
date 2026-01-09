// Task 2: The "Multi-Step" Authentication
// Goal: Practice "Chaining" or sequential awaits (One thing after another).
// ● The Scenario: A user logs in. You need to find the user first, then check their
// subscription.
// ● The Functions:
// 1. getUser(username): Resolves with { name: "Rahul", type:
// "Premium" } after 1.5s.
// 2. checkSubscription(user): Takes the user object. If type is "Premium",
// resolve with "Access Granted to Netflix". Otherwise, reject with
// "Please Subscribe".

// ● The Requirement: Create a "Consumer" function that calls getUser first, then passes
// that result into checkSubscription.

const getUser = (userName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const usersDB = {
        Rahul: { name: "Rahul", type: "Premium" },
        Rohan: { name: "Rohan", type: "Premium" },
        Sohan: { name: "Sohan", type: "Normal" },
        Guest: { name: "Guest", type: "Guest" }
      };

      const user = usersDB[userName];

      if (user) {
        resolve(user);
      } else {
        reject("User Not Found");
      }
    }, 1500);
  });
}
const checkSubscription = (user) => {
  return new Promise((resolve, reject) => {
    if (user.type === "Premium") {
      resolve("Access Granted to Netflix");
    } else {
      reject("Please Subscribe");
    }
  });
};


const authenticateAllUsers = async () => {
  const usernames = ["Rohan", "Sohan", "Guest", "Rahul"];

  for (const name of usernames) {
    try {
      const user = await getUser(name);
      const access = await checkSubscription(user);
      console.log(`${user.name}: ${access}`);
    } catch (error) {
      console.log(`${name}: ${error}`);
    }
  }
};

authenticateAllUsers();