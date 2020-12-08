import React, {useEffect, useState} from "react";
import './index.css';
import '../App/dark-theme.css';
import '../App/light-theme.css';

function DarkModeToggle(){

    const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark" ? true : false);

    useEffect(() => {
        document
            .getElementsByTagName("HTML")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));
    },[]);

    function toggleThemeChange(){
        if (isDark === false) {
            localStorage.setItem("theme", "dark");
            document
                .getElementsByTagName("HTML")[0]
                .setAttribute("data-theme", localStorage.getItem("theme"));
            setIsDark(true);
        } else {
            localStorage.setItem("theme", "light");
            document
                .getElementsByTagName("HTML")[0]
                .setAttribute("data-theme", localStorage.getItem("theme"));
            setIsDark(false);
        }
    }

    return (
        <label className="switch">
            <input
                type="checkbox"
                defaultChecked={isDark}
                onChange={() => toggleThemeChange()}
            />
            <span className="slider round" />
        </label>
    )
}

export { DarkModeToggle };