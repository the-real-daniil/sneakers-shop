'use client'

import css from './Card.module.css'

type Props = {
    image: string;
    name: string;
    price: number;
    id: number;
    isBought: boolean;
    onClickBuyButton: (sneakerId: number) => void;
    steps: number;
}

export const Card = ({image, name, price, id, isBought, onClickBuyButton, steps}: Props) => {
    return (
        <div className={css.card}>
            <img src={image} alt={name} className={css.image}/>
            <div className={css.name}>{name}</div>
            <div className={css.price}>{price} ₽</div>
            <button className={isBought ? css.stepsButton : css.buyButton} onClick={() => onClickBuyButton(id)}>
                {isBought ? `Steps: ${steps}` : 'Buy'}
            </button>
        </div>
    )
}