function playScratchTTS(text, pitch = 1.0) {
  const encodedText = encodeURIComponent(text);
  const url = `https://synthesis-service.scratch.mit.edu/synth?locale=ja-JP&gender=female&text=${encodedText}`;
  const audio = new Audio(url);
  audio.preservesPitch = false;
  audio.playbackRate = pitch;
  audio.play();
}

function checkNumber() {
  const input = document.getElementById("numberInput").value;
  const num = parseInt(input, 10);
  const result = document.getElementById("result");

  const checkMultiple = document.getElementById("checkMultiple").checked;
  const checkIncludes = document.getElementById("checkIncludes").checked;

  if (!checkMultiple && !checkIncludes) {
    result.textContent = "どちらかを選択してください。";
    result.style.color = "#cc0000";
    return;
  }

  if (isNaN(num)) {
    result.textContent = "数字を入力してください。";
    result.style.color = "#cc0000";
    return;
  }

  const isMultipleOfThree = (num % 3 === 0);
  const includesThree = num.toString().includes("3");

  const isAho =
    (checkMultiple && isMultipleOfThree) ||
    (checkIncludes && includesThree);

  if (isAho) {
    result.textContent = `${num} → アホになる！🤣`;
    result.style.color = "#e60000";
    playScratchTTS(num.toString(), 1.75);
  } else {
    result.textContent = `${num} → 普通です。`;
    result.style.color = "#333";
    playScratchTTS(num.toString(), 1.0);
  }
}
