   //Obs.: Algumas funções estão sendo chamadas inline via HTML.

   
   

function verificaDia(verificardisciplina, dia) { //Retorna o dia de acordo com o valor especificado

  switch(verificardisciplina["horarios"][dia]["semana"]) {

    case 0: 
    return "Domingo ";
    break;
    case 1:
    return "Segunda-feira ";
    break;
    case 2: 
    return "Terça-feira ";
    break;
    case 3:
    return "Quarta-feira ";
    break;
    case 4:
    return "Quinta-feira ";
    break;
    case 5:
    return "Sexta-feira ";
    break;
    case 6:
    return "Sábado ";

  }

}



function converteDia(valor) { //Retorna o dia de acordo com o valor especificado
  
  switch(valor) {

    case 0: 
    return "Domingo ";
    break;
    case 1:
    return "Segunda-feira ";
    break;
    case 2: 
    return "Terça-feira ";
    break;
    case 3:
    return "Quarta-feira ";
    break;
    case 4:
    return "Quinta-feira ";
    break;
    case 5:
    return "Sexta-feira ";
    break;
    case 6:
    return "Sábado ";

  }

}



function verificaHora(verificardisciplina, dia) { //Função que verifica o horário da disciplina, de acordo com o dia informado


  var tamanhohoras = verificardisciplina["horarios"][dia]["horas"].length;
  
  return "das " + verificardisciplina["horarios"][dia]["horas"][0] + " às " + verificardisciplina["horarios"][dia]["horas"][tamanhohoras-1];

}


function verificaPeriodicidade(verificardisciplina, dia) { //Função que verifica o horário da disciplina, de acordo com o dia informado

  return verificardisciplina["horarios"][dia]["periodicidade_extenso"];

}


   function clicar() { //Função que mostrao calendário na tela

   		if($('div#calendario')[0].style.cssText == "display: none;") {

  		$('div#calendario')[0].style.cssText = "display: block;";
      $('div#disciplinaspegas')[0].style.cssText = "display: block;";

  	}

  	else{

  		$('div#calendario')[0].style.cssText = "display: none;";
      $('div#disciplinaspegas')[0].style.cssText = "display: none";

  	}


   }

   //Execução da função quinzenal, ao se clicar no botão 
   //"Visualização quinzenal" => atualmente desativado.
/*
   function quinzenal() {

   	if($('tbody#segundo')[0].style.cssText == "display: none;"){
   		$('tbody#segundo')[0].style.cssText = "";
   		$('#mudarcalendario')[0].innerText = "Alterar para visualização semanal";
      $('tbody#terceiro')[0].style.cssText = "";
      $('tbody#primeiro')[0].style.cssText = "display: none;";
      $('#calendario1quinzenal')[0].style.cssText = "float: left;";
      $('#calendario2quinzenal')[0].style.cssText = "float: right;";
   	}

   	else if($('tbody#segundo')[0].style.cssText == "") {
   		$('tbody#segundo')[0].style.cssText = "display: none;";
   		$('#mudarcalendario')[0].innerText = "Alterar para visualização quinzenal";
      $('tbody#terceiro')[0].style.cssText = "display: none;";
      $('tbody#primeiro')[0].style.cssText = "";
   	}
   }
   */



        // document.getElementById("dias").innerHTML = (todasDisciplinas[i].horarios[1].horas + "");
        

function retornaHorario(valor) { //Retorna o horário baseado no valor inserido

switch(valor) {

  case 0:
  return "08:00";

  case 1:
  return "08:30";

  case 2:
  return "09:00";

  case 3:
  return "09:30";

  case 4:
  return "10:00";

  case 5:
  return "10:30";

  case 6:
  return "11:00";

  case 7:
  return "11:30";

  case 8:
  return "12:00";

  case 9:
  return "12:30";

  case 10:
  return "13:00";

  case 11:
  return "13:30";

  case 12:
  return "14:00";

  case 13:
  return "14:30";

  case 14:
  return "15:00";

  case 15:
  return "15:30";

  case 16:
  return "16:00";

  case 17:
  return "16:30";

  case 18:
  return "17:00";

  case 19:
  return "17:30";

  case 20:
  return "18:00";

  case 21:
  return "18:30";

  case 22:
  return "19:00";

  case 23:
  return "19:30";

  case 24:
  return "20:00";

  case 25:
  return "20:30";

  case 26:
  return "21:00";

  case 27:
  return "21:30";

  case 28:
  return "22:00";

  case 29: 
  return "22:30";

  case 30:
  return "23:00";

}
}

function quantosDias(disciplina) //Retorna a quantidade de dias na semana em que a disciplina é ministrada
{

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina
  return todasDisciplinas[numerodisciplina]['horarios'].length; //Pega a quantidade de dias da semana em que a disciplina é ministrada

}


function periodicidadeDisciplina(disciplina, dia) //Retorna a periodicidade
{ //Verifica se é semanal ou quinzenal

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina
  return todasDisciplinas[numerodisciplina]['horarios'][dia]['periodicidade_extenso'];
  


}


function disciplinaConflitanteSemanal(disciplina, qualdia) //Verifica se a disciplina semanal possui conflito

