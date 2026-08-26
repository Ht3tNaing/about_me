(function () {
  "use strict";

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  loadProjects();

  function loadProjects() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) {
      return;
    }

    fetch("data/projects.json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }
        return response.json();
      })
      .then(function (projects) {
        if (!Array.isArray(projects) || !projects.length) {
          setStatus(grid, "No projects to show yet.");
          return;
        }
        grid.replaceChildren();
        projects.forEach(function (project) {
          grid.appendChild(createProjectCard(project));
        });
      })
      .catch(function () {
        setStatus(grid, "Unable to load projects right now. Please try again later.");
      });
  }

  function setStatus(grid, message) {
    const status = document.createElement("p");
    status.className = "projects-status";
    status.textContent = message;
    grid.replaceChildren(status);
  }

  function createProjectCard(project) {
    const article = document.createElement("article");
    article.className = "project-card";

    const logoWrap = document.createElement("div");
    logoWrap.className = "project-logo";

    const img = document.createElement("img");
    img.src = project.logo;
    img.alt = project.name + " logo";
    img.loading = "lazy";
    logoWrap.appendChild(img);

    const body = document.createElement("div");
    body.className = "project-body";

    const name = document.createElement("h3");
    name.className = "project-name";
    name.textContent = project.name;
    body.appendChild(name);

    if (project.subtitle) {
      const subtitle = document.createElement("p");
      subtitle.className = "project-subtitle";
      subtitle.textContent = project.subtitle;
      body.appendChild(subtitle);
    }

    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = project.description;
    body.appendChild(desc);

    const link = document.createElement("a");
    link.className = "btn btn-primary btn-sm";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Visit Website";
    body.appendChild(link);

    article.appendChild(logoWrap);
    article.appendChild(body);
    return article;
  }
})();
