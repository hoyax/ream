function getx(name) {
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	    results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function load_game(date){
	if(getx('date')){date=getx('date');}
	if(date==null){date=getToday();}
	var id = getx('id').split('l')[0] ? getx('id').split('l')[0] : getx('id');
	var pk = getx('id').split('l')[1];
	var league = getx('league');
	var cdn = getx('cdn') ? getx('cdn') : 'akc';
	load(id,league,date,pk,cdn);
};

function load(id,league,date,pk,cdn){
	var chn = "";
	var opto='<select id="cdn" class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline" onchange="cdnChange()"><option value="akc">Akamai</option><option value="l3c">Level 3</option></select><select id="feed" class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline" onchange="feedChange()"></select>';
	var url ='',game='',type='dash';
	switch(league){default:url='https://streams.rip/m3u8/'+getx('id');type="hls";chn ='streamsrip';break;case 'NFL': chn ='streamsripnfl';url='https://streams.rip/nfl/m3u8/'+id;break;case 'NBA': chn ='streamsripnba';url='https://fedi96-snipercros-1.glitch.me/'+id+"&feed="+pk;$("#headx").append('<select id="feed" class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline" onchange="feedChange()"></select>');getNBAGameInfo(cdn,id,pk,date);break;case 'MLB': chn ='streamsripmlb';url='https://cdn.streams.rip/mlb/m3u8/'+date+'/'+pk+cdn;type='hls';$("#headx").append(opto);getMLBGameInfo(cdn,id,pk,date);break;case 'NHL': url='https://cdn.streams.rip/m3u8/'+date+'/'+pk+cdn;type='hls';$("#headx").append(opto);getNHLGameInfo(cdn,id,pk,date);chn ='streamsripnhl';break;}
	$.ajax({url: url, method: 'get',error:function(data){soon(league);},success:function(data){if(data){play(id,data,type,pk,chn);}else{soon(league);}}});
}

function cdnChange() {
	var url = window.location.href;
        var cdncb = document.getElementById("cdn"),
	    cdn = cdncb.options[cdncb.selectedIndex].value;
	if(url.indexOf('cdn=') != -1) {
		var prefix = url.substring(0, url.indexOf("cdn"));
		var suffix = url.substring(url.indexOf("cdn"));
		suffix = suffix.substring(suffix.indexOf("=") + 1);
		suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
		window.location.href = prefix + "cdn" + "=" + cdn + suffix;
	} else {
		if (cdn != 'akc') {
			window.location.href = url + '&cdn=' + cdn;
		}
	}
}

function feedChange() {
	var url = window.location.href;
	var jk = getx('id').split('l')[0] ? getx('id').split('l')[0] : getx('id');
	var feedcb = document.getElementById("feed"),
	    feed = feedcb.options[feedcb.selectedIndex].value;
	var prefix = url.substring(0, url.indexOf("id"));
	var suffix = url.substring(url.indexOf("id"));
	suffix = suffix.substring(suffix.indexOf("=") + 1);
	suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
	window.location.href = prefix + "id" + "=" + jk+"l"+feed + suffix;
}

function soon(league){/*$("#loader").remove();$("#chatbox").remove();$('#rmpPlayer').append('<img src="'+league+'.png" width="100%"></img>');*/}
function chat(){$("#chatbox").fadeToggle();}
function theme(){$("body").toggleClass('dark-edition');var th = Cookies.get('theme');switch(th){case 'on' : Cookies.set('theme', 'off');break;case 'off' : Cookies.set('theme', 'on');break;default:break;}}
function play(id,srcx,type,pk,chn){
	var chat = 'streamsrip';
	if(getx('league') == 'MLB' || getx('league') == 'NHL'){
	src = 'https://io.streams.rip/'+srcx;chat = chat+getx('league');}
	//var source = type == 'dash' ? {dash: src} : {hls: src};
	var source = type == 'dash' ? {type:"application/dash+xml",src:srcx} : {type:"application/x-mpegurl",src:srcx};
	$("#loader").remove();
	$("#headx").append('<label class="form-check form-check-inline  bttn-material-flat bttn-xs bttn-warning bttn-no-outline" onchange="chat()" id="chat">Chatbox<input class="form-check-input" type="checkbox" id="inlineCheckbox1" checked=""><span class="form-check-sign"><span class="check"></span></span></label>');
	//$("#chatbox").append('<iframe src="https://www.twitch.tv/embed/'+chat+'/chat?darkpopout" width="100%" height="100%" style="border: 8px solid #031121;border-radius: 6px;min-height: 480px;"></iframe>');
	//$("#chatbox").append('<iframe src="https://cl5.widgetbot.io/channels/500052240963469323/'+chn+'" height="100%" width="100%" style="border: 8px solid #031121;border-radius: 6px;min-height: 480px;"></iframe>')
	$("#chatbox").append(`<script id="cid0020000200443726776" data-cfasync="false" async src="//st.chatango.com/js/gz/emb.js" style="width: 100%;height: 480px;">{"handle":"${chn}","arch":"js","styles":{"a":"021926","b":100,"e":"021926","c":"f4af3e","h":"0f1f21","d":"f4af3e","g":"f4af3e","k":"031121","l":"031121","m":"031121","n":"f4af3e","ab":false,"p":"10","q":"031121","surl":0,"r":100,"cnrs":"0.35","fwtickm":1}}</script>`)
	/*var settings = {
		licenseKey: 'a2VpdWR5dHNobEAxNDg4ODkxNTQy',
		height:480,
		src: source,
		skin: 's4',
		skinBackgroundColor: 'f0ab3a',
		skinButtonColor: '020f1e',
		skinAccentColor: '020f1e',
		shakaDrm:{servers: {'com.widevine.alpha': 'https://key.streams.rip/wvx'+id+"&feed="+pk,'com.microsoft.playready': 'https://key.streams.rip/prx'+id+"&feed="+pk}}
	};
	var elementID = 'rmpPlayer';
	var rmp = new RadiantMP(elementID);
	rmp.init(settings);*/
	flowplayer("#rmpPlayer", {
    		ratio: 9/16,
		share: false,
		chromecast: true,
		dash: {
		      qualitiesForSafari: false
		    },
		    clip: {
			hlsjs: {
				safari: true,
				recoverNetworkError: false,
				listeners: ["hlsFragLoaded","hlsLevelLoading"]
			},
			dash: {
			    protection: {
				"com.widevine.alpha": {
				    //"serverURL": "https://key.streams.rip/wvx"+id+"&feed="+pk
					"serverURL": "https://fedi96-snipercros-2.glitch.me/wvx"+id+"&feed="+pk
				} 
			    },
			    protectionLevel: "SW_SECURE_CRYPTO"
			},
		       sources: [
			    source
			]
		    }
	});
}
function dateChg(l) {
        var dat = document.getElementById("cal").value;
        var d = dat.split('/');
        window.location.href = 'https://streams.rip/'+l+'?date=' + d[2] + '-' + d[0] + '-' + d[1];
 }
(function(open){XMLHttpRequest.prototype.open=function(method,url,async,user,pass){if(url.indexOf('io')!=-1){rewrittenUrl=url.replace("https://io.streams.rip/","");}else if(url.indexOf('broadband.espn.go.com')!=-1){rewrittenUrl=url.replace("https://broadband.espn.go.com/espn3/auth/espnnetworks/m3u8/v1/generateKey?channel=","https://cdn.streams.rip/espn/m3u8/");}else if(url.indexOf('svc.nhl')!=-1){rewrittenUrl=url.replace("https://mf.svc.nhl.com/","https://cdn.streams.rip/");}else if(url.indexOf('svcs.mlb')!=-1){rewrittenUrl=url.replace("https://playback.svcs.mlb.com/","https://cdn.streams.rip/");}else{rewrittenUrl=url;}open.call(this,method,rewrittenUrl,async,user,pass);};})(XMLHttpRequest.prototype.open);

function getNFLGames() {
	var nflAPI = "https://feeds.nfl.com/feeds-rs/scores.json";
	$.getJSON(nflAPI, function (json) {
		var gametv='';
		$("#games").append(gametv);
		if (json.week > 0) {
			var games = json.gameScores;
			$.each(games, function (i, game) {
				var gd = new Date(moment.tz(game.gameSchedule.gameTimeEastern, "hh:mm:ss", "America/Toronto").tz("UTC"));
				var time = gd.toLocaleTimeString([], {
				hour: '2-digit',
					minute: '2-digit'
				});
				var pk = game.gameSchedule.gameId;
				var away = game.gameSchedule.visitorNickname;
				var home = game.gameSchedule.homeNickname;
				var logoaway = game.gameSchedule.visitorTeamAbbr;
				var logohome = game.gameSchedule.homeTeamAbbr;
				var fullnv = game.gameSchedule.homeNickname.toLowerCase();
				var fullnh = game.gameSchedule.homeDisplayName.toLowerCase().replace(" ", "-").replace(" ", "-");
				switch (logoaway) {default: break;case 'WAS':logoaway = "wsh";break;}
				switch (logohome) {default: break;case 'WAS':logohome = "wsh";break;}
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="/*color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;*/"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 10px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+game.gameSchedule.gameDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2")+'</button><button style="margin-top: 10px;" class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				gameLinks = gameLinks + "<a href='https://streams.rip/play.html?league=NFL&id="+pk+"' data-ajax='false'><button class='bttn-float bttn-block bttn-xs bttn-warning'>WATCH</button></a>";
				gameLinks = gameLinks + "</div></div>";
				if(i == 0)
				$("#loader").remove();
				$("#games").append(gameTitle + gameLinks);
			});
		} else {
			$("#loader").remove();
			$("#games").append("No games.");
		}
	});
}
function getMLBGames(date) {
	if(getx('date')){date=getx('date');}
	if(date==null){date=getToday();}
	var mlbAPI = "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date="+date+"&hydrate=team,linescore,game(content(summary,media(epg)))&language=en";
	$.getJSON(mlbAPI, function (json) {
		var gametv='';
		$("#games").append(gametv);
		if (json.totalGames > 0) {
			var games = json.dates[0].games;
			$.each(games, function (i, game) {
				var gd = new Date(game.gameDate);
				var time = gd.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				});
				var pk = game.gamePk;
				var away = game.teams.away.team.teamName;
				var home = game.teams.home.team.teamName;
				var logoaway = game.teams.away.team.abbreviation;
				var logohome = game.teams.home.team.abbreviation;
				var jk = game.content.media.epg[0].items[0].id;
				switch (logoaway) {default: break;case 'CWS':logoaway = "chw";break;}
				switch (logohome) {default:break;case 'CWS':logohome = "chw";break;}
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="/*color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;*/"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 20px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/mlb/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				gameLinks = gameLinks + "<a href='https://streams.rip/play.html?league=MLB&id="+pk+"l"+jk+"&date="+date+"' data-ajax='false'><button class='bttn-float bttn-block bttn-xs bttn-warning'>WATCH</button></a>";
				gameLinks = gameLinks + "</div></div>";
				if(i == 0)
				$("#loader").remove();
				$("#games").append(gameTitle + gameLinks);
			});
		} else {
			$("#loader").remove();
			$("#games").append("No games.");
		}
	});
}

