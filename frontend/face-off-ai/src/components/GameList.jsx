import React from "react";
import HorizontalLine from "../components/HorizontalLine.jsx";
import SmallGame from "../components/SmallGame.jsx";

const MAX_PAST_GAMES = 10;

function getGamesList(games) {
    console.log("gang")
    console.log(games);
    const gamesListItems = [];
    var numGames = 0;
    if (games.length > MAX_PAST_GAMES) {
        numGames = MAX_PAST_GAMES;
    } else if (numGames == 0) {
        gamesListItems.push(<div item xs={8} >
            <div>There are no games to display</div>
                             </div>)
    }

    for (var i = 0; i < numGames; i++) {
        gamesListItems.push(<div className="row" >
            <SmallGame date={games[i].gameDate ? games[i].gameDate : "-"}
                       gamehighscore={games[i].winnerScore}
                       result="true"
                                />
                                </div>)
        
    }
    return gamesListItems;
}

function GameList({ title, username, games }) {
    return (
        <div>
            <h1 className="font-weight-heavy-small">{username}'s {title}</h1>
            <HorizontalLine color="#f7f7f7" width="100%" />
            <div className="column">
                {getGamesList(games)}
            </div>
        </div>
    );
}

export default GameList;