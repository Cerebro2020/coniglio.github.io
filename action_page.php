<?php
$nome = $_POST['firstname'];
$cognome = $_POST['lastname'];
$paese = $_POST['country'];
$oggetto = $_POST['subject'];

$destinatario = "vinofelice@gmail.com";
$oggettoEmail = "Nuovo messaggio dal sito web";
$corpoEmail = "Nome: $nome\n".
              "Cognome: $cognome\n".
              "Paese: $paese\n".
              "Oggetto: $oggetto\n";

$headers = "From: webmaster@example.com";

mail($destinatario, $oggettoEmail, $corpoEmail, $headers);
?>