import React, { useContext, useState, useEffect } from 'react';
import './Home.css'

import { CoinContext } from '../../context/CoinContext'
import {Link} from 'react-router-dom'
const Home = () => {
    const {allCoins,currency} = useContext(CoinContext);
    const[displayCoins,setDisplayCoins] = useState([]);
    const[input,setInput] = useState('');
    const inputHandler = (e)=>{
        setInput(e.target.value);
        if(e.target.value === '') setDisplayCoins(allCoins);
    }
    const searchHandler = async(e)=>{
        e.preventDefault();
        if(input === '') return;
        const filteredCoins = allCoins.filter((coin)=>coin.name.toLowerCase().includes(input.toLowerCase()));
        setDisplayCoins(filteredCoins);
    }

    useEffect(()=>{
        setDisplayCoins(allCoins);
        
    },[allCoins]);

  return (
    <div className='home'>
        <div className='hero'>
            <h1>Largest <br/>Crypto Marketplace</h1>
            <p>   Welcome to the world's largest cryptocurrency marketplace . Sign Up to explore more about cryptos..</p>
            <form>
                <input type="text" onChange={inputHandler} list='coinlist' value={input} placeholder='Search Crypto..' required/>
                <datalist id='coinlist'>
                    {allCoins.map((coin, index)=>(
                        <option key={index} value={coin.name}/>
                    ))}
                </datalist>
                <button type="submit" onClick={searchHandler}>Search</button>
            </form>
        </div>
        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoins.slice(0,10).map((item, index)=>(
                <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                    <p>{item.market_cap_rank}</p>
                    <div>
                        <img src={item.image} alt=""/>
                        <p>{item.name+" - "+item.symbol}</p>
                    </div>
                    <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                    <p className={item.price_change_percentage_24h>0?"green":"red"}>
                        {Math.floor(item.price_change_percentage_24h*100)/100}
                    </p>
                    <p  className='market-cap'>{item.market_cap.toLocaleString()}</p>
                </Link>
            ))}
        </div>
        

    </div>
  )
}

export default Home