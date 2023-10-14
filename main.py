import json
import re

from flask import Flask, jsonify, render_template, request, after_this_request
from replit.ai.modelfarm import ChatModel, ChatSession, ChatExample, ChatMessage 

from chat import retQA, get_responses, get_random_prompt, reset_chat_session

app = Flask(__name__, template_folder='templates')


@app.route('/')
def index():
    return render_template('index.html')

model = ChatModel("chat-bison")


# open up the NLP / QA pairs
with open("./data.json", "r") as file:
    qa_pairs = json.load(file)

# iterate through and create ChatExample object comprised of chatMessage objects
chatExamples = []
for qa_pair in qa_pairs:
    if "input_text" in qa_pair and "output_text" in qa_pair:
      chatExamples.append(ChatExample(
                            input=ChatMessage(content=qa_pair["input_text"]),
                            output=ChatMessage(content=qa_pair["output_text"])
                          )
                        )
    else:
      print(f"Missing keys in qa_pair: {qa_pair}")

    
# function that accepts a chat and returns a response
def chatToModel(chatMessage):
  response = model.chat([
    ChatSession(
      context="You are a chatbot that cannot respond to questions that are outside of the context of the additional data provided to you in the attatched dataset. You will stay in the context of Earthshot US no matter what is asked.",
      examples=chatExamples,
      messages=[
        ChatMessage(author="USER", content=chatMessage),
      ],
    )
  ], 
  temperature=0.09)

  return str(response.responses[0].candidates[0].message.content)



'''
@app.route('/api/chat',methods=['POST'])
def chat():
  try:
    request_data = request.get_json(force=True)
    chatMessage = request_data['message']
    response = chatToModel(chatMessage)
    
    return jsonify({"message":response})
  
  except Exception as e:
    print(e)
'''


# return the response from the http request
def get_chatbot_response(question):

    answer = chatToModel(question)
    
    # Format the BERT response with capitalized first letters and sentence-ending periods
    #formatted_answer = answer.capitalize()
    #formatted_answer = re.sub(r"(\w)([.?!])", r"\1\2 ", formatted_answer)
    #formatted_answer = re.sub(r"\s+", " ", formatted_answer)
    #formatted_answer = formatted_answer.strip()

    return answer.capitalize().strip()

@app.route('/process-request', methods=['GET','POST'])
def process_request():
    if(request.method == 'POST'):

        data = request.json
        responses = get_responses(str(data.strip()))
        @after_this_request
        def respondToUser(response):
            #process input
            NLP_response = responses[0]
            chatRes_text = ''
            if(NLP_response == "I'm sorry, I don't have a response for that."):
                chatRes_text = get_chatbot_response(data.strip())
                chatbot_res = {'message' : chatRes_text,
                                'responses':responses[1]}
            else:
                chatbot_res = {'message' : responses[0],
                                'responses':responses[1]}
            print(chatbot_res)
            return jsonify(chatbot_res)
    
    return 'method not allowed', 405



@app.route('/get-QA-Pairs', methods=['GET'])
def getQA_Pairs():
    ret = (retQA())
    print(ret)
    return jsonify({"message":ret})
  
  


app.run(host='0.0.0.0', port=8000, debug=True, use_reloader=False)