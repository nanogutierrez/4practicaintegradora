// Modulos nativos
// const fs = require('fs')
// const crypto = require('crypto')
import fs from 'fs'
import crypto from 'crypto'
class UserManager {
  constructor() {
    try {
      this.users = fs.readFileSync("Usuarios.json", 'utf8')
      this.users = JSON.parse(this.users)
    } catch (error) {
      this.users = []
    }
  }

  async getUsers() {
    return await this.users
  }

  async createUser(name, lastname, username, password) {
    // Encriptar contraseña
    let hashPassword = crypto.createHash('sha256').update(password).digest('hex')
    let user = {  
      name,
      lastname,
      username,
      password: hashPassword
    }

    this.users.push(user)

    try {
      await fs.promises.writeFile('Usuarios.json', JSON.stringify(this.users, null, '\t'))
      console.log('User created')
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  validateUser(username, pass) {
    let hashPassword = crypto.createHash('sha256').update(pass).digest('hex')

    const user = this.users.find(user => user.username === username)

    // console.log(user.password, hashPassword)

    if(user) {
      if(user.password === hashPassword) {
        console.log(`User ${username} logged`)
      }
      else {
        console.log('Wrong Password')
      }
    } else {
      console.log('User not found')
    }
  }
}

// const user = new UserManager();
// user.createUser("juan", "gutierrez", "juangutierrez", "123")
// user.createUser("leandro", "cid", "leancid", "1234")
// user.createUser("facundo", "perez", "facuperez", "facu07")
// user.createUser("paula", "martinez", "paulimartinez", "pauli123")

// user.validateUser('emidw34214312', '1223132')

export default new UserManager()
// module.exports = UserManager