{

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina

  var dia = todasDisciplinas[numerodisciplina]["horarios"][qualdia]["semana"]; //Pega o dia não-convertido em que a disciplina é ministrada

          var tamanhohorarios = todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'].length;

          x=0; //variável de controle
          var horariosarray = [];
            

  while(x<tamanhohorarios-1) 
  {

           
            horariosarray[x] =  todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][0] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][1] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][3] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][4];
            x = x+1;


  }
          
          x=0;

  while(x<tamanhohorarios-1) 
  
  {

      var seletor = "." + "quinzenaum_" + dia + "_" + horariosarray[x];
      var seletor2 = "." + "quinzenadois_" + dia + "_" + horariosarray[x];
  
    if($(seletor)[0].style.backgroundColor == "rgb(0, 100, 0)"  || $(seletor2)[0].style.backgroundColor == "rgb(0, 100, 0)" || $(seletor)[0].style.backgroundColor == "rgb(29, 40, 163)" || $(seletor2)[0].style.backgroundColor == "rgb(29, 40, 163)" ) 
    {
      
    break;

    }

    else 
    {

    return false;
  
    }
  



  x = x+1;
    


  }

  
}


function pintarCalendarioSemanal(disciplina, qualdia) //Pinta o calendário para disciplinas quinzenais

{

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina

  var dia = todasDisciplinas[numerodisciplina]["horarios"][qualdia]["semana"]; //Pega o dia não-convertido em que a disciplina é ministrada

        var tamanhohorarios = todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'].length;

        x=0; //variável de controle
        var horariosarray = [];
            

  while(x<tamanhohorarios-1) 
  {

           
            horariosarray[x] =  todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][0] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][1] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][3] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][4];
            x = x+1;


  }
  x=0; //reinicializa a variável de controle

  while(x<horariosarray.length) 
  {

            var seletor = "." + "quinzenaum_" + dia + "_" + horariosarray[x];
            var seletor2 = "." + "quinzenadois_" + dia + "_" + horariosarray[x];

            if(todasDisciplinas[numerodisciplina].nome_campus == "Campus Santo André")
            {
              $(seletor)[0].style.backgroundColor = "rgb(0, 100, 0)";
            }
            else
            {
              $(seletor)[0].style.backgroundColor = "rgb(29, 40, 163)";
            }
            
            $(seletor)[0].classList.add(numerodisciplina);
            if(todasDisciplinas[numerodisciplina].codigo.length > 7) 
            {
              var codigodisciplina = todasDisciplinas[numerodisciplina].codigo[0] + todasDisciplinas[numerodisciplina].codigo[1] + todasDisciplinas[numerodisciplina].codigo[2] + todasDisciplinas[numerodisciplina].codigo[3] + todasDisciplinas[numerodisciplina].codigo[4] + todasDisciplinas[numerodisciplina].codigo[5] + todasDisciplinas[numerodisciplina].codigo[6];
            }
            else
            {
              var codigodisciplina = todasDisciplinas[numerodisciplina].codigo;
            }
            $(seletor)[0].innerHTML = codigodisciplina;

           // $(seletor)[0].innerHTML = todasDisciplinas[numerodisciplina].codigo;

            if(todasDisciplinas[numerodisciplina].nome_campus == "Campus Santo André")
            {
              $(seletor2)[0].style.backgroundColor = "rgb(0, 100, 0)";
            }
            else
            {
              $(seletor2)[0].style.backgroundColor = "rgb(29, 40, 163)";
            }
            $(seletor2)[0].classList.add(numerodisciplina);

            if(todasDisciplinas[numerodisciplina].codigo.length > 7) 
            {
              var codigodisciplina = todasDisciplinas[numerodisciplina].codigo[0] + todasDisciplinas[numerodisciplina].codigo[1] + todasDisciplinas[numerodisciplina].codigo[2] + todasDisciplinas[numerodisciplina].codigo[3] + todasDisciplinas[numerodisciplina].codigo[4] + todasDisciplinas[numerodisciplina].codigo[5] + todasDisciplinas[numerodisciplina].codigo[6];
            }
            else
            {
              var codigodisciplina = todasDisciplinas[numerodisciplina].codigo;
            }

            
            $(seletor2)[0].innerHTML = codigodisciplina;
            
            x++;

  }


}

function alertaCalendario(disciplina) //Emite o alerta informando que houve conflito e desmarca a disciplina
{

  $('.conflito')[0].style.display = "block";
  var numerodisciplina = disciplina['value']; //Pega o número da disciplina
  var normalizador = "input[value=" + numerodisciplina + "]";
  $(normalizador)[0].checked = false;
  $('div#fundopreto')[0].style.display = "block";
  

}

function limpacorCalendarioSemanal(disciplina, qualdia) //Limpa o calendário quando desmarca disciplina
{

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina

  var dia = todasDisciplinas[numerodisciplina]["horarios"][qualdia]["semana"]; //Pega o dia não-convertido em que a disciplina é ministrada

        var tamanhohorarios = todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'].length;

        x=0; //variável de controle
        var horariosarray = [];
            

  while(x<tamanhohorarios-1) 
  {

           
            horariosarray[x] =  todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][0] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][1] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][3] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][4];
            x = x+1;


  }
  x=0; //reinicializa a variável de controle

  while(x<horariosarray.length) 
  {

            var seletor = "." + "quinzenaum_" + dia + "_" + horariosarray[x];
            var seletor2 = "." + "quinzenadois_" + dia + "_" + horariosarray[x];

            $(seletor)[0].style.backgroundColor = "";
            $(seletor)[0].classList.remove(numerodisciplina);
            $(seletor)[0].innerHTML = "";

            $(seletor2)[0].style.backgroundColor = "";
            $(seletor2)[0].classList.remove(numerodisciplina);
            $(seletor2)[0].innerHTML = "";
            
            x++;

  }

}

