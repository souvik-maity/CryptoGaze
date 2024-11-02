import React, { useEffect } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'     
import LineChart from '../../components/LineChart/LineChart'
const Coin = () => {
  const coinId = useParams().coinId;
  const[coinData,setCoinData] = useState();
  const {currency} = useContext(CoinContext);
  const [historicalData, setHistoricalData] = useState();
  const fetchHistoricalData = async()=>{  
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_API_KEY}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  };
  const fetchcoinData = async()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
       
      }
    };
    
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(()=>{ 
    fetchcoinData();
    fetchHistoricalData();
  },[currency]);

  if(coinData && historicalData){
  return (
   <div className='coin'>
        <div className='coin-name'>
            <img src={coinData.image.large} alt=""/>
            <p><b>{coinData.name} {coinData.symbol.toUpperCase() }</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData}/>
        </div>
        <div className='coin-info'> 
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Crypto Price</li>
              <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>Market Cap</li>
              <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>24 Hour High</li>
              <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
            </ul>
            <ul>
              <li>24 Hour Low</li>
              <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
            </ul>
        </div>
    </div>
     
    );
  } else {
    return (
      <div className='spinner'>
          <div className='spin'>

          </div>
      </div>
    )
  }
}

export default Coin;