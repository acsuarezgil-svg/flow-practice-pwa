import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
const [minutes, setMinutes] = useState(5);
const [remaining, setRemaining] = useState(null);
const [running, setRunning] = useState(false);
const [sessionFinished, setSessionFinished] = useState(false);
const [lastCompleted, setLastCompleted] = useState(0);
const [completeMessage, setCompleteMessage] = useState("");

const startTimer = () => {
  setSessionFinished(false);
  setCompleteMessage("");   
  
  const endTime = Date.now() + minutes * 60 * 1000;

  localStorage.setItem("flow_end_time", endTime);

  const session = {
    category,
    activity,
    plannedMinutes: minutes,
    completedMinutes: 0,
    timestamp: new Date().toISOString(),
  };

  const existing =
    JSON.parse(localStorage.getItem("flow_sessions")) || [];

  localStorage.setItem(
    "flow_sessions",
    JSON.stringify([...existing, session])
  );

    setSessionFinished(false);
    setRunning(true);
  };

const ACTIVITIES = {
  "🛹 Skateboarding": ["Ollies", "Kick Turns", "Switch Riding", "Cruising"],
  "🏃 Running": ["Easy Run", "Intervals", "Trail Run", "Recovery Run"],
  "🚴 Cycling": ["Bike Ride", "Endurance Ride", "Recovery Ride", "Hill Ride"],
  "📚 Reading": ["Book Reading", "Study", "Poetry"],
  "🎨 Drawing": ["Sketching", "Creative Drawing"],
  "🎵 Music": ["Piano", "Scales", "Song Practice"],
  "💃 Dance": ["Freestyle", "Footwork"],
  "🧹 Chores": ["Cleaning", "Garage", "Laundry", "Mowing", "Power Washing", "Organizing"],
  "😌 Recovery": ["Stretching", "Meditation", "Mobility"],
};

const [category, setCategory] = useState("🛹 Skateboarding");
const [activity, setActivity] = useState("Ollies");
const [mood, setMood] = useState("🙂");
const WEEKLY_GOAL = 300;
const [reflection, setReflection] = useState("");
const DURATIONS = [5, 10, 15, 30, 45, 60, 90, 120];
const [intention, setIntention] = useState(
  localStorage.getItem("flow_intention") || ""
);
const sessions = JSON.parse(localStorage.getItem("flow_sessions")) || [];

const totalMinutes = sessions.reduce((sum, session) => {
  const mins =
    Number(session.completedMinutes) ||
    Number(session.plannedMinutes) ||
    Number(session.minutes) ||
    0;

  return sum + mins;
}, 0);

const totalSessions = sessions.length;
const weeklyMinutes = sessions.reduce((sum, session) => {
  const mins =
    Number(session.completedMinutes) ||
    Number(session.plannedMinutes) ||
    Number(session.minutes) ||
    0;

  const sessionDate = new Date(session.timestamp);
  const now = new Date();

  const diffDays =
    (now - sessionDate) / (1000 * 60 * 60 * 24);

  if (diffDays <= 7) {
    return sum + mins;
  }

  return sum;
}, 0);
const uniqueDays = [
  ...new Set(
    sessions.map((session) =>
      new Date(session.timestamp).toDateString()
    )
  ),
];

const streak = uniqueDays.length;
const categoryTotals = {};
const weeklyData = Object.entries(categoryTotals).map(
  ([category, minutes]) => ({
    category,
    minutes,
  })
);

sessions.forEach((session) => {
  const mins =
    Number(session.completedMinutes) ||
    Number(session.plannedMinutes) ||
    Number(session.minutes) ||
    0;

  if (!categoryTotals[session.category]) {
    categoryTotals[session.category] = 0;
  }

  categoryTotals[session.category] += mins;
});
const moodCounts = {};

sessions.forEach((session) => {
  if (session.mood) {
    if (!moodCounts[session.mood]) {
      moodCounts[session.mood] = 0;
    }

    moodCounts[session.mood] += 1;
  }
});
const achievements = [];

if (totalSessions >= 1) {
  achievements.push("🌱 First Session");
}

if (totalSessions >= 10) {
  achievements.push("🔥 10 Sessions");
}

if (totalMinutes >= 300) {
  achievements.push("⏱ 5 Hour Flow");
}

if (streak >= 3) {
  achievements.push("🔥 3 Day Streak");
}

if (categoryTotals["🛹 Skateboarding"]) {
  achievements.push("🛹 Skate Flow");
}

if (categoryTotals["🏃 Running"]) {
  achievements.push("🏃 Running Flow");
}

