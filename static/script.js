var date = new Date();
var display_date =
  "Data:" +
  date.toLocaleDateString("pt-BR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

$(document).ready(function(){
    $("#date").html(display_date);
    console.log('Ready')

    //  Busque a data atual e atualize-a no DOM
   // Escreva um evento, quando o botão Enviar for clicado
    $('#button').click(function(){

        //  Obtenha o valor do texto da área de texto usando o método 'val()'
        let text_value = $('#text').val()
        //  Converta-o em um objeto JS.
        //  Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
        let input_text = {'text' : text_value}
        console.log(input_text)
//  requisição ajax
        $.ajax({

            //  tipo da requisição web
            type : 'POST',

            //tipo url
            url: "/predict-emotion",

            //  dados a serem enviados no formato JSON
            data : JSON.stringify(input_text),

            //  o tipo de resposta esperado é json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  se tudo funcionar, execute esta função
            success : function(result){

                // extraia previsão e a URL do emoticon do resultado
                var predicted_emotion, emo_url
                predicted_emotion= result.predicted_emotion;
                emo_url= result.predicted_emotion_img_url;
                console.log(predicted_emotion)
                console.log(emo_url)
                //  atualize os elementos DOM
                //  exiba-os
                $("#sentiment").text(predicted_emotion);
                $("#sentiment").show()
                $("#emoji").attr("src", emo_url);
                $("#emoji").show()

                

            },
        //  se houver algum erro, execute esta função
            error : function(result){
                alert(result.responseJSON.message);
                console.log(result)
            }
        })
//  limpando a caixa de texto após cada pressionamento de botão
        $('#text').val("")
    })
})