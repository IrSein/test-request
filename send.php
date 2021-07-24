<?php

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

$email = $data['email'];
$phone = $data['phone'];

$subject = 'Заявка';
$message = "Email: $email. Phone: $phone";
mail( '29594299.105855@parser.amocrm.ru', 'Заявка Хмырова', $message);
mail( 'order@salesgenerator.pro', $subject, $message);
