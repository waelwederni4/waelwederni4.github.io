$(window).ready(function () {
    const chk = document.getElementById('chk');
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector(".parnet-sections .topnav #btn");
    let listItems = document.querySelectorAll('.soical-icons li');
    const targetElemet = $(".parent .sidebar ul");
    $(function () {
        let mode=localStorage.getItem("mode");
        $(".parent").attr("class", "parent "+mode);
        if (mode == "light") {
            chk.checked = true;
        }else{
            chk.checked = false;
        }
      /*  function mainWidth() {
            const ele = $(".parent .sidebar");
            let winWidth = $(window).innerWidth();
            let remainWidth = winWidth - $(".parent .sidebar").outerWidth();
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
        })*/
        /*function stopPropagation(target) {
            target.on("click", function (e) {
                e.stopPropagation(); //important
            })
        }
        stopPropagation($(".color-style.fas.fa-bars"))
        stopPropagation($(".parent .sidebar"))
        stopPropagation($(".parent .parnet-sections .setting"))
        setTimeout(()=>{
            $('.parent .splash-overlay').addClass('display-none');
            $('.parent .splash').addClass('display-none');
            //$('.parent .custom-overlay').style.display=none;
        },2000);*/

    })

    listItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            const str = event.currentTarget.innerHTML;
            if (str.includes("facebook")) window.location.replace("https://www.facebook.com/wael.wederni");
            else if (str.includes("twitter")) window.location.replace("https://twitter.com/Wael21871333");
            else if (str.includes("instagram")) window.location.replace("https://www.instagram.com/wael_wederni/?hl=fr");
            else if (str.includes("linkedin-in")) window.location.replace("https://www.linkedin.com/in/wael-wederni-235b6018a/");
            else if (str.includes("github")) window.location.replace("https://github.com/waelwederni4");
        });
    });
    function menuBtnChange() {
        if(sidebar.classList.contains("open")){
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        }else {
            closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
        }
    }
    function closeNavBar(target) {
        target.on("click", function () {
            if(sidebar.classList.contains("open")) {
                sidebar.classList.toggle("open");
                menuBtnChange();
            }
        })
    }
    function loadPage() {
        if(localStorage.getItem('mode')) {
            let mode=localStorage.getItem("mode");
            $(".parent").attr("class", "parent "+mode);
        }
        if(localStorage.getItem('lang')) {
            MultiLanguage(localStorage.getItem('lang'));
        }
    }
    $(window).onload=loadPage;
    function MultiLanguage(c) {
        var b = this;
        if (c == null) {
            c = null
        }
        return $.getJSON("language.json", function (g) {
            var f, d, h, e;
            if (c !== null) {
                localStorage.MultiLanguage = c
            } else {
                if (typeof localStorage.MultiLanguage === "undefined") {
                    c = localStorage.MultiLanguage = g.config["default"]
                } else {
                    c = localStorage.MultiLanguage
                }
            }
            d = g.language[c];
            e = [];
            for (f in d) {
                h = d[f];
                if ($(f).get(0).tagName.toLowerCase() === "title") {
                    document.title = h;
                    continue
                }
                if (f.length > 0) {
                    e.push($(f).html(d[f]))
                } else {
                    e.push(void 0)
                }
            }
            return e
        });
    }
    $("input[type='radio'][name='language-switch1']").on("click", function () {
        const lang= $("input[type='radio'][name='language-switch1']:checked").val();
        localStorage.setItem("lang",lang);
        MultiLanguage(lang);
    })
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

//when click on nav-bar items
    $(".parent .sidebar  ul li").on("click", function () {
        document.querySelectorAll('.parent .sidebar ul li a').forEach(elem => $(elem).removeClass("active"));
        $(this).addClass("heading " + targetElemet.attr("class") + " active")
            .siblings().removeClass("" + targetElemet.attr("class") + " active")
$(this).children().addClass("active")
    })

    chk.addEventListener('change', () => {
        let parentstr = $(".parent").attr("class");
        if (parentstr == "parent light") {
            $(".parent").attr("class", "parent dark");
            localStorage.setItem("mode","dark");
        } else {
            $(".parent").attr("class", "parent light");
            localStorage.setItem("mode","light");
        }
    });

//translate nav-bar section
    $(".color-style.fas.fa-bars").on("click", function () {
        $(this).toggleClass("fa-times active");
        if ($(this).hasClass("active")) {
            $(".parent .sidebar").addClass("translated")
        } else {
            $(".parent .sidebar").removeClass("translated")
        }
    })

//switch between sections
    $(".parent .sidebar  ul li").on("click", function () {
        let name="heading-nav"+($(this).index()+1);
        let ele = $("." +name );
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
    $(".language__container--fr").on("click", function () {
        let fr = document.getElementById("fr");
        let en = document.getElementById("en");
        fr.checked = true;
        en.checked = false;
    })
    $(".language__container--en").on("click", function () {
        let fr = document.getElementById("fr");
        let en = document.getElementById("en");
        fr.checked = false;
        en.checked = true;
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
    $(".parent .topnav #btn").on("click", function () {
        sidebar.classList.toggle("open");
        menuBtnChange();
    })
    closeNavBar($(".parent .section"))
    closeNavBar($(".parent .sidebar  ul li"))
})
