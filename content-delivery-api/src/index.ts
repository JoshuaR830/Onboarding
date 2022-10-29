import express from "express";

const app = express();
const port: number = 8080;

// https://developer.okta.com/blog/2018/11/15/node-express-typescript

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

app.get("/", (req, res) => {
    res.send("Hello world!");
});
