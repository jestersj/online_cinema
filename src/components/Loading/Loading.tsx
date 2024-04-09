import React from 'react';
import Arrow from "@/assets/arrow-clockwise.svg";
import s from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={s.cont}>
            <Arrow className={s.img}/>
        </div>
    );
};

export default Loading;