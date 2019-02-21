/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
let flg_end = false,
  ang_arr = [],
  end_arr = [],
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
      letter_array[index1][index2] = this;
      ang_arr[index1][index2] = end_arr[index1][index2] = 0;
    });
  });
  console.log(letter_array);

  $("button").click(function() {
    hide_letters();
  });
})(jQuery);

const create_animation_hide = (obj, word, letter, ed_op) => {
  let step = Math.floor(Math.random() * 360) - 360.0,
    speed = main_speed + Math.random() * 1.2,
    tm = Math.abs(step / speed);
  ang_arr[word][letter] = step + ang_arr[word][letter];
  if (flg_end) ang_arr[word][letter] = 0;
  if (flg_end){
    $(obj).animate(
      {
        transform: "rotateY(" + ang_arr[word][letter] + "deg)",
        opacity: ed_op
      },
      tm,
      function() {
        // Animation complete.
        // create_animation(obj, word, letter,ed_op);
      }
    );
  } else{
    $(obj).animate(
      {
        transform: "rotateY(" + ang_arr[word][letter] + "deg)"
      },
      tm,
      function() {
        // Animation complete.
        create_animation_hide(obj, word, letter, ed_op);
      }
    );
  }  
};
const create_animation_show = (obj, word, letter) => {
  let step = Math.floor(Math.random() * 360) - 360.0,
    speed = main_speed + Math.random() * 1.2,
    tm = Math.abs(step / speed);
  ang_arr[word][letter] = step + ang_arr[word][letter];
};
const hide_letters = () => {
  create_animation_hide(
    letter_array[now_words_hide][now_letter_hide],
    now_words,
    now_letter++,
    0.0
  );
  if (now_letter < letter_array[now_words_hide].length) {
    setTimeout(() => {
      hide_letters();
    }, 300);
  }
};
const show_letters = () => {
  create_animation_show(
    letter_array[now_words_show][now_letter_show],
    now_words,
    now_letter++,
    0.0
  );
  if (now_letter < letter_array[now_words_show].length) {
    setTimeout(() => {
      hide_letters();
    }, 500);
  }
};
