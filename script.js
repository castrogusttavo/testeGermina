$(document).ready(function () {
  var currentQuestion = 0;
  var questions; 
  var answers = []; 

  // Função para carregar as perguntas do arquivo JSON
  $.getJSON("./question.json", function (data) {
    questions = data;
    loadQuestion();
  });

  // Função para carregar a pergunta
  function loadQuestion() {
    if (currentQuestion < questions.length) {
     
      var question = questions[currentQuestion].question;
      var subquestion = questions[currentQuestion].subquestion;

      $("#question").html(question);
      $("#subquestion").html(subquestion);

      for (var i = 0; i < questions[currentQuestion].options.length; i++) {
        $("#option-" + (i + 1))
          .next()
          .html(questions[currentQuestion].options[i]);
      }
    } else {
      // Exibição de mensagem de conclusão quando todas as perguntas forem respondidas
      $("#question").html("O questionário acabou! Obrigado por participar.");
      $("#answer-form").hide();
      $("#submit-form").show();

      // Gera o arquivo JSON com os dados das respostas
      downloadJSON(answers);
    }
  }

  // Evento de clique nos botões de resposta
  $(".answer-button").click(function () {
    var answer = $(this).val();

    $.ajax({
      url: "./php/save_answer.php",
      type: "POST",
      data: { question_number: currentQuestion + 1, answer: answer },
      success: function () {
        answers.push({
          question: questions[currentQuestion].question,
          answer: answer,
        });
        currentQuestion++;
        loadQuestion();
      },
    });
  });

  // Função para gerar e fazer o download do arquivo JSON
  function downloadJSON(data) {
    var jsonData = JSON.stringify(data);
    var blob = new Blob([jsonData], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "answer/respostas.json"; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
