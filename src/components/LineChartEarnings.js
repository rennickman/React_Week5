import React, { useState, useEffect } from 'react';
import axios from 'axios'
import HighCharts from 'highcharts/highstock'
import LineChart from 'highcharts-react-official'



const LineChartEarnings = () => {

    // Store sales data in state
    const [sales, setSales] = useState([]);
    const [startYear, setStartYear] = useState(0)


    // Fetch Sales data when component is rendered
    useEffect(() => {
        const fetchSales = async () => {
            // Fetch data from backend
            const data = await axios.get("http://localhost:8080/sales");
            // Set the start year
            setStartYear(data.data[0].years[0])
            // Format the data
            const formattedData = data.data.map(country => {
                return {
                    name: country.country,
                    data: country.data
                }
            });
            // Store formatted data in state
            setSales(formattedData);
        };

        fetchSales();
    }, []);

    

    // Line chart configuration
    const config = {
        credits: {
            enabled: false
        },
        title: {
            text: 'Sales per year'
        },
        yAxis: {
            title: {
                text: 'Price'
            }
        },
        xAxis: {
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: startYear
            }
        },
        series: sales,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    };



    if (sales) {
        return (
            <div>
                <LineChart highcharts={HighCharts} options={config} />
            </div>
        )
    } else {
        return (
            <div>Loading Sales Data</div>
        )
    }
};


export default LineChartEarnings;