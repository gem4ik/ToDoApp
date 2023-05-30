import React from 'react';
import s from './SuperButton.module.css'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type SuperButtonType = {
    callback:()=> void
}

export const SuperButton = (props: SuperButtonType) => {
    return (
        <div className={s.button}>
            <IconButton onClick={props.callback}><Delete/></IconButton>
        </div>
    );
};