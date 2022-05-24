const stopBtn = document.querySelectorAll("button.stop");
const project_names = document.querySelectorAll(".project_name");
const durations = document.querySelectorAll("td.duration");
const participate_terms = document.querySelectorAll("td.participate");
const organizations = document.querySelectorAll("td.organization");
const budgets = document.querySelectorAll("td.budget");
const roles = document.querySelectorAll("td.role");

stopBtn.forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    const project_name = project_names[index].innerText;
    const duration = durations[index].innerText;
    const participate_term = participate_terms[index].innerText;
    const organization = organizations[index].innerText;
    const budget = budgets[index].innerText;
    const role = roles[index].innerText;

    try {
      const result = await axios.post("/stopProj", {
        project_name,
        duration,
        participate_term,
        organization,
        budget,
        role,
      });
      if (result.data) {
        alert(result.data);
      }
      location.href = "/";
    } catch (error) {
      console.error(error);
    }
  });
});

const participateBtn = document.querySelectorAll("button.participate");
const non_project_names = document.querySelectorAll("td.non_project_name");
const non_durations = document.querySelectorAll("td.non_duration");
const non_organizations = document.querySelectorAll("td.non_organization");
const non_budgets = document.querySelectorAll("td.non_budget");

participateBtn.forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    const non_project_name = non_project_names[index].innerText;
    const non_duration = non_durations[index].innerText;
    const non_organization = non_organizations[index].innerText;
    const non_budget = non_budgets[index].innerText;

    try {
      const result = await axios.post("/participateProj", {
        non_project_name,
        non_duration,
        non_organization,
        non_budget,
      });
      if (result.data) {
        new Error(result.data);
      }
      location.href = "/";
    } catch (error) {
      alert("참가할 수 없습니다.");
    }
  });
});
