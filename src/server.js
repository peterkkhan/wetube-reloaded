import "./db";
import express from "express";
import morgan from"morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";


const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended: true}));

app.use(
  session ({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/wetube"}),
   })
);

/*app.use((req, res, next) =>{
    req.sessionStore.all((error, sessions) =>{
        console.log(sessions);
        next();
    });
});*/

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

/*const handleListening = () => 
    console.log(`✅Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);*/

export default app;