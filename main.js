const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//const prompt = "Write a story about a magic backpack";

app.get('/', (req, res)=>{
  res.render('index')
})

const generate = async (prompt) => {
  try {
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Error:", err);
  }
};

app.get('/api/content',async (req, res)=>{
  try{
    const data = req.body.question;
    const result = await generate(data);
    res.send({"result": result})
  }catch(err){
    res.send("error: "+err);
  }
})

//generate();

app.listen(3000, ()=>{
  console.log('server is running port 3000');
})