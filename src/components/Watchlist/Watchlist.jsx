import React, { useContext} from 'react'
import './watchlist.scss'
import { Coincard } from '../Tabs/Grid'
import { WatchlistStore } from '../../Store/WatchlistStore'
function Watchlist() {

const{state} = useContext(WatchlistStore)
  return (
    <div className='watchlist'>
      {
        state?.map((coin, index) => (
          <Coincard key={index} coin={coin} />
        ))
      }
    </div>
  )
}

export default Watchlist