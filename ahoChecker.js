function playScratchTTS(text, pitch = 1.0, gender = "female") {
  const encodedText = encodeURIComponent(text);
  const url = `https://synthesis-service.scratch.mit.edu/synth?locale=ja-JP&gender=${gender}&text=${encodedText}`;

  const audio = new Audio(url);
  audio.preservesPitch = false;
  audio.playbackRate = pitch;
  audio.play();
}

// ページ読み込み時の処理（変更部分のみ）
window.addEventListener("DOMContentLoaded", () => {
  const { num, multiple, includes } = getParams();
  const number = Number(num);

  const result = checkAho(number, multiple, includes);

  document.getElementById("result").textContent = result.speechText;
  document.getElementById("reason").textContent = result.reasonText;

  if (result.isAho) {
    // アホになる場合は数字だけをピッチ2.0で女性音声で再生
    playScratchTTS(num, 1.2, "female");
  } else {
    // アホじゃない場合は数字をピッチ1.0で男性音声で再生
    playScratchTTS(num, 1.0, "male");
  }
});
