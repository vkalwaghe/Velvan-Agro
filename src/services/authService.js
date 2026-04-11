// 🔐 Fake users (default login)
const users = [
  {
    email: "admin@gmail.com",
    password: "123456",
    name: "Admin User",
  },
  {
    email: "farmer@gmail.com",
    password: "farmer123",
    name: "Farmer",
  },
];

// ✅ LOGIN FUNCTION (IMPORTANT)
export function loginUser(email, password) {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    return {
      success: true,
      user,
    };
  } else {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}