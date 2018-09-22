function addFeed(e, d, t, s, z) {
    $("#RSS-Reader-Index-feeds").append("<div class='scaled0 new RSS-Reader-Index-feed' data-title='" + s + ' - ' + showTime(z) + "' data-url='" + e + "'>" + d + "</div>")
}

function showFeed() {
	$("#loading").fadeOut();
	//var numItems = $('.RSS-Reader-Index-feed').length, docHeight=$("#RSS-Reader-Index-feeds").innerHeight();
	var lastTitle = localStorage.getItem('last'),flag=0;
    $.each($(".RSS-Reader-Index-feed"), function(e, d) {	
		if (flag || $(d).data('url') == lastTitle){
			$(d).removeClass('new');
			flag=1;
		}
		var title = $(d).data('title');
		$(d).prop('title',title);
		setTimeout(function() {
			$(d).removeClass('scaled0').addClass('scaled1');
		}, 100 + 100 * e)
		if (e == 0){
			$(d).addClass('last');
			localStorage.setItem('last', $(d).data('url'));
		}
    })
}
function showTime(str){
	/*
	var d = new Date();
	var n = d.getHours();
	var hours=['یک','دو','سه','چهار','پنج','شش','هفت','هشت','نه','ده','یازده','دوازده', 'بیش از دوازده'];
	return hours[n - parseInt(str.substring(str.search(":")-2, str.search(":")))] + " ساعت پیش";
	*/
	return str.substring(str.search(":")-2, str.search(":") + 3)
}
function openTab(e){
	chrome.tabs.create({
		url: e,
		active: !1
	})
}
function newFeedReader(e,c){
	$("#loading").fadeIn();
	$("#loading .txt").text('درحال دریافت اطلاعات');
	50 > c ? $.ajax({
        type: "GET",
        url: e,
		dataType: "xml",
        success: function(e) {
            $(e).find('item').each(function(index) {
                var e = $(this),
                    d = e.find('title').text(),
					n = e.find('guid').text(),
                    t = e.find('description').text(),
					s = e.find('category').text(),
					z = e.find('pubDate').text();
                addFeed(n, d, t, s, z)
            }),showFeed()
        },
        error: function() {
            $("#loading .txt").text("خطا در دریافت اطلاعات! تلاش مجدد"), newFeedReader(e,++c)
        }
	}) : ($("#loading .txt").text("اتصال اینترنت خود را بررسی کنید"), $(".internal-circle, .external-circle").css({stroke: "#CF000F","-webkit-animation-play-state": "paused"}))


}

var feedSource="https://www.zoomit.ir/feed/"
$(window).keypress(function(e) {
    (0 == e.keyCode || 32 == e.keyCode) && ($("#RSS-Reader-Index-feeds").html(''), newFeedReader(feedSource,0));
}), $(document).ready(function() {
	$("#loading .txt").text("چند لحظه صبر کنید...");
	setTimeout(function(){
		newFeedReader(feedSource,0);
	},6000);
    $("body").on("click", ".RSS-Reader-Index-feed", function(e) {
        0 == e.button && (e.preventDefault(), openTab($(this).data("url")))
    }), $("#RSS-Reader-Index-header-Icon a").click(function(e) {
        e.preventDefault(), $("#RSS-Reader-Index-feeds").html(''), newFeedReader(feedSource,0)
    });
});
/*
var p = "http://www.shahrekhabar.com/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1-%D9%81%D9%86%D8%A7%D9%88%D8%B1%DB%8C";
var q = "http://www.shahrekhabar.com/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1-%D9%81%D9%86%D8%A7%D9%88%D8%B1%DB%8C?page=2";
var r = "http://www.shahrekhabar.com/%D8%A7%D8%AE%D8%A8%D8%A7%D8%B1-%D9%81%D9%86%D8%A7%D9%88%D8%B1%DB%8C?page=3";
function oldFeedReader(p, q, r, d, c) {
	var e;
	var x;
	if (c==1){
		e=p;
		x= '.news_box:eq(1) ul li';
	}
	else if (c == 2){
		e=q
		x= '.news_box:eq(0) ul li';
	}
	else if (c == 3){
		e=r
		x= '.news_box:eq(0) ul li';
	}
	else{
		showFeed()
		return
	}
	$("#loading").fadeIn();
	$("#loading .txt").text('درحال دریافت اطلاعات');
    50 > d ? $.ajax({
        type: "GET",
        url: e,
		dataType: "html",
        success: function(e) {
            $(e).find(x).each(function(index) {
                var e = $(this),
                    d = e.children('a').text(),
					n = e.children('a').attr('href'),
                    t = e.children('.news_time').text(),
					s = e.children('.news_source').text()
                addFeed(n, d, t, s)
            }).promise().done( function(){ ReadFeed(p,q,r,0,++c); } )
        },
        error: function() {
            $("#loading .txt").text("خطا در دریافت اطلاعات! در حال تلاش مجدد"), ReadFeed(p,q,r,++d,c)
        }
	}) : ($("#loading .txt").text("اتصال اینترنت خود را بررسی کنید"), $(".internal-circle, .external-circle").css({stroke:"#CF000F","animation-duration":"2s"})).delay(1000).css({"animation-duration":"3s"}).delay(1000).css({"-webkit-animation-play-state":"paused"})
}
function openTab(e){
	$.get(e, function(p) {
		chrome.tabs.create({
            url: $(p).filter('iframe').attr('src'),
            active: !1
		})
	}, 'html'); 

}
*/
