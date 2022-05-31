import React, {useEffect, useMemo, useRef, useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import cl from './burger-ingredients.module.css';
import {TITLES} from "../../constants";
import BurgerIngredientsList from "../burger-ingredients-list/burger-ingredients-list";
import {IngredientType, IngredientTypes} from "../../types/types";
import {useSelector} from "../../services/store";

const BurgerIngredients: React.FC = () => {

    const list = useSelector(state => state.ingredients);
    const groups = useMemo(() => list.reduce((prev, curr) => {
        prev[curr.type] = prev[curr.type] || []
        prev[curr.type].push(curr);

        return prev;
    }, {} as { [K in IngredientTypes]: IngredientType[] }), [list]);

    const [activeTab, setActiveTab] = useState<IngredientTypes | null>(null);
    const $refs = new Map<IngredientTypes, HTMLElement>(); // vue.js I love u

    const changeTab = (val: any): void => {
        setActiveTab(val);
        $refs.get(val)?.scrollIntoView({block: 'start', behavior: 'smooth'});
    }

    const createRef = (ref: IngredientTypes): (element: HTMLElement) => void => (element) => {
        $refs.set(ref, element);

        if (element != null) {
            observer.observe(element);
        }
    }

    useEffect(() => setActiveTab((Object.keys(groups) as Array<IngredientTypes>)[0] ?? null), [list]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollRatio, setScrollRatio] = useState<{ [K in IngredientTypes]?: number }>({});

    const observer = useMemo<IntersectionObserver>(() => new IntersectionObserver((entries) => {
        entries.forEach(({target, intersectionRatio}) => {
            setScrollRatio(prev => {
                return {...prev, [target.getAttribute('id') as IngredientTypes]: intersectionRatio}
            });
        })
    }, {
        root: scrollRef.current,
        threshold: [0.0, 0.5]
    }), []);

    useEffect(() => {
        let previous: [IngredientTypes | null, number] = [null, 0];

        for (const [key, value] of Object.entries(scrollRatio)) {
            if (value > previous[1]) {
                previous = [key as IngredientTypes, value]
            }
        }

        if (previous[0] != null) {
            setActiveTab(previous[0]);
        }
    }, [scrollRatio]);

    return (<div>
        <div className={cl.tabs}>
            {(Object.keys(groups) as Array<IngredientTypes>).map(group => (
                <Tab value={group} key={group} active={activeTab === group} onClick={changeTab}>{TITLES[group]}</Tab>
            ))}
        </div>
        <div className={cl.scroll + ' custom-scroll'} ref={scrollRef}>
            {(Object.keys(groups) as Array<IngredientTypes>).map(key => (
                <BurgerIngredientsList key={key} ref={createRef(key)} type={key} list={groups[key]}/>
            ))}
        </div>
    </div>)
};

export default BurgerIngredients;