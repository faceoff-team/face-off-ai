import React from "react";
import { Link, withRouter} from "react-router-dom";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';

function Footer(props) {
    const [colorMode, setColorMode] = React.useState(false);

    const handleColorMode = (event, newMode) => {
        if (newMode !== null) {
            setColorMode(newMode);
        }
    };

    //const { darkMode } =  this.props; <- use `mode` from redux states
    return (
        <div classNameName="footer">
            <footer className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-10 text-small">
                            <div>Copyright &copy; FACEOFF AI 2021</div>
                            <Link class="App-link" to="/about">About
                                <span className="sr-only">(current)</span>
                            </Link>
                        </div>
                        <div className="col-2 text-small">
                            <ToggleButtonGroup
                                color="secondary"
                                value={colorMode}
                                exclusive
                                onChange={handleColorMode}
                                aria-label="color mode"
                            >
                                <ToggleButton value={false} aria-label="light mode">
                                    <WbSunnyIcon />
                                </ToggleButton>
                                <ToggleButton value={true} aria-label="dark mode">
                                    <Brightness2Icon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default withRouter(Footer);