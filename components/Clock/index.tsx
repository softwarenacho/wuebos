import styles from '../../styles/Clock.module.css'
import { useRef, useEffect} from 'react'

export default function Clock() {

    const hr = useRef<HTMLDivElement>(null)
    const mn = useRef<HTMLDivElement>(null)
    const sc = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (hr && mn && sc) {
            setInterval(() => {
                const deg = 6
                let day = new Date()
                let hour = day.getHours() * 30;
                let minute = day.getMinutes() * deg
                let second = day.getSeconds() * deg
                if (hr && mn && sc) {
                    hr.current.style.transform = `rotateZ(${(hour)+(minute/12)}deg)`
                    mn.current.style.transform = `rotateZ(${(minute)}deg)`
                    sc.current.style.transform = `rotateZ(${(second)}deg)`
                }
            })
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.clock}>
                <div className={styles.hour}>
                    <div className={styles.hr} id="hr" ref={hr}></div>
                </div>
                <div className={styles.min}>
                    <div className={styles.mn} id="mn" ref={mn}></div>
                </div>
                <div className={styles.sec}>
                    <div className={styles.sc} id="sc" ref={sc}></div>
                </div>
            </div>
        </div>
    )
}