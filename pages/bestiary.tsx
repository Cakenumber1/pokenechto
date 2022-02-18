import { BestiaryContainer } from "../containers/BestiaryContainer";
import React from "react";
import {FrameComponent} from "../components/Common/FrameComponent";

export default function bestiary() {
    return (
    <FrameComponent>
        <BestiaryContainer />
    </FrameComponent>
    );
}