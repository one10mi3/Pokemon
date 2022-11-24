
  var pokemons = {
    0: { "name": "ヒトカゲ", "hp": 102, "at": 10,"lv": 10, "strong": 3, "weak": 2, "attribute": "火", "img": "./img/pokemon01.png" },
    1: { "name": "ゼニガメ", "hp": 56, "at": 10,"lv": 7, "strong": 1, "weak": 3, "attribute": "水", "img": "./img/pokemon02.png" },
    2: { "name": "フシギダネ", "hp": 72, "at": 10,"lv": 9, "strong": 2, "weak": 1, "attribute": "草", "img": "./img/pokemon03.png" },
    3: { "name": "ピカチュウ", "hp": 100, "at": 20,"lv": 13, "strong": 6, "weak": 7, "attribute": "雷", "img": "./img/pokemon04.png" },
    4: { "name": "ポッポ", "hp": 35, "at": 10,"lv": 7, "strong": 3, "weak": 7, "attribute": "飛行", "img": "./img/pokemon05.png" },
    5: { "name": "コラッタ", "hp": 26, "at": 4,"lv": 5, "strong": 7, "weak": 6, "attribute": "ノーマル", "img": "./img/pokemon06.png" },
  }


  // phase01 ランダムで敵のポケモンを選出
  const r = Math.random()*pokemons.length;
  const n = Math.ceil(r)-1;
  const enemy_pokemon = pokemons[n].name;
  const e_max_hp = pokemons[n].hp;
  $("#enemy").html(pokemons[n].name);
  // 敵ステータスタグ
  $("#enemy_status").append("<div class=phase01__box01><div class=top><p id=e_name data-value="+pokemons[n].name+">" + pokemons[n].name + "</p><p id=e_attribute data-value="+pokemons[n].attribute+">" +  pokemons[n].attribute + "</p><p id=e_lv data-value="+pokemons[n].lv+">Lv." +  pokemons[n].lv + "</p><span id=e_no data-value="+n+"></span><span id=e_at data-value="+pokemons[n].at+"></span></div><div class=under><div id=e_hp data-value="+pokemons[n].hp+">HP " +  pokemons[n].hp + "</div><div id=e_max_hp data-value="+pokemons[n].hp+">/"+ pokemons[n].hp+"</div><progress id=e_progress value=1></progress></div></div><div class=phase01__box02><img id=e_img src="+ pokemons[n].img +" alt=''></div>");


  // phase02 自分のポケモンを選ぶ   0 ノーマル,1 火,2 水,3 草,4 雷,5 むし,6 他1,7 他2
  let choice;
  let choice_pokemon;
  let no = 0;
  $('#buttle_pokemon li').on('click', function() {
    choice = $(this).attr('id');
    choice_pokemon = pokemons[choice].name;

    // 2匹目は選べない
    if (!$("#status").hasClass("already")) {
      // 味方ステータスタグ
      $("#status").append("<div class=phase03__box01><div class=top><span id=m_no data-value="+choice+"></span><span id=m_at data-value="+pokemons[choice].at+"></span><p id=m_name data-value="+pokemons[choice].name+">" + pokemons[choice].name + "</p><p id=m_attribute data-value="+pokemons[choice].attribute+">" +  pokemons[choice].attribute + "</p><p id=m_lv data-value="+pokemons[choice].lv+">Lv." + pokemons[choice].lv + "</p></div><div class=under><div id=m_hp data-value="+pokemons[choice].hp+">HP " +  pokemons[choice].hp + "</div><div id=m_max_hp data-value="+pokemons[choice].hp+">/"+pokemons[choice].hp+"</div><progress id=m_progress value=1></progress></div></div><div class=phase03__box02><img id=m_img src="+ pokemons[choice].img +" alt=''></div>");
      $("#status").addClass("fadeRight");
      $("#dialogue03").html("ゆけっ!"+ choice_pokemon +"!");
      // 先攻後攻
      judgment();
    }
    $("#dialogue01").hide();  // あっ！やせいの  を消す
    $("#phase02").hide();  // 戦わせるポケモン、コマンド  を消す
  });

  $('#attack').on('click', function() {
    m_name = $("#m_name").data("value");
    m_at = $("#m_at").data("value");
    e_name = $("#e_name").data("value");
    e_hp = $("#e_hp").data("value");

    let new_m_at = critical(m_at);
    let flg;
    if (!(m_at == new_m_at)) {
      m_at = new_m_at;
      flg = 1;
    } else {
      m_at = m_at;
      flg = 0;
    }
    let new_hp = e_hp - new_m_at;
    let progress = new_hp / e_max_hp;

    let criticalhit;
    if (flg == 1) {
      criticalhit = "急所にあたった！";
    } else {
      criticalhit = "";
    }


    if (new_hp <= 0) {
      new_hp = 0;
      $("#dialogue05").html("あなたの"+m_name+"の攻撃!<br>"+criticalhit+new_m_at+"のダメージを野生の"+e_name+"へ与えた!野生の"+e_name+"はちからつきた!");
      $("#e_progress").val(0);
      $("#e_img").addClass("fadedown01");
    } else {
      $("#dialogue05").html("あなたの"+m_name+"の攻撃!<br>"+criticalhit+new_m_at+"のダメージを野生の"+e_name+"へ与えた!");
      $("#e_progress").val(progress);
      $("#next_df").removeClass("hidden");
    }

    $("#next_at").addClass("hidden");
    $("#dialogue04").html("攻撃ターン");
    $("#dialogue03").html("");
    $("#e_hp").remove();
    $(".phase01__box01 .under").prepend("<div id=e_hp data-value="+new_hp+">HP" +  new_hp + "</div>");
    $("#attacker").addClass("hidden");
  });
  $('#defend').on('click', function() {
    $("#dialogue05").html("いまはポケモンをこうかんできない");
  });
  $('#items').on('click', function() {
    $("#dialogue05").html("いまは使えない");
  });
  $('#away').on('click', function() {
    const c = Math.random()*2;
    const d = Math.ceil(c);
    if( d % 2 === 0 ) {
      $("#dialogue05").html("うまくにげきれた！");
      $("#dialogue03").addClass("hidden");
      $("#dialogue04").addClass("hidden");
    } else {
      $("#dialogue05").html("にげきれない！");
      $("#next_df").removeClass("hidden");
    }
    $("#attacker").addClass("hidden");
    $("#next_at").addClass("hidden");
  });

  $('#next_at').on("click", function() {
    $("#attacker").removeClass("hidden");
    $("#dialogue03").html(""); //ゆけ！
    $("#dialogue04").html("攻撃ターン");
    $("#dialogue05").html(""); //与えた！
    $('#next_at').addClass("hidden");
  });

  $('#next_df').on("click", function() {
    $("#dialogue03").html(""); //ゆけ！
    $("#dialogue04").html("防御ターン");
    $('#next_df').addClass("hidden");
    defender();
  });



  // 変数
  let m_name;
  let m_at;
  let m_hp;
  let m_max_hp;
  let e_name;
  let e_at;
  let e_hp;
  



  function judgment() {
    // 初回の先攻後攻決定   先攻偶数  後攻奇数
    const a = Math.random()*2;
    const b = Math.ceil(a);
    if( b % 2 === 0 ) {
      // even
      $("#dialogue04").html("攻撃ターン");
      $("#next_at").removeClass("hidden");
    } else {
      // odd
      $("#dialogue04").html("防御ターン");
      $("#next_df").removeClass("hidden");
    }
  }
  
  // 防御
  function defender() {
    e_at = $("#e_at").data("value");
    m_name = $("#m_name").data("value");
    m_hp = $("#m_hp").data("value");
    m_max_hp = $("#m_max_hp").data("value");

    let new_e_at = critical(e_at);
    let flg;
    if (!(e_at == new_e_at)) {
      e_at = new_e_at;
      flg = 1;
    } else {
      e_at = e_at;
      flg = 0;
    }
    let new_hp = m_hp - new_e_at;
    let progress = new_hp / m_max_hp;

    let criticalhit;
    if (flg == 1) {
      criticalhit = "急所にあたった！";
    } else {
      criticalhit = "";
    }

    if (new_hp <= 0) {
      new_hp = 0;
      $("#dialogue05").html("野生の"+enemy_pokemon+"からの攻撃!<br>"+criticalhit+new_e_at+"のダメージを"+m_name+"へ与えた!あなたの"+m_name+"はちからつきた!");
      $("#m_progress").val(0);
      $("#m_img").addClass("fadedown02");
    } else {
      $("#dialogue05").html("野生の"+enemy_pokemon+"からの攻撃!<br>"+criticalhit+new_e_at+"のダメージを"+m_name+"へ与えた!");
      $("#m_progress").val(progress);
      $("#next_at").removeClass("hidden");
    }
    
    $("#dialogue04").html("防御ターン");
    $("#m_hp").remove();
    $(".phase03__box01 .under").prepend("<div id=m_hp data-value="+new_hp+">HP" +  new_hp + "</div>");
  }

  // クリティカルヒット確率と攻撃力の計算
  function critical(at) {
    const e = Math.random()*100;
    const f = Math.ceil(e);
    if (f >= 6) {
      at = at;
      return at;
    } else {
      at = at * 1.5;
      return at;
    }
  }

  // 音楽
  $(function () {
    var audioBtn = $('.audio_button1'),
    audioWrap = $('.audio_wrap1'),
    audio = document.getElementById('audio');

    audioBtn.on('click', function () {
      if( audioWrap.hasClass('play') ) {
        audio.pause();
        audioWrap.removeClass('play');
      } else {
        audio.play();
        audioWrap.addClass('play');
      }
    });
  });
