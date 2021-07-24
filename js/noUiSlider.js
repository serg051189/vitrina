jQuery(function ($) {


	let rangeSliderSum = document.getElementById('filter');


    noUiSlider.create(rangeSliderSum, {
        start: [2050],
        // tooltips: true,
      
        range: {
            'min': [300],
            'max': [20000]
        },
        pips:{
            node: 'values',
            values:[1000, 5000, 10000, 15000 ],
            density: 4,
        },
        
        format: wNumb({
            decimals: 0
        }),
        connect: 'lower',       
        
        
    });
    

    

    let rangeSliderSumValueElement = document.getElementById('filter_input');

    rangeSliderSum.noUiSlider.on('update', function (values, handle) {
        rangeSliderSumValueElement.value = values[handle];
    });

    rangeSliderSumValueElement.addEventListener('change', function() {
        rangeSliderSum.noUiSlider.set(this.value);
    })
   



});