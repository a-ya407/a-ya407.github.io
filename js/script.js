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
});

// ===== フェードイン(AOS.js) =====
AOS.init();
