const express = require('express');
const cors = require('cors');
const axios =  require('axios');
const { YoutubeTranscript } = require('youtube-transcript');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI_KEY}`);

const app = express();
app.use(express.json());
const port = 4000;  // Ensure this is the port you're using

app.use(cors()); // Use CORS middleware

app.get('/transcript/:id', async (req, res) => {
  const videoId = req.params.id;
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.json(transcript);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/create-flashcard', async (req, res) => {
    const { text, currentText } = req.body;
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Choose a suitable model
  
      const prompt = `Create a flashcard for an English speaker. Define this word: ${text} in context to this sentence ${currentText} format it in JSON with a
       front, back, and example sentence. Front is foreign word, back is english, example is in the foreign language. I want to be able to parse it. Example format: {
            "front": "",
            "back": "",
            "example": ""
            }"`;
  
      const generationConfig = {
        maxOutputTokens: 100,  // Limit output length
      };
  
      const response = await model.generateContent(prompt, generationConfig);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to create flashcard');
    }
  });





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
