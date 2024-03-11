<?php
// Verificar se os parâmetros question_number e answer foram enviados
if(isset($_POST['question_number']) && isset($_POST['answer'])) {
    // Conectar ao banco de dados MySQL
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "germina_db";
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar a conexão
    if ($conn->connect_error) {
        die("Erro de conexão com o banco de dados: " . $conn->connect_error);
    }

    // Preparar a declaração SQL para inserir os dados na tabela
    $stmt = $conn->prepare("INSERT INTO respostas (pergunta, resposta) VALUES (?, ?)");
    $stmt->bind_param("ii", $questionNumber, $answer);

    // Definir os valores dos parâmetros e executar a declaração
    $questionNumber = $_POST['question_number'];
    $answer = $_POST['answer'];
    if ($stmt->execute() === TRUE) {
        // Resposta de sucesso
        echo json_encode(array("success" => "Resposta para a pergunta ".$questionNumber." salva com sucesso."));
    } else {
        // Caso ocorra um erro ao executar a declaração SQL
        echo json_encode(array("error" => "Erro ao salvar a resposta: " . $stmt->error));
    }

    // Fechar a declaração e a conexão com o banco de dados
    $stmt->close();
    $conn->close();
} else {
    // Caso os parâmetros não tenham sido enviados, retornar uma mensagem de erro
    echo json_encode(array("error" => "Dados incompletos. Não é possível salvar a resposta."));
}
?>
