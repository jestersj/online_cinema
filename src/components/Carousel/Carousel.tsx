import React, {FC, ReactNode, useRef} from 'react';
import Left from '@/assets/chevron-left.svg';
import Right from '@/assets/chevron-right.svg';
import s from "./Carousel.module.css";

interface Props {
    title: string
    children: ReactNode[]
    gap: number
}

const List: FC<Props> = ({title, children, gap}) => {
    const scrollableContainerRef = useRef(null);
    const scroll = 450

    const scrollLeft = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft - scroll,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollableContainerRef.current) {
            scrollableContainerRef.current.scrollTo({
                left: scrollableContainerRef.current.scrollLeft + scroll,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div>
            {title && <h2 className={s.title}>{title}</h2>}
            {
                children?.length > 0 ?
                    <div className={s.scrollable_block}>
                        <button className={s.arrow} onClick={scrollLeft}>
                            {/*<img src={left} alt='' className={s.icon}/>*/}
                            <Left className={s.icon}/>
                        </button>
                        <div className={s.scrollable_container} style={{gap: gap}}
                             ref={scrollableContainerRef}>
                            {children}
                        </div>
                        <button className={s.arrow} onClick={scrollRight} style={{right: 0, left: 'auto'}}>
                            {/*<img src={right} alt='' className={s.icon}/>*/}
                            <Right className={s.icon}/>
                        </button>
                    </div>
                    : <h3>Нет информации о {title}</h3>
            }
        </div>
    );
};

export default List;