// 既存のplayScratchTTSはそのまま利用
function playScratchTTS(text, pitch = 1.0) {
  const encodedText = encodeURIComponent(text);
  const url = `https://synthesis-service.scratch.mit.edu/synth?locale=ja-JP&gender=female&text=${encodedText}`;

  const audio = new Audio(url);
  audio.preservesPitch = false;
  audio.playbackRate = pitch;
  audio.play();
}

// URLパラメータから値を取得する関数
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    num: params.get("num"),
    multiple: params.get("multiple") === "true",
    includes: params.get("includes") === "true"
  };
}

// 判定＆結果生成関数
function checkAho(number, multiple, includes) {
  if (!multiple && !includes) {
    return {
      speechText: "どちらかの判定基準を選択してください。",
      reasonText: "",
      isAho: false
    };
  }

  if (isNaN(number)) {
    return {
      speechText: "数字を正しく入力してください。",
      reasonText: "",
      isAho: false
    };
  }

  const isMultipleOfThree = (number % 3 === 0);
  const includesThree = number.toString().includes('3');
  const isAho = (multiple && isMultipleOfThree) || (includes && includesThree);

  let speechText = "";
  let reasonText = "";

  if (isAho) {
    speechText = `${number} はアホになる！`;
    if ((multiple && isMultipleOfThree) && (includes && includesThree)) {
      reasonText = "3の倍数の条件でも、3が付く数字の条件でも合致しました。";
    } else if (multiple && isMultipleOfThree) {
      reasonText = "3の倍数の条件に合致しました。";
    } else if (includes && includesThree) {
      reasonText = "3が付く数字の条件に合致しました。";
    }
  } else {
    speechText = `${number} は普通です。`;
    reasonText = "どの条件にも合致しませんでした。";
  }

  return {
    speechText,
    reasonText,
    isAho
  };
}

// ページ読み込み時の処理
window.addEventListener("DOMContentLoaded", () => {
  const { num, multiple, includes } = getParams();
  const number = Number(num);

  const result = checkAho(number, multiple, includes);

  // 結果表示用の要素はresult.htmlに用意しておくこと！
  document.getElementById("result").textContent = result.speechText;
  document.getElementById("reason").textContent = result.reasonText;

  playScratchTTS(result.speechText, result.isAho ? 2.0 : 1.0);
});
