import React, { useEffect } from "react";
import API from "../../API";


export default function() {
    useEffect(() => {
        API.auth.login("test1", "pw").then(console.log);
    }, []);

    function Req() {
        API.auth.test("test1").then(console.log);
    }

    return (
        <div onClick={Req}>
            Test
        </div>
    )
}