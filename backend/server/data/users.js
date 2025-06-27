import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@booknest.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'user',
  },
  {
    name: 'Jane Seller',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'seller',
  },
];

export default users;

