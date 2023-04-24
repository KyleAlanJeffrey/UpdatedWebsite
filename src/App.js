import { useEffect, useState } from "react";
import BitButton from "./components/BitButton";
import TypeWriterEffect from "react-typewriter-effect";
import workProjectData from "./work_projects.json";
import jobsData from "./jobs.json";
import "./App.scss";

function App() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [workProjects, setWorkProjects] = useState(workProjectData["projects"]);
  const [githubError, setGithubError] = useState(false);
  const [jobs, setJobs] = useState(jobsData["jobs"]);
  const [hideBody, setHideBody] = useState(true);
  useEffect(() => {
    const url = "https://github.com/Kylealanjeffrey";
    fetch(url);
    const accessToken = process.env.REACT_APP_GITHUB_API_KEY;
    if (!accessToken) {
      console.log("Token not grabbed");
    }
    const username = "Kylealanjeffrey";
    // Get pinned repositories
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const allRepos = data.map((repo) => {
          repo.pinned = false;
          let i = repo.topics.indexOf("pinned");
          if (i > -1) {
            repo.topics.splice(i, 1);
            repo.pinned = true;
          }
          return repo;
        });
        setGithubRepos(allRepos);
      })
      .catch((error) => {
        setGithubError(true);
        console.log(error);
      });

    // Set body to display at delay
    setTimeout(() => {
      setHideBody(false);
    }, 4000);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <TypeWriterEffect
          startDelay={0}
          textStyle={{}}
          text={"Kyle Jeffrey"}
          typeSpeed={100}
        />
        <TypeWriterEffect
          startDelay={1500}
          textStyle={{ fontSize: "1.5em", color: "lightblue" }}
          multiText={[
            "Looking for the creative space between tech and art.",
            "Robotics Engineer / Web Developer",
          ]}
          typeSpeed={10}
        />
        <TypeWriterEffect
          startDelay={2000}
          textStyle={{
            fontSize: "1em",
            margin: "1em",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          text={">---------------------------------------------------"}
          typeSpeed={10}
        />
        <div className="delayed-content slide-in" hidden={hideBody}>
          <div
            style={{
              justifyContent: "left",
              fontSize: "1.2em",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <span style={{ marginInline: "1em" }}>Socials: </span>
            <a
              style={{ color: "#44daff" }}
              href="https://www.linkedin.com/in/kyle-jeffrey-1651b5189/"
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
            </a>
            <span style={{ marginInline: "1em" }}> / </span>

            <a
              style={{ color: "#66ff66" }}
              href="https://github.com/Kylealanjeffrey"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <p
            style={{
              marginLeft: "1.4em",
              fontSize: ".9em",
            }}
          >
            email:
            <span
              style={{
                color: "rgb(238, 154, 154)",
                marginInline: "1em",
              }}
            >
              kyle@kyle-jeffrey.com
            </span>
          </p>
          <p className="spacer"> </p>
          <div className="bio">
            <p>Hi I'm Kyle!</p>
            <p>
              I recieved my degree in robotics where I did a Senior Thesis on
              simulating Milipede movements with cheap leg actuators.
            </p>
            <p>
              I've done web development this last five years as a hobbyist where
              I've made multiple web apps.
            </p>
            <p>
              The last two years I've worked across two different divisions at
              Google Robotics and Google X, solving general problems with python
              written robot applications
            </p>
          </div>
          <p className="spacer"> </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <h2 style={{ marginBottom: ".4em", marginRight: "3em" }}>
              Work Experience
            </h2>
            <BitButton url="./Kyle Jeffrey Resume.pdf">
              Download as PDF
            </BitButton>
          </div>
          <ul className="work-list">
            {jobs.map((job, index) => (
              <li key={`job-${index}`}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "1.5em",
                  }}
                >
                  <h2>{job.title}</h2>
                  <span> | </span>
                  <span style={{ fontSize: "55%", letterSpacing: ".1em" }}>
                    {job.duration}
                  </span>
                </div>
                <h3>{job.company}</h3>
                <p>{job.description} </p>
                <ul style={{ marginLeft: "0" }}>
                  {job.accomplishments.map((accomplishment, i) => (
                    <li
                      key={`${job.name}-${accomplishment}`}
                      style={{ fontFamily: "monospace", fontSize: "1em" }}
                    >
                      {accomplishment}
                    </li>
                  ))}
                </ul>{" "}
              </li>
            ))}
          </ul>

          <h2>Work Projects</h2>
          <ul>
            {workProjects.map((project, index) => (
              <li key={`project${index}`} title={project.name}>
                <a rel="noreferrer" href={project.url} target="_blank">
                  {project.name}
                </a>
                <h3 style={{ fontSize: ".8em" }}>{project.company}</h3>
                <p>{project.description}</p>
                <div className="topics">
                  <TypeWriterEffect
                    textStyle={{
                      lineHeight: "1.5em",
                      color: "#66ff66",
                      fontSize: "1em",
                    }}
                    startDelay={0}
                    typeSpeed={100}
                    text={project.topics.join(" / ")}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="spacer"> </p>
          <h2>Personal Projects</h2>
          <ul>
            {githubError ? (
              <h3 style={{ color: "red" }}>
                Oops. There was an issue loading my github projects :(
              </h3>
            ) : (
              githubRepos.map((repo, index) => {
                if (repo.pinned) {
                  return (
                    <li key={`repo${index}`} title={repo.name}>
                      <a rel="noreferrer" href={repo.homepage} target="_blank">
                        {repo.name}
                      </a>
                      <p>{repo.description}</p>
                      <div className="topics">
                        <TypeWriterEffect
                          textStyle={{
                            lineHeight: "1.5em",
                            color: "#66ff66",
                            fontSize: "1em",
                          }}
                          startDelay={0}
                          typeSpeed={100}
                          text={repo.topics.join(" / ")}
                        />
                      </div>
                    </li>
                  );
                } else {
                  return null;
                }
              })
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
