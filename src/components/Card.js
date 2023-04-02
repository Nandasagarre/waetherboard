//Main card as the dashboard
import React from 'react';
import Day from './Day'
function Card({data, computed, Metric}) { 
    return (
        <div style={
            {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }
        }>
            <div className="card card_width">
                <div className="card-body">
                    <h5 className="card-title">
                        {
                        data.city ? data.city.name : 'Search...'
                    }</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Click to Get More Info</h6>

                    <div className='board-container d-flex justify-content-center align-items-center'>
                        {

                        Object.keys(computed).map((date, index) => (
                            <div id={index}>
                                <Day key={index}
                                    date={date}
                                    icon={
                                        computed[date].icon
                                    }
                                    computedData={computed}
                                    metric={Metric}/>
                            </div>
                        ))
                    } </div>

                </div>
            </div>
        </div>
    )
}
export default Card;
