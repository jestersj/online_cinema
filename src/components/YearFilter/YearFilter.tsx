import React, {FC} from 'react';
import RangeSlider from 'react-range-slider-input';
import s from "./YearFilter.module.css";

interface Props {
    values: number[]
    onInput: any
}

const YearFilter: FC<Props> = ({values, onInput}) => {
    return (
        <div>
            <h3>Годы:</h3>
            <div className={s.filter}>
                <span>{`${values[0]}-${values[1]}`}</span>
                <RangeSlider
                    min={1900}
                    max={2024}
                    value={values}
                    onInput={onInput}
                    id={'slider'}
                />
            </div>
        </div>
    );
};

export default YearFilter;