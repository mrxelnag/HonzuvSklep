// scroll animace
jQuery(window).ready(function() {
    if(jQuery('.animeClass').length > 0){
        animateElements();

        setTimeout(function() {
            animateElements();
        }, 1000);

        jQuery(window).scroll(function() {
            animateElements();
        });
    }

});
var uniqueCounter = 0;
function animateElements(){
    console.log();
    var top = jQuery(window).scrollTop();
    var h = jQuery(window).height();
    var bottom = top+h; // 150 offset from bottom 
    jQuery('.animeClass').each(function() {
        var delay =  0;
        var animeOffset = 0.1*jQuery(window).height();
        if(jQuery(this).is('[data-delay]'))
            var delay = parseInt(jQuery(this).attr('data-delay'));

        if(jQuery(this).is('[data-anime-offset]'))
            animeOffset  = parseInt(jQuery(this).attr('data-anime-offset')) / 100 * jQuery(window).height();

        var cls = 'data-u-'+uniqueCounter;

        if(jQuery(window).width() <=767)
            delay = 0;

        if (!jQuery(this).hasClass('animated') && !jQuery(this).hasClass('animeIgnore')) {
            var TTop = jQuery(this).offset().top;
            if (TTop <= (bottom-animeOffset)) {
                jQuery(this).addClass('animeIgnore').addClass(cls);
                uniqueCounter++;
                setTimeout(function() {
                    jQuery('.'+cls).addClass('animated');
                    setTimeout(function() {
                        jQuery('.'+cls).removeClass('animeClass')
                    }, 4000);
                }, delay); 
            }
        }

    });

}