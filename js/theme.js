		/* ------------------------------------------------------------------------ */
		/* Background Slider
		/* ------------------------------------------------------------------------ */

		$('body').vegas({
			overlay: 'img/overlay.png',
		    slides: [
		        { src: 'img/banner3.jpg' },
		        { src: 'img/banner2.jpg' },
		        { src: 'img/banner1.jpg' },
		    ],
		});





		/* ------------------------------------------------------------------------ */
		/* PageLoader
		/* ------------------------------------------------------------------------ */
        // Wait for window load
		$(window).load(function() {
		    // Animate loader off screen
		    $(".page-loader").fadeOut("slow");
		});


