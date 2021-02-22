import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
 
import TaskRoutes from './routes/task.routes'

const app = express()
app.set('port', process.env.PORT || 3000 )

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(express.urlencoded( { extended: false} ))
app.get('/', (req, res) => {
    res.json({
         message:"welcome to my app"
    })
})
app.use('/api/task',TaskRoutes)



export default app; 