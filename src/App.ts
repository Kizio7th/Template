import { Server } from '@overnightjs/core';
import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { UserAPI } from './components/user/User.api';
import { BookAPI } from './components/book/Book.api';
import dataSource from './services/db/dataSource';
import { AuthorAPI } from './components/author/Author.api';

export class App extends Server {
  constructor() {
    super()
    this.applyMiddleWares()
    this.boostrap()
  }

  public server = createServer(this.app)

  public start(): void {
    const port = process.env.PORT || 3000

    this.server.listen(port, () => {
      console.log('Server listening on port: ' + port)
    })
  }

  private assignCronTasks = () => {
  }

  private applyMiddleWares() {
    this.app.use(cors({ origin: '*' }))
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private errorHandlingRoutes() {
    this.app.use((
      _err: any,
      req: Request,
      res: Response,
      next: NextFunction) => {
      return res.send(_err)
    })

    this.app.get('*', function (req, res) {
      return res.sendStatus(404)
    })
  }
  private async initDB() {
    try {
      await dataSource.initialize()
      console.log('Data Source has been initialized!')
    } catch (error) {
      console.error('Error during Data Source initialization', error)
    }
  }

  private async boostrap() {
    await this.initDB()
    this.assignCronTasks()

    // add Controllers
    try {
      super.addControllers([
        // Add controllers here
        new UserAPI(),
        new AuthorAPI(),
        new BookAPI()
      ])
    } catch (error) {
      console.log(error)
    }
    this.errorHandlingRoutes()
  }
}

export const app = new App()
