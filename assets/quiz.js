var isClicked = false;
var isNew = true;

$.fn.trivia = function() {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.maxcount = 30;
    _t.count = _t.maxcount;
    _t.current = 0;
    _t.questions = null;
    
    _t.ask = function() {
        if (_t.questions[_t.current]) {
            $("#timer").text("00:" + ("0" +_t.count).slice(-2));
            $("#question_div").html(_t.questions[_t.current].word).show();
            $("#meaning").text(_t.questions[_t.current].meaning);
            $("#p-meaning").show();
            $(".question-index").text(_t.current+1 + "/" + _t.questions.length);
            var choicesArr = _t.questions[_t.current].wrongAnswers;
            if ($.inArray(_t.questions[_t.current].correctAnswer, choicesArr) === -1){
                choicesArr.push(_t.questions[_t.current].correctAnswer);
            }
            
            choicesArr.sort(function(){return 0.5-Math.random()});
            
            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<a>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                button.attr('class', "ui label");
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);
            isClicked = false;
        } else {
        	clearInterval(window.triviaCounter);
            $('.unanswered').text((_t.questions.length - (_t.answers.correct + _t.answers.incorrect)));
            //$('div#question_div').text(Math.round(_t.answers.correct/_t.questions.length*100)+'%');
            $('#start_button').show();
            //Chart
            $("#doughnutChart").drawDoughnutChart(
              [{"title":"Đúng","value":_t.answers.correct,"color":"#55C46F"},{"title":"Sai","value":_t.answers.incorrect,"color":"#E38888"},{"title":"Chưa làm","value":(_t.current - (_t.answers.correct + _t.answers.incorrect)),"color":"#002a36"}],
              {
                baseColor: "#fff",
                segmentStrokeColor : "#fff",
                summaryTitle: "Kết quả:",
                overwriteTotal: Math.round(_t.answers.correct/_t.questions.length*100)+'%',
              }
            ).show();
            var point = Math.round(_t.answers.correct/_t.questions.length*100);
            var minpoint = parseInt($("div#comments_list .item:last-child span").text());
            if (isNew == true && point > minpoint){
                var s=$("input[name='_']").val();
                $.post( $("#new_comment").attr('action'), { "_":s ,text: JSON.stringify(_t.questions), point: point, type: "page" } ).done(function( data ) {
                    //$("#comments_list").load(location.href );
                });
            }
            $('div#divlevel').show();
            $('#restart_button').show();

        }
    };
    _t.timer = function() {
        _t.count--;
        if (_t.count <= 0) {
            isClicked = true;
            $('#timer').html('00:00');
            setTimeout(function() {
                _t.nextQ();
            },0);
        } else {
            $("#timer").text("00:" + ("0" +_t.count).slice(-2));
        }
    };
    _t.nextQ = function() {
    	if (_t.current < _t.questions.length) {
    		_t.current++;
	        clearInterval(window.triviaCounter);
	        $(".question-index").text(_t.current + "/" + _t.questions.length);
	        $('.unanswered').text((_t.current - (_t.answers.correct + _t.answers.incorrect)));
	        
	        _t.count = _t.maxcount;
            //isClicked = true;
	        //$('#timer').html('00:00');
	        setTimeout(function() {
	            _t.cleanUp();
	            _t.ask();
	        }, 1000);

    	}
        
    };
    _t.cleanUp = function() {
        $('div#question_div').hide();
        $('div#meaning').html('');
        $('div#choices_div').html('');
        $("#p-meaning").hide();
        $('.correct').html(_t.answers.correct);
        $('.incorrect').html( _t.answers.incorrect);
        
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(_t.answers[string]);
    };
    return _t;
};
var Trivia;

function resetnew(){
    $("#doughnutChart").html('').hide();
    $('#start_button').hide();
    $('#restart_button').hide();
    $('.result').remove();
    $('div#divlevel').hide();
    $('div#question_div').html('');
    $('div#meaning').html('');
    $('div#choices_div').html('');
    $("#p-meaning").removeClass("ng-hide");
    $(".question-index").text("0/0");
    $('.unanswered').text('0');
    $('.correct').text('0');
    $('.incorrect').text('0');
    isClicked = false;

}


