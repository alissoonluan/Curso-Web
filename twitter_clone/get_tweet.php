<?php
	session_start();

	if(!isset($_SESSION['usuario'])){
		header('Location: index.php?erro=1');
	}

	require_once('db.class.php');

	$id_usuario = $_SESSION['id_usuario'];

	$objDb = new db();
    $link = $objDb->conecta_mysql();
    //%d recupera o dia, %b recupera o mes, %Y recupera o ano e %T recupera hr min e seg
	$sql = "SELECT DATE_FORMAT(t.data_inclusao, '%d %b %Y %T') AS data_inclusao, t.tweet, u.usuario
			FROM tweet AS t JOIN usuarios AS u ON (t.id_usuario = u.id)
			WHERE id_usuario = $id_usuario 
			OR id_usuario IN (SELECT seguindo_id_usuario FROM usuarios_seguidores WHERE id_usuario = $id_usuario)
			ORDER BY data_inclusao DESC";

	$retorno = mysqli_query($link, $sql);

	if($retorno){

		while($registro = mysqli_fetch_array($retorno, MYSQLI_ASSOC)){
			echo '<a href="#" class="list-group-item">';
				echo '<h4 class="list-group-item-heading">'.$registro['usuario'].'<small> - '.$registro['data_inclusao'].'</small></h4>';
				echo '<p class="list-group-item-text">'.$registro['tweet'].'</p>';
			echo '<a>';
		}

	}else{
		echo 'Erro na consulta de tweets no banco de dados!';
	}


?>