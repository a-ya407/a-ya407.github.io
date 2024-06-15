// ===== フォント読み込み =====
(function (d) {
  var config = {
      kitId: "zto7fga",
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);

// ローディング完了後にアニメーションを開始する関数
function startSvgAnimation() {
  const mask = document.getElementById('mask');
  mask.classList.add('animate');
  // 強制的に再描画を行うことでCSSの変更を検知させる
  void mask.offsetWidth;
  mask.style.strokeDashoffset = '0';
}
// 初回訪問かどうかを判定する関数
function isFirstVisit() {
  return !sessionStorage.getItem("visit");
}
// 初回訪問時の処理
function handleFirstVisit() {
  sessionStorage.setItem("visit", "true");
  $(".loading")
    .delay(5500)
    .fadeOut(function () {
      $("body").addClass("appear");
      startSvgAnimation(); // 初回訪問時にSVGアニメーションを開始
    });
}
// 再訪問時の処理
function handleRepeatVisit() {
  $(".loading").css("display", "none");
  $(".container").css("opacity", "1");
  startSvgAnimation(); // 再訪問時にSVGアニメーションを開始
}
// ロードイベント
window.addEventListener("load", function () {
  if (isFirstVisit()) {
    handleFirstVisit();
  } else {
    handleRepeatVisit();
  }
});

// ===== loading =====
function slideAnime() {
  $(".leftAnime").each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("slideAnimeLeftRight");
      $(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft");
    } else {
      $(this).removeClass("slideAnimeLeftRight");
      $(this).children(".leftAnimeInner").removeClass("slideAnimeRightLeft");
    }
  });
}
$(window).scroll(function () {
  slideAnime();
});
$(window).on("load", function () {
  slideAnime();
});

// jQeryで制作したアニメーション
$(function () {
  // ===== ハンバーガーメニュー =====
  $(".hamburger, .header__nav-sp").click(function () {
    $(".header__nav-sp").fadeToggle();
    $(".hamburger, .header__nav-sp").toggleClass("open");
  });

  // ===== スライダー =====
  // スライダーを初期化する関数
  function startSlick() {
    $("#works ul").slick({
      infinite: true,
      slidesToShow: 2, // 767px以下で2枚表示
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1, // 500px以下で1枚表示
            slidesToScroll: 1,
          },
        },
      ],
    });
  }
  // スライダーを破棄する関数
  function destroySlick() {
    if ($("#works ul").hasClass("slick-initialized")) {
      $("#works ul").slick("unslick");
    }
  }
  // ウィンドウのロードとリサイズ時にスライダーを適切に制御
  $(window).on("load resize", function () {
    var winWidth = $(window).width();
    if (winWidth <= 747) {
      if (!$("#works ul").hasClass("slick-initialized")) {
        startSlick();
      }
    } else {
      destroySlick();
    }
  });

  // ===== ページ内スクロール =====
  $('a[href^="#"]').on("click", function () {
    var speed = 300;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;
    $("html, body").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing"
    );
    return false;
  });
});

$(function() {
  var topBtn = $('.scrolldown');	
  topBtn.hide();
  //スクロールが500に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  //スクロールしてトップ
    topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
    });
});

// ===== フェードイン(AOS.js) =====
AOS.init();

// ===== 線が伸びるための設定を関数でまとめる =====
function ScrollTimelineAnime() {
  $(".timeline li").each(function () {
    // それぞれのli要素の
    var elemPos = $(this).offset().top; // 上からの高さ取得
    var scroll = $(window).scrollTop(); // スクロール値取得
    var windowHeight = $(window).height(); // windowの高さ取得
    var startPoint = 200; //線をスタートさせる位置を指定※レイアウトによって調整してください
    if (scroll >= elemPos - windowHeight - startPoint) {
      var H = $(this).outerHeight(true); //liの余白と高さを含めた数値を取得
      //スクロール値から要素までの高さを引いた値を、liの高さの半分のパーセントで出す
      var percent = ((scroll + startPoint - elemPos) / (H / 2)) * 100; //liの余白と高さの半分で線を100％に伸ばす

      // 100% を超えたらずっと100%を入れ続ける
      if (percent > 100) {
        percent = 100;
      }
      // ボーダーの長さをセット
      $(this)
        .children(".border-line")
        .css({
          height: percent + "%", //CSSでパーセント指定
        });
    }
  });
}
// 画面をスクロールをしたら動かしたい場合の記述
$(window).on("scroll", function () {
  ScrollTimelineAnime(); // 線が伸びる関数を呼ぶ
});
// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  ScrollTimelineAnime(); // 線が伸びる関数を呼ぶ
});
