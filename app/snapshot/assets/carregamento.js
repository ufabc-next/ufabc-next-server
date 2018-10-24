/*
Explicação prévia: 
1. A variável todasDisciplinas vem do arquivo todasDisciplinas.js e contém objetos 
que possuem diversos atributos de cada disciplina ofertada.

2. A variável contagemMatriculas possui todas as matrículas por disciplina e também
vem de um arquivo externo, o contagemMatriculas.js. 

*/
//-----------------------------------------------------------------------------//

//Código será executado quando o evento de carregar e o documento estiver pronto.

var disciplinas = []; //Controla as disciplinas que o aluno está matriculado
var codigosdisciplinas = [];
var creditospegos = 0;

$(document).ready(function() { //Evento roda quando o documento está pronto




//Tarefa => Criação do calendário da tabela de horários

//Calendário 1

	var horario = 0; // É utilizada para controlar o horário
	var dias = 0;
	var tr = []; //Array com as linhas criadas
	var td = []; //Array com as células criadas
	var x = 0; //Controla a criação de linhas e células
	var y = 0; //Controla a criação das células


//Cria as tr's

while(x<31) {


	tr[x] = document.createElement('tr');

	x = x+1;
}






x=0;


while(x<31) {

	//Cria as td's

	y=0;

	td[0] = document.createElement('td');
	td[0].id = "horario";
	td[0].innerHTML = retornaHorario(horario);
	
	
	
	


	while(y<6) {

		var valorhorario = retornaHorario(horario);

		td[y+1] = document.createElement('td');
		td[y+1].id = "dias";
		td[y+1].className = "quinzenaum" + "_" + (y+1) + "_" + 
		valorhorario[0] + valorhorario[1] + valorhorario[3] + 
		valorhorario[4];
		y = y+1;

	}

	y=0;

	//Atribui td's às tr's.td

	while(y<7) {

		tr[x].appendChild(td[y]);
		y++;""



	}
	

	x = x+1;
	horario = horario +1;

}

i=0;

//Insere as tr's no calendário

while(i<31) {

	$('tbody#segundo')[0].appendChild(tr[i]);
	i = i+1;
}


//Calendário 2

var horario = 0;
	var dias = 0;
	var tr = [];
	var td = [];
	var x = 0;
	var y = 0;


//Cria as tr's

while(x<31) {


	tr[x] = document.createElement('tr');

	x = x+1;
}






x=0;


while(x<31) {

	//Cria as td's

	y=0;

	td[0] = document.createElement('td');
	td[0].id = "horario";
	td[0].innerHTML = retornaHorario(horario);
	
	
	
	


	while(y<6) {

		var valorhorario = retornaHorario(horario);

		td[y+1] = document.createElement('td');
		td[y+1].id = "dias";
		td[y+1].className = "quinzenadois" + "_" + (y+1) + "_" + 
		valorhorario[0] + valorhorario[1] + valorhorario[3] + 
		valorhorario[4];
		y = y+1;

		

	}

	y=0;

	//Atribui td's às tr's.td

	while(y<7) {

		tr[x].appendChild(td[y]);
		y++;""



	}
	

	x = x+1;
	horario = horario +1;

}

i=0;

//Insere as tr's no calendário

while(i<31) {

	$('tbody#terceiro')[0].appendChild(tr[i]);
	i = i+1;
}

//Tarefa => Organizar as disciplinas de acordo com o curso no qual o aluno está matriculado
//e vincular as disciplinas nas quais o aluno já está matriculado.

	//var cursoAluno = 2; //Declarado para testar um curso
	var normalizador = "option[value=" + cursoAluno + "]"; //Normaliza o seletor
	//todasMatriculas = matriculas[1262]; //Informa qual é o aluno
	$(normalizador)[0].selected = true; //Seleciona o curso 
	organizaDisciplinas(); //Organiza as disciplinas na tabela de acordo com o curso selecionado
	po=0;
	while(po<todasMatriculas.length) //Enquanto for menor do que as matrículas do aluno
	{
		var normalizador = "input[value=" + todasMatriculas[po] + "]"; //Normaliza os inputs
		$(normalizador)[0].checked = true; //Marca o input específico
		verificacao($(normalizador)[0]); //Executa a validação para o input marcado no calendário
		po++;

	}

	var x = 0;

while(x<disciplinas.length) //Enquanto for menor do que a array disciplinas
{

      var input = "input[value=" + disciplinas[x] + "]"; //Pega a disciplina da array
      var normalizador = $(input)[0]; //Normaliza
      validaLinha(normalizador); //Executa o validador de linhas
      x++;

}


});