function getNHLGames(date) {
	if(getx('date')){date=getx('date');}
	if(date==null){date=getToday();}
	var nhlAPI = "https://statsapi.web.nhl.com/api/v1/schedule?startDate=" + date + "&endDate=" + date + "&expand=schedule.teams,schedule.linescore,schedule.broadcasts,schedule.ticket,schedule.game.content.media.epg&leaderCategories=&site=en_nhl&teamId=";
	$.getJSON(nhlAPI, function (json) {
		var gametv='';
		$("#games").append(gametv);
		if (json.totalGames > 0) {
			var games = json.dates[0].games;
			$.each(games, function (i, game) {
				var gd = new Date(game.gameDate);
				var time = gd.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				});
				var pk = game.gamePk;
				var away = game.teams.away.team.teamName;
				var home = game.teams.home.team.teamName;
				var logoaway = game.teams.away.team.abbreviation;
				var logohome = game.teams.home.team.abbreviation;
				switch (logoaway) {default: break;case 'LAK':logoaway = "la";break; case 'TBL':logoaway = "tb";break;case 'NJD':logoaway = "nj";break;case 'SJS':logoaway = "sj";break;case 'VGK':logoaway = "vgs";}
				switch (logohome) {default: break;case 'LAK':logohome = "la";break; case 'TBL':logohome = "tb";break; logohome = "sj";break;case 'NJD':logohome = "nj";break;  case 'VGK':logohome = "vgs";}
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="/*color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;*/"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nhl/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 20px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nhl/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				if(game.content.media && game.content.media.epg[0].items[0]){
				var jk = game.content.media.epg[0].items[0].mediaPlaybackId;
				gameLinks = gameLinks + "<a href='http://streams.rip/play.html?league=NHL&id="+pk+"l"+jk+"&date="+date+"' data-ajax='false'><button class='bttn-float bttn-block bttn-xs bttn-warning'>WATCH</button></a>";
				}
				else{
				gameLinks = gameLinks + "<a href='#' data-ajax='false'><button class='bttn-float bttn-block bttn-xs bttn-warning'>Not Broadcasted</button></a>";
				}
				gameLinks = gameLinks + "</div></div>";
				if(i == 0)
				$("#loader").remove();
				$("#games").append(gameTitle + gameLinks);
			});
		} else {
			$("#loader").remove();
			$("#games").append("No games.");
		}
	});
}

