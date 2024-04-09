import React, {FC} from 'react';
import s from "./PageSwitcher.module.css";

interface Props {
    currentPage: number
    totalPages: number
    toPreviousPage: () => void
    toNextPage: () => void
}

const PageSwitcher: FC<Props> = ({currentPage, totalPages, toPreviousPage, toNextPage}) => {
    return (
        <div className={s.cont}>
            <button onClick={toPreviousPage}
                    className={s.btn}
                    disabled={!(currentPage > 1)}
            >
                Предыдущая
            </button>
            <p>{currentPage} из {totalPages}</p>
            <button onClick={toNextPage}
                    className={s.btn}
                    disabled={!(currentPage < totalPages)}
            >
                Следующая
            </button>
        </div>
    );
};

export default PageSwitcher;