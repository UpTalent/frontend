import React from "react";
import { KudosSelect } from "./KudosSelect";

export default function Kudosselect() {
    return <KudosSelect open={true} skills={[{id:1, name: 'Java'}, {id:2, name: 'React'}, {id:3, name: 'Js'}]}/>
}