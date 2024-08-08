
let players = [];

function addPlayer(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    const lastName = document.getElementById('lastName').value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    const clanName = document.getElementById('clanName').value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    const country = document.getElementById('country').value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    const gender = document.getElementById('gender').value;
    let playerScore = parseInt(document.getElementById('playerScore').value);

    if (!firstName || !lastName || !clanName || !country || !gender || isNaN(playerScore)) {
        alert("Please enter the proper details.");
        return;
    }

    if (playerScore > 500) {
        alert("Score is out of the league.");
        return;
    }

    playerScore = Math.min(Math.max(playerScore, 0), 500);

    const dateTime = getCurrentDateTime();
    const player = {
        firstName,
        lastName,
        clanName,
        country,
        gender,
        score: playerScore,
        level: getLevel(playerScore),
        dateTime
    };

    players.push(player);
    document.getElementById('playerForm').reset();
    updateLeaderboard();
}

function getCurrentDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return now.toLocaleDateString(undefined, options);
}

function getLevel(score) {
    if (score >= 401) return "Expert";
    if (score >= 301) return "Proficient";
    if (score >= 201) return "Advanced";
    if (score >= 101) return "Beginner";
    if (score >= 0) return "Noob";
    return "Unknown";
}

function increaseScore(index) {
    if (players[index].score >= 500) {
        alert("Score cannot exceed 500.");
        return;
    }
    players[index].score = Math.min(players[index].score + 5, 500);
    players[index].level = getLevel(players[index].score);
    updateLeaderboard();
}

function decreaseScore(index) {
    players[index].score = Math.max(players[index].score - 5, 0);
    players[index].level = getLevel(players[index].score);
    updateLeaderboard();
}

function deletePlayer(index) {
    players.splice(index, 1);
    updateLeaderboard();
}

function updateLeaderboard() {
    const clans = {};

    players.forEach(player => {
        if (!clans[player.clanName]) {
            clans[player.clanName] = {
                clanName: player.clanName,
                totalScore: 0,
                players: []
            };
        }
        clans[player.clanName].totalScore += player.score;
        clans[player.clanName].players.push(player);
    });

    const sortedClans = Object.values(clans).sort((a, b) => b.totalScore - a.totalScore);

    const leaderboard = document.querySelector('#leaderboard tbody');
    leaderboard.innerHTML = '';

    sortedClans.forEach((clan, clanIndex) => {
        clan.players.forEach((player, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.firstName}</td>
                <td>${player.lastName}</td>
                <td>${player.clanName}</td>
                <td>${player.country}</td>
                <td>${player.gender}</td>
                <td>${player.score}</td>
                <td>${player.level}</td>
                <td>${player.dateTime}</td>
                <td>
                <button class="action-btn subtract" onclick="decreaseScore(${players.indexOf(player)})">-5</button>
                <button class="action-btn delete" onclick="deletePlayer(${players.indexOf(player)})">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                </button>
                <button class="action-btn add" onclick="increaseScore(${players.indexOf(player)})">+5</button>
                </td>
            `;

            leaderboard.appendChild(row);
        });

        const positionText = clanIndex === 0 ? 'Winner' : clanIndex === 1 ? 'Runner-up' : `Position ${clanIndex + 1}`;
        const previousClan = sortedClans[clanIndex - 1];
        let scoreDifferenceText = '';

        if (previousClan) {
            const scoreDifference = clan.totalScore - previousClan.totalScore;
            scoreDifferenceText = scoreDifference > 0 ? ` (${clan.clanName} wins by ${scoreDifference} points)` : '';
        }

        const positionRow = document.createElement('tr');
        positionRow.innerHTML = `
            <td colspan="10" style="text-align: center; font-weight: bold;">${clan.clanName}: ${positionText}${scoreDifferenceText}</td>
        `;
        leaderboard.appendChild(positionRow);
    });

    const clanScores = document.getElementById('clanScores');
    clanScores.innerHTML = '<h2>Clan Scores:</h2>';

    sortedClans.forEach(clan => {
        const scoreRow = document.createElement('p');
        scoreRow.textContent = `${clan.clanName}: ${clan.totalScore} points`;
        clanScores.appendChild(scoreRow);
    });
}
