import express from 'express';
import cors from 'cors';

// universally unique identifier para um ID de sessão
import { v4 as uuidv4 } from 'uuid';

// permite res.cookie
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use((req, res, next) => {

  let userId = req.cookies.userId;
  
  if (!userId) {

    //gera um UUID em string em req.cookies.userId
    userId = uuidv4();

    //aplica a string 
    res.cookie("userId", userId, {

      maxAge: 30 * 25 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
      
    });
  };
  
  req.userId = userId;
  next();

});

app.get("/userId", (req,res) => {

  res.send(req.userId)

});

app.delete("/userId", (req,res) => {

  res.clearCookie('userId', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax'
  });

  res.send("Cookie cleared");

});

app.use((req, res) => {

  res.status(404).send("No route found");

});

app.listen(5000, () => console.log("server running on port 5000"));

