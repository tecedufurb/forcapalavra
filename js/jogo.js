
var arena_esq = {
    lado: "esq",
    letras_acima: $("#td_letras_esq_esq"),
    letras_abaixo: $("#td_letras_dir_esq"),
    palavra: $("#td_pal_esq"),
    ajuda: $("#img_ajuda_esq"),
    imagem: $("#img_palavra_esq"),
    placar: $("#placar_esq"),
    final_jogo: $("#final_jogo_esq")
};

var arena_dir = {
    lado: "dir",
    letras_acima: $("#td_letras_esq_dir"),
    letras_abaixo: $("#td_letras_dir_dir"),
    palavra: $("#td_pal_dir"),
    ajuda: $("#img_ajuda_dir"),
    imagem: $("#img_palavra_dir"),
    placar: $("#placar_dir"),
    final_jogo: $("#final_jogo_dir")
};

function limpar_arena(arena){
    $(arena.letras_abaixo).empty();
    $(arena.letras_acima).empty();
    $(arena.palavra).empty();
    $(arena.ajuda).empty();
    $(arena.imagem).empty();
    $(arena.placar).empty();
}

function carregar_letras(arena, fase){
    var saida = "";
    for (i = 0; i < __MAX_LETRAS_LINHA; i++){
        saida += "<img src='./res/" + fase.letras_acima[i] + ".png' class='letra " + arena.lado + " " + fase.letras_acima[i] + "'/>";
    }
    $(arena.letras_acima).append(saida);

    var saida = "";
    for (i = 0; i < __MAX_LETRAS_LINHA; i++){
        saida += "<img src='./res/" + fase.letras_abaixo[i] + ".png' class='letra " + arena.lado + " " + fase.letras_abaixo[i] + "'/>";
    }
    $(arena.letras_abaixo).append(saida);

    $('.letra, ' + arena.lado).each(function(){
        tratar_touch(this);
    });
}

function carregar_palavra(arena, fase){
    var saida = "";

    if (arena.lado == "esq"){
        for (i = 0; i < fase.quantidade_letras_palavra; i++){
            saida += "<img src='./res/letra_palavra.jpg' class='letra_palavra " + fase.palavra[i] + " " + arena.lado +  "'/>";
        }
    } else
    {
        for (i = fase.quantidade_letras_palavra - 1; i >= 0; i--){
            saida += "<img src='./res/letra_palavra.jpg' class='letra_palavra " + fase.palavra[i] + " " + arena.lado +  "'/>";
        }
    }

    $(arena.palavra).append(saida);
}

function carregar_ajuda(arena, fase){
    var saida = "";
    var id_img_audio = "img_audio_"+ arena.lado;
    var id_audio = "audio_"+ arena.lado;
    saida = "<div><img id='" + id_img_audio + "' class='"+arena.lado+"' src='./res/ajuda.PNG'/><audio id='" + id_audio + "' src='" + fase.audio + "'></audio></div>";

    $(arena.ajuda).append(saida);

    $('#'+id_img_audio).on("click", function(){
        var audio;
        if ($(this).hasClass('esq')){
            audio = document.getElementById('audio_esq');

        } else
        {
            audio = document.getElementById('audio_dir');
        }

        audio.play();
    });
}

function carregar_imagem(arena, fase){
    var id_img = 'id_img_' + arena.lado;
    $(arena.imagem).append("<img id='"+ id_img + "' src='" + fase.imagem_1 + "' class='imagem " + arena.lado + "'/>");

    $('#' + id_img).on("click", function(){
        if ($(this).hasClass('esq')){

            if (sit_fase_esq.qtd_ajuda == 0){
                this.setAttribute('src', fases_esq[num_fase_esq].imagem_2);
                sit_fase_esq.qtd_ajuda = 10;
            } else
            if (sit_fase_esq.qtd_ajuda == 10){
                this.setAttribute('src', fases_esq[num_fase_esq].imagem_3);
                sit_fase_esq.qtd_ajuda = 20;
            } else
            if (sit_fase_esq.qtd_ajuda == 20){
                this.setAttribute('src', fases_esq[num_fase_esq].imagem_4);
                sit_fase_esq.qtd_ajuda = 30;
            } else
            if (sit_fase_esq.qtd_ajuda == 30){
                this.setAttribute('src', fases_esq[num_fase_esq].imagem);
                sit_fase_esq.qtd_ajuda = 40;
            }
        } else
        {
            if (sit_fase_dir.qtd_ajuda == 0){
                this.setAttribute('src', fases_dir[num_fase_dir].imagem_2);
                sit_fase_dir.qtd_ajuda = 10;
            } else
            if (sit_fase_dir.qtd_ajuda == 10){
                this.setAttribute('src', fases_dir[num_fase_dir].imagem_3);
                sit_fase_dir.qtd_ajuda = 20;
            } else
            if (sit_fase_dir.qtd_ajuda == 20){
                this.setAttribute('src', fases_dir[num_fase_dir].imagem_4);
                sit_fase_dir.qtd_ajuda = 30;
            } else
            if (sit_fase_dir.qtd_ajuda == 30){
                this.setAttribute('src', fases_dir[num_fase_dir].imagem);
                sit_fase_dir.qtd_ajuda = 40;
            }
        }
    });
}

