# Floqer

Analyse ML Engineer salaries from 2020 to 2024 using tables and chart. Includes an AI chat assitant that creates the best response based on business knowledge.

Live - https://floqer-assigment.netlify.app

## Technologies

- React.js
- Node.js
- Express.js
- Langchain
- Ant Design
- Chart.js

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

If you want to use OpenAI API, provide `OPENAI_API_KEY` in `./backend/.env` file.
Uncomment the lines in `./backend/chatbot.js`

```
//import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/community/chat_models/ollama";

...

//const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0, api_key: process.env.OPENAI_API_KEY });
const llm = new ChatOllama ({ model: "llama3", baseUrl: "http://localhost:11434"});
```

## Screenshot

![alt text](https://github.com/Amankumar321/floqer/blob/main/demo1.png)
![alt text](https://github.com/Amankumar321/floqer/blob/main/demo2.png)
![alt text](https://github.com/Amankumar321/floqer/blob/main/demo3.png)


## Dataset 

About Dataset
Description of the features in dataset:

- work_year: The year in which the salary data was collected (e.g., 2024).
- experience_level: The level of experience of the employee (e.g., MI for Mid-Level).
- employment_type: The type of employment (e.g., FT for Full-Time).
- job_title: The title of the job (e.g., Data Scientist).
- salary: The salary amount.
- salary_currency: The currency in which the salary is denominated (e.g., USD for US Dollars).
- salary_in_usd: The salary amount converted to US Dollars.
- employee_residence: The country of residence of the employee (e.g., AU for Australia).
- remote_ratio: The ratio indicating the level of remote work (0 for no remote work).
- company_location: The location of the company (e.g., AU for Australia).
- company_size: The size of the company (e.g., S for Small).

https://www.kaggle.com/datasets/chopper53/machine-learning-engineer-salary-in-2024