<?php
	
	class db{
		//host
		private $host = 'localhost';
		//usuario
		private $usuario = 'root';
		//senha
		private $senha = '';
		//banco de dados 
		private $database = 'twitter_clone';

		public function conecta_mysql(){
			//criando a conexao
			$conn = mysqli_connect($this->host, $this->usuario, $this->senha, $this->database);
			//ajustar charset
			mysqli_set_charset($conn, 'utf8');

			//verificar se houve erro de conexao
			if(mysqli_connect_errno()){
				echo 'Houve um erro ao tentar se conecta com o banco de dados'.mysqli_connect_error();
			}

			return $conn;
		}
	}

?>