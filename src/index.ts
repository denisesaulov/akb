import "reflect-metadata"
import express from "express"
import {getConfigObject} from "./config"
import {getUsersRouter as users} from "./routers/userRouter"
import {getArticlesRouter as articles} from "./routers/articleRouter"
import {getDataSource} from "./db"
import {getAuthMiddleware} from "./middlewares/authMiddleware"
import {errorHandlerMiddleware} from "./middlewares/errorHandlerMiddleware"

async function start() {
  const config = getConfigObject()
  const app = express()
  try {
    const dataSource = await getDataSource(config)
      .initialize()
    app.use(express.json())

    app.use(getAuthMiddleware(config.SECRETE_CODE))

    app.use("/user", users(dataSource, config))
    app.use("/article", articles(dataSource))

    app.use(errorHandlerMiddleware)

    app.listen(config.APP_PORT, () => {
      console.log(`server started on port: ${config.APP_PORT}`)
    })
  } catch (e) {
    console.error("Error during Data Source initialization:", e)
  }
}

start()