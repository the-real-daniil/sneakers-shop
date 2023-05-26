'use client'

import Script from 'next/script';
import {Card} from './components/Card';
import styles from './page.module.css'
import {getSneakers, getUserSneakers, UserSneaker, Sneaker, addSneakerToUser, createInvoiceLink} from "./api";
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

    const onClickBuyButton = async (sneakerId: number) => {
        try {
            const {name, price} = sneakers[sneakerId];
            const invoiceLink = await createInvoiceLink([{
                label: name,
                amount: price,
            }])
            if (invoiceLink) {
                // @ts-ignore
                Telegram.WebApp.openInvoice(invoiceLink);
            }
        } catch (err) {
            console.error(err)
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
