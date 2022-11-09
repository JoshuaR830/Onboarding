import express from 'express';
import { Request, Response } from "express";
import { GetItem, GetAllItemsForTeam } from "./services/read-data-service";

const app = express();
const port: number = 1234;

// https://developer.okta.com/blog/2018/11/15/node-express-typescript

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

interface Query {
    team ?: string
}

app.get('/', async (req: Request<{}, {}, {}, Query>, res: Response) => {
    // res.send("Hello world!");

    let { team } = req.query;

    if (team === undefined) {
        team = ""
    }

    const thing = await GetItem("58e43f87-6fec-46a3-b901-98119d020e07");
    const teamItems = await GetAllItemsForTeam(team);
    res.send(teamItems);
});
