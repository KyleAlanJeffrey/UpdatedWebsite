import { useEffect, useState } from "react";
import BitButton from "./components/BitButton";
import TypeWriterEffect from "react-typewriter-effect";
import "./App.scss";

import { getAllCommits, getAllRepos } from "./api";
import { Avatar } from "./components/Avatar";
import { findCurrentStreak, findLongestStreak } from "./helper";

function App() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [workProjects, setWorkProjects] = useState([]);
  const [githubError, setGithubError] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [commits, setCommits] = useState([]);
  const [jobsError, setJobsError] = useState(false);
  const [workProjectsError, setWorkProjectsError] = useState(false);
  const [bio, setBio] = useState("");
  const [flickerMode, setFlickerMode] = useState(false);
  const [hideBody, setHideBody] = useState(true);
  useEffect(() => {
    const url = "https://github.com/Kylealanjeffrey";
    fetch(url);
    const accessToken = process.env.REACT_APP_GITHUB_API_KEY;
    if (!accessToken) {
      console.log("Token not grabbed");
    }
    // Get pinned repositories
    getAllRepos().then((data) => {
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
    });

    // Get jobs
    fetch(
      `https://raw.githubusercontent.com/KyleAlanJeffrey/UpdatedWebsite/main/data/jobs.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setJobs(data["jobs"]);
      })
      .catch((error) => {
        setJobsError(true);
        console.log(error);
      });

    // Get work projects
    fetch(
      `https://raw.githubusercontent.com/KyleAlanJeffrey/UpdatedWebsite/main/data/work_projects.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setWorkProjects(data["projects"]);
      })
      .catch((error) => {
        setWorkProjectsError(true);
        console.log(error);
      });

    fetch(
      `https://raw.githubusercontent.com/KyleAlanJeffrey/UpdatedWebsite/main/data/bio.txt`
    )
      .then((response) => response.text())
      .then((data) => {
        setBio(data);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllCommits().then((data) => {
      setCommits(data);
    });

    // Set body to display at delay
    setTimeout(() => {
      setHideBody(false);
    }, 1000);
  }, []);

  return (
    <div className={"App" + (flickerMode ? " flicker" : "")}>
      <div className="flicker-button-container">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="button-pole"></div>
          <div className="button-pole"></div>
          <div className="button-pole"></div>
        </div>
        <button
          onClick={() => setFlickerMode(!flickerMode)}
          className="flicker-button"
        >
          Click me!
        </button>
      </div>
      <div className="App-header">
        <div>
          <TypeWriterEffect
            startDelay={0}
            textStyle={{}}
            text={"Kyle Jeffrey"}
            typeSpeed={50}
          />
        </div>
        <TypeWriterEffect
          startDelay={1500}
          textStyle={{ fontSize: "25px", color: "lightblue" }}
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
              fontSize: "16px",
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
              fontSize: "14px",
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
            {bio.split("\n").map((line, index) => (
              <p key={`bio-line-${index}`}>{line}</p>
            ))}
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
            <div style={{ marginBottom: "1em" }}>
              <BitButton url="./Kyle Jeffrey Resume.pdf">
                Download as PDF
              </BitButton>
            </div>
          </div>
          <ul className="work-list section-container">
            {jobs.map((job, index) => (
              <div className="item" key={`job-${index}`}>
                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
                <p>{job.duration}</p>
                <ul style={{ marginLeft: "0" }}>
                  {job.accomplishments.map((accomplishment, i) => (
                    <li
                      key={`${job.name}-${accomplishment}`}
                      style={{ fontFamily: "monospace", fontSize: "16px" }}
                    >
                      {accomplishment}
                    </li>
                  ))}
                </ul>
                <div className="flex-spacer" />
                <div className="topics">
                  <TypeWriterEffect
                    textStyle={{
                      lineHeight: "15px",
                      color: "#66ff66",
                      fontSize: "12px",
                    }}
                    startDelay={0}
                    typeSpeed={100}
                    text={jobs ? job.skills.join("  ") : []}
                  />
                </div>
              </div>
            ))}
          </ul>

          <p className="spacer"> </p>
          <h2>Work Projects</h2>
          <div className="section-container work-list">
            {workProjects.map((project, index) => (
              <div
                className="item"
                key={`project${index}`}
                title={project.name}
              >
                <a rel="noreferrer" href={project.url} target="_blank">
                  {project.name}
                </a>
                <h3 style={{ fontSize: ".8em" }}>{project.company}</h3>
                <p>{project.description}</p>
                <div className="flex-spacer" />

                <div className="topics">
                  <TypeWriterEffect
                    textStyle={{
                      lineHeight: "15px",
                      color: "#66ff66",
                      fontSize: "12px",
                    }}
                    startDelay={0}
                    typeSpeed={100}
                    text={project.topics.join("   ")}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="spacer"> </p>
          <h2>Personal Projects</h2>
          <div className="section-container work-list">
            {githubError ? (
              <h3 style={{ color: "red" }}>
                Oops. There was an issue loading my github projects :(
              </h3>
            ) : (
              githubRepos.map((repo, index) => {
                if (repo.pinned) {
                  return (
                    <div
                      className="item"
                      key={`repo${index}`}
                      title={repo.name}
                    >
                      <a rel="noreferrer" href={repo.homepage} target="_blank">
                        {repo.name}
                      </a>
                      <p>{repo.description}</p>
                      <div className="flex-spacer" />
                      <div className="topics">
                        <TypeWriterEffect
                          textStyle={{
                            lineHeight: "15px",
                            color: "#66ff66",
                            fontSize: "12px",
                          }}
                          startDelay={0}
                          typeSpeed={100}
                          text={repo.topics.join("   ")}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>
          <p className="spacer"> </p>
          <h2>What i'm up to</h2>
          <h3 style={{ color: "lightblue" }}>Commit History</h3>
          <div className="commit-score">
            <h4 className="title">Score: </h4>
            <div className="score-span">
              <span className="title">Total Commits:</span>
              <span> {commits.length}</span>
            </div>
            <div className="score-span">
              <span className="title">Most Consecutive Days:</span>
              <span> {findLongestStreak(commits)}</span>
            </div>
            <div className="score-span">
              <span className="title">Current Streak:</span>
              <span> {findCurrentStreak(commits)}</span>
            </div>
            <div className="score-span">
              <span className="title">Last Commit:</span>
              <span>
                {" "}
                {new Date(
                  commits?.[0]?.commit.author.date
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="commit-history-section">
            {commits.map((commit, index) => (
              <div className="commit" key={`commit-${index}`}>
                <p>{commit.commit.message}</p>
                <a href={commit.html_url}>
                  commit sha: #{commit.sha.substr(commit.sha.length - 5)}
                </a>
                <div className="footer">
                  <div className="user">
                    {commit.author?.avatar_url ? (
                      <img src={commit?.author?.avatar_url} />
                    ) : (
                      <Avatar />
                    )}
                    <a href={commit?.author?.html_url}>
                      {commit?.commit?.author?.name}
                    </a>
                  </div>
                  <p>
                    {new Date(commit.commit.author.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
