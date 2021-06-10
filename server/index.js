import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'


dotenv.config()

const app = express()
app.use(cors())

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


app.use('/posts', postRoutes)
app.use('/users', userRoutes)

//CONNECTION URL FROM MONGOOSE
const CONNECTION_URL =
  'mongodb+srv://memories:memories123@cluster0.nzm3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Api is running')
  })
}

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log('server running on port ' + PORT))
  )
  .catch((err) => console.log(err))

mongoose.set('useFindAndModify', false)
