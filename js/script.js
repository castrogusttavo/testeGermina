$(document).ready(function(){
    var currentQuestion = 0;
    var questions; // Variável para armazenar as perguntas carregadas do arquivo JSON

    // Função para carregar as perguntas do arquivo JSON
    $.getJSON("./question.json", function(data) {
        questions = data;
        loadQuestion();
    });


  // Função para carregar a pergunta
  function loadQuestion() {
    if (currentQuestion < questions.length) {
        $('#question').html(questions[currentQuestion].question);
        // Limpa as opções de resposta anteriores
        $('input[name="answer"]').prop('checked', false);
        // Define as opções de resposta para a pergunta atual
        for (var i = 0; i < questions[currentQuestion].options.length; i++) {
            $('#option-' + (i+1)).next().html(questions[currentQuestion].options[i]);
        }
    } else {
        // Exibição de mensagem de conclusão quando todas as perguntas forem respondidas
        $('#question').html("O questionário acabou! Obrigado por participar.");
        $('#answer-form').hide();
    }
}

  // Carregar a primeira pergunta ao carregar a página
  $('#answer-form').submit(function(e) {
    e.preventDefault();
    var answer = $('input[name="answer"]:checked').val();

    // Simulação de envio de resposta ao servidor
    $.ajax({
        url: './php/save_answer.php',
        type: 'POST',
        data: {question_number: currentQuestion + 1, answer: answer},
        success: function() {
            currentQuestion++;
            loadQuestion();
        }
    });
});
});