import React from "react";
import { Link, withRouter} from "react-router-dom";

function Footer(props) {
    return (
        <div className="footer">
            <footer class="py-4">
                <div class="container">
                    <div class="row">
                        <div class="col-10 text-small">
                            <div>Copyright &copy; FACEOFF AI 2021</div>
                            <Link class="App-link" to="/about">About
                                <span class="sr-only">(current)</span>
                            </Link>
                        </div>
                        <div class="col-2 text-small">
                            
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default withRouter(Footer);