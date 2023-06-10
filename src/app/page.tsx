'use client'

import Script from 'next/script';
import {Card} from './components/Card';
import styles from './page.module.css'
import {getSneakers, getUserSneakers, UserSneaker, Sneaker, createInvoiceLink} from "./api";
import {useState, useEffect} from "react";

const INVOICE_STATUS_TYPES = {
    PAID: 'paid',
    FAILED: 'failed',
    PENDING: 'pending'
};

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
            const {link} = await createInvoiceLink(sneakerId)

            if (link) {
                // @ts-ignore
                Telegram.WebApp.openInvoice(link, status => {
                    switch (status) {
                        case INVOICE_STATUS_TYPES.PAID:
                        case INVOICE_STATUS_TYPES.PENDING:
                            Telegram.WebApp.close();
                            break;
                        case INVOICE_STATUS_TYPES.FAILED:
                            console.error('Payment has been failed');
                            break;
                        default:
                            console.warn('Payment has been canceled');
                    }
                });
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