function carregar_placar(arena, fase){
    var saida = "";
    if (arena.lado == "esq"){
        saida = "Fase: " + (num_fase_esq + 1) + " Pontos: " + (pontos_esq) + "";
    }else{
        saida = "Fase: " + (num_fase_dir + 1) + " Pontos: " + (pontos_dir) + "";
    }

    $(arena.placar).empty();
    $(arena.placar).append(saida);
}

function carregar_fase(arena, fase){
    carregar_letras(arena, fase);
    carregar_palavra(arena, fase);
    carregar_ajuda(arena, fase);
    carregar_imagem(arena, fase);
    carregar_placar(arena, fase);
}

function iniciar_fase(arena, fase){
    limpar_arena(arena);
    carregar_fase(arena, fase);
}

function finalizar_arena(arena, pontos){
    var saida = "<div class='texto_final " + arena.lado + "'><p>Parab&eacute;ns! Voc&ecirc; comletou o jogo. Sua pontua&ccedil;&atilde;o: </p><br><p>" + pontos + "</p></div>";

    $(arena.final_jogo).empty();
    $(arena.final_jogo).append(saida);
}

function obter_ordem_fases(qtd){
    var saida = [];
    var fases_sorteadas = [];
    for (iOrdem = 0; iOrdem < qtd; iOrdem++)
      fases_sorteadas.push(false);

    var pos = 0;
    var deuCerto = false;
    for (iOrdem = 0; iOrdem < qtd; iOrdem++){
        deuCerto = false;
        while (!deuCerto){
            pos = (Math.round(Math.random() * qtd));
            if (fases_sorteadas[pos] == false){
                saida.push(pos);
                fases_sorteadas[pos] = true;
                deuCerto = true;
            }
        }
    }
    return saida;
}

var num_fase_esq = 0;
var num_fase_dir = 0;

var fases_esq;
var fases_dir;

var sit_fase_esq = {
    qtd_acertos:0,
    qtd_erros:0,
    qtd_ajuda:0
};

var sit_fase_dir = {
    qtd_acertos:0,
    qtd_erros:0,
    qtd_ajuda:0
};

var pontos_esq = 100;
var pontos_dir = 100;

var Jogo = {
    iniciar_jogo:function(){
        // Desativar scrollbars
        $("body").css("overflow", "hidden");

        // Esconder novo jogo
        $("#div_inicio_jogo").css("visibility", "hidden");

        // Mostrar tela de jogo
        $("#tb_jogo").css("visibility", "visible")
        iniciar_palavras();

        fases_esq = gerar_fases(obter_ordem_fases(__QTD_FASES));
        iniciar_fase(arena_esq, fases_esq[num_fase_esq], sit_fase_esq);

        fases_dir = gerar_fases(obter_ordem_fases(__QTD_FASES));
        iniciar_fase(arena_dir, fases_dir[num_fase_dir], sit_fase_dir);
    },

    processar_jogada:function(lado, letra_ori, letra_des){
        var xace = 0;
        var xerr = 1;
        if (letra_ori == letra_des){
            xace = 1;
            xerr = 0;
        }

        if (lado == "esq"){
            sit_fase_esq.qtd_acertos += xace;
            sit_fase_esq.qtd_erros += xerr;
            pontos_esq += xace - xerr;

            // Acertou a palavra, passa para a próxima fase
            if (sit_fase_esq.qtd_acertos == fases_esq[num_fase_esq].quantidade_letras_palavra){
                pontos_esq += 100 - sit_fase_esq.qtd_erros - sit_fase_esq.qtd_ajuda;
                num_fase_esq++;
                sit_fase_esq = {
                    qtd_acertos:0,
                    qtd_erros:0,
                    qtd_ajuda:0
                };
                if (num_fase_esq != (fases_esq.length))
                    iniciar_fase(arena_esq, fases_esq[num_fase_esq], sit_fase_esq);
                else
                    finalizar_arena(arena_esq, pontos_esq);
            } else {
                // atualiza placar
                carregar_placar(arena_esq, fases_esq[num_fase_esq]);
            }
        } else {
            sit_fase_dir.qtd_acertos += xace;
            sit_fase_dir.qtd_erros += xerr;
            pontos_dir += xace - xerr;

            // Acertou a palavra, passa para a próxima fase
            if (sit_fase_dir.qtd_acertos == fases_dir[num_fase_dir].quantidade_letras_palavra){
                pontos_dir += 100 - sit_fase_dir.qtd_erros - sit_fase_dir.qtd_ajuda;
                num_fase_dir++;
                sit_fase_dir = {
                    qtd_acertos:0,
                    qtd_erros:0,
                    qtd_ajuda:0
                };

                if (num_fase_dir != (fases_dir.length))
                    iniciar_fase(arena_dir, fases_dir[num_fase_dir], sit_fase_dir);
                else
                    finalizar_arena(arena_dir, pontos_dir);
            } else {
                // atualizar placar
                carregar_placar(arena_dir, fases_dir[num_fase_dir]);
            }
        }
    }
};