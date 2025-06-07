function checkNumber() {
  const input = document.getElementById("numberInput").value;
  const num = parseInt(input, 10);
  const result = document.getElementById("result");

  if (isNaN(num)) {
    result.textContent = "数字を入力してください。";
    return;
  }

  const isMultipleOfThree = num % 3 === 0;
  const includesThree = num.toString().includes("3");

  if (isMultipleOfThree || includesThree) {
    result.textContent = `${num} → アホになる！🤣`;
    result.style.color = "#e60000";
  } else {
    result.textContent = `${num} → 普通です。`;
    result.style.color = "#333";
  }
}
