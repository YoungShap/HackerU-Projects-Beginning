const elem = document.querySelector(".board");
let isX = true;
let winner;
let winnerArray;
let scoreX = localStorage.getItem("scoreX") || 0;
let scoreO = localStorage.getItem("scoreO") || 0;
//פונקציה שיוצרת את הלוח//
function create() {
    for (let i = 0; i < 9; i++) {
        const div = document.createElement('div');
        document.querySelector('.scoreX').innerHTML = scoreX;
        document.querySelector('.scoreO').innerHTML = scoreO;
        div.addEventListener('click', ev => {
            const clickedDiv = ev.target;

            if (!clickedDiv.innerHTML && !winner) {
                if (isX) {
                    clickedDiv.innerHTML = 'X';
                } else {
                    clickedDiv.innerHTML = "O"
                }
                clickedDiv.className = 'dirty';
                isX = !isX;
                check();
            }
        })
        elem.appendChild(div);
    }
}

create();
//פונקציה שבודקת את הלוח כדי לבדוק את התוצאה לפי מהלכי השחקנים//
function check() {
    const divs = elem.querySelectorAll('div');

    const options = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const arr of options) {
        const res = arr.map(index => divs[index].innerHTML);

        if (res.every(val => val === 'X')) {
            winner = 'X';
            localStorage.setItem('scoreX', ++scoreX);
            document.querySelector('.scoreX').innerHTML = scoreX;
            winnerArray = arr;
            break;
        } else if (res.every(val => val === 'O')) {
            winner = 'O';
            localStorage.setItem('scoreO', ++scoreO)
           document.querySelector('.scoreO').innerHTML = scoreO;

            winnerArray = arr;
            break;
        }
    }

    if (winner) {
        elem.querySelectorAll('div').forEach(el => {
            el.className = 'dirty';
        });

        winnerArray.forEach(index => divs[index].classList.add('bg'));

        showWinner(`The winner is ${winner}`);
    }
}
//פונקציה המציגה את השחקן המנצח//
function showWinner(text) {
    const winner = document.createElement("div");
    winner.classList.add("winner");
    winner.innerHTML = text;

    const frame = document.querySelector(".frame");
    frame.appendChild(winner);

    confetti({
        particleCount: 100,
        spread: 70,
        decay: 0.9,
        origin: { y: 0.6 }
    });
    
    setTimeout(function() {
        frame.removeChild(winner);
    }, 2 * 1000);
}
//איפוס המשחק//
function reset() {
    elem.innerHTML = "";
    create();
    winner = false;
}
//איפוס תוצאות//
function resetScore() {
    localStorage.clear();
    location.reload();
}

