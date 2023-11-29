import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
 organization: "org-cbg7fhVBH5bPJv3ZGtBqw5qS",
 apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  console.log("question is =" + chats);

  const result = await openai.createCompletion({
    model:"text-davinci-003",
    prompt: chats[0].content,
    temperature:1,
    max_tokens:24,
    top_p:1,
    frequency_penalty:0,
    presence_penalty:0,
  });

  response.json({
    output: { role: "Assistant", content: result.data.choices[0].text },
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
