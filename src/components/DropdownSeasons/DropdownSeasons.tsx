import React, {FC, useEffect, useRef, useState} from 'react';
import {ISeason} from "@/types/ISeason";
import s from "./DropdownSeasons.module.css";

interface Props {
    selectedItem: ISeason | null
    items: ISeason[]
    onSelect: (item: ISeason) => void
}

const DropdownSeasons: FC<Props> = ({selectedItem, items, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (item: ISeason) => {
        onSelect(item)
        setIsOpen(false)
    }

    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [dropdownRef]);

    return (
        <div className={s.cont} ref={dropdownRef}>
            <button className={s.dropdown} onClick={toggleDropdown}>
                {selectedItem.name ?? 'Не выбрано'}
            </button>
            {
                isOpen &&
                <div className={s.items_block}>
                    <ul>
                        {
                            items.map(item =>
                                <li className={s.item} key={item.id}>
                                    <button onClick={() => handleSelect(item)}>
                                        {item.name}
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
        </div>
    );
};

export default DropdownSeasons;