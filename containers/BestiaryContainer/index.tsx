import React, { useState, useEffect } from 'react';
import { getListFromPokeApi} from "../../api";
import { BestiaryComponent } from "../../components/BestiaryComponent";


type limits = {
    offset : number,
    limit : number
}

export const BestiaryContainer = (props: limits) => {

    const [data, setData] = useState <any>()
    //const user = useSelector(state => state.user)

    useEffect(() => {
        const fetchList = async (offset: number, limit: number) => {
            const res = await getListFromPokeApi(offset, limit)
            setData(res)
            }

        fetchList(props.offset, props.limit)
    })

    return <BestiaryComponent pokemons={data}/>
}