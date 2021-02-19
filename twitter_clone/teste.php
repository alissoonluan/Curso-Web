<?php
	
	require_once('db.class.php');

	$sql = " SELECT * FROM usuarios ";

	$objDb = new db();
	$link = $objDb->conecta_mysql();

	$ret = mysqli_query($link, $sql);
	
	if($ret){
		$dados_usuario = array();


		while($linha = mysqli_fetch_array($ret, MYSQLI_ASSOC)){
			$dados_usuario[] = $linha;
		}
				
		var_dump($dados_usuario);		
	}else{
		echo 'Erro ao executar consulta';
	}
	
?>