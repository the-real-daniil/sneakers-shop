'use client'

import Script from 'next/script';
import {Card} from './components/Card';
import styles from './page.module.css'
import {getSneakers, getUserSneakers, UserSneaker, Sneaker, addSneakerToUser} from "./api";
import {useState, useEffect} from "react";

export default function Home() {
    const [userSneakers, setUserSneakers] = useState<undefined | Record<string, UserSneaker>>(undefined)
    const [sneakers, setSneakers] = useState<Record<string, Sneaker>>({})

    useEffect(() => {
        getSneakers().then(data => setSneakers(data));
    }, [])

    const onLoadTelegram = () => {
        const userId = Telegram.WebApp.initDataUnsafe.user?.id;
        if (userId) {
            getUserSneakers(userId).then(data => setUserSneakers(data));
        }
    }

    const onClickBuyButton = (sneakerId: number) => {
        const userId = Telegram.WebApp.initDataUnsafe.user?.id;
        if (userId) {
            addSneakerToUser(userId, sneakerId).then(data => setUserSneakers(data));
        }
    }

    return (
        <main className={styles.main}>
            <Script src="https://telegram.org/js/telegram-web-app.js" onLoad={onLoadTelegram}/>
            {userSneakers
                ?
                    <section className={styles.grid}>
                        {Object.values(sneakers).map(({id, ...product}) =>
                            <Card {...product}
                                  id={id}
                                  key={id}
                                  isBought={!!userSneakers[id]}
                                  onClickBuyButton={onClickBuyButton}
                                  steps={userSneakers[id] ? userSneakers[id].steps : 0}
                            />
                        )}
                    </section>
                : null
            }
        </main>
    )
}
