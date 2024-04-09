import React, {FC, useEffect, useRef, useState} from 'react';
import s from "./DropdownFilter.module.css";

interface Props {
    name: string
    selectedItem: string | null
    items: string[]
    onSelect: (item: string) => void
}

const DropdownFilter: FC<Props> = ({name, selectedItem, items, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleSelect = (item: string) => {
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
            <h3>{name}</h3>
            <button className={s.dropdown} onClick={toggleDropdown}>
                {selectedItem ?? 'Не выбрано'}
            </button>
            {
                isOpen &&
                <div className={s.items_block}>
                    <ul>
                        {
                            items.map(item =>
                                <li className={s.item} key={item}>
                                    <button onClick={() => handleSelect(item)}>
                                        {item}
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

export default DropdownFilter;