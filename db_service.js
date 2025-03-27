const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE, 
    port: process.env.DB_PORT
});

console.log('Database Host:', process.env.DB_HOST);
console.log('Database User:', process.env.DB_USER);
console.log('Database Password:', process.env.DB_PASS);
console.log('Database Name:', process.env.DB_DATABASE );



class DbService {
    constructor() {
      console.log("Database Service Initialized");
    }
  
    connect() {
      console.log("Connected to Database");
    }
  }


const addUser = async function addUser(name, email, password, phone) {
  console.log("!");
  try {
      let passwordHash = await bcrypt.hash(password, 10);
      const res = await connection.query(
          'INSERT INTO user (name, email, password, phone) VALUES (?, ?, ?, ?)',
          [name, email, passwordHash, phone]
      );
      return res[0]; // MySQL returns an array, first item is the result
  } catch (error) {
      console.error('Error adding user:', error);
      throw error;
  }
};

// add menu 
const addMenu = async function addMenu(items, price,ingredients ) {
  console.log("!");
  try {
      const res = await connection.query(
          'INSERT INTO meny (items, price, ingredients) VALUES (?,?,?)',
          [items, price, ingredients]
      );
      return res[0]; // MySQL returns an array, first item is the result
  } catch (error) {
      console.error('Error adding menu:', error);
      throw error;
  }
}

async function deleteItemMeny(id){
  const [res] = await connection.query(`
    DELETE FROM meny WHERE id = ?;
    `, [id]);
    return res[0];
}



async function getUser(email) {
  const [res] = await connection.query(`
      SELECT * FROM user 
      WHERE email = ?
      `, [email]);
      return res[0];
}

async function getMenu(items, price,ingredients) {
  console.log("!");
  try {
      const res = await connection.query(
          'SELECT * FROM meny'
      );
      return res[0]; // MySQL returns an array, first item is the result
  } catch (error) {
      console.error('Error getting menu:', error);
      throw error;
  }
  
}




  
  module.exports = {
  getUser: getUser, // get user 
  DbService: DbService, // Correctly exports the class
  addUser: addUser, // add user
  addMenu:addMenu, // add menu
  getMenu:getMenu, // get menu
  deleteItemMeny : deleteItemMeny // delete menu items
}