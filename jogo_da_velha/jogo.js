var rodada = 1;
var matriz = Array(3);

matriz['a'] = Array(3);
matriz['b'] = Array(3);
matriz['c'] = Array(3);

matriz['a'][1] = 0;
matriz['a'][2] = 0;
matriz['a'][3] = 0;

matriz['b'][1] = 0;
matriz['b'][2] = 0;
matriz['b'][3] = 0;

matriz['c'][1] = 0;
matriz['c'][2] = 0;
matriz['c'][3] = 0;



$(document).ready( function(){
	$('#btn_inicar_jogo').click( function(){
		//valida a digitação dos apelidos
		if($('#entrada_apelido_jogador_1').val() == '' || $('#entrada_apelido_jogador_2').val() == ''){
			alert('É obrigatório preencher os campos apelidos');
			return false;
		}

		//exibir os apelidos
		$('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
		$('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

		//
		$('#pagina_inicial').hide();
		$('#palco_jogo').show();
	});

	$('.jogada').click( function(){
		var id_campo_clicado = this.id;
		$('#'+id_campo_clicado).off();
		jogada(id_campo_clicado);
	});

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if((rodada % 2) == 1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}else{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}
		rodada++;
		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('-');
		matriz[linha_coluna[0]][linha_coluna[1]] = ponto;
		verifica_combinacao();
	}

	function verifica_combinacao(){
		//verifica na horizontal
		var pontos = 0;
		for(var i = 1; i<=3; i++){
			pontos = pontos + matriz['a'][i];
		}
		ganhador(pontos);
		pontos = 0;
		for(var i = 1; i<=3; i++){
			pontos = pontos + matriz['b'][i];
		}
		ganhador(pontos);
		pontos = 0;
		for(var i = 1; i<=3; i++){
			pontos = pontos + matriz['c'][i];
		}
		ganhador(pontos);

		//verifica na vertical		
		for(var l = 1; l<=3; l++){
			pontos = 0;
			pontos += matriz['a'][l];
			pontos += matriz['b'][l];
			pontos += matriz['c'][l];
			ganhador(pontos);
		}

		//verificar na diagonal
		pontos = 0;
		pontos = matriz['a'][1] + matriz['b'][2] + matriz['c'][3]; 
		ganhador(pontos);

		pontos = 0;
		pontos = matriz['a'][3] + matriz['b'][2] + matriz['c'][1]; 
		ganhador(pontos);
	}

	function ganhador(pontos){
		if(pontos == -3){
			var jogada_1 = $('#entrada_apelido_jogador_1').val();
			alert(jogada_1+' é o vencedor');
			$('.jogada').off();
		}else if(pontos == 3){
			var jogada_2 = $('#entrada_apelido_jogador_2').val();
			alert(jogada_2+' é o vencedor');
			$('.jogada').off();	
		}
	}
});