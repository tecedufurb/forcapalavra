/**
 * Created by Rafael on 06/06/2015.
 */
var __MAX_LETRAS_LINHA = 9;
var __QTD_FASES = 8;

var __entidades = [
    "BEBE",
    "CARRO",
    "CAVALO",
    "COBRA",
    "GALINHA",
    "GATO",
    "GRILO",
    "PINTINHO"
];

var __palavras = [];

function misturar_palavra(palavra){
    var mistura = [];
    var len = __MAX_LETRAS_LINHA * 2;
    for (im = 0; im < len; im++){
        mistura.push('_');
    }

    // Calcular a posição das letras da palavra
    var pos = 0;
    var deuCerto = false;
    for (im = 0; im < palavra.length; im++){

        deuCerto = false;

        while (!deuCerto){
            pos = Math.round(Math.random() * len);
            if (mistura[pos] == '_'){
                mistura[pos] = palavra.charAt(im);
                deuCerto = true;
            }
        }
    }
    // Sortear a posição do resto das palavras
    for (im = 0; im < len; im++){
        if (mistura[im] == '_')
            mistura[im] = letra_aleatoria();
    }

    return {letras_esq: mistura.slice(0, len / 2), letras_dir: mistura.slice((len / 2))};
}

function iniciar_palavras(){

    for (i_p = 0; i_p < __entidades.length; i_p++){
        var entidade = {
            palavra: "",
            quantidade_letras_palavra: 0,
            letras_acima: [],
            letras_abaixo: [],
            imagem: "",
            imagem_1: "",
            imagem_2: "",
            imagem_3: "",
            imagem_4: "",
            audio:""
        };
        entidade.palavra = __entidades[i_p];
        entidade.quantidade_letras_palavra = __entidades[i_p].length;

        letras = misturar_palavra(entidade.palavra);

        entidade.letras_acima = letras.letras_esq;
        entidade.letras_abaixo = letras.letras_dir;

        entidade.imagem = "./res/" + entidade.palavra + ".png";
        entidade.imagem_1 = "./res/" + entidade.palavra + "_1_4.png";
        entidade.imagem_2 = "./res/" + entidade.palavra + "_2_4.png";
        entidade.imagem_3 = "./res/" + entidade.palavra + "_3_4.png";
        entidade.imagem_4 = "./res/" + entidade.palavra + "_4_4.png";

        entidade.audio = "./res/" + entidade.palavra + ".mp3";

        __palavras.push(entidade);
    }
}

function gerar_fases(sequencia){
    var fases = [];
    for (i = 0; i < sequencia.length; i++){
        fases.push(__palavras[sequencia[i]]);
    }
    return fases;
}