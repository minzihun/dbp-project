const stopBtn = document.querySelectorAll("button.stop");
const project_names = document.querySelectorAll(".project_name");
const durations = document.querySelectorAll(".duration");
const participate_terms = document.querySelectorAll(".participate");
const organizations = document.querySelectorAll(".organization");
const budgets = document.querySelectorAll(".budget");
const roles = document.querySelectorAll(".role");

stopBtn.forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    console.log("참가중지" + index);
    const project_name = project_names[index].innerText;
    const duration = durations[index].innerText;
    const participate_term = participate_terms[index].innerText;
    const organization = organizations[index].innerText;
    const budget = budgets[index].innerText;
    const role = roles[index].innerText;
    console.log(
      project_name,
      duration,
      participate_term,
      organization,
      budget,
      role
    );
    try {
      const result = await axios.post("/stopProj", {
        project_name,
        duration,
        participate_term,
        organization,
        budget,
        role,
      });
      location.href = "/";

      // console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  });
});

const participateBtn = document.querySelectorAll("button.participate");
const non_project_names = document.querySelectorAll(".non_project_name");
const non_durations = document.querySelectorAll(".non_duration");
const non_organizations = document.querySelectorAll(".non_organization");
const non_budgets = document.querySelectorAll(".non_budget");

participateBtn.forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    console.log("참가" + index);
    const non_project_name = non_project_names[index].innerText;
    const non_duration = non_durations[index].innerText;
    const non_organization = non_organizations[index].innerText;
    const non_budget = non_budgets[index].innerText;

    console.log(non_project_name, non_duration, non_organization, non_budget);

    try {
      const result = await axios.post("/participateProj", {
        non_project_name,
        non_duration,
        non_organization,
        non_budget,
      });
      location.href = "/";
      // console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  });
});
