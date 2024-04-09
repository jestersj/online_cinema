import React, {FC, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {IPerson} from "@/types/IPerson";
import PageSwitcher from "@/components/PageSwitcher/PageSwitcher";
import s from "./PersonsSection.module.css";

interface Props {
    persons: IPerson[]
}

const PersonsSection: FC<Props> = ({persons}) => {
    const location = useLocation()
    const [page, setPage] = useState(1)

    useEffect(() => {
        return () => {
            setPage(1)
        }
    }, [location.pathname]);

    const toPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const toNextPage = () => {
        if (page < Math.ceil(persons.length / 10)) {
            setPage(page + 1)
        }
    }
    return (
        <div>
            <h2>Съемочная группа</h2>
            <div className={s.cont}>
                <ul>
                    {
                        persons.length > 0
                            ?
                            persons.slice(page * 10 - 10, page * 10).map(person =>
                                <li key={person.id}>{person.name ? person.name : person.enName}, {person.profession}</li>
                            )
                            :
                            <h3>Нет информации о съемочной группе</h3>
                    }
                </ul>
                {
                    persons.length > 10 &&
                    <PageSwitcher
                        currentPage={page}
                        totalPages={Math.ceil(persons.length / 10)}
                        toPreviousPage={toPreviousPage}
                        toNextPage={toNextPage}
                    />
                }
            </div>
        </div>
    );
};

export default PersonsSection;