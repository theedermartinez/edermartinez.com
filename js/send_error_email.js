 document
      .getElementById("bug-report-form")
      .addEventListener("submit", function (event) {

        event.preventDefault();

        const project = document.getElementById("project").value;
        const description = document.getElementById("description").value;

        const subject = "RE: Urgent/Bug Report";

        const body =
          "Project: " + project + "\n\n" +
          "Description:\n" + description;

        const mailto =
          "mailto:ederfelipemartinez@gmail.com" +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);

        window.location.href = mailto;
      });