function verificaDisciplinaSelecionada(disciplina, qualdia) { //Verifica se é disciplina repetida

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina

  var dia = todasDisciplinas[numerodisciplina]["horarios"][qualdia]["semana"]; //Pega o dia não-convertido em que a disciplina é ministrada

        var tamanhohorarios = todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'].length;

        x=0; //variável de controle
        var horariosarray = [];
            

  while(x<tamanhohorarios-1) 
  {

           
            horariosarray[x] =  todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][0] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][1] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][3] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][4];
            x = x+1;


  }
  x=0; //reinicializa a variável de controle

  

    var seletor = "." + "quinzenaum_" + dia + "_" + horariosarray[0];
    var seletor2 = "." + "quinzenadois_" + dia + "_" + horariosarray[0];


    if($(seletor)[0].classList.contains(numerodisciplina) || $(seletor2)[0].classList.contains(numerodisciplina)) 
    {

      return true;

    }

    else {
      return false;
    }

    

  


}

function fecharalerta() { //Função que fecha a janela de erro

  $('.conflito')[0].style.display = "none";
  $('div#fundopreto')[0].style.display = "none";

}

function pintarCalendarioQuinzenal(disciplina, qualdia, quinzena) //Pinta o calendário quinzenal
{

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina

  var dia = todasDisciplinas[numerodisciplina]["horarios"][qualdia]["semana"]; //Pega o dia não-convertido em que a disciplina é ministrada

        var tamanhohorarios = todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'].length;

        x=0; //variável de controle
        var horariosarray = [];
            

  while(x<tamanhohorarios-1) 
  {

           
            horariosarray[x] =  todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][0] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][1] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][3] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][4];
            x = x+1;


  }
  x=0; //reinicializa a variável de controle

  while(x<horariosarray.length) 
  {

      if(quinzena == 1) {

        var seletor = "." + "quinzenaum_" + dia + "_" + horariosarray[x];
        if(todasDisciplinas[numerodisciplina].nome_campus == "Campus Santo André")
            {
              $(seletor)[0].style.backgroundColor = "rgb(0, 100, 0)";
            }
            else
            {
              $(seletor)[0].style.backgroundColor = "rgb(29, 40, 163)";
            }
        $(seletor)[0].classList.add(numerodisciplina);
        $(seletor)[0].innerHTML = todasDisciplinas[numerodisciplina].codigo;
      }

      else if(quinzena == 2) {

        var seletor = "." + "quinzenadois_" + dia + "_" + horariosarray[x];
        if(todasDisciplinas[numerodisciplina].nome_campus == "Campus Santo André")
            {
              $(seletor)[0].style.backgroundColor = "rgb(0, 100, 0)";
            }
            else
            {
              $(seletor)[0].style.backgroundColor = "rgb(29, 40, 163)";
            }
        $(seletor)[0].classList.add(numerodisciplina);
        if(todasDisciplinas[numerodisciplina].codigo.length > 7) 
        {
          var codigodisciplina = todasDisciplinas[numerodisciplina].codigo[0] + todasDisciplinas[numerodisciplina].codigo[1] + todasDisciplinas[numerodisciplina].codigo[2] + todasDisciplinas[numerodisciplina].codigo[3] + todasDisciplinas[numerodisciplina].codigo[4] + todasDisciplinas[numerodisciplina].codigo[5] + todasDisciplinas[numerodisciplina].codigo[6];
        }
        else
        {
          var codigodisciplina = todasDisciplinas[numerodisciplina].codigo;
        }

            
            $(seletor)[0].innerHTML = codigodisciplina;
        //$(seletor)[0].innerHTML = todasDisciplinas[numerodisciplina].codigo;

      }

            
            
            x++;

  }


}

function limpacorCalendarioQuinzenal(disciplina, qualdia, quinzena) //Limpa o calendário quinzenal
{

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina

  var dia = todasDisciplinas[numerodisciplina]["horarios"][qualdia]["semana"]; //Pega o dia não-convertido em que a disciplina é ministrada

        var tamanhohorarios = todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'].length;

        x=0; //variável de controle
        var horariosarray = [];
            

  while(x<tamanhohorarios-1) 
  {

           
            horariosarray[x] =  todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][0] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][1] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][3] + todasDisciplinas[numerodisciplina]['horarios']

[qualdia]['horas'][x][4];
            x = x+1;


  }
  x=0; //reinicializa a variável de controle

  while(x<horariosarray.length) 
  {
    if(quinzena == 1){

      var seletor = "." + "quinzenaum_" + dia + "_" + horariosarray[x];
      $(seletor)[0].style.backgroundColor = "";
      $(seletor)[0].classList.remove(numerodisciplina);
      $(seletor)[0].innerHTML = "";
    }

    else if(quinzena == 2) {

      var seletor = "." + "quinzenadois_" + dia + "_" + horariosarray[x];
      $(seletor)[0].style.backgroundColor = "";
      $(seletor)[0].classList.remove(numerodisciplina);
      $(seletor)[0].innerHTML = "";

    }
    
    x++;
            
            
         

  }

}

