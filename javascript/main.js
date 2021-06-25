//set max-width to parent-sections
$(function () {
    function mainWidth() {
        const ele = $(".parent .nav-bar");
        let winWidth = $(window).innerWidth();
        let remainWidth = winWidth - $(".parent .nav-bar").outerWidth();
        if (winWidth <= 1200) {
            ele.addClass("active")
            $(".parent .parnet-sections").css("width", winWidth)
            $(".parent .section-four .container .over-lay").css("width", winWidth)
        } else {
            $(".parent .parnet-sections").css("width", remainWidth);
            ele.removeClass("active");
            $(".parent .section-four .container .over-lay").css("width", remainWidth)
        }
    }

    mainWidth()
    $(window).resize(function () {
        mainWidth()
    })
})
// Language JSON File Location
var language = localStorage.getItem('language');
// Default Language
var default_lang = 'en';

// Set Selected Language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    language = localStorage.getItem('language');
    // Run Multi Language Plugin
    getLanguage()
}

// Run Multi Language Plugin
function getLanguage() {
    // Language on user preference
    (language == null) ? setLanguage(default_lang) : false;
    // Load data of selected language
    $.ajax({
        url: 'locales/' + language + '.json',
        dataType: 'json', async: true
    }).done(function (lang) {
        // add selected language class to the body tag
        $('body').attr('class', language);
        // Loop through message in data
        $.each(lang, function (index, val) {
            (index === 'head') ? $(document).attr("title", val['title']) : false;
            $(index).children().each(function () {
                $(this).text(val[$(this).attr('key')])
            })
        })
    })
}

//translate setting section
$(".parnet-sections .setting .icon").on("click", function () {
    const eleWidth = $(this).parent().outerWidth();
    if ($(this).hasClass("active")) {
        $(this).parent().animate({
            right: -eleWidth + "px"
        }).children(".icon").removeClass("active")
    } else {
        $(this).parent().animate({
            right: 0
        }).children(".icon").addClass("active")
    }
})
//coloring web
const targetElemet = $(".parent .nav-bar .row ul");
$(".parnet-sections .setting .colors li").on("click", function () {

    //add bgcolor to all elements that have bgcolor-style class
    $(".bgcolor-style").css("background-color", "var(--" + $(this).attr("class") + ")")

    //add class to parent of list [ul]
    targetElemet.attr("class", $(this).attr("class"))
    $(".parent .nav-bar .row ul li.active")
        .attr("class", "heading " + targetElemet.attr("class") + " active")

    //add color to any text that has color-style class
    $(".color-style").css("color", "var(--" + $(this).attr("class") + ")")

    //add color-class to services section
    $(".parent .section-three .row .content").attr("class", "content grid " + $(this).attr("class"))

    //add border-color-class to portofolio section
    $(".parent .section-four .content .filter-list ul").attr("class", $(this).attr("class"))
})

//when click on nav-bar items
$(".parent .nav-bar .row ul li").on("click", function () {
    $(this).addClass("heading " + targetElemet.attr("class") + " active")
        .siblings().removeClass("" + targetElemet.attr("class") + " active")
})

//switch between dark/light mode
$(".parnet-sections .input input").on("click", function () {
    $(".parent").attr("class", "parent " + $(this).attr("class"))
})
//switch between language
$(".parnet-sections .lang input").on("click", function () {
    let lang = $(this).attr("class");
    if (lang != null && lang !== default_lang)
        getLanguage(lang);
})

//translate nav-bar section
$(".color-style.fas.fa-bars").on("click", function () {
    $(this).toggleClass("fa-times active");
    if ($(this).hasClass("active")) {
        $(".parent .nav-bar").addClass("translated")
    } else {
        $(".parent .nav-bar").removeClass("translated")
    }
})

//switch between sections
$(".parent .nav-bar .row ul li").on("click", function () {
    let ele = $("." + $(this).text());
    ele.css("z-index", "9").animate({
        "left": "0%"
    }, "fast").siblings(".section").css("z-index", "8").delay(650).animate({
        "left": "100%"
    }, function () {
        ele.css("z-index", "9")
    })
})

//section-four filter items 
$(".parent .section-four .content .filter-list ul li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active")
    let item = $(".bord." + $(this).text());
    const parent = $(".parent .section-four .content .grid").children()
    if ($(this).text() == "all") {
        parent.fadeIn().parent().removeClass("short") // grid setting
    } else {
        parent.fadeOut(function () {
            parent.parent().addClass("short")
        })
        item.delay(400).fadeIn()
    }
})

//section-four on click img 
$(".parent .section-four .content .items .bord .fa-search").on("click", function () {
    let ele = $(this).parent().siblings().attr("src")
    const overLay = $(".parent .section-four .over-lay");
    overLay.fadeIn().css("display", "flex").on("click", function () {
        $(this).fadeOut()
    })
    overLay.find(".slide")
        .on("click", function (e) {
            e.stopPropagation()
        })
        .attr("src", ele)
})
