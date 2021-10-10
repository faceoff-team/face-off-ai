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
                            <div
                                class={`nav-item ${props.location.pathname === "/about" ? "active" : ""
                                    }`}
                            >
                                <Link class="" to="/about">About
                                    <span class="sr-only">(current)</span>
                                </Link>
                            </div>
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