function disciplinaConflitanteQuinzenal(disciplina, qualdia, quinzena) //Verifica se há conflito quinzenal
{

  var numerodisciplina = ($(disciplina)[0]['id']); //Pega o número da disciplina

  var dia = todasDisciplinas[numerodisciplina]["horarios"][qualdia]["semana"]; //Pega o dia não-convertido em que a disciplina é ministrada

          var tamanhohorarios = todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'].length;

          x=0; //variável de controle
          var horariosarray = [];
            

  while(x<tamanhohorarios-1) 
  {

           
            horariosarray[x] =  todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][0] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][1] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][3] + todasDisciplinas[numerodisciplina]['horarios'][qualdia]['horas'][x][4];
            x = x+1;


  }
          
          x=0;

  while(x<tamanhohorarios-1) 
  {

    if(quinzena == 1)
{//1
      var seletor = "." + "quinzenaum_" + dia + "_" + horariosarray[x];
      if($(seletor)[0].style.backgroundColor == "rgb(0, 100, 0)" || $(seletor)[0].style.backgroundColor == "rgb(29, 40, 163)")   
    {//2
      
    break;

    }//2

    else 
    {//3

    return false;
  
    }//3
}//1

    if(quinzena == 2)
    {//4
      var seletor = "." + "quinzenadois_" + dia + "_" + horariosarray[x];
      if($(seletor)[0].style.backgroundColor == "rgb(0, 100, 0)" || $(seletor)[0].style.backgroundColor == "rgb(29, 40, 163)")   
      {//5
      
      break;

      }//5

      else 
      {//6

      return false;
  
      }//6

    }//4
  x = x+1;


  }
}


function buscaNome() //Função do filtro por busca de nome
{

var valorbusca = $('input#busca')[0].value;
var valorbuscaconvertido = valorbusca.toUpperCase();

x=0//Variável de controle
qtddisciplinas = $('#tabeladisciplinas > tr > td:nth-child(2)').length;

while(x < qtddisciplinas) 
{
  var valorbuscado = $('#tabeladisciplinas > tr > td:nth-child(3)')[x].innerHTML.toUpperCase().indexOf(valorbuscaconvertido);

  if(valorbuscado != -1) 
  {

  $('#tabeladisciplinas > tr')[x].style.display = "";

  }

  else 
  {
  $('#tabeladisciplinas > tr')[x].style.display = "none";
  
  }

x++;



}



}

function buscaCampus(campus) //Função do filtro de busca por campus
{
	var start = new Date().getTime();
	x=0; //Variável de controle

 console.log('chamou essa funcao');

qtddisciplinas = $('#tabeladisciplinas > tr > td:nth-child(2)').length;

  while(x < qtddisciplinas) 
  {
  
    if(campus == "sa") 
    {
      var comparativo = "Santo André";
      if($('#tabeladisciplinas > tr > td:nth-child(3)')[x].innerHTML.indexOf(comparativo) != -1) 
      {
        //Não fazer nada se a disciplina for de Santo André
      }
      else
      {
        $('#tabeladisciplinas > tr')[x].style.display = "none"; //Esconder se for de São Bernardo
      }
    }

    else if(campus == "sbc") 
    {
      var comparativo = "São Bernardo";
      if($('#tabeladisciplinas > tr > td:nth-child(3)')[x].innerHTML.indexOf(comparativo) != -1) 
      {
        //Não fazer nada se a disciplina for de São Bernardo
      }
      else
      {
        $('#tabeladisciplinas > tr')[x].style.display = "none"; //Esconder se for de Santo André
      }
    }
  
    x++;

  }
  var end = new Date().getTime();
  var time = end - start;
  console.log(time);
}


function buscaVagas() //Filtra as disciplinas que possuem mais vagas do que requisições
{
x=0; //Variável de controle



qtddisciplinas = $('#tabeladisciplinas > tr > td:nth-child(2)').length;

  while(x < qtddisciplinas) 
  {
  
      var normalizadorvagas = "input[id=" + x + "]"; //Pega o número do todasDisciplinas
      var selecionadisciplina = $(normalizadorvagas)[0].value; //Pega o id
      var montarqtdvagas = "tr[value=" + selecionadisciplina + "]" + ">td[value=" + selecionadisciplina + "]"; 
      var qtdvagas = $(montarqtdvagas)[0].innerHTML;
      var qtdrequisicoes = $(montarqtdvagas)[1].innerHTML;
      


      if(qtdvagas > qtdrequisicoes) 
      {
        //Não fazer nada 
      }
      else
      {
        var identificatr = "tr[value=" + selecionadisciplina + "]";
        $(identificatr)[0].style.display = "none"; //Esconder
      }
   x++;

  }


}

//Não está sendo utilizada
/*
function mostrarfiltros() 
{

  if($('#filtros')[0].style.display == "") 
  {

    $('#filtros')[0].style.display = "block";
    $('#mostrarfiltros')[0].innerHTML = "Esconder filtros";
    $("#mostrarfiltros")[0].classList.remove("btn-success");
    $("#mostrarfiltros")[0].classList.add("btn-danger");


  }
else {

  $('#filtros')[0].style.display = "";
  $('#mostrarfiltros')[0].innerHTML = "Mostrar filtros";
  $("#mostrarfiltros")[0].classList.add("btn-success");
  $("#mostrarfiltros")[0].classList.remove("btn-danger");

}


}
*/




