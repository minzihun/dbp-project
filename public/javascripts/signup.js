/*중복확인*/
document.getElementById("checkId").addEventListener("click", async (e) => {
  const inputId = document.getElementById("inputId").value;
  try {
    const result = await axios.post("/checkId", { inputId });
    const { data } = result;
    const resultTag = document.getElementById("checkresult");
    resultTag.innerHTML = data;
  } catch (error) {
    console.error(error);
  }
});

/*중복확인을 해야 회원가입 가능*/
document.getElementById("signup").addEventListener("submit", (e) => {
  const resultTag = document.getElementById("checkresult");
  if (!resultTag.innerHTML) {
    e.preventDefault();
    alert("중복확인을 해주세요");
  }
});
