# importe os módulos necessários
from flask import Flask , render_template , request , jsonify, url_for

# importando arquivo sentiment_analysis como sa
import sentiment_analysis as sa

app = Flask(__name__)

# rota do aplicativo para a página index
@app.route('/')
def home():
    return render_template('index.html')

# escreva uma rota para requisição post
@app.route('/predict-emotion' , methods = ['POST'])
def review():

    # extraia a avaliação do cliente escrevendo a "chave" apropriada dos dados JSON
    review = request.json.get('text')

    # verifique se a avaliação do cliente está vazia, então retorne o erro
    if not review:

        return jsonify({'status' : 'error' , 
                        'message' : 'Avaliação em branco'})

    # se a avaliação não estiver vazia, passe-a pela função 'predict'.
    # a função predict retorna 2 coisas: o sentimento e o caminho da imagem na pasta static
    # exemplo : Positivo , ./static/assets/emoticons/positive.png

    else:

        predicted_emotion, predicted_emotion_img_url= sa.predict(review)
        response={
            "status":"success",
            "predicted_emotion":predicted_emotion,
            "predicted_emotion_img_url":predicted_emotion_img_url
        }
        print(response)
        return jsonify(response)


if __name__  ==  "__main__":
    app.run(debug = True)