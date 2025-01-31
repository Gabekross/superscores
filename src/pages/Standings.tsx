import React, { useEffect, useState } from "react";
import supabase from "../supabase";
import { TeamStanding } from "../typpes";

const Standings: React.FC = () => {
    const [standings, setStandings] = useState<TeamStanding[]>([]);

    useEffect(() => {
        const fetchStandings = async () => {
            const { data, error } = await supabase
                .from("group_standings")
                .select(`
                    id, team_id, matches_played, wins, draws, losses, goals_scored, goals_conceded, points,
                    team:team_id (name)
                `)
                .order("points", { ascending: false });

            if (error) {
                console.error("Error fetching standings:", error);
                return;
            }

            // ✅ Ensure team is an object, not an array
            const formattedData: TeamStanding[] = data.map((team: any) => ({
                id: team.id,
                team_id: team.team_id,
                matches_played: team.matches_played,
                wins: team.wins,
                draws: team.draws,
                losses: team.losses,
                goals_scored: team.goals_scored,
                goals_conceded: team.goals_conceded,
                points: team.points,
                team: team.team?.length > 0 ? team.team[0] : null, // ✅ Extract first item
            }));

            setStandings(formattedData);
        };

        fetchStandings();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Group Standings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Team</th>
                            <th className="border p-2">MP</th>
                            <th className="border p-2">W</th>
                            <th className="border p-2">D</th>
                            <th className="border p-2">L</th>
                            <th className="border p-2">GF</th>
                            <th className="border p-2">GA</th>
                            <th className="border p-2">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team) => (
                            <tr key={team.id} className="text-center">
                                <td className="border p-2">{team.team?.name ?? "Unknown"}</td>
                                <td className="border p-2">{team.matches_played}</td>
                                <td className="border p-2">{team.wins}</td>
                                <td className="border p-2">{team.draws}</td>
                                <td className="border p-2">{team.losses}</td>
                                <td className="border p-2">{team.goals_scored}</td>
                                <td className="border p-2">{team.goals_conceded}</td>
                                <td className="border p-2 font-bold">{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Standings;
