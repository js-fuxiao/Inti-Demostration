
$(function(){
    var chart_ad;
    var chart_err;
    var chart_iv;
    var chart_pv_pas;
    var chart_batt_pas;
    var chart_charg_observ;
    var chart_charg_result;
    var chart_charg_observ;
    var chart_mppt_pas;
    var chart_sw_pas;
    var chart_sndac_pas;

    draw_chart_ad();
    draw_chart_err();
    draw_chart_iv();
    draw_pv_passage();
    draw_batt_passage();
    draw_charg_observ();
    draw_charg_result();
    draw_mppt_observ();
    draw_mppt_passage();
    draw_sw_passage();
    draw_sndac_passage();

    var rdm;

    var columns_ad = [
                ['x1'],
                ['input_value'],
                ['measured_value']
            ]
    var columns_err = [
                ['x2'],
                ['Err'],
            ]


    $('#add_point-btn').click(function() {

        var set_bal = parseInt($('#new_point input').val());
        if(!isNaN(set_bal)){
            columns_ad[0].push(set_bal);
            columns_ad[1].push(set_bal);
            columns_err[0].push(set_bal);

            rdm = Math.random() * 11;
            rdm += parseInt($('#new_point input').val())-5;
            columns_ad[2].push(rdm);

            rdm -= set_bal;
            columns_err[1].push(rdm);

            chart_ad.load({
                columns: columns_ad
            });
            chart_err.load({
                columns: columns_err
            });
        }
    });



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

    function draw_chart_iv() {
        chart_iv = c3.generate({
            bindto: '#i_v-chart',
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
