import express from 'express';
import userManager from './UserManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))












const productos = [
  {
    id: 1,
    nombre: "Parlantes",
    precio: 200,
  },
  {
    id: 2,
    nombre: "Mouse",
    precio: 15,
  },
  {
    id: 3,
    nombre: "Teclado Mecanico",
    precio: 250,
  },
];

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/usuario/:id', async (req, res) => {
  const { id } = req.params
  const users = await userManager.getUsers()
  console.log(users)
  const user = users.find(user => user.id == id)
  console.log(user)

  if(!user) {
    return res.send('User not found')
  }

  res.json(user)
})

app.get('/productos', (req, res) => {
  const { nombre, precio } = req.query
  const producto = productos.find(prod => prod.nombre === nombre || prod.precio == precio)

  if(!producto) {
    return res.send('Producto not found')
  }
  res.json(producto)
})





const frase = ["Frase", "Inicial"]

// Endpoints
app.get('/api/frase', (req, res) => {
  res.json({
    frase: frase.join(' ')
  })
})

app.get('/api/palabras/:pos', (req, res) => {
  const { pos } = req.params

  res.json({
    buscada: frase[Number(pos) - 1]
  })
})

app.post('/api/palabras', (req, res) => {
  const { palabra } = req.body
  frase.push(palabra)
  
  res.status(201).json({
    agregada: palabra,
    pos: frase.length 
  })
})

app.put('/api/palabras/:pos', (req, res) => {
  const { pos } = req.params
  const { palabra } = req.body
  
  const anterior = frase[Number(pos) - 1]
  frase[Number(pos) - 1] = palabra

  res.json({
    actualizada: palabra,
    anterior
  })
})

app.delete('/api/palabras/:pos', (req, res) =>{
  const { pos } = req.params

  const eliminado = frase.splice((Number(pos) - 1), 1)
  res.json({
    eliminado
  })
})








app.listen(3000, () => console.log('Listening on port 3000'))