function organizaDisciplinas() //Organiza as disciplinas de acordo com o curso selecionado
{

  $('select')[0].disabled = false;

  

  //TODO arrumar essa porquice
  $('table#tabeladisciplinas')[0].innerHTML = '';
  $('table#tabeladisciplinas')[0].innerHTML = '<th style="width:20px">Selecionar</th><th style="width:100px">Código</th><th>Discipina (Campus)</th><th style="width: 30px">Vagas</th><th style="width:30px;">Requisições</th><th style="width:100px;">T-P-I</th><th style="width: 350px;">Horário</th>';
  $('table#tabeladisciplinas')[1].innerHTML = '';
  $('table#tabeladisciplinas')[1].innerHTML = '<th style="width:20px">Selecionar</th><th style="width:100px">Código</th><th>Discipina (Campus)</th><th style="width: 30px">Vagas</th><th style="width:30px;">Requisições</th><th style="width:100px;">T-P-I</th><th style="width: 350px;">Horário</th>';
  $('table#tabeladisciplinas')[2].innerHTML = '';
  $('table#tabeladisciplinas')[2].innerHTML = '<th style="width:20px">Selecionar</th><th style="width:100px">Código</th><th>Discipina (Campus)</th><th style="width: 30px">Vagas</th><th style="width:30px;">Requisições</th><th style="width:100px;">T-P-I</th><th style="width: 350px;">Horário</th>';


  //Início do código

var i=0;  //variável de controle

/*

Tarefa 1 => Listar as disciplinas

Enquanto a variável de controle for menor do que a quantidade total de 
disciplinas ofertadas, será executada a função abaixo: 

*/


while(i < todasDisciplinas.length){

var tr = document.createElement("tr"); //Cria linha da tabela
tr.setAttribute("value", todasDisciplinas[i].id); //Atribui id à linha


//Novo código
var p=0;

while(p<todasDisciplinas[i]['horarios'].length) //Quantidade de dias da disciplina
{
var cc = 0;
var codigodisciplina = "";
while(cc<todasDisciplinas[i].codigo.length)
{
  if(todasDisciplinas[i].codigo[cc] != "-")
  {
    codigodisciplina = codigodisciplina + todasDisciplinas[i].codigo[cc];
  }
  cc++;
}

  if(todasDisciplinas[i]['horarios'][p]['periodicidade_extenso'] == " - semanal")
  {
     var u = 0; //Variável de controle

    while(u<(todasDisciplinas[i]['horarios'][p]['horas'].length-1))
    {
     

      
        tr.className = tr.className + "quinzenaum" + todasDisciplinas[i]['horarios'][p]['semana'] + "_" + todasDisciplinas[i]['horarios'][p]['horas'][u][0] + todasDisciplinas[i]['horarios'][p]['horas'][u][1] + todasDisciplinas[i]['horarios'][p]['horas'][u][3] + todasDisciplinas[i]['horarios'][p]['horas'][u][4] + " quinzenadois" + todasDisciplinas[i]['horarios'][p]['semana'] + "_" + todasDisciplinas[i]['horarios'][p]['horas'][u][0] + todasDisciplinas[i]['horarios'][p]['horas'][u][1] + todasDisciplinas[i]['horarios'][p]['horas'][u][3] + todasDisciplinas[i]['horarios'][p]['horas'][u][4] + " ";
        u++;
      }

      

      tr.className = tr.className + codigodisciplina + " ";
    
    

  }

  else if(todasDisciplinas[i]['horarios'][p]['periodicidade_extenso'] == " - quinzenal (I)")
  {
     var u = 0; //Variável de controle

    while(u<todasDisciplinas[i]['horarios'][p]['horas'].length-1)
    {  
   
        tr.className = tr.className + "quinzenaum" + todasDisciplinas[i]['horarios'][p]['semana'] + "_" + todasDisciplinas[i]['horarios'][p]['horas'][u][0] + todasDisciplinas[i]['horarios'][p]['horas'][u][1] + todasDisciplinas[i]['horarios'][p]['horas'][u][3] + todasDisciplinas[i]['horarios'][p]['horas'][u][4] + " ";
        u++;
    }

      


    tr.className = tr.className + codigodisciplina;
    

  }

  else if(todasDisciplinas[i]['horarios'][p]['periodicidade_extenso'] == " - quinzenal (II)")
  {
     var u = 0; //Variável de controle

    while(u<todasDisciplinas[i]['horarios'][p]['horas'].length-1)
    {  
   
        tr.className = tr.className + "quinzenadois" + todasDisciplinas[i]['horarios'][p]['semana'] + "_" + todasDisciplinas[i]['horarios'][p]['horas'][u][0] + todasDisciplinas[i]['horarios'][p]['horas'][u][1] + todasDisciplinas[i]['horarios'][p]['horas'][u][3] + todasDisciplinas[i]['horarios'][p]['horas'][u][4] + " ";
        u++;
    }

      

    tr.className = tr.className + codigodisciplina;
    
    

  }



  

 
  p++;

}



  

  





//Fim do novo código










var td = []; //Cria array para as tags td

var li = document.createElement("li"); //Cria linha

var w = 0 //Variável de controle

//Cria 7 tags td e as vincula à array td

while(w<7) {

  td[w] = document.createElement("td");
  w++;

}

//Vincula o elemento lista ao primeiro elemento da array td

td[0].appendChild(li);
td[3].setAttribute("value", todasDisciplinas[i].id);
td[4].setAttribute("value", todasDisciplinas[i].id);


var w = 0; //Reinicializa a variável de controle

td[0].firstChild.innerHTML = '<input type="checkbox"' + ' value="' + todasDisciplinas[i].id + '"' + ' id="' + i + '"' + " onchange='verificacao(this)'" + " name='disciplina_ids[]'" + ">";
td[1].textContent = todasDisciplinas[i].codigo; //Vincula o código da disciplina
//td[2].textContent = todasDisciplinas[i].nome; //Vincula o nome da disciplina e campus

var span = document.createElement('span');
span.textContent = todasDisciplinas[i].nome;

if(todasDisciplinas[i].campus == 1) {
span.className = "sa";
}
else {
  span.className = "sbc";
}
td[2].appendChild(span);
 td[3].textContent = todasDisciplinas[i].vagas;

if((periodoMatricula || periodoSegundoQuadrimestre) && todasDisciplinas[i].vagas_ingressantes != null)
{

   if(alunoIngressante)
   {

    td[3].textContent = todasDisciplinas[i].vagas_ingressantes;


   }
   else
   {

    td[3].textContent = todasDisciplinas[i].vagas - todasDisciplinas[i].vagas_ingressantes;

   }

}




if((periodoMatricula || periodoSegundoQuadrimestre) && todasDisciplinas[i].vagas_ingressantes != null)
{

  if(alunoIngressante)
   {

    if(contagemMatriculasIngressantes[todasDisciplinas[i].id] == undefined) 
    {

    td[4].textContent = 0;
     }
    else 
    {
    td[4].textContent = contagemMatriculasIngressantes[todasDisciplinas[i].id];
    }

    //td[4].textContent = todasDisciplinas[i].vagas_ingressantes;


   }
   else
   {

    //td[4].textContent = contagemMatriculas[todasDisciplinas[i].id] - contagemMatriculasIngressantes[todasDisciplinas[i].id];
    td[4].textContent = contagemMatriculas[todasDisciplinas[i].id];

    //td[4].textContent = todasDisciplinas[i].vagas - todasDisciplinas[i].vagas_ingressantes;

   }

  /*if(contagemMatriculasIngressantes[todasDisciplinas[i].id] == undefined) 
  {

    td[4].textContent = 0;
  }
  else 
  {
    td[4].textContent = contagemMatriculasIngressantes[todasDisciplinas[i].id];
  }
*/

}

else
{
  if(contagemMatriculas[todasDisciplinas[i].id] == undefined) 
  {

    td[4].textContent = 0;
  }

  else 
  {

    td[4].textContent = contagemMatriculas[todasDisciplinas[i].id];
  
  } 

}




td[5].textContent = "(" + todasDisciplinas[i].tpi[0]+"-"+todasDisciplinas[i].tpi[1]+"-"+todasDisciplinas[i].tpi[2] + ")"; //Vincula o T-P-I



/* Vincula os dias da semana e horários das disciplinas */

/* Verifica, inicialmente, qual é a quantidade total de dias da disciplina, 
após isso, identifica quais são os dias em que a disciplina é ministrada.

*/






//var horariofinal = organizaHorarios(todasDisciplinas[i]);


if(todasDisciplinas[i]["horarios"].length == 1) {

  var dia1 = verificaDia(todasDisciplinas[i], 0);
  var horario1 = verificaHora(todasDisciplinas[i], 0);
  var periodicidade1 = verificaPeriodicidade(todasDisciplinas[i], 0);
  var horariofechado1 = dia1 + horario1 + periodicidade1;
  var horariofinal = horariofechado1;

}

else if(todasDisciplinas[i]["horarios"].length == 2) {


  var dia1 = verificaDia(todasDisciplinas[i], 0);
  var horario1 = verificaHora(todasDisciplinas[i], 0);
  var periodicidade1 = verificaPeriodicidade(todasDisciplinas[i], 0);
  var horariofechado1 = dia1 + horario1 + periodicidade1;
  

  var dia2 = verificaDia(todasDisciplinas[i], 1);
  var horario2 = verificaHora(todasDisciplinas[i], 1);
  var periodicidade2 = verificaPeriodicidade(todasDisciplinas[i], 1);

  var horariofechado2 = dia2 + horario2 + periodicidade2;


  var horariofinal = horariofechado1 + "<br>" + horariofechado2;


  }

else if(todasDisciplinas[i]["horarios"].length == 3) {


  var dia1 = verificaDia(todasDisciplinas[i], 0);
  var horario1 = verificaHora(todasDisciplinas[i], 0);
  var periodicidade1 = verificaPeriodicidade(todasDisciplinas[i], 0);
  var horariofechado1 = dia1 + horario1 + periodicidade1;
  

  var dia2 = verificaDia(todasDisciplinas[i], 1);
  var horario2 = verificaHora(todasDisciplinas[i], 1);
  var periodicidade2 = verificaPeriodicidade(todasDisciplinas[i], 1);
  var horariofechado2 = dia2 + horario2 + periodicidade2;

  var dia3 = verificaDia(todasDisciplinas[i], 2);
  var horario3 = verificaHora(todasDisciplinas[i], 2);
  var periodicidade3 = verificaPeriodicidade(todasDisciplinas[i], 2);
  var horariofechado3 = dia3 + horario3 + periodicidade3;


  var horariofinal = horariofechado1 + "<br>" + horariofechado2 + "<br>" + horariofechado3;


}

else if(todasDisciplinas[i]["horarios"].length == 4) 
{

  var dia1 = verificaDia(todasDisciplinas[i], 0);
  var horario1 = verificaHora(todasDisciplinas[i], 0);
  var periodicidade1 = verificaPeriodicidade(todasDisciplinas[i], 0);
  var horariofechado1 = dia1 + horario1 + periodicidade1;
  

  var dia2 = verificaDia(todasDisciplinas[i], 1);
  var horario2 = verificaHora(todasDisciplinas[i], 1);
  var periodicidade2 = verificaPeriodicidade(todasDisciplinas[i], 1);
  var horariofechado2 = dia2 + horario2 + periodicidade2;

  var dia3 = verificaDia(todasDisciplinas[i], 2);
  var horario3 = verificaHora(todasDisciplinas[i], 2);
  var periodicidade3 = verificaPeriodicidade(todasDisciplinas[i], 2);
  var horariofechado3 = dia3 + horario3 + periodicidade3;

  var dia4 = verificaDia(todasDisciplinas[i], 3);
  var horario4 = verificaHora(todasDisciplinas[i], 3);
  var periodicidade4 = verificaPeriodicidade(todasDisciplinas[i], 3);
  var horariofechado4 = dia4 + horario4 + periodicidade4;


  var horariofinal = horariofechado1 + "<br>" + horariofechado2 + "<br>" + horariofechado3 + "<br>" + horariofechado4;



}

else if(todasDisciplinas[i]["horarios"].length == 5) 
{

  var dia1 = verificaDia(todasDisciplinas[i], 0);
  var horario1 = verificaHora(todasDisciplinas[i], 0);
  var periodicidade1 = verificaPeriodicidade(todasDisciplinas[i], 0);
  var horariofechado1 = dia1 + horario1 + periodicidade1;
  

  var dia2 = verificaDia(todasDisciplinas[i], 1);
  var horario2 = verificaHora(todasDisciplinas[i], 1);
  var periodicidade2 = verificaPeriodicidade(todasDisciplinas[i], 1);
  var horariofechado2 = dia2 + horario2 + periodicidade2;

  var dia3 = verificaDia(todasDisciplinas[i], 2);
  var horario3 = verificaHora(todasDisciplinas[i], 2);
  var periodicidade3 = verificaPeriodicidade(todasDisciplinas[i], 2);
  var horariofechado3 = dia3 + horario3 + periodicidade3;

  var dia4 = verificaDia(todasDisciplinas[i], 3);
  var horario4 = verificaHora(todasDisciplinas[i], 3);
  var periodicidade4 = verificaPeriodicidade(todasDisciplinas[i], 3);
  var horariofechado4 = dia4 + horario4 + periodicidade4;

  var dia5 = verificaDia(todasDisciplinas[i], 4);
  var horario5 = verificaHora(todasDisciplinas[i], 4);
  var periodicidade5 = verificaPeriodicidade(todasDisciplinas[i], 4);
  var horariofechado5 = dia5 + horario5 + periodicidade5;


  var horariofinal = horariofechado1 + "<br>" + horariofechado2 + "<br>" + horariofechado3 + "<br>" + horariofechado4 + "<br>" + horariofechado5;



}



td[6].innerHTML = horariofinal; //Vincula o horário à última td

//Vincula as sete td's à tr

while(w<7) {

tr.appendChild(td[w]);
w++;

}

//Insere as informações na tabela de disciplinas.


var cursoselecionado = $('#curso')[0].value;
var obrigatoriedades = todasDisciplinas[i].obrigatoriedades.length;
var x = 0 //Variável de controle
//var encontrada = false;

if(obrigatoriedades == 0)
{
$('div#disciplinaslivres>table')[0].appendChild(tr);
}
else if(obrigatoriedades >= 1)
{

while(x<obrigatoriedades){
  if (todasDisciplinas[i].obrigatoriedades[x].curso_id == cursoselecionado && todasDisciplinas[i].obrigatoriedades[x].obrigatoriedade == "obrigatoria") 
  {

    
    $('div#disciplinasobrigatorias>table')[0].appendChild(tr);
    break;

  }

  else if(todasDisciplinas[i].obrigatoriedades[x].curso_id == cursoselecionado && todasDisciplinas[i].obrigatoriedades[x].obrigatoriedade == "limitada") 
  {

     $('div#disciplinaslimitadas>table')[0].appendChild(tr);
      break;

  }

  else if(x == (obrigatoriedades-1)) 
  {

       $('div#disciplinaslivres>table')[0].appendChild(tr);
      

  }


  
  x++;
}
}









i++; //incrementa para puxar a próxima disciplina

}
repreencherDisciplinas();
var x = 0;
while(x<disciplinas.length)
{

      var input = "input[value=" + disciplinas[x] + "]"; //Alterado
      var normalizador = $(input)[0];
      validaLinha(normalizador); 
      x++;

}


mesmaDisciplina();
controlaMesmoCodigo();



}

