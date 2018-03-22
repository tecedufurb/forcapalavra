/**
 * Created by Rafael on 06/06/2015.
 */

function letra_aleatoria(){
    var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
}