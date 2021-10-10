import React from "react";
import HomePageGrid from "../components/HomePageGrid.jsx";

function Home() {
    return (
        <div className="home" class="container">
            <h1 class="font-weight-heavy">Popular Today</h1>
            <HomePageGrid />
            <h1 class="font-weight-heavy">Sad Videos</h1>
            <HomePageGrid />
        </div>
    );
}

export default Home;