useEffect(() => {
  const interval = setInterval(() => {
    const savedEnd = localStorage.getItem("flow_end_time");

    if (savedEnd) {
      const diff = Math.max(
        0,
        Math.floor((savedEnd - Date.now()) / 1000)
      );

      setRemaining(diff);

      if (diff <= 0) {
        localStorage.removeItem("flow_end_time");
        setLastCompleted(minutes);
        setRunning(false);
        setSessionFinished(true);
        setCompleteMessage("✅ Session complete — showing up counts.");
      } else {
        setRunning(true);
      }
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f7fb 0%, #e9eefb 100%)",
        padding: "2rem",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            padding: "1.5rem",
            borderRadius: "24px",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          <h1>🌱 Flow Practice</h1>

          <p>
            Intentional practice for skating, creativity, movement, and life.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <p>Total Minutes</p>
            <h2>{totalMinutes}</h2>
          </div>

          <div
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <p>Sessions</p>
            <h2>{totalSessions}</h2>
          </div>
          <div
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <p>Streak</p>
            <h2>{streak} 🔥</h2>
          </div>
        </div>
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "24px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "24px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              marginBottom: "1.5rem",
            }}
          >
            <h2>🎯 Weekly Goal</h2>

            <p>
              {weeklyMinutes} / {WEEKLY_GOAL} min
            </p>

            <div
              style={{
                height: "16px",
                background: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  width: `${Math.min(
                    (weeklyMinutes / WEEKLY_GOAL) * 100,
                    100
                  )}%`,
                  height: "100%",
                  background: "#6366f1",
                }}
              />
            </div>
          </div>
          <h2>📝 Daily Intention</h2>

          <input
            value={intention}
            onChange={(e) => {
              setIntention(e.target.value);
              localStorage.setItem("flow_intention", e.target.value);
            }}
            placeholder="Stay grounded and practice calmly"
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "14px",
              border: "1px solid #d1d5db",
              marginTop: "1rem",
              background: "#f8fafc",
              color: "#111827",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => {
                const newCategory = e.target.value;
                setCategory(newCategory);
                setActivity(ACTIVITIES[newCategory][0]);
              }}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                marginTop: "1rem",
                background: "#f8fafc",
                color: "#111827",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            >
              {Object.keys(ACTIVITIES).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label>Activity</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "14px",
                border: "1px solid #d1d5db",
                marginTop: "1rem",
                background: "#f8fafc",
                color: "#111827",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            >
              {ACTIVITIES[category].map((act) => (
                <option key={act} value={act}>
                  {act}
                </option>
              ))}
            </select>

          <div style={{ marginTop: "1rem" }}>
            <label>Duration</label>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "1rem",
              }}
            >
              {DURATIONS.map((dur) => (
                <button
                  key={dur}
                  onClick={() => setMinutes(dur)}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      minutes === dur ? "#6366f1" : "#e5e7eb",
                    color:
                      minutes === dur ? "white" : "#111827",
                    fontWeight: "bold",
                  }}
                >
                  {
                    dur >= 60
                      ? `${dur / 60} hr`
                      : `${dur} min`
                  }
                </button>
              ))}
            </div>
          </div>

          {running && (
            <h1
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontSize: "4rem",
              }}
            >
              {Math.floor(remaining / 60)
                .toString()
                .padStart(2, "0")}
              :
              {(remaining % 60)
                .toString()
                .padStart(2, "0")}
            </h1>
          )}
          {sessionFinished && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "18px",
                background: "#dcfce7",
                color: "#166534",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {completeMessage}
              <br />
              {lastCompleted} minutes logged.
            </div>
          )}
              <h3>🧠 Reflection</h3>
              <div style={{ marginTop: "1rem" }}>
                <p>How do you feel after the session?</p>

                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {lastCompleted && (
                    <div
                      style={{
                        marginTop: "1.5rem",
                        padding: "1.5rem",
                        borderRadius: "24px",
                        background: "#ecfeff",
                        color: "#155e75",
                        textAlign: "center",
                      }}
                    >
                      <h2>🌱 Session Complete</h2>

                      <p>
                        You practiced for {lastCompleted} minutes.
                      </p>
                    </div>
                  )}
                  {["😞", "🙂", "😄", "🔥", "🧘"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setMood(emoji)}
                      style={{
                        fontSize: "1.5rem",
                        padding: "0.75rem",
                        borderRadius: "14px",
                        border:
                          mood === emoji
                            ? "2px solid #6366f1"
                            : "1px solid #d1d5db",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What did you notice during this session?"
                style={{
                  width: "100%",
                  minHeight: "120px",
                  marginTop: "1rem",
                  padding: "1rem",
                  borderRadius: "14px",
                  border: "1px solid #d1d5db",
                  background: "white",
                  boxSizing: "border-box",
                  fontSize: "1rem",
                }}
              />

              <button
                onClick={() => {
                  const sessions =
                    JSON.parse(localStorage.getItem("flow_sessions")) || [];

                  const updated = sessions.map((session, index) => {
                    if (index === sessions.length - 1) {
                      return {
                        ...session,
                        reflection,
                        mood,
                      };
                    }
                    return session;
                  });

                  localStorage.setItem("flow_sessions", JSON.stringify(updated));
                  
                  alert("Reflection saved 🌱");
                  window.location.reload();
                }}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "14px",
                  border: "none",
                  background: "#6366f1",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Save Reflection
              </button>

          <button
            onClick={startTimer}
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "1rem",
              borderRadius: "14px",
              border: "none",
              background: "#6366f1",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            ▶ Start Practice
          </button>
        </div>
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "24px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            marginTop: "1.5rem",
          }}
        >
          {running && (
            <button
              onClick={() => {
                const sessions =
                  JSON.parse(localStorage.getItem("flow_sessions")) || [];

                const latest = sessions[sessions.length - 1];

                const completedMinutes = Math.max(
                  1,
                  Math.round(
                    (Number(latest.plannedMinutes) * 60 - Number(remaining)) / 60
                  )
                );

                const updated = sessions.map((session, index) => {
                  if (index === sessions.length - 1) {
                    return {
                      ...session,
                      completedMinutes,
                      stoppedEarly: true,
                    };
                  }

                  return session;
                });

                localStorage.setItem("flow_sessions", JSON.stringify(updated));
                localStorage.removeItem("flow_end_time");

                setRunning(false);
                setRemaining(0);
                setSessionFinished(true);
              }}
            >
              Finish Early
            </button>
          )}
          <h2>📊 Recent Sessions</h2>

          {(JSON.parse(localStorage.getItem("flow_sessions")) || [])
            .slice(-5)
            .reverse()
            .map((session, index) => (
              <div
                key={index}
                onClick={() => alert(session.activity)}
                style={{
                  padding: "1rem",
                  borderRadius: "14px",
                  background: "#f8fafc",
                  marginTop: "0.75rem",
                  cursor: "pointer",
                }}
              >
                <strong>{session.activity}</strong>
                <p style={{ margin: "0.25rem 0 0 0" }}>
                  {session.category} ·{" "}
                  {session.completedMinutes || session.plannedMinutes || session.minutes} min
                </p>
                {session.plannedMinutes && (
                  <p
                    style={{
                      marginTop: "0.25rem",
                      color: "#6b7280",
                      fontSize: "0.9rem",
                    }}
                  >
                    {Math.round(
                      ((session.completedMinutes || session.plannedMinutes) /
                        session.plannedMinutes) *
                        100
                    )}
                    % complete
                  </p>
                )}
                {session.reflection && (
                  <p
                    style={{
                      marginTop: "0.75rem",
                      padding: "0.75rem",
                      borderRadius: "12px",
                      background: "#eef2ff",
                      color: "#3730a3",
                      fontStyle: "italic",
                    }}
                  >
                    “{session.reflection}”
                  </p>
                )}
                {session.mood && (
                  <p style={{ marginTop: "0.5rem" }}>
                    Mood: {session.mood}
                  </p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    const sessions =
                      JSON.parse(localStorage.getItem("flow_sessions")) || [];

                    const updated = sessions.filter((_, i) => i !== index);

                    localStorage.setItem("flow_sessions", JSON.stringify(updated));

                    window.location.reload();
                  }}
                  style={{
                    marginTop: "0.75rem",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "10px",
                    border: "none",
                    background: "#fee2e2",
                    color: "#991b1b",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
            <div
              style={{
                background: "white",
                padding: "1.5rem",
                borderRadius: "24px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                marginTop: "1.5rem",
              }}
            >
              <h2>📈 Category Totals</h2>
              <div
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  marginTop: "1.5rem",
                }}
              >
                <h2>🏆 Achievements</h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    marginTop: "1rem",
                  }}
                >
                  {achievements.map((badge) => (
                    <div
                      key={badge}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "999px",
                        background: "#ede9fe",
                        color: "#5b21b6",
                        fontWeight: "bold",
                      }}
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  marginTop: "1.5rem",
                }}
              >
                <h2>📈 Weekly Activity</h2>

                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={weeklyData}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />

                      <Bar
                        dataKey="minutes"
                        fill="#6366f1"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "24px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  marginTop: "1.5rem",
                }}
              >
                <h2>🧠 Mood Summary</h2>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginTop: "1rem",
                  }}
                >
                  {Object.entries(moodCounts).map(([mood, count]) => (
                    <div
                      key={mood}
                      style={{
                        padding: "1rem",
                        borderRadius: "18px",
                        background: "#f8fafc",
                        minWidth: "80px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "2rem" }}>
                        {mood}
                      </div>

                      <strong>{count}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {Object.entries(categoryTotals).map(([cat, mins]) => (
                <div
                  key={cat}
                  style={{
                    marginTop: "1rem",
                  }}
                >
                  <strong>{cat}</strong>

                  <div
                    style={{
                      height: "12px",
                      background: "#e5e7eb",
                      borderRadius: "999px",
                      overflow: "hidden",
                      marginTop: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(mins, 300) / 3}%`,
                        height: "100%",
                        background: "#6366f1",
                      }}
                    />
                  </div>

                  <p>{mins} min</p>
                </div>
              ))}
            </div>
        </div>
              </div>
            </div>
    
  );
}

export default App;