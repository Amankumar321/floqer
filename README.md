# Floqer

Analyse ML Engineer salaries from 2020 to 2024 using tables and chart. Includes an AI chat assitant that creates the best response based on business knowledge.

## Frontend

Start the frontend
```
cd /frontend
npm install
npm start
```

**Note :** You will need to set the url for backend before you can use AI Chat assitant. Set it on browser console using
```
window.ChatURL = "url_to_backend"
```

For example if you are running backend on local machine on PORT 5000

```
window.ChatURL = "http://localhost:5000/"
```

## Backend

Start the backend
```
cd /backend
npm install
npm start
```

By default the LLM used is llama3. See installation instructions here https://github.com/ollama/ollama

If you want to use OpenAI API, provide OPENAI_API_KEY in ./backend/.env file.
Uncomment the lines in ./backend/chatbot.js