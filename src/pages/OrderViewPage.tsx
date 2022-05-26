import React from 'react';
import {useParams} from "react-router-dom";
import Price from "../components/price/price";
import cl from './styles.module.css';

interface OrderViewPageParams {
    id: string
}

const OrderViewPage: React.FC = () => {
    const params = useParams<OrderViewPageParams>();

    return (
        <div style={{width: '100%'}}>
            <p className={'text_type_digits-default'}>#{params.id}</p>

            <h2>Black Hole Singularity острый бургер</h2>

            <p style={{color: '#00CCCC'}}>Выполнен</p>

            <h3>Состав:</h3>


            <div className={'custom-scroll'}>



                <div className={cl.orders} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px'}}>

                    <div className={cl.item}>
                        <img src="https://code.s3.yandex.net/react/code/bun-02.png" width={'auto'} alt=""/>
                    </div>

                    <div style={{flexGrow: 1}}>Флюоресцентная булка R2-D3</div>

                    <div>
                        2 x <Price value={123}></Price>
                    </div>
                </div>

            </div>


            <div style={{display: 'flex'}}>

                <span style={{flexGrow: 1}}>Вчера, 13:50 i-GMT+3</span>

                <Price value={510} />

            </div>
        </div>
    );
};

export default OrderViewPage;