//var savedQuess;
$("#start_button").click(function() {
    resetnew();
    isNew = true;

    // Trivia = new $(window).trivia();
    // //Trivia.questions = [{"word":"<ruby><rb>？序<\/rb><rp>(<\/rp><rt>じゅんじょ<\/rt><rp>)<\/rp><\/ruby>","meaning":"Order, sequence, procedure","correctAnswer":"順","wrongAnswers":["春","準","森","純"]},{"word":"<ruby><rb>？稚園<\/rb><rp>(<\/rp><rt>ようちえん<\/rt><rp>)<\/rp><\/ruby>","meaning":"Kindergarten","correctAnswer":"幼","wrongAnswers":["溶","踊","腰","八"]},{"word":"<ruby><rb>？数<\/rb><rp>(<\/rp><rt>ふくすう<\/rt><rp>)<\/rp><\/ruby>","meaning":"Plural, multiple","correctAnswer":"複","wrongAnswers":["腹","袋","副","含"]},{"word":"<ruby><rb>三？<\/rb><rp>(<\/rp><rt>さんかく<\/rt><rp>)<\/rp><\/ruby>","meaning":"Triangle, triangular","correctAnswer":"角","wrongAnswers":["革","蔵","学","確"]},{"word":"<ruby><rb>？電<\/rb><rp>(<\/rp><rt>ていでん<\/rt><rp>)<\/rp><\/ruby>","meaning":"Failure of electricity","correctAnswer":"停","wrongAnswers":["弟","底","泥","体"]},{"word":"<ruby><rb>？隊<\/rb><rp>(<\/rp><rt>ぐんたい<\/rt><rp>)<\/rp><\/ruby>","meaning":"Army, troops","correctAnswer":"軍","wrongAnswers":["軽","訓","軒","軟"]},{"word":"<ruby><rb>？気<\/rb><rp>(<\/rp><rt>ゆげ<\/rt><rp>)<\/rp><\/ruby>","meaning":"Steam, vapour","correctAnswer":"湯","wrongAnswers":["豊","油","床","委"]},{"word":"<ruby><rb>経？<\/rb><rp>(<\/rp><rt>けいえい<\/rt><rp>)<\/rp><\/ruby>","meaning":"Management, administration","correctAnswer":"営","wrongAnswers":["永","泳","映","栄"]},{"word":"<ruby><rb>？来週<\/rb><rp>(<\/rp><rt>さらいしゅう<\/rt><rp>)<\/rp><\/ruby>","meaning":"Week after next","correctAnswer":"再","wrongAnswers":["三","叫","冊","下"]},{"word":"<ruby><rb>？掛<\/rb><rp>(<\/rp><rt>こしか<\/rt><rp>)<\/rp><\/ruby>け","meaning":"Seat, bench","correctAnswer":"腰","wrongAnswers":["腕","肌","胃","膚"]},{"word":"<ruby><rb>？動<\/rb><rp>(<\/rp><rt>いどう<\/rt><rp>)<\/rp><\/ruby>","meaning":"Removal, migration, movement","correctAnswer":"移","wrongAnswers":["将","著","凍","湾"]},{"word":"<ruby><rb>？理<\/rb><rp>(<\/rp><rt>かんり<\/rt><rp>)<\/rp><\/ruby>","meaning":"Control, management (e.g. of a business)","correctAnswer":"管","wrongAnswers":["簡","換","関","甘"]},{"word":"<ruby><rb>井？<\/rb><rp>(<\/rp><rt>いど<\/rt><rp>)<\/rp><\/ruby>","meaning":"Water well","correctAnswer":"戸","wrongAnswers":["辺","録","則","門"]},{"word":"<ruby><rb>？度<\/rb><rp>(<\/rp><rt>おんど<\/rt><rp>)<\/rp><\/ruby>","meaning":"Temperature","correctAnswer":"温","wrongAnswers":["減","御","測","湾"]},{"word":"<ruby><rb>？入<\/rb><rp>(<\/rp><rt>ゆにゅう<\/rt><rp>)<\/rp><\/ruby>","meaning":"Importation, import, introduction","correctAnswer":"輸","wrongAnswers":["委","豊","郵","湯"]},{"word":"<ruby><rb>？料<\/rb><rp>(<\/rp><rt>ざいりょう<\/rt><rp>)<\/rp><\/ruby>","meaning":"Ingredients, material","correctAnswer":"材","wrongAnswers":["菜","妻","採","細"]},{"word":"<ruby><rb>輸？<\/rb><rp>(<\/rp><rt>ゆけつ<\/rt><rp>)<\/rp><\/ruby>","meaning":"Blood transfusion","correctAnswer":"血","wrongAnswers":["決","宇","衣","月"]},{"word":"<ruby><rb>段？<\/rb><rp>(<\/rp><rt>だんかい<\/rt><rp>)<\/rp><\/ruby>","meaning":"Gradation, grade, stage","correctAnswer":"階","wrongAnswers":["械","開","貝","届"]},{"word":"<ruby><rb>競？<\/rb><rp>(<\/rp><rt>きょうぎ<\/rt><rp>)<\/rp><\/ruby>","meaning":"Game, match, contest","correctAnswer":"技","wrongAnswers":["季","希","肌","机"]},{"word":"<ruby><rb>？備<\/rb><rp>(<\/rp><rt>せつび<\/rt><rp>)<\/rp><\/ruby>","meaning":"Equipment, device, facilities, installation","correctAnswer":"設","wrongAnswers":["接","詞","切","絶"]}];
    // Trivia.questions = [{"word":"<ruby><rb>？序<\/rb><rp>(<\/rp><rt>じゅんじょ<\/rt><rp>)<\/rp><\/ruby>","meaning":"Order, sequence, procedure","correctAnswer":"順","wrongAnswers":["春","準","森","純"]},{"word":"<ruby><rb>？稚園<\/rb><rp>(<\/rp><rt>ようちえん<\/rt><rp>)<\/rp><\/ruby>","meaning":"Kindergarten","correctAnswer":"幼","wrongAnswers":["溶","踊","腰","八"]},{"word":"<ruby><rb>？数<\/rb><rp>(<\/rp><rt>ふくすう<\/rt><rp>)<\/rp><\/ruby>","meaning":"Plural, multiple","correctAnswer":"複","wrongAnswers":["腹","袋","副","含"]},{"word":"<ruby><rb>三？<\/rb><rp>(<\/rp><rt>さんかく<\/rt><rp>)<\/rp><\/ruby>","meaning":"Triangle, triangular","correctAnswer":"角","wrongAnswers":["革","蔵","学","確"]},{"word":"<ruby><rb>？電<\/rb><rp>(<\/rp><rt>ていでん<\/rt><rp>)<\/rp><\/ruby>","meaning":"Failure of electricity","correctAnswer":"停","wrongAnswers":["弟","底","泥","体"]},{"word":"<ruby><rb>？隊<\/rb><rp>(<\/rp><rt>ぐんたい<\/rt><rp>)<\/rp><\/ruby>","meaning":"Army, troops","correctAnswer":"軍","wrongAnswers":["軽","訓","軒","軟"]},{"word":"<ruby><rb>？気<\/rb><rp>(<\/rp><rt>ゆげ<\/rt><rp>)<\/rp><\/ruby>","meaning":"Steam, vapour","correctAnswer":"湯","wrongAnswers":["豊","油","床","委"]},{"word":"<ruby><rb>経？<\/rb><rp>(<\/rp><rt>けいえい<\/rt><rp>)<\/rp><\/ruby>","meaning":"Management, administration","correctAnswer":"営","wrongAnswers":["永","泳","映","栄"]},{"word":"<ruby><rb>？来週<\/rb><rp>(<\/rp><rt>さらいしゅう<\/rt><rp>)<\/rp><\/ruby>","meaning":"Week after next","correctAnswer":"再","wrongAnswers":["三","叫","冊","下"]},{"word":"<ruby><rb>？掛<\/rb><rp>(<\/rp><rt>こしか<\/rt><rp>)<\/rp><\/ruby>け","meaning":"Seat, bench","correctAnswer":"腰","wrongAnswers":["腕","肌","胃","膚"]}];
    // Trivia.ask();
    // quess = Trivia.questions;

    var lm = $('#my-load-more > div');
    lm.addClass('active');
    var level = $("#level").val();
    $("#spanlevel").text(level);
    $.get("/quiz.html?level=" + $("#level").val(), function(res){
     //console.log(res);
     $("div#script").html(res);
     if (quess != null){
            Trivia = new $(window).trivia();
            Trivia.questions = quess;
            Trivia.ask();
        }
        lm.removeClass('active');
    });

});

$("#restart_button").click(function() {
    resetnew();
    isNew = false; 
    Trivia = new $(window).trivia();
    if (quess != null){
        Trivia.questions = quess;
        Trivia.ask();
    }

});

$('#choices_div').on('click', 'a', function(e) {
    e.preventDefault();
    if (isClicked == false){
        isClicked = true;
        var userPick = $(this).text(),
            _t = Trivia || $(window).trivia(),
            correct = _t.questions[_t.current].correctAnswer;
            //correct = _t.questions[_t.current].choices[index];
        $('#choices_div a:contains('+correct+')').addClass("green");
        if (userPick !== correct) {
            $('#meaning').html("<span style=\"color:#E38888\">Sai rồi! Câu trả lời là: " + correct + "</span>");
            $('#choices_div a:contains('+userPick+')').addClass("red");
            _t.answer(false);
        } else {
            $('#meaning').html("<span style=\"color:#55C46F\">Chính xác!!!</span>");
            _t.answer(true);
        }
        clearInterval(window.triviaCounter);
        _t.nextQ();
    }
    
});
