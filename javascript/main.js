
$(window).ready(function () {
    const chk = document.getElementById('chk');
    let sidebar = document.querySelector(".sidebar");
    let navlist = document.querySelector(".nav-list");
    let closeBtn = document.querySelector(".parnet-sections .topnav #btn");
    let listItems = document.querySelectorAll('.soical-icons li');
    const fader = document.querySelectorAll('.fadeUp');
    const appearOption = {
        root:null,
        threshold:0,
        rootMargin:"-150px"
    };
    const appearOnscroll = new IntersectionObserver(
        function (
            entries,
            appearOnscroll
        ){
            entries.forEach(function (entry, i){
                if (!entry.isIntersecting){
                    return;
                }else {
                    entry.target.classList.add("appear");
                    appearOnscroll.unobserve(entry.target);
                }
            });
        },appearOption);
    const targetElemet = $(".parent .sidebar ul");
    var splashoverlay = document.getElementById('splash-overlay');
    var welcome = document.getElementById('welcome');
    var iconSidebar  = [].slice.call(document.querySelectorAll('.parent .sidebar  ul li'), 0);
    $(function () {
        fader.forEach(fad=>{
            appearOnscroll.observe(fad);
        })
        setTimeout(function (){$(".parent .parnet-sections .section-one .containerFirst .boxFirst .container .row").removeClass("animer");},3000);
        setTimeout(function(){
            splashoverlay.style.display = 'none';
            splashoverlay.style.opacity = 0;
            welcome.style.display = 'none';
            welcome.style.opacity = 0;
        }, 4000);
        var nodes  = [].slice.call(document.querySelectorAll('.parent .section-four .content .grid li'), 0);
        function getDirection(ev, obj) {
            var w, h, x, y, d;
            w = obj.offsetWidth;
            h = obj.offsetHeight;
            x = (ev.pageX - obj.offsetLeft - (w / 2) * (w > h ? (h / w) : 1));
            y = (ev.pageY - obj.offsetTop - (h / 2) * (h > w ? (w / h) : 1));
            d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
            return d;
        }

        function addClass(ev, obj, state) {
            var direction, class_suffix;
            direction = getDirection(ev, obj);
            class_suffix = "";
            if(obj.classList.contains("in-top"))obj.classList.remove("in-top");
            if(obj.classList.contains("in-right"))obj.classList.remove("in-right");
            if(obj.classList.contains("in-bottom"))obj.classList.remove("in-bottom");
            if(obj.classList.contains("in-left"))obj.classList.remove("in-top");
            if(obj.classList.contains("out-top"))obj.classList.remove("out-top");
            if(obj.classList.contains("out-right"))obj.classList.remove("out-right");
            if(obj.classList.contains("out-bottom"))obj.classList.remove("out-bottom");
            if(obj.classList.contains("out-left"))obj.classList.remove("out-left");
            switch (direction) {
                case 0 : class_suffix = '-top';    break;
                case 1 : class_suffix = '-right';  break;
                case 2 : class_suffix = '-bottom'; break;
                case 3 : class_suffix = '-left';   break;
            }
            obj.classList.add(state + class_suffix);
        }
        // bind events
        nodes.forEach(function (el) {
            el.addEventListener('mouseenter', function (ev) {
                addClass(ev, this, 'in');
            }, false);

            el.addEventListener('mouseleave', function (ev) {
                addClass(ev, this, 'out');
            }, false);
        });
    })
    function addBg(obj){
        if($(".parent").hasClass("light"))obj.css("background", "#2196f3");
        else if($(".parent").hasClass("dark")) obj.css("background", "#504e70");
    }
    function removeBg(obj){
        if($(".parent").hasClass("light"))obj.css("background", "#fdf9ff");
        else if($(".parent").hasClass("dark")) obj.css("background", "#302e4d");
    }
    navlist.addEventListener('mouseenter', function (ek) {
        iconSidebar.forEach(elem => removeBg($(elem).children('a')));
        iconSidebar.forEach(function (el) {
            el.addEventListener('mouseenter', function (ev) {
                addBg($(el).children('a'));
            }, false);

            el.addEventListener('mouseleave', function (ev) {
                removeBg($(el).children('a'));
            }, false);
        });
    }, false);

    navlist.addEventListener('mouseleave', function (ev) {
        iconSidebar.forEach(function (el) {
            el.removeEventListener('mouseenter',null);
            el.removeEventListener('mouseleave',null);
        });
        addBg($('.nav-list li a.active'));
    }, false);
    listItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            const str = event.currentTarget.innerHTML;
            if (str.includes("facebook")) getUrl("facebook");
            else if (str.includes("twitter")) getUrl("twitter");
            else if (str.includes("instagram")) getUrl("instagram");
            else if (str.includes("linkedin-in")) getUrl("linkedin-in");
            else if (str.includes("github")) getUrl("github");
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
        const mode=localStorage.getItem("mode");
        const lang=localStorage.getItem('lang');
        $(".parent").attr("class", "parent "+mode);
        if (mode == "light") {
            document.body.style.backgroundColor="#fdf9ff";
            $(".HeadLogo").attr("href","imgs/logo.png");
            chk.checked = true;
        }else if(mode == "dark"){
            document.body.style.backgroundColor="#151515";
            $(".HeadLogo").attr("href","imgs/logoDark.png");
            chk.checked = false;
        }
        if (lang!="" || lang!=undefined){
            MultiLanguage(lang);
        }
    }
    function getUrl(name){
        $.getJSON("json/urls.json", function (data) {
            if(data[name]!=""){
                window.location.replace(data[name]);
            }
        });
    }
    $(window).on("load",loadPage);
    function MultiLanguage(c) {
        var b = this;
        if (c == null) {
            c = null
        }
        return $.getJSON("json/language.json", function (g) {
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
    $(".parent .section-four .content .grid .bord .info .button__holder").on("click", function () {
        let ele = $(this).parent().parent().children('a').children('img').attr("src");
        const name=ele.replace("imgs/projects/","").replace("0.jpg","").replaceAll("/","");
        getUrl(name);
    })

    chk.addEventListener('change', () => {
            chk.disabled=true;
            if(chk.checked){
                $(".parent").attr("class", "parent light");
                document.body.style.backgroundColor="#fdf9ff";
                $(".HeadLogo").attr("href","imgs/logo.png");
                localStorage.setItem("mode","light");
            }else{
                $(".parent").attr("class", "parent dark");
                document.body.style.backgroundColor="#151515";
                $(".HeadLogo").attr("href","imgs/logoDark.png");
                localStorage.setItem("mode","dark");
            }
        if ($(".parent .parnet-sections .section-one").hasClass("active")){
        $(".parent .parnet-sections .section-one .containerFirst .boxFirst .container .row").addClass("animer");
        setTimeout(function(){
            $(".parent .parnet-sections .section-one .containerFirst .boxFirst .container .row").removeClass("animer");
            chk.disabled=false;
        }, 3000);
        }else{
            chk.disabled=false;
        }
        iconSidebar.forEach(function (el) {
            removeBg($(el).children('a'));
            el.removeEventListener('mouseenter',null);
            el.removeEventListener('mouseleave',null);
        });
        addBg($('.nav-list li a.active'));
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
        document.querySelectorAll('.parent .sidebar ul li a').forEach(elem => $(elem).removeClass("active"));
        document.querySelectorAll('.parent .parnet-sections .section').forEach(elem => $(elem).removeClass("active"));
        let id=$(this).attr('id');
        $(this).children().addClass("active");
        $(".parent .parnet-sections ."+id).addClass("active");
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
        $(this).addClass("active").siblings().removeClass("active");
        const parent = $(".parent .section-four .content .grid").children();
        var filters = $(this).data("filter");
        if (filters == "all") {
            parent.fadeIn().parent().removeClass("short") // grid setting
        }else {
            let item = $(".parent .section-four .content .grid ."+ filters);
            parent.fadeOut(function () {
                parent.parent().addClass("short")
            })
            item.delay(300).fadeIn();
        }
    });
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
    $(".parent .section-four .content .items .bord .info .box").on("click", function () {
        let ele = $(this).parent().parent().children('a').children('img').attr("src");
        const name=ele.replace("imgs/projects/","").replace("/0.jpg","");
        const overLay = $(".parent .section-four .over-lay");
        const elemName=$(this).parent().parent().attr('class').split(" ")[1];
        overLay.find(".slider").addClass(elemName);
        const close=$(".parent .section-four .over-lay .close");
        overLay.fadeIn().css("display","flex");
        close.on("click", function() { $(this).parent().fadeOut();
            overLay.find(".slider").remove();
            overLay.append(" <div class='slider'><ul class='ullist'></ul></div>")
        });
        let vrai=true;
        let i=1;
        if(ifExists("imgs/projects/"+name+"/"+0+".mp4")){
            overLay.find(".slider").find(".ullist").append("<li><video class='VideoProj' autoplay muted loop controls><source src='imgs/projects/"+name+"/"+0+".mp4' type='video/mp4'></video></li>");
        }
        while (ifExists("imgs/projects/"+name+"/"+i+".jpg")){
                overLay.find(".slider").find(".ullist")
                    .append("<li><img class='rounded mx-auto d-block' src='imgs/projects/"+name+"/"+i+".jpg'/></li>");
                i++;
        }
        overLay.find(".slider").flipster({
            style:'carousel',
            spacing:-0.3,
        });
    })
    function ifExists(image_url){
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;

    }
    $(".parent .topnav #btn").on("click", function () {
        sidebar.classList.toggle("open");
        menuBtnChange();
    })
    closeNavBar($(".parent .section"))
    if($(window).width()<992)closeNavBar($(".parent .sidebar  ul li"))
})
