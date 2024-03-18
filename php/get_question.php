<?php
    //Ler o arquivo JSON
    $json = file_get_contents('./question.json');
    //Decodificar o JSON em um array associativo
    $questions = json_decode($json, true);
    $subquestion = json_decode($json, true);

    //Veriricar se o parâmetro question_number foi enviado
    if(isset($_POST['question_number'])) {
        $questionNumber = $_POST['question_number'] - 1; // Ajustar parâmetros para o array começar em 0

        //Verificar se a questão existe
        if($questionNumber >= 0 && $questionNumber < count($questions)) {
            //Retornar a questão em formato JSON
            echo json_encode($questions[$questionNumber]);
        } else {
            //Caso o número da questão esteja fora dos limites
            echo json_encode(array('error' => 'Questão não encontrada'));
        }
    } else {
        //Caso o parâmetro question_number não tenha sido enviado
        echo json_encode(array('error' => 'Parâmetros não enviados'));
    }
?>