function getNBAGames(date) {
	if(getx('date')){date=getx('date');}
	if(date==null){date=getToday();}
	var nbaAPI = "https://cdn.streams.rip/nba.json";
	var m = moment.tz(date,"America/Los_Angeles").format("MM")-9;
	$.getJSON(nbaAPI, function (json) {
		var gametv='';
		$("#games").append(gametv);
		var yd=0;
		//if (json) {
			var games = json.lscd[m].mscd.g;
			$.each(games, function (i, game) {	
				//if(game.stt.length>10){
        			var gd = new Date(moment.tz(game.etm, "America/Toronto").tz("UTC"));
				var time = gd.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit'
				});
				//} else {var time= game.stt;}
				var pk = game.gid;
				var away = game.v.tn;
				var home = game.h.tn;
				var logoaway = game.v.ta;
				var logohome = game.h.ta;
				var strmv = game.v.tc.toLowerCase().replace(" ", "-")+"-"+game.v.tn.toLowerCase().replace(" ", "-");
				var strmh = game.h.tc.toLowerCase().replace(" ", "-")+"-"+game.h.tn.toLowerCase().replace(" ", "-");
				if(strmv == "la-clippers")
					strmv ="los-angeles-clippers";
				if(strmh == "la-clippers")
					strmh ="los-angeles-clippers";
				if(logohome == "UTA")
					logohome = "utah";
				if(logohome == 'NOP')
					logohome = "no";
				if(logoaway == "UTA")
					logoaway = "utah";
				if(logoaway == 'NOP')
					logoaway = "no";
				var txc=.4+.07*i;
				var gameTitle = '<div class="box-animate animated fadeInUp" style="animation-delay: '+txc+'s;"><div class="box" style="/*color: rgb(254, 171, 58);background: rgb(2, 25, 38);text-align: center;*/"><div class="title-wrapper"><div class="title">' + away + " at " + home + '</div></div><hr><div class="button-wrapper animated fadeIn"><img style="float: left;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/'+ logoaway + '.png&amp;h=55&amp;w=55"><div class="xs hint--rounded hint--bounce" style="margin-top: 20px;"><button class="bttn-material-flat bttn-xs bttn-warning bttn-no-outline">'+ time + '</button></div><img style="float: right;" src="http://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/' + logohome + '.png&amp;h=55&amp;w=55"></div>';
				var gameLinks = "";
				gameLinks = gameLinks + "<a href='https://streams.rip/play.html?league=NBA&id="+pk+"l1&date="+date+"' data-ajax='false'><button class='bttn-float bttn-block bttn-xs bttn-warning'>WATCH</button></a>";
				gameLinks = gameLinks + "</div></div>";
				if(i == 0)
					$("#loader").remove();
				if(game.gdte == date){
					$("#games").append(gameTitle + gameLinks);
					yd++;
				}
			});
		if (yd==0)	
		//} else 
		{
			$("#loader").remove();
			$("#games").append("No games.");
		}
	});
}

