import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HighCharts from 'highcharts';
import PieChart from 'highcharts-react-official'





const PieChartEarnings = () => {

    // Store Country and Earnings in State
    const [earnings, setEarnings] = useState([]);


    // Fetch Earnings data when component is rendered
    useEffect(() => {
        const fetchEarnings = async () => {
            // Fetch data from backend
            const data = await axios.get("http://localhost:8080/earnings");
            // Format the data
            const formattedData = data.data.map(country => {
                return {
                    name: country.country,
                    y: country.earnings
                }
            });
            // Store in state
            setEarnings(formattedData);
        };

        fetchEarnings();
    }, []);



    // Piechart configuration
    const config = {
        credits: {
            enabled: false
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Earnings for each country'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Countries',
            colorByPoint: true,
            data: earnings
        }],
    };



    if (earnings) {
        return (
            <div>
                <PieChart highcharts={HighCharts} options={config} />
            </div>
        )
    } else {
        return (
            <div>Loading Earnings Data</div>
        )
    }
};


export default PieChartEarnings;