function insereDisciplina(iddisciplina) //Insere disciplina no array disciplinas e insere a classe mesmadisciplina das linhas da tabela
{

  disciplinas.push(iddisciplina);
  x=0;
  /*while(x<disciplinas.length)
  {

    var normalizador = "tr[id=" + $(disciplinas)[x] + "]";
    var valorseletor = $(normalizador)[0];
    valorseletor.classList.add("mesmadisciplina");
    x++;

  }*/
  mesmaDisciplina(); //Insere a classe nas disciplinas selecionadas.
  
}

function insereCodigo(codigo)
{

  codigosdisciplinas.push(codigo);

}

function removeCodigo(codigo) //Remove disciplina do array disciplinas e remove a classe mesmadisciplina das linhas da tabela
{

  var index = codigosdisciplinas.indexOf(codigo);
  if (index > -1) 
  {
    codigosdisciplinas.splice(index, 1);
  }
  var normalizador = "tr." + codigo;
  var valorseletor = $(normalizador)[0];
  valorseletor.classList.remove("mesmocodigo");




}

function mesmaDisciplina() //Insere a classe mesmadisciplina
{

  x=0;
  while(x<disciplinas.length)
  {
    var normalizador = "tr[value=" + $(disciplinas)[x] + "]";
    var valorseletor = $(normalizador)[0];
    valorseletor.classList.add("mesmadisciplina");

    x++;
  }  

}

