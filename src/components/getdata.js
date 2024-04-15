import React from "react";
export default function GetData() {
    let maindata = [];
    const dataget = async () => {
        try {
            const response = await fetch("http://localhost:5000/data");
            const data = await response.json();
            maindata = data;
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        
    };
    dataget();
    console.log(maindata);
    return maindata;

}