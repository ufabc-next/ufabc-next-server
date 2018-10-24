function verificacao(elem) //Faz a verificação de conflitos do calendário

{

      
      var quantidadedias = quantosDias(elem);
      var numerodisciplina = ($(elem)[0]['id']);  
      var iddisciplina = ($(elem)[0]['value']);
      var i = 0; //variável de controle
      var controlaalerta = [];
      var controlaconflito = [];
      var controladisciplinarepetida = [];
      var controlapintar = [];
      

  var bb = 0;
  var codigodisciplina = "";
  while(bb<todasDisciplinas[numerodisciplina].codigo.length)
  {
    if(todasDisciplinas[numerodisciplina].codigo[bb] != "-")
    {
      codigodisciplina = codigodisciplina + todasDisciplinas[numerodisciplina].codigo[bb];
    }
  bb++;
  }

      while(i<quantidadedias) 

      {
            if(periodicidadeDisciplina(elem, i) == " - semanal") //Se for semanal

            {

            
                 if(disciplinaConflitanteSemanal(elem, i) == false)  //Se não der conflito
                 {

                        controlapintar[i] = "semanal"; //Marcar no array que pode pintar semanal no item especificado
                      //pintarCalendarioSemanal(elem, 0);

                 }
                 else 
                 {
                      if(verificaDisciplinaSelecionada(elem, i)) 
                      {
                        controladisciplinarepetida[i] = "repetidasemanal";
                        //limpacorCalendarioSemanal(elem, i);
                      }
                      else
                      {
                        controlaalerta[i] = "ativaralerta";
                        
                        //alertaCalendario(elem);
                      }
                 }

            }

            else if(periodicidadeDisciplina(elem, i) == " - quinzenal (I)")  //Se for quinzena 1
            {

                 if(disciplinaConflitanteQuinzenal(elem, i, 1) == false)  
                 {

                  controlapintar[i] = "quinzena1";
                  //pintarCalendarioQuinzenal(elem, i, 1);

                 }
                 else 
                 {
                      if(verificaDisciplinaSelecionada(elem, i)) 
                      {
                        controladisciplinarepetida[i] = "repetidaquinzena1";
                        //limpacorCalendarioQuinzenal(elem, i, 1);
                      }
                      else
                      {
                        controlaalerta[i] = "ativaralerta";
                        
                        //alertaCalendario(elem);

                      }
                 }

            }

            else if(periodicidadeDisciplina(elem, i) == " - quinzenal (II)")  //Se for quinzena 2
            {

                 if(disciplinaConflitanteQuinzenal(elem, i, 2) == false)  
                 {

                  controlapintar[i] = "quinzena2";
                  //pintarCalendarioQuinzenal(elem, i, 2);

                 }
                 else 
                 {
                      if(verificaDisciplinaSelecionada(elem, i)) 
                      {
                        controladisciplinarepetida[i] = "repetidaquinzena2";
                        //limpacorCalendarioQuinzenal(elem, i, 2);
                      }
                      else
                      {
                        controlaalerta[i] = "ativaralerta";
                        
                        //alertaCalendario(elem);
                      }
                 }

            }

            
            
            i++;

      }
      
      i=0;
      var ativaralerta = false;
      
      while(i<quantidadedias) 
      {

            if(ativaralerta == true)
            {

                  //Não fazer nada, já está validado

            }

            else 
            {
                  if(controlaalerta[i] == "ativaralerta")
                  {

                        ativaralerta = true;

                  }



            }
            i++;

      }

      if(ativaralerta == true)
      {

            alertaCalendario(elem);

      }

      else if(ativaralerta == false) 
      {
            i=0; //Reinicializa a variável de controle

            if((controladisciplinarepetida[i] == "repetidasemanal") || (controladisciplinarepetida[i] == "repetidaquinzena1") || (controladisciplinarepetida[i] == "repetidaquinzena2"))
            {

                  while(i<quantidadedias)
                  {
                        if(controladisciplinarepetida[i] == "repetidasemanal")
                        {
                              limpacorCalendarioSemanal(elem, i);
                            //  validaLinha(elem);
                        }
                        else if(controladisciplinarepetida[i] == "repetidaquinzena1")
                        {

                              limpacorCalendarioQuinzenal(elem, i, 1);
                             // validaLinha(elem);

                        }
                        else if(controladisciplinarepetida[i] == "repetidaquinzena2")
                        {
                              limpacorCalendarioQuinzenal(elem, i, 2);
                             // validaLinha(elem);
                        }
                        i++;
                  }
                  removeDisciplina(iddisciplina);
                  removeCodigo(codigodisciplina);
                  
            }

            else
            {
                  insereDisciplina(iddisciplina);
                  insereCodigo(codigodisciplina);
                  
                  i=0;
                  while(i<quantidadedias)
                  {
                        if(controlapintar[i] == "semanal")
                        {
                             pintarCalendarioSemanal(elem, i);
                            // validaLinha(elem); 
                        }
                        else if(controlapintar[i] == "quinzena1")
                        {
                              pintarCalendarioQuinzenal(elem, i, 1);
                              //validaLinha(elem);
                        }
                        else if(controlapintar[i] == "quinzena2")
                        {
                              pintarCalendarioQuinzenal(elem, i, 2);
                              //validaLinha(elem);
                        }
                        i++;
                  }
                  //insereDisciplina(iddisciplina);
            }


      }

      /*AQUI

      var ch = 0;

  while(ch<disciplinas.length) //Enquanto for menor do que a array disciplinas
  {

      var input = "input[value=" + disciplinas[ch] + "]"; //Pega a disciplina da array
      var normalizador = $(input)[0]; //Normaliza
      validaLinha(normalizador); //Executa o validador de linhas
      ch++;

  }
  */
      

      //validaLinha(elem);

      removeClasses();
      repreencherDisciplinas();
      var controle = 0;
      while(controle<disciplinas.length)
      {
        var normalizador = "input[value=" + disciplinas[controle] + "]";
        validaLinha($(normalizador)[0]);
        controle++;
      }
      
      mesmaDisciplina();
      controlaMesmoCodigo();
      atualizaTPI();
      


}

function aplicarfiltros() //Aplica os filtros utilizados
{


  buscaNome();


  if(($('#sbc')[0].checked == true && $('#sa')[0].checked == true) || ($('#sbc')[0].checked == false && $('#sa')[0].checked == false) )
  {

    console.log('Caso null identificado');

  }
  else if($('#sbc')[0].checked == true)
  {

    buscaCampus("sbc");

  }

  else if($('#sa')[0].checked == true)
  {

    buscaCampus("sa");

  }

  if(($('#matutino')[0].checked == true && $('#noturno')[0].checked == true) || ($('#matutino')[0].checked == false && $('#noturno')[0].checked == false) )
  {

  console.log('Caso null identificado');

  }
  else if($('#matutino')[0].checked == true)
  {

  buscaTurno("matutino");

  }

  else if($('#noturno')[0].checked == true)
  {

  buscaTurno("noturno");

  } 


  if($('#maisvagas')[0].checked == true)
  {
  buscaVagas();

  }

//Filtros das linhas
/*

x=0;//Variável de controle
while(x<disciplinas.length)
{

var input = "input[value=" + disciplinas[x] + "]";
var normalizador = $(input);
validaLinha(normalizador);
x++;

}
*/
}
	



	






