function removeDisciplina(iddisciplina) //Remove disciplina do array disciplinas e remove a classe mesmadisciplina das linhas da tabela
{

  var index = disciplinas.indexOf(iddisciplina);
  if (index > -1) 
  {
    disciplinas.splice(index, 1);
  }
  var normalizador = "tr[value=" + iddisciplina + "]";
  var valorseletor = $(normalizador)[0];
  valorseletor.classList.remove("mesmadisciplina");




}

function repreencherDisciplinas() //Pega as disciplinas da array disciplinas e preenche os campos
{

  var i = 0 //Variável de controle
  while(i<disciplinas.length) 
  {
    var preencher = disciplinas[i];
    var arrumando = "input[value=" + preencher + "]";
    $(arrumando)[0].checked = true;

    i++;
  }

}







function validaLinha(elem) //Adiciona e remove os conflitos entre as linhas da tabela
{

  var iddisciplina = elem.value;
  var normalizador = "tr[value=" + iddisciplina + "]";
  var tamanhoarrayclasses = $(normalizador)[0].classList.length;
  
  i=0; //Variável de controle
  w=0; //Variável de controle


  if(elem.checked == true) //Se o input estiver marcado
  {


    while(i<disciplinas.length) //Varre todas as disciplinas da lista
    {


        while(w<tamanhoarrayclasses) //Enquanto for menor do que a quantidade de classes da tr
        {
          if(($(normalizador)[0].classList[w] != "mesmadisciplina") && ($(normalizador)[0].classList[w] != "disciplinaconflito"))
            {
              var nomedaclasse = "." + $(normalizador)[0].classList[w];

              $(nomedaclasse).each(function(){

              this.classList.add("disciplinaconflito");

              });
              

            }

           w++;
        }


      i++;

    }









  }

  if(elem.checked == false) //Se o input estiver desmarcado
  {


    while(i<disciplinas.length) //Varre todas as disciplinas da lista
    {


        while(w<tamanhoarrayclasses) //Enquanto for menor do que a quantidade de classes da tr
        {
          if(($(normalizador)[0].classList[w] != "mesmadisciplina") && ($(normalizador)[0].classList[w] != "disciplinaconflito"))
            {
              var nomedaclasse = "." + $(normalizador)[0].classList[w];
              $(nomedaclasse).each(function(){

              this.classList.remove("disciplinaconflito");

              });
              

            }

           w++;
        }


      i++;

    }









  }

  












  

  


}


