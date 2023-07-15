import React, {ChangeEvent, memo, useState} from 'react';

export type EditableSpanPropsType = {
    callback: (newTitle: string) => void;
    oldTitle: string;
};

export const EditableSpan = (props: EditableSpanPropsType) => {
    const {callback, oldTitle} = props;

    const [editStatus, setEditStatus] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(oldTitle);
    const [error, setError] = useState<string | null>(null);

    const onBlurHandler = () => {
        if (!error && title.trim() !== '') {
            AddNewTitle();
            setError(null);
            setEditStatus(!editStatus);
        } else {
            setError('No corrected');
        }
    };

    const AddNewTitle = () => {
        callback(title.trim());
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    }

    const OnClickHandler = () => {
        setEditStatus(!editStatus);
    }

    return (
        editStatus ? (
            <div>
                <input value={title} onBlur={onBlurHandler} onChange={onChangeHandler} autoFocus/>
                {error && <span>{error}</span>}
            </div>
        ) : (
            <span onDoubleClick={OnClickHandler}>{oldTitle}</span>
        )
    );
}
