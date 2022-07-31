import {useState} from "react";
import DefineCanvas from "./DefineCanvas.component";
import "./Define.css";

export function Define() {

    const [defineCanvasVisibility,showDefineCanvas] = useState(false)

    const showCanvas = () => {
        showDefineCanvas(true)
    }
    return (
        <div>
            <div id={"define_canvas_title"}>Define Page</div>
            {defineCanvasVisibility ? <DefineCanvas/> : <div id={"start_button_container"}><button onClick={showCanvas}>Start Creating PIQUE Structure</button></div>}
        </div>
    )
}

export default Define;