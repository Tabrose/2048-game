document.onkeydown = CheckKey;

function init()
{
	for (i = 0; i < 2; i++)
	{
    var nb = random24();
	var row_cor = Math.floor(Math.random()*4);
	var cell_cor = Math.floor(Math.random()*4);
	tableau.rows[row_cor].cells[cell_cor].innerHTML = nb;
	}
}

function CheckKey(e)
{
	var move_1 = movecells(e.keyCode);
	var sum_1 = sumcells(e.keyCode);
	if (move_1 !== 0 || sum_1 !== 0){
		AjoutNb();
	}
	var C = 0;
	for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var tempcell = getCell(i, j);
                if (tempcell.innerHTML == "2048") {
					C++;
				}
			}
	}
	if (C > 0){
		document.getElementById('zone').innerHTML = 'Vous avez atteint 2048 ! Continuez ou rechargez la page !';
	}
	if (Nbplace(tableau) == 0) {
		var K = 0;
		for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
				var tempcell = getCell(i, j);
				if (tempcell.innerHTML == getCell(i, j+1).innerHTML){
					K++;
				}
			}
		}
		for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 3; i++) {
				var tempcell = getCell(i, j);
				if (tempcell.innerHTML == getCell(i+1, j).innerHTML){
					K++;
				}
			}
		}
		if (K == 0){
			document.getElementById('zone').innerHTML = 'Vous avez perdu ! Rechargez la page pour rejouer.';
		}
	}
}



function movecells(direction)
{
	var compteur = 0;
    if (direction == '37') { //gauche
		for (var tour = 4; tour > 0; tour--)
		{
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < tour; j++) {
                var tempcell = getCell(i, j);
                if (tempcell.innerHTML != " ") {
                    if (getCell(i, j - 1).innerHTML == " ") {
                        getCell(i, j - 1).innerHTML = tempcell.innerHTML;
                        tempcell.innerHTML = " ";
						compteur++;
                    }
                }
            }
        }
		}
    }
    if (direction == '38'){ //haut
        for (var tour = 4; tour > 0; tour--)
		{
		for (var i = 1; i < tour; i++) {
            for (var j = 0; j < 4; j++) {
                var tempcell = getCell(i,j);
                if (tempcell.innerHTML != " "){
                    if (getCell(i-1,j).innerHTML == " "){
                        getCell(i-1,j).innerHTML = tempcell.innerHTML;
                        tempcell.innerHTML = " ";
						compteur++;
                    }
                }
            }
        }
		}
    }
    if (direction == '40'){ //bas
		for (var tour = 0; tour <= 2; tour++)
		{
        for (var i = 2; i >= tour; i--) {
            for (var j = 0; j < 4; j++) {
                var tempcell = getCell(i,j);
                if (tempcell.innerHTML != " "){
                    if (getCell(i+1,j).innerHTML == " "){
                        getCell(i+1,j).innerHTML = tempcell.innerHTML;
                        tempcell.innerHTML = " ";
						compteur++;
                    }
                }
            }
        }
		}
    }
    if (direction == '39'){ //droite
		for (var tour = 0; tour <= 2; tour++)
		{
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= tour; j--) {
                var tempcell = getCell(i,j);
                if (tempcell.innerHTML != " "){
                    if (getCell(i,j+1).innerHTML == " "){
                        getCell(i,j+1).innerHTML = tempcell.innerHTML;
                        tempcell.innerHTML = " ";
						compteur++;
                    }
                }
            }
        }
		}
    }
	return compteur;
}


function sumcells(direction) {
	
	var compteur_2 = 0;
	if (direction == '37') { //gauche
		for (var i = 0; i < 4; i++) {
			for (var j = 1; j < 4; j++) {
				var tempcell = getCell(i,j)
				if (tempcell.innerHTML != " ")
				{
				if (getCell(i, j - 1).innerHTML == tempcell.innerHTML) {//gauche
                    getCell(i, j - 1).innerHTML = tempcell.innerHTML*2;
                    tempcell.innerHTML = " ";
					compteur_2++;
				}
				}
			}
		}
	movecells(direction);
	}
	
	if (direction == '38') { //haut
		for (var i = 1; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				var tempcell = getCell(i,j)
				if (tempcell.innerHTML != " ")
				{
				if (getCell(i-1,j).innerHTML == tempcell.innerHTML){//haut
                    getCell(i-1,j).innerHTML =  tempcell.innerHTML*2;
                    tempcell.innerHTML = " ";
					compteur_2++;
                }	
				}
			}
		}
	movecells(direction);
	}
	
	if (direction == '40'){ //bas
		for (var i = 2; i >= 0; i--) {
			for (var j = 0; j < 4; j++) {
				var tempcell = getCell(i,j)
				if (tempcell.innerHTML != " ")
				{
				if (getCell(i+1,j).innerHTML == tempcell.innerHTML){//bas
                    getCell(i+1,j).innerHTML =  tempcell.innerHTML*2;
                    tempcell.innerHTML = " ";
					compteur_2++;
                }
				}
			}
		}
	movecells(direction);
	}
	
	if (direction == '39'){ //droite
		for (var i = 0; i < 4; i++) {
			for (var j = 2; j >= 0; j--) {
				var tempcell = getCell(i,j)
				if (tempcell.innerHTML != " ")
				{
				if (getCell(i,j+1).innerHTML == tempcell.innerHTML){//droite
                    getCell(i,j+1).innerHTML =  tempcell.innerHTML*2;
                    tempcell.innerHTML = " ";
					compteur_2++;
                }
				}
			}
		}
	movecells(direction);
	}
	return compteur_2;
}

function getCell(i, j) {//nous donne la case du tableau dont les coordonnées sont i,j
    return document.getElementById('tableau').rows[i].cells[j];
}

function getAllEmpty() {
    var allEmpty = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var cell = getCell(i, j);
            if (cell.innerHTML == " ") {
                allEmpty.push(cell);
            }
        }
    }
    return allEmpty;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function AjoutNb() {
    var allEmpty = getAllEmpty();
    var size = allEmpty.length;
    if (size != 0) {
        var x = getRandomInt(0, size - 1);
        var cell = allEmpty[x];
        cell.innerHTML = random24();
		}
}


function Nbplace(tableau) {
	var NB = 0
	for (var i = 0; i < 4; i++)
	{
        for (var j = 0; j < 4; j++)
		{
			var cell = document.getElementById('tableau').rows[i].cells[j];
			if (cell.innerHTML === " ")
			{
				NB = NB+1;
			}
		}
	}
	return NB;
}


function random24() {
    var x = Math.random();
    if (x < 0.20) {
        return 4;
    } else {
        return 2;
    }
}