function getNHLGameInfo(cdn, pk, id, date) {
	var nhlAPI = "https://statsapi.web.nhl.com/api/v1/schedule?gamePk=" + pk + "&expand=schedule.teams,schedule.linescore,schedule.broadcasts,schedule.ticket,schedule.game.content.media.epg&leaderCategories=&site=en_nhl&teamId=";
	var gameTitle;
	$.getJSON(nhlAPI, function (json) {
		if (json.totalGames > 0) {
			var games = json.dates[0].games;
			$.each(games, function (i, game) {		
				var away = game.teams.away.team.name;
				var home = game.teams.home.team.name;
				gameTitle = "<h2>"+away + " at " + home+"</h2>";
				$("#gmTitle").append(gameTitle);
				$.each(game.content.media.epg, function (j, media) {
					if (media.title === "NHLTV") {
						$.each(media.items, function (k, item) {
							var feedName = "";
							if (item.mediaFeedType === "ISO" || item.mediaFeedType === "COMPOSITE") {
								feedName = item.feedName;
							} else {
								feedName = item.mediaFeedType;
								if (item.callLetters !== "") {
									feedName = feedName + " (" + item.callLetters + ")";
								}
								$('#feed').append($('<option>', {
									value: item.mediaPlaybackId
								}).text(feedName));
								if (item.mediaPlaybackId == id) {
									$("#feed option[value='" + id + "']").prop('selected', true);
								}
							}
						});
					}
				});
			});
		}
	});
	if (cdn !== null) {
		$("#cdn option[value='" + cdn + "']").prop('selected', true);
	}
}

