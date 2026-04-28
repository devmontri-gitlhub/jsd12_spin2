export const mockUsers = [
  {
    id: 1,
    email: "ddd@ddd.com",
    password: "1234",
    address: "123/45 Bangkok",
    role: "buyer" // สถานะเริ่มต้นเป็นผู้ซื้อ
  },
  {
    id: 2,
    email: "user2@test.com",
    password: "pass456",
    address: "99/1 Chiang Mai",
    role: "buyer"
  },
  {
    id: 3,
    email: "user3@mail.com",
    password: "secure789",
    address: "5/2 Phuket",
    role: "buyer"
  },
  {
    id: 4,
    email: "user4@demo.com",
    password: "password111",
    address: "444 Chonburi",
    role: "buyer"
  },
  {
    id: 5,
    email: "user5@web.com",
    password: "mypassword",
    address: "88/9 Rayong",
    role: "buyer"
  }
];

export const authContent = {
  loginTitle: "Creative Market",
  registerTitle: "Register",
  placeholders: {
    email: "Enter your email address",
    password: "Enter your password",
    address: "Enter your address",
    confirmPassword: "Enter your password confirmation"
  }
};