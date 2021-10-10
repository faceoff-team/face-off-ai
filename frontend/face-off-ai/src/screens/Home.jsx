import React from "react";
import HomePageGrid from "../components/HomePageGrid.jsx";

function Home() {
    return (
        <div className="home" class="container">
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Popular Today</h1>
            <HomePageGrid />
            <h1 class="font-weight-heavy" style={{marginTop: "20px"}}>Sad Videos</h1>
            <HomePageGrid />
        </div>
    );
}

export default Home;