function organizaHorarios(disciplina) //Monta os horários das disciplinas e os organiza
{

  
var qtddias = disciplina["horarios"].length;
var o = 0; //Variável de controle
var dias = [];
var horarios = [];
var periodicidades = [];
var horariofechado = [];

  
while(o<qtddias)
{

dias.push(verificaDia(disciplina, o));
horarios.push(verificaHora(disciplina, o));
periodicidades.push(verificaPeriodicidade(disciplina, 0));
//horariofechado[o] = dias[o] + horarios[o] + periodicidades[o];





  
o++;
      


}

p=0;
var retorno = "";
if(dias.length == 1)
{

  return dias[0] + horarios[0] + periodicidades[0]

}

else 
{

  while(p<dias.length)
  {

    var retorno = retorno + dias[p] + horarios[p] + periodicidades[p] + "<br>";
    p++;


  }
  return retorno;
}

}

function removeClasses() 
{

  var resultadomesmadisciplina = $(".mesmadisciplina"); 
  resultadomesmadisciplina.each(function x(){this.classList.remove('mesmadisciplina')});

  var resultadoconflito = $(".disciplinaconflito"); 
  resultadoconflito.each(function x(){this.classList.remove('disciplinaconflito')});

  var resultadocodigo = $(".mesmocodigo");
  resultadocodigo.each(function x(){this.classList.remove('mesmocodigo')});

}

function controlaMesmoCodigo()
{

  var ow = 0;
  while(ow<codigosdisciplinas.length)
  {
    var controle = "." + codigosdisciplinas[ow];
    var controlaresposta = $(controle);
    controlaresposta.each(function x(){this.classList.add("mesmocodigo")});

    ow++;

  }

}


/*function insereTPI(elem) 
{

  var id = elem.id;
  creditospegos = creditospegos + todasDisciplinas[id].tpi[0] + todasDisciplinas[id].tpi[1];
  


}

function removeTPI(elem) 
{

  var id = elem.id;
  creditospegos = creditospegos - todasDisciplinas[id].tpi[0] - todasDisciplinas[id].tpi[1];
  


}

function atualizaTPI() 
{
  $("#atualiza").innerHTML = creditospegos;

}
*/

function atualizaTPI() 
{

  var controle = 0;
  var creditos = 0;
  while(controle<disciplinas.length)
  {

    var iddisciplina = disciplinas[controle];
    var normalizador = "input[value=" + iddisciplina + "]";
    var valortddis = $(normalizador)[0].id;
    creditos = creditos + todasDisciplinas[valortddis]["tpi"][0] + todasDisciplinas[valortddis]["tpi"][1];

    controle++;

  }

  $("#atualiza")[0].innerHTML = creditos;



}


function buscaTurno(turno) //Função do filtro de busca por turno
{
x=0; //Variável de controle



qtddisciplinas = $('#tabeladisciplinas > tr > td:nth-child(2)').length;

  while(x < qtddisciplinas)
  {

    if(turno == "matutino")
    {
      var comparativo = "Matutino";
      if($('#tabeladisciplinas > tr > td:nth-child(3)')[x].innerHTML.indexOf(comparativo) != -1)
      {
        //Não fazer nada se o valor selecionado for matutino
      }
      else
      {
        $('#tabeladisciplinas > tr')[x].style.display = "none"; //Esconder se for noturno
      }
    }

    else if(turno == "noturno")
    {
      var comparativo = "Noturno";
      if($('#tabeladisciplinas > tr > td:nth-child(3)')[x].innerHTML.indexOf(comparativo) != -1)
      {
        //Não fazer nada se o valor selecionado for noturno
      }
      else
      {
        $('#tabeladisciplinas > tr')[x].style.display = "none"; //Esconder se for diurno
      }
    }

    x++;

  }
}
