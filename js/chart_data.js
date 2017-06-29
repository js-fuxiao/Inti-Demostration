$(window).load(function () {


    draw_chart_ad();
    draw_chart_err();
    draw_batt_passage();
    draw_charg_observ();
    draw_charg_result();
    draw_mppt_observ();
    draw_mppt_passage();
    draw_sw_passage();
    draw_sndac_passage();
    draw_chart_iv();
    draw_pv_passage();



    function draw_chart_ad() {
        chart_ad = c3.generate({
            bindto: '#chart_ad',
            data: {
                xs: {
                    'input_value': 'x1',
                    'measured_value': 'x1',
                },
                columns: [
                    ['x1'],
                    ['input_value'],
                    ['measured_value'],
                ],
                type: 'spline',
                colors: {
                    input_value: '#ff0000',
                    measured_value: '#00ff00',
                },
                //labels: true
            },
            axis: {
                x: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    show: true,
                },
                y: {
                    show: true,
                }
            }
        });
    };

    function draw_chart_err() {
        chart_err = c3.generate({
            bindto: '#chart_err',
            data: {
                x: 'x2',
                columns: [
                    ['x2'],
                    ['Err'],
                ],
                type: 'bar',
                //labels: true
                colors: {
                    Err: '#ff0000'
                },
            },
            axis: {
                rotated: true,
                x: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    show: true,
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };



    function pv_si_pr_disp() {
        for( i = 10 ; i > 0 ; i--){
            if( pc_parallel >= i ){
                $('#serial_parallel-area > div:nth-child('+ i + ')')
                    .css('display','flex');
            }else{
                $('#serial_parallel-area > div:nth-child('+ i + ')')
                    .css('display','none');
            }
            if( pv_series >= i ){
                $('#serial_parallel-area > div > div:nth-child('+ (2*i) + ')')
                    .css('display','block');
                $('#serial_parallel-area > div > div:nth-child('+ (2*i-1)+ ')')
                    .css('display','block');
            }else{
                $('#serial_parallel-area > div > div:nth-child('+ (2*i) + ')')
                    .css('display','none');
                $('#serial_parallel-area > div > div:nth-child('+ (2*i-1)+ ')')
                    .css('display','none');
            }
        }
    };

    function draw_chart_iv() {
        chart_iv = c3.generate({
            bindto: '#i_v-chart',
            data: {
                x: 'voltage',
                columns: [
                    ['voltage',31.9,31.8,31.7,31.6,31.5,31.4,31.3,31.2,31.1,31,30.9,30.8,30.7,30.6,30.5,30.4,30.3,30.2,30.1,30,29.9,29.8,29.7,29.6,29.5,29.4,29.3,29.2,29.1,29,28.9,28.8,28.7,28.6,28.5,28.4,28.3,28.2,28.1,28,27.9,27.8,27.7,27.6,27.5,27.4,27.3,27.2,27.1,27,26.9,26.8,26.7,26.6,26.5,26.4,26.3,26.2,26.1,26,25.9,25.8,25.7,25.6,25.5,25.4,25.3,25.2,25.1,25,24.9,24.8,24.7,24.6,24.5,24.4,24.3,24.2,24.1,24,23.9,23.8,23.7,23.6,23.5,23.4,23.3,23.2,23.1,23,22.9,22.8,22.7,22.6,22.5,22.4,22.3,22.2,22.1,22,21.9,21.8,21.7,21.6,21.5,21.4,21.3,21.2,21.1,21,20.9,20.8,20.7,20.6,20.5,20.4,20.3,20.2,20.1,20,19.9,19.8,19.7,19.6,19.5,19.4,19.3,19.2,19.1,19,18.9,18.8,18.7,18.6,18.5,18.4,18.3,18.2,18.1,18,17.9,17.8,17.7,17.6,17.5,17.4,17.3,17.2,17.1,17,16.9,16.8,16.7,16.6,16.5,16.4,16.3,16.2,16.1,16,15.9,15.8,15.7,15.6,15.5,15.4,15.3,15.2,15.1,15,14.9,14.8,14.7,14.6,14.5,14.4,14.3,14.2,14.1,14,13.9,13.8,13.7,13.6,13.5,13.4,13.3,13.2,13.1,13,12.9,12.8,12.7,12.6,12.5,12.4,12.3,12.2,12.1,12],
                    ['current',1.8,1.4,1,1.4,1.8,1.8,1.8,1.8,2.4,2.8,8,8.8,10,11.4,12.4,13.2,14.8,15.4,15.8,17,17.4,18.4,22.2,23.2,22.2,22.8,23.2,24.4,24.8,25.4,26.6,27,26.6,27,27.6,28.4,28.4,28.4,28,29.2,28.4,28.8,29.6,29.6,29.2,30.6,30,30.2,30.2,30.6,30.2,30.6,30,30,30.2,30.2,30.6,30.2,30.2,30.6,30.6,31,31,31.4,31,31,31,30,30.6,30.6,30.6,31.8,31,31.8,31.8,31.8,31.8,31.8,32.2,32.2,31.8,31.8,31.8,31.8,31.8,32.4,31.8,32.2,32.2,32.4,32.2,32.2,32.2,32.4,32.2,32.4,32.8,32.2,32.4,32.2,32.4,32.2,32.2,32.4,32.4,32.2,32.8,32.4,32.4,32.2,32.8,33.2,32.8,32.4,32.4,32.8,33.2,33.6,32.8,32.8,33.2,33.6,33.2,33.2,33.6,33.6,33.6,34,33.6,34,34,34.4,34.4,34,34,34,34,34,34.8,34.8,34.4,34.4,35,34.4,34.8,34.8,34.8,34.8,34.8,35,35.4,35.4,35,35,35.4,35.8,35.4,35,35.8,35.4,35.8,35.4,35.4,35.4,35,35.8,35.8,35.4,35.8,35.8,36.2,36.2,35.8,36.2,35.8,36.2,36.6,36.6,36.2,36.6,36.2,36.6,36.6,36.2,37,37,36.6,36.6,37,37,37.4,37.4,37.4,37,38,37.6,37.6,37.6,37.6,37.6],
                    ['power',57.42,44.52,31.7,44.24,56.7,56.52,56.34,56.16,74.64,86.8,247.2,271.04,307,348.84,378.2,401.28,448.44,465.08,475.58,510,520.26,548.32,659.34,686.72,654.9,670.32,679.76,712.48,721.68,736.6,768.74,777.6,763.42,772.2,786.6,806.56,803.72,800.88,786.8,817.6,792.36,800.64,819.92,816.96,803,838.44,819,821.44,818.42,826.2,812.38,820.08,801,798,800.3,797.28,804.78,791.24,788.22,795.6,792.54,799.8,796.7,803.84,790.5,787.4,784.3,756,768.06,765,761.94,788.64,765.7,782.28,779.1,775.92,772.74,769.56,776.02,772.8,760.02,756.84,753.66,750.48,747.3,758.16,740.94,747.04,743.82,745.2,737.38,734.16,730.94,732.24,724.5,725.76,731.44,714.84,716.04,708.4,709.56,701.96,698.74,699.84,696.6,689.08,698.64,686.88,683.64,676.2,685.52,690.56,678.96,667.44,664.2,669.12,673.96,678.72,659.28,656,660.68,665.28,654.04,650.72,655.2,651.84,648.48,652.8,641.76,646,642.6,646.72,643.28,632.4,629,625.6,622.2,618.8,629.88,626.4,615.76,612.32,619.5,605.44,609,605.52,602.04,598.56,595.08,595,598.26,594.72,584.5,581,584.1,587.12,577.02,567,576.38,566.4,569.22,559.32,555.78,552.24,542.5,551.32,547.74,538.08,540.58,537,539.38,535.76,526.26,528.52,519.1,521.28,523.38,519.72,510.42,512.4,503.18,505.08,501.42,492.32,499.5,495.8,486.78,483.12,484.7,481,482.46,478.72,474.98,466.2,475,466.24,462.48,458.72,454.96,451.2]
                ],
                types: {
                    current: 'spline',
                    power: 'spline'
                },
                axes: {
                    current: 'y',
                    power: 'y2'
                }
                //labels: true
            },
            zoom: {
                enabled: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'current',
                        position: 'outer-middle',
                    }
                },
                y2: {
                    label: {
                        text: 'power',
                    },
                    show: true
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };



    function draw_pv_passage() {
        chart_pv_pas = c3.generate({
            bindto: '#pv_passage-chart',
            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['data1', 40, 50, -20, 40, 0, -50],
                    ['data2', 30, 20, -120, 100, 50, 80]
                ],
                types: {
                    data1: 'bar',
                    data2: 'area-spline'
                },
                //labels: true
            },
            zoom: {
                enabled: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };



    function draw_batt_passage() {
        chart_batt_pas = c3.generate({
            bindto: '#battery_passage-chart',

            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['HTML', 40, 50, -20, 40, 0, -50],
                    ['CSS', 30, 20, -120, 200, 150, 250],
                    ['JavaScript', 130, 100, 140, -90, -150, 50]
                ],
                type: 'spline',
                //labels: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };


    function draw_charg_observ() {
        chart_charg_observ = c3.generate({
            bindto: '#charger_observ-area',

            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['voltage', 40],
                    ['current', 30],
                ],
                type: 'bar',
                //labels: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };

    function draw_charg_result() {
        chart_charg_result = c3.generate({
            bindto: '#charger_result-area',

            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['voltage', 40],
                    ['current', 30],
                ],
                type: 'bar',
                //labels: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };

    function draw_mppt_observ() {
        chart_charg_observ = c3.generate({
            bindto: '#mppt_observ-area',

            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['voltage', 40],
                    ['current', 30],
                ],
                type: 'bar',
                //labels: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };

    function draw_mppt_passage() {
        chart_mppt_pas = c3.generate({
            bindto: '#mppt_passage-chart',

            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['HTML', 40, 50, -20, 40, 0, -50],
                    ['CSS', 30, 20, -120, 200, 150, 250],
                    ['JavaScript', 130, 100, 140, -90, -150, 50]
                ],
                type: 'spline',
                //labels: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };

    function draw_sw_passage() {
        chart_sw_pas = c3.generate({
            bindto: '#switch_passage-chart',

            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['HTML', 40, 50, -20, 40, 0, -50],
                    ['CSS', 30, 20, -120, 200, 150, 250],
                    ['JavaScript', 130, 100, 140, -90, -150, 50]
                ],
                type: 'spline',
                //labels: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };

    function draw_sndac_passage() {
        chart_sndac_pas = c3.generate({
            bindto: '#sndac_passage-chart',

            data: {
                x: 'x',
                columns: [
                    ['x', 1, 2, 3, 4, 5, 6],
                    ['HTML', 40, 50, -20, 40, 0, -50],
                    ['CSS', 30, 20, -120, 200, 150, 250],
                    ['JavaScript', 130, 100, 140, -90, -150, 50]
                ],
                type: 'spline',
                //labels: true
            },
            axis: {
                x: {
                    show: false,
                    padding: {
                        left: 0.15,
                        right:0.1
                    }
                },
                y: {
                    label: {
                        text: 'lines delta',
                        position: 'outer-middle',
                    }
                }
            },
            grid: {
                x: {
                    lines: [
                        {value: 1, text: '#95', position: 'start'},
                        {value: 2, text: '#96', position: 'start'},
                        {value: 3, text: '#99', position: 'start'},
                        {value: 4, text: '#100', position: 'start'},
                        {value: 5, text: '#101', position: 'start'},
                        {value: 6, text: '#105', position: 'start'},
                    ]
                },
                y: {
                    lines: [
                        {value: 0}
                    ],
                    show: true,
                }
            }
        });
    };
});
