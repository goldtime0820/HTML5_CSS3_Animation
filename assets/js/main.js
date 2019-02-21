/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
let flg_end_hide = false,
  flg_end_show,
  flg_start_hide,
  flg_start_show,
  ang_arr = [],
  now_finish_show_idx,
  letter_array = [],
  now_words_hide = 0,
  now_words_show = 0,
  now_letter_hide = 0,
  now_letter_show = 0,
  main_speed = 0.3;
(function($) {
  $(".word-content").each(function(index1) {
    letter_array[index1] = [];
    ang_arr[index1] = [];
    $(
      $(this)
        .find(".letter")
        .get()
        .reverse()
    ).each(function(index2) {
      if (index1) $(this).css({ opacity: 0.0 });
      letter_array[index1][index2] = this;
      ang_arr[index1][index2] = 0;
    });
  });
  console.log(letter_array);

  $("button").click(function() {
    start_hide();
  });
})(jQuery);

const create_animation_hide = (obj, word, letter, n_op) => {
  let step = Math.floor(Math.random() * 360) - 360.0,
    speed = main_speed + Math.random() * 1.2,
    tm = Math.abs(step / speed);
  ang_arr[word][letter] = step + ang_arr[word][letter];

  if (letter == ang_arr[word].length - 1 && n_op == 1.0) {
    start_show();
  }

  if (letter == 0 && n_op == 0) flg_end_hide = true;
  if (flg_end_hide) ang_arr[word][letter] = 0;
  if (flg_end_hide) {
    $(obj).animate(
      {
        transform: "rotateY(" + ang_arr[word][letter] + "deg)",
        opacity: 0.0
      },
      tm,
      function() {
        // Animation complete.
        // create_animation(obj, word, letter,ed_op);
      }
    );
  } else {
    if (flg_start_hide) n_op = Math.max(0.0, n_op - 0.2);
    console.log("hide", word, letter, n_op);
    $(obj).animate(
      {
        transform: "rotateY(" + ang_arr[word][letter] + "deg)",
        opacity: n_op
      },
      tm,
      function() {
        // Animation complete.
        create_animation_hide(obj, word, letter, n_op);
      }
    );
  }
};
const create_animation_show = (obj, word, letter, n_op) => {
  let step = Math.floor(Math.random() * 360) - 360.0,
    speed = main_speed + Math.random() * 1.2,
    tm = Math.abs(step / speed);
  ang_arr[word][letter] = step + ang_arr[word][letter];

  if (letter == 0 && n_op == 1.0) {
   // setTimeout(start_hide, 5000);
  }

  if (letter == 0 && n_op > 0.2) flg_start_hide = true;
  console.log("show", word, letter, n_op);

  if (letter == (letter_array[word].length - 1) && n_op == 1.0) {
    flg_end_show = true;
  }

  if (flg_end_show && letter == now_finish_show_idx) {
    ang_arr[word][letter] =
      360 * Math.floor((ang_arr[word][letter] + 359) / 360);
    n_op = 1.0;
    $(obj).animate(
      {
        transform: "rorateY(" + ang_arr[word][letter + "deg)"],
        opacity: n_op
      },
      tm,
      function() {
        now_finish_show_idx--;
      }
    );
  } else {
    n_op = Math.min(n_op + 0.1, 1.0);
    $(obj).animate(
      {
        transform: "rotateY(" + ang_arr[word][letter] + "deg)",
        opacity: n_op
      },
      tm,
      function() {
        create_animation_show(obj, word, letter, n_op);
      }
    );
  }
};
const hide_letters = () => {
  create_animation_hide(
    letter_array[now_words_hide][now_letter_hide],
    now_words_hide,
    now_letter_hide++,
    1.0
  );
  if (now_letter_hide < letter_array[now_words_hide].length) {
    setTimeout(() => {
      hide_letters();
    }, 300);
  }
};
const show_letters = () => {
  create_animation_show(
    letter_array[now_words_show][now_letter_show],
    now_words_show,
    now_letter_show--,
    0.0
  );
  if (now_letter_show >= 0) {
    setTimeout(() => {
      show_letters();
    }, 500);
  }
};

const start_show = () => {
  now_words_show = (now_words_show + 1) % letter_array.length;
  now_finish_show_idx = letter_array[now_words_show].length - 1;
  now_letter_show = now_finish_show_idx;
  flg_end_show = false;
  flg_start_show = false;
  show_letters();
};
const start_hide = () => {
  now_words_hide = now_words_show;
  now_letter_hide = 0;
  flg_start_hide = false;
  flg_end_hide = false;
  hide_letters();
};
