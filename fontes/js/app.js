/**
 * Created by Rafael on 05/06/2015.
 */

function tratar_touch(letra){
    var mc = new Hammer.Manager(letra, {});

    mc.add( new Hammer.Pan({ direction:Hammer.DIRECTION_ALL, threshold:0 }) );

    mc.on("pan", function(event){
        var target = event.target;

        var modo_rotacao = "";
        if ($(target).hasClass('dir')){
            modo_rotacao = "-";
        }

        $(target).css({ 'transform': 'translate(' + event.deltaX + 'px,' + event.deltaY + 'px) rotate('+modo_rotacao+'90deg)' });

        if (event.srcEvent.type == "touchend"){
            $(event.target).css({ 'transform': 'translate(0,0) rotate('+modo_rotacao+'90deg)' });
            var dropEl = document.elementFromPoint(event.pointers[0].pageX, event.pointers[0].pageY);

            console.log('dropped on', dropEl);

            var xclass = target.getAttribute("class").split(" ");
            var xlado = xclass[1];
            var xletra = xclass[2];

            if (
                $(dropEl).hasClass(xlado) &&
                $(dropEl).hasClass(xletra) &&
                target.getAttribute('src') != dropEl.getAttribute('src')
            ){

                dropEl.setAttribute("src", target.getAttribute("src"));
                target.setAttribute("class", "invisivel");

                // processar acerto
                Jogo.processar_jogada(xlado, xletra, xletra);
            } else{
                // processar erro
                Jogo.processar_jogada(xlado, xletra, "*");
            }
        }
    });

}