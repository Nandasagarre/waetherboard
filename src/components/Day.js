//Popups components, data rendering component

import React from 'react';
import ReactDOM from 'react-dom';


function Day({date, icon, computedData, metric}) {
    console.log('computed', computedData);
    const unixdate = Date.parse(date) / 1000;
    const modal = (
        <div className="modal fade"
            id={
                `modal_${unixdate}`
            }
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                            {date}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="text-left">Temp</td>
                                    <td></td>
                                    <td className="text-right">
                                        {
                                        `${
                                            computedData[date].temp
                                        } ${
                                            metric ? ' F' : ' C'
                                        }`
                                    }</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Pressure</td>
                                    <td></td>
                                    <td className="text-right">
                                        {
                                        `${
                                            computedData[date].pressure
                                        } ${
                                            metric ? ' PSI' : ' Pac'
                                        }`
                                    }</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Humidity</td>
                                    <td></td>
                                    <td className="text-right">
                                        {
                                        `${
                                            computedData[date].humidity
                                        } gm^-3`
                                    }</td>
                                </tr>
                            </tbody>
                        </table>
                        {
                        "It could more like a " + computedData[date].description
                    } </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className='Dcontainer'>

            <button className="d-flex justify-content-center align-items-center rounded-circle day_width" data-bs-toggle="modal"
                data-bs-target={
                    `#modal_${unixdate}`
            }>
                <img src={
                    `https://openweathermap.org/img/wn/${icon}@2x.png`
                } alt={computedData[date].description}/>
            </button>
            <div className="description">
                {date} </div>

            {
            ReactDOM.createPortal(modal, document.getElementById('modal-root'))
        } </div>


    )
}

export default Day;
