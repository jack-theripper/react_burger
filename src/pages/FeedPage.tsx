import React from 'react';
import cl from "./styles.module.css";
import Price from "../components/price/price";

const FeedPage: React.FC = () => {
    return (<>
        <h1>Лента заказов</h1>
        <div className="grid">
            <div>


                <div style={{flexGrow: 1, maxHeight: 'calc(100vh - 200px)', overflow: 'hidden scroll', scrollbarWidth: 'thin' }} className={'custom-scroll'}>

                    <div className={cl.orders}>

                        {[...Array(10)].map((e, i) => (
                            <div className={cl.box}>
                                <div className={cl.header}>
                                    <span className={'text_type_digits-default'}>#034535</span>
                                    <span className={'text_type_main-default'}>Сегодня, 16:20 i-GMT+3</span>
                                </div>
                                <h3 className={'text_type_main-medium'} style={{display: 'flex', alignItems: 'center'}}>
                                    Death Star Starship Main бургер
                                </h3>
                                <p className={'text_type_main-default'}>Создан</p>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <div style={{flexGrow: 1}} className={cl.items}>
                                        <div className={cl.item}>
                                            <img src="https://code.s3.yandex.net/react/code/bun-02.png" width={'auto'} alt=""/>
                                        </div>
                                        <div className={cl.item}>
                                            <img src="https://code.s3.yandex.net/react/code/meat-02.png" alt=""/>
                                        </div>
                                        <div className={cl.item}>
                                            <img src="https://code.s3.yandex.net/react/code/core.png" alt=""/>
                                            <div style={{
                                                background: '#1C1C21',
                                                opacity: '0.6',
                                                position: 'absolute',
                                                top: 0, left: 0, bottom: 0, right: 0, textAlign: "center", paddingTop: '30%'
                                            }}>
                                                +3
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <Price value={123}/>
                                    </div>
                                </div>
                            </div>))}


                    </div>

                </div>
            </div>
            <div>


                <div className={'grid'}>
                    <div>
                        Готовы:
                        <ul className={'text_type_digits-default mt-3'} style={{color: '#00CCCC'}}>
                            <li>034533</li>
                            <li>034533</li>
                            <li>034533</li>
                            <li>034533</li>
                            <li>034533</li>
                        </ul>
                    </div>
                    <div>
                        В работе:
                        <ul className={'text_type_digits-default mt-3'}>
                            <li>034533</li>
                            <li>034533</li>
                            <li>034533</li>
                        </ul>
                    </div>
                </div>

                <p className={'text_type_main-large'}>Выполнено за все время:</p>
                <div className={'text_type_digits-large'}>28 752</div>

                <p className={'text_type_main-large'}>Выполнено за сегодня:</p>
                <div className={'text_type_digits-large'}>138</div>

            </div>
        </div>

    </>);
};

export default FeedPage;