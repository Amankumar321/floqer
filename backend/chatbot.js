//import { ChatOpenAI } from "@langchain/openai";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnableSequence,
} from "@langchain/core/runnables";

import { config } from "dotenv";
import { ChatOllama } from "@langchain/community/chat_models/ollama";

config();

const datasource = new DataSource({
  type: "sqlite",
  database: "database.db",
});
const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});

//const llm = new ChatOpenAI({ model: "gpt-4", temperature: 0, api_key: process.env.OPENAI_API_KEY });
const llm = new ChatOllama ({ model: "llama3", baseUrl: "http://localhost:11434"});

const prompt =
  PromptTemplate.fromTemplate(`Only generate SQL query and no extra information. Strip any leading and trailing quotes.
If the question cannot be answered from table return an empty query.
------------
Table structure : {schema}
------------
question: {question}`);

const sqlQueryChain = RunnableSequence.from([
    {
      schema: async () => db.getTableInfo(),
      question: (input) => input.question,
    },
    prompt,
    llm,
    new StringOutputParser(),
]);


const finalResponsePrompt =
  PromptTemplate.fromTemplate(`You are a AI Assitant. Given table structure of salaries: {schema}.
  Write your brief response to user after converting {response}.
  A user says: {question}. 
  Your response: `);


export const finalChain = RunnableSequence.from([
  {
    question: (input) => input.question,
    query: sqlQueryChain,
  },
  {
    schema: async () => db.allTables[0].columns,
    question: (input) => input.question,
    query: (input) => input.query,
    response: (input) => db.run(input.query),
  },
  finalResponsePrompt,
  llm,
  new StringOutputParser(),
]);
