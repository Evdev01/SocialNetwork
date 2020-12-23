import React, {useState} from 'react'
import styles from './Paginator.module.css'

type PropsType = {
    onPageChanged: (pageNumber: number) => void
    totalCount: number
    pageSize: number
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({onPageChanged, totalCount, pageSize, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button className={styles.prevButtonPaginator} onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={styles.pageNumber}
                             key={p}
                             onClick={() => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
        {portionCount > portionNumber &&
        <button className={styles.nextButtonPaginator} onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>NEXT</button>}


    </div>

}

export default Paginator












