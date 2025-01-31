import React, { useEffect, useState } from "react";
import supabase from "../supabase";
import { Match } from "../typpes";

const Home: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const { data, error } = await supabase
                .from("matches")
                .select(`
                    id, home_team_id, away_team_id, home_score, away_score, match_date, status,
                    home_team:home_team_id (name),
                    away_team:away_team_id (name)
                `)
                .order("match_date", { ascending: false });

            if (error) {
                console.error("Error fetching matches:", error);
                return;
            }

                       // ✅ Ensure home_team and away_team are objects, not arrays
                       const formattedData: Match[] = data.map((match: any) => ({
                        id: match.id,
                        home_team: match.home_team?.length > 0 ? match.home_team[0] : null,
                        away_team: match.away_team?.length > 0 ? match.away_team[0] : null,
                        home_score: match.home_score,
                        away_score: match.away_score,
                        match_date: match.match_date,
                        status: match.status,
                    }));
        
                    setMatches(formattedData);

            setMatches(formattedData);
        };

        fetchMatches();

        // ✅ Subscribe to live score updates
        const channel = supabase
            .channel("match_scores")
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "matches" }, (payload) => {
                setMatches((prevMatches) =>
                    prevMatches.map((match) =>
                        match.id === payload.new.id ? { ...match, ...payload.new } : match
                    )
                );
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Live Scores</h2>
            <ul>
                {matches.map((match) => (
                    <li key={match.id} className="p-2 border-b">
                        <span className="font-semibold">{match.home_team?.name ?? "Unknown"}</span> {match.home_score} - {match.away_score} <span className="font-semibold">{match.away_team?.name ?? "Unknown"}</span>
                        <p className="text-gray-500">{match.status} | {match.match_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
