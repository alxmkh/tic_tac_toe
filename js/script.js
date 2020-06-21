document.addEventListener('DOMContentLoaded', function (event) {
    'use strict';
    const game = (function () {
        const startBtn = document.querySelector('#startBtn');
        const restartBtn = document.querySelector('#restartBtn');
        const playerOneName = document.querySelector('#playerOneName');
        const playerTwoName = document.querySelector('#playerTwoName');
        const pvpBtn = document.querySelector('#pvpBtn');
        const pvcBtn = document.querySelector('#pvcBtn');
        const playGround = document.querySelector('#playGround');
        const playerOneNameInput = document.querySelector('#playerOneInput');
        const playerTwoNameInput = document.querySelector('#playerTwoInput');
        const scoreOne = document.querySelector('#scoreOne');
        const scoreTwo = document.querySelector('#scoreTwo');
        const one = document.querySelector('#one');
        const two = document.querySelector('#two');
        const three = document.querySelector('#three');
        const four = document.querySelector('#four');
        const five = document.querySelector('#five');
        const six = document.querySelector('#six');
        const seven = document.querySelector('#seven');
        const eight = document.querySelector('#eight');
        const nine = document.querySelector('#nine');

        let signArray = [];
        const cells = [one, two, three, four, five, six, seven, eight, nine];
        const eightWinningCombos = [
            [one, two, three],
            [four, five, six],
            [seven, eight, nine],
            [one, four, seven],
            [two, five, eight],
            [three, six, nine],
            [one, five, nine],
            [seven, five, three]
        ];

        function activeArea() {
            if (playerOneName.textContent != "" && playerTwoName.textContent != "") {
                console.log('Area is active now.');
                startBtn.disabled = true;
                if (playerTwoNameInput.value == 'Bot') {
                    playGround.addEventListener('click', function (event) {
                        if ((event.target.textContent != 'X' && event.target.textContent != 'O') && event.target.classList.contains('customText')) {
                            playerTurn(event.target);
                            markCellBot();
                            getMatchResult();
                        }
                    });

                } else {
                    playGround.addEventListener('click', function (event) {
                        if ((event.target.textContent != 'X' && event.target.textContent != 'O') && event.target.classList.contains('customText')) {
                            playerTurn(event.target);
                            getMatchResult();
                        }
                    });
                }
            } else {
                alert('Input player name.');
            }
        }

        function setPlayersName() {
            playerOneNameInput.addEventListener('change', function () {
                playerOneName.textContent = playerOneNameInput.value + ' (X)';
            });

            playerTwoNameInput.addEventListener('change', function () {
                playerTwoName.textContent = playerTwoNameInput.value + ' (O)';
            });
        }

        function markCell(cell, sign) {
            if (cell.textContent == 'X' || cell.textContent == 'O') {
                return;
            } else {
                cell.textContent = sign;
                signArray.push(sign);
            }
        }

        function markCellBot() {

                for (let i = 0; i < cells.length; i++) {
                    console.log(cells[i].textContent);
                    if (cells[i].textContent == '') {
                        cells[i].textContent = 'O';
                        signArray.push('O');
                        break;
                    }
                }
                playerOneName.style.color = 'green';
                playerTwoName.style.color = 'black';
            
        }

        function clearArea() {
            playGround.setAttribute('style', 'pointer-events: none');
            setTimeout(() => {
                cells.forEach(item => {
                    item.textContent = '';
                    item.style.backgroundColor = 'white';
                    signArray = [];
                    playGround.setAttribute('style', 'pointer-events: auto');
                });

            }, 2000);
        }

        function checkWinner() {
            let winner = '';
            for (let i = 0; i < eightWinningCombos.length; i++) {
                let a = eightWinningCombos[i];

                if (a[0].textContent == 'X' && a[1].textContent == 'X' && a[2].textContent == 'X') {
                    winner = playerOneNameInput.value;
                    lightCell(a[0], a[1], a[2]);
                    console.log("check winner " + winner);
                    return winner;
                }

                if (a[0].textContent == 'O' && a[1].textContent == 'O' && a[2].textContent == 'O') {
                    winner = playerTwoNameInput.value;
                    lightCell(a[0], a[1], a[2]);
                    console.log("check winner " + winner);
                    return winner;
                }
            }
            if (signArray.length == 9) {
                return;
            }

        }

        function lightCell(c1, c2, c3) {

            c1.setAttribute('style', 'background: lightgreen');
            c2.setAttribute('style', 'background: lightgreen');
            c3.setAttribute('style', 'background: lightgreen');
        }

        function getMatchResult() {

            let winner = checkWinner();

            if (winner == playerOneNameInput.value) {
                console.log(winner + ' win');
                resetSetting();
                scoreOne.textContent = +(scoreOne.textContent) + 1;
            }

            if (winner == playerTwoNameInput.value) {
                console.log(winner + ' win');
                resetSetting();
                scoreTwo.textContent = +(scoreTwo.textContent) + 1;
            }

            if (winner === undefined && signArray.length == 9) {
                console.log(winner + ' win');
                resetSetting();

            }
        }

        function resetSetting() {
            playerOneName.style.color = 'green';
            playerTwoName.style.color = 'black';
            signArray = [];
            clearArea();
        }


        function playerTurn(event) {

            if (playerOneName.style.color == 'green' && playerTwoName.style.color == 'black') {
                markCell(event, 'X');
                playerOneName.style.color = 'black';
                playerTwoName.style.color = 'green';
                return;
            }

            if (playerTwoName.style.color == 'green' && playerOneName.style.color == 'black') {
                markCell(event, 'O');
                playerOneName.style.color = 'green';
                playerTwoName.style.color = 'black';
                return;
            }
        }

        function setBotName() {
            setPlayersName();
            playerTwoName.textContent = 'Bot (O)';
            playerTwoNameInput.value = 'Bot';
            playerTwoNameInput.disabled = true;
        }

        function playVsBot(event) {
            playerTurn(event);
        }

        return {
            setPlayersName: setPlayersName,
            activeArea: activeArea,
            setBotName: setBotName,
            startBtn: startBtn,
            playerOneName: playerOneName,
            playerTwoName: playerTwoName,
            pvpBtn: pvpBtn,
            pvcBtn: pvcBtn,
            restartBtn: restartBtn,

        };
    })();

    game.pvpBtn.addEventListener('click', function (event) {
        this.setAttribute('class', 'col-6 col-sm-3 d-flex justify-content-center bg-primary mr-2');
        game.pvcBtn.setAttribute('class', 'col-6 col-sm-3 d-flex justify-content-center bg-light mr-2');
        game.pvcBtn.setAttribute('style', 'pointer-events: none');
        game.setPlayersName();
        game.startBtn.addEventListener('click', function () {
            game.activeArea();
            game.playerOneName.style.color = 'green';
            game.playerTwoName.style.color = 'black';
        });
    });

    game.pvcBtn.addEventListener('click', function (event) {
        this.setAttribute('class', 'col-6 col-sm-3 d-flex justify-content-center bg-primary mr-2');
        game.pvpBtn.setAttribute('class', 'col-6 col-sm-3 d-flex justify-content-center bg-light mr-2');
        game.pvpBtn.setAttribute('style', 'pointer-events: none');
        game.setBotName();
        game.startBtn.addEventListener('click', function () {
            game.activeArea();
            game.playerOneName.style.color = 'green';
            game.playerTwoName.style.color = 'black';
        });
    });

    game.restartBtn.addEventListener('click', function () {
        document.location.reload(true);
    });

});