function getNBAGameInfo(cdn,pk,id,date){
	if(getx('date')){date=getx('date');}
	if(date==null){date=getToday();}
	var nbaAPI = "https://cdn.streams.rip/nba.json";
	var m = moment.tz(date,"America/Los_Angeles").format("MM")-9;
	var gameTitle;
	$.getJSON(nbaAPI,function(json){
		if(json){
			var games = json.lscd[m].mscd.g;
			$.each(games,function(i,game){
				if(game.gid==pk){
				var away = game.v.tc+" "+game.v.tn;
				var home = game.h.tc+" "+game.h.tn;
				gameTitle = "<h2>"+away + " at " + home+"</h2>";
				$("#gmTitle").append(gameTitle);
				$.each(game.bd.b,function(j,item){
					var feedName="";
					var idf=1;
					feedName=item.scope;
					switch(feedName){
						case 'home':idf=1;break;
						case 'away':idf=4;break;
						default:break;
					}
					if(item.disp!==""){
						feedName=feedName+" ("+item.disp+")";
					}
					if(item.scope == 'home' || item.scope == 'away')
					$('#feed').append($('<option>',{
						value:idf
					}).text(feedName));
					if(idf == id)
					$("#feed option[value='"+id+"']").prop('selected',true);
				});
				}
			});
		}
	});
}

function getMLBGameInfo(cdn,pk,id,date){
	var nhlAPI="https://statsapi.mlb.com/api/v1/schedule?gamePk="+pk+"&expand=schedule.teams,schedule.linescore,schedule.broadcasts,schedule.ticket,schedule.game.content.media.epg&leaderCategories=&site=en_nhl&teamId=";
	var gameTitle;
	$.getJSON(nhlAPI,function(json){
		if(json.totalGames>0){
			var games=json.dates[0].games;
			$.each(games,function(i,game){
				var away=game.teams.away.team.name;
				var home=game.teams.home.team.name;
				gameTitle = "<h2>"+away + " at " + home+"</h2>";
				$("#gmTitle").append(gameTitle);
				$.each(game.content.media.epg,function(j,media){
					if(media.title==="MLBTV"){
						$.each(media.items,function(k,item){
							var feedName="";
							if(item.mediaFeedType==="ISO"||item.mediaFeedType==="COMPOSITE"){
								feedName=item.feedName;
							}else{
								feedName=item.mediaFeedType;
								if(item.callLetters!==""){
									feedName=feedName+" ("+item.callLetters+")";
								}
								$('#feed').append($('<option>',{
									value:item.id
								}).text(feedName));
								if(item.id == id){
									$("#feed option[value='"+id+"']").prop('selected',true);

								}
							}
						});
					}
				});
			});
		}
	});
	if(cdn!==null){
		$("#cdn option[value='"+cdn+"']").prop('selected',true);
	}
}
function getToday(){return moment.tz(new Date(),"America/Los_Angeles").format("YYYY-MM-DD");}
function nfl(){getNFLGames();}
function mlb(date){getMLBGames(date);}
function nhl(date){getNHLGames(date);}
function nba(date){getNBAGames(date);}
function game(date){load_game(date);}
$( window ).on( "load", function() {
	var th = Cookies.get('theme');
	if(th=="on"){}else if(th=='off'){$("body").toggleClass('dark-edition');}else{Cookies.set('theme', 'on');}
});
