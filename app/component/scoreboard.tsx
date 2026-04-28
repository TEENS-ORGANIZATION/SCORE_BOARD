"use client";

import { useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { MdAdd } from "react-icons/md";

interface Team {
  teamName: string;
  score: number;
  color: string;
}

export default function ScoreBoard() {
  const [text, setText] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [points, setPoints] = useState(1);
  const [teamName, setTeamName] = useState("");
  const colors = ["#22c55e", "#3b82f6", "#f97316", "#a78bfa"];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const addTeam = () => {
    if (!text.trim()) return;

    const newTeam: Team = {
      teamName: text,
      score: 0,
      color: getRandomColor(),
    };

    setTeams((prev) => [newTeam, ...prev]);
    setText("");
  };

  const updateScore = (teamName: string, value: number) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.teamName === teamName
          ? { ...team, score: team.score + value }
          : team,
      ),
    );
  };

  const resetScore = (teamName: string) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.teamName === teamName ? { ...team, score: 0 } : team,
      ),
    );
  };

  const resetTeamsPoints = () => {
    setTeams((prev) =>
      prev.map((teams) => (teams ? { ...teams, score: 0 } : teams)),
    );
  };
  const removeTeam = (teamName: string) => {
    setTeams((prev) => prev.filter((t) => t.teamName !== teamName));
  };

  // sort leaderboard
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="flex justify-center items-center flex-col py-6 px-3">
      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="text-white text-2xl font-bold">🎉 Connect & Chill</h1>
        <p className="text-gray-400 text-sm">Youth Group Scoreboard</p>
      </div>

      {/* ADD TEAM */}
      <div className="w-full max-w-2xl bg-[#2a2a2a] p-4 rounded-xl border border-white/10 mb-4">
        <p className="text-white text-sm mb-2">Add a team</p>

        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Team David"
            className="flex-1 px-4 py-3 rounded-lg bg-[#1f1f1f] text-white outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTeam();
            }}
          />

          <button
            onClick={addTeam}
            className="px-4 py-3 bg-black text-white rounded-lg flex items-center gap-1"
          >
            <MdAdd /> Add
          </button>
        </div>

        {/* POINT INPUT */}
        <div className="flex items-center gap-3 mt-4">
          <p className="text-sm text-gray-400">Points per tap:</p>

          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded bg-[#1f1f1f] text-white outline-none"
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 w-48 bg-[#2a2a2a] rounded-full border border-white/10">
          <AiOutlineTeam size={40} className="text-white" />
          <p className="text-white text-sm mt-2">No team yet</p>
        </div>
      ) : (
        /* LEADERBOARD */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {sortedTeams.map((team, index) => (
            <div
              key={index}
              onMouseEnter={() => setTeamName(team.teamName)}
              onMouseLeave={() => setTeamName("")}
              className={`p-5 rounded-2xl bg-[#2a2a2a] relative overflow-hidden border ${
                index === 0 ? "border-green-400" : "border-white/10"
              }`}
            >
              {/* POSITION */}
              <p className="text-xs text-gray-400 mb-1">
                {index === 0
                  ? "1ST PLACE 🏆"
                  : index === 1
                    ? "2ND PLACE"
                    : index === 2
                      ? "3RD PLACE"
                      : `${index + 1}TH PLACE`}
              </p>

              {/* TEAM NAME */}
              <h2
                className="text-lg font-semibold capitalize"
                style={{ color: team.color }}
              >
                Team {team.teamName}
              </h2>

              {/* SCORE */}
              <p className="text-5xl font-bold my-4 text-white">{team.score}</p>

              {/* CONTROLS */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateScore(team.teamName, -points)}
                  className="flex-1 py-2 bg-black text-white rounded-lg"
                >
                  -
                </button>

                <button
                  onClick={() => updateScore(team.teamName, points)}
                  className="flex-1 py-2 bg-black text-white rounded-lg"
                >
                  +
                </button>

                <button
                  onClick={() => resetScore(team.teamName)}
                  className="flex-1 py-2 bg-black text-white rounded-lg"
                >
                  ×
                </button>

                <div
                  onClick={() => removeTeam(team.teamName)}
                  className={`absolute top-3 right-3 h-[30px] w-[30px] bg-red-400 text-white flex justify-center items-center rounded-[50px] opacity-0 ${teamName == team.teamName && "show"} fade my-3`}
                >
                  &times;
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {teams.length == 0 ? (
        <div></div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setTeams([]);
            }}
            className="bg-red-500 text-white flex items-center p-3 rounded mt-3"
          >
            <IoMdTrash />
            Clear Team
          </button>

          <button
            onClick={() => {
                resetTeamsPoints()
            }}
            className="bg-[#141414] text-white flex items-center p-3 rounded mt-3"
          >
            Clear Points
          </button>
        </div>
      )}